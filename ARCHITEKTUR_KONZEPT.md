# 🏛️ Architektur-Konzept: Vereins-Manager

## 📋 Überblick
Skalierbare, sichere und wartbare Vereinssoftware als eigenständiges Produkt für deutsche Schützenvereine.

## 1. 📁 Projekt-Struktur (Monorepo)

```
/rwk-einbeck-monorepo
├── apps/
│   ├── rwk-app/          # Bestehende RWK-App (Next.js)
│   └── vereins-app/      # NEUE Vereins-App (Next.js)
│
├── packages/
│   ├── ui/               # Geteilte React-Komponenten (shadcn/ui)
│   ├── types/            # Geteilte TypeScript-Interfaces
│   └── config/           # Geteilte Konfigurationen
│
└── package.json          # Haupt-package.json (pnpm workspaces)
```

**Vorteile:**
- Gemeinsame UI-Komponenten
- Einheitliche Typ-Definitionen
- Konsistentes Design-System
- Reduzierte Code-Duplizierung

## 2. 🔥 Firebase-Projekt: `vereins-manager-prod`

### Authentication
- E-Mail/Passwort + Google/Apple OAuth
- Offene Registrierung für Vereins-Admins
- Einladungs-System für Mitglieder

### Firestore Database
- Multi-Tenant Architektur
- Strikte Security Rules pro Verein
- Skalierbare Collection-Struktur

### Cloud Functions
- Hintergrundprozesse (Erinnerungen, Notifications)
- API-Brücke zur RWK-App
- Automatisierte Workflows

### Storage
- Profilbilder, Vereinslogos
- Scheibenfotos für Schießbuch
- Dokumente und Anhänge

## 3. 🗄️ Firestore-Datenbankstruktur

### Top-Level Collections

```typescript
// /clubs/{clubId}
interface Club {
  id: string;
  name: string;
  logoUrl?: string;
  subscriptionStatus: 'active' | 'trial' | 'canceled';
  settings: {
    sepa: SEPASettings;
    beitraege: BeitragSettings;
  };
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

// /user_permissions/{userId}
interface VereinsAppUserPermission {
  uid: string;
  email: string;
  clubRoles: {
    [clubId: string]: 'VORSTAND' | 'KASSENWART' | 'MITGLIED' | 'SPORTLEITER';
  };
}
```

### Sub-Collections unter `/clubs/{clubId}`

```typescript
// /clubs/{clubId}/mitglieder/{memberId}
interface ClubMember {
  firstName: string;
  lastName: string;
  email?: string;
  telefon?: string;
  geburtstag?: string;
  vereinseintritt?: string;
  isActive: boolean;
  sepa?: SEPAMandat;
  beitragsstatus: 'offen' | 'bezahlt';
}

// /clubs/{clubId}/service_plans/{planId}
interface ServicePlan {
  name: string; // "Standaufsicht 2. Halbjahr 2025"
  type: 'Standaufsicht' | 'Küche' | 'Putzen';
  slots: {
    date: Timestamp;
    startTime: string;
    endTime: string;
    assignedMemberId?: string;
    status: 'open' | 'assigned';
  }[];
}

// /clubs/{clubId}/events/{eventId}
interface ClubEvent {
  title: string;
  description?: string;
  date: Timestamp;
  type: 'training' | 'wettkampf' | 'versammlung';
  participants?: string[]; // Member IDs
}
```

### Sub-Collections unter `/users/{userId}`

```typescript
// /users/{userId}/shooting_logs/{logId}
interface ShootingLogEntry {
  date: Timestamp;
  disciplineId: string;
  shotCount: number;
  rings?: number;
  teiler?: number;
  location: string; // Schießstand
  supervisorName?: string; // Aufsicht
  notes?: string; // Eigene Notizen
  isCompetition: boolean;
  rwkScoreId?: string; // Verknüpfung zur RWK-App
}

// /users/{userId}/profile
interface UserProfile {
  firstName: string;
  lastName: string;
  avatarUrl?: string;
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
  };
}
```

## 4. 🚀 Onboarding & Authentifizierung

### Club-Registrierung Flow
1. **Vereinsvorstand** besucht `vereins-manager.vercel.app`
2. **Plan auswählen** (30-Tage-Test, Professional, Enterprise)
3. **Admin-Konto erstellen** mit Vereinsdaten
4. **Club + user_permissions** automatisch angelegt
5. **Mitglieder einladen** per E-Mail-System

### Mitglieder-Registrierung Flow
1. **E-Mail-Einladung** mit sicherem Token
2. **Konto erstellen** über Einladungslink
3. **Automatische Zuordnung** zum richtigen Verein
4. **Rolle MITGLIED** wird vergeben

## 5. 🌉 API-Brücke (Cloud Function)

### RWK → Vereins-App Integration

```typescript
// Cloud Function: addRwkResultToShootingLog
export const addRwkResultToShootingLog = functions.https.onRequest(async (req, res) => {
  // 1. Token-Validierung
  const token = req.headers.authorization?.replace('Bearer ', '');
  const decodedToken = await admin.auth().verifyIdToken(token);
  
  // 2. Berechtigung prüfen
  const hasPermission = await checkSportleiterPermission(decodedToken.uid, req.body.shooterId);
  
  // 3. Schießbuch-Eintrag erstellen
  if (hasPermission) {
    await admin.firestore()
      .collection('users').doc(req.body.shooterId)
      .collection('shooting_logs').add({
        date: new Date(req.body.date),
        disciplineId: req.body.discipline,
        rings: req.body.rings,
        rwkScoreId: req.body.rwkScoreId,
        isCompetition: true,
        // ...weitere Daten
      });
  }
});
```

### API-Aufruf aus RWK-App
```typescript
// In RWK-App: Button "Ins Schießbuch übertragen"
const transferToShootingLog = async (scoreData) => {
  const response = await fetch(
    'https://us-central1-vereins-manager-prod.cloudfunctions.net/addRwkResultToShootingLog',
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${await user.getIdToken()}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        rwkScoreId: scoreData.id,
        shooterId: scoreData.shooterId,
        date: scoreData.date,
        discipline: scoreData.discipline,
        rings: scoreData.rings
      })
    }
  );
};
```

## 6. 🔐 Security Rules

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Club-Daten: Nur Mitglieder des Vereins
    match /clubs/{clubId} {
      allow read, write: if isClubMember(clubId);
      
      // Mitglieder: Nur Vorstand/Kassenwart kann schreiben
      match /mitglieder/{memberId} {
        allow read: if isClubMember(clubId);
        allow write: if hasClubRole(clubId, ['VORSTAND', 'KASSENWART']);
      }
    }
    
    // Persönliche Daten: Nur eigener Zugriff
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}

function isClubMember(clubId) {
  return exists(/databases/$(database)/documents/user_permissions/$(request.auth.uid)) &&
         clubId in get(/databases/$(database)/documents/user_permissions/$(request.auth.uid)).data.clubRoles;
}
```

## 7. 📱 Frontend-Architektur

### Next.js 14 App Router
```
/src/app/
├── (auth)/
│   ├── login/
│   └── register/
├── dashboard/
├── mitglieder/
├── beitraege/
├── schiessbook/
├── termine/
└── einstellungen/
```

### Shared Components
```
/packages/ui/
├── components/
│   ├── Button/
│   ├── Card/
│   ├── Dialog/
│   └── Table/
├── hooks/
└── utils/
```

## 8. 🚀 Deployment-Strategie

### Vercel Deployment
- **Production**: `vereins-manager.vercel.app`
- **Staging**: `vereins-manager-staging.vercel.app`
- **Preview**: Automatisch für jeden PR

### Environment Variables
```bash
# Firebase Config
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=vereins-manager-prod

# API Endpoints
NEXT_PUBLIC_RWK_API_URL=
```

## 9. 📊 Monitoring & Analytics

### Firebase Analytics
- User Engagement
- Feature Usage
- Conversion Tracking

### Error Monitoring
- Sentry Integration
- Real-time Error Alerts
- Performance Monitoring

---

**Nächste Schritte:**
1. Firebase-Projekt `vereins-manager-prod` erstellen
2. Monorepo-Struktur aufsetzen
3. Basis-Authentication implementieren
4. Club-Registrierung entwickeln
5. Migration-Tool für RWK-Daten