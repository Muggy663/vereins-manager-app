# 🚀 Deployment Checklist - Verein-im-Visier

## ✅ Vor dem Deployment

### 1. Firebase Setup
- [x] Firebase-Projekt erstellt: `vereins-manager-prod`
- [x] Authentication aktiviert (E-Mail/Passwort)
- [ ] **Firestore Database erstellen**
- [ ] **Storage aktivieren**
- [ ] **Functions deployen**

### 2. E-Mail-Benachrichtigungen Setup
```bash
# Firebase CLI installieren
npm install -g firebase-tools

# Anmelden
firebase login

# Functions deployen
cd functions
npm install
cd ..
firebase deploy --only functions

# E-Mail-Konfiguration setzen
firebase functions:config:set email.user="deine-email@gmail.com" email.password="app-passwort"
```

### 3. Sicherheitsfixes
- [x] Input-Sanitization in Registrierung
- [x] Bessere Error-Behandlung
- [ ] **Firestore Security Rules aktivieren**

### 4. Vercel Deployment
```bash
# Vercel CLI installieren
npm i -g vercel

# Deployment
vercel --prod
```

## 🔧 Erforderliche Konfigurationen

### Firebase Functions E-Mail Setup:
1. Gmail App-Passwort erstellen
2. Functions-Config setzen:
```bash
firebase functions:config:set email.user="rwk-leiter-ksve@gmx.de" email.password="DEIN_APP_PASSWORT"
```

### Firestore Security Rules:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Nur authentifizierte Benutzer
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // Club-spezifische Daten
    match /clubs/{clubId}/{document=**} {
      allow read, write: if request.auth != null && 
        exists(/databases/$(database)/documents/user_permissions/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/user_permissions/$(request.auth.uid)).data.clubId == clubId;
    }
  }
}
```

## 🚨 Kritische Probleme behoben:
- ✅ XSS-Schutz durch Input-Sanitization
- ✅ Verbesserte Error-Behandlung
- ✅ E-Mail-Benachrichtigungen implementiert
- ✅ Firebase Functions Setup

## 📧 E-Mail-Funktionen:
- ✅ Benachrichtigung an Admins bei neuer Registrierung
- ✅ Bestätigung an User nach Registrierung
- ✅ Freischaltungs-E-Mail nach Admin-Genehmigung

## 🔄 Nächste Schritte:
1. Firebase Functions deployen
2. E-Mail-Konfiguration setzen
3. Firestore Rules aktivieren
4. Vercel Deployment
5. Domain konfigurieren