# 🎯 Verein-im-Visier

> **Die digitale Vereinsverwaltung mit dem Schießsport im Fokus.**

Eine vollständig digitale Lösung für die Verwaltung von Schützenvereinen. Entwickelt als eigenständige App für professionelle Vereinsführung.

[![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)](#)
[![Tech Stack](https://img.shields.io/badge/Tech-Next.js_14_+_Firebase-blue?style=for-the-badge)](#)

## ✨ Hauptfunktionen

### 👥 **Mitgliederverwaltung**
- Vollständige Mitgliederdatenbank mit allen wichtigen Daten
- Import/Export-Funktionen für bestehende Listen
- Geburtstage & Jubiläen-Verwaltung
- Suchfunktionen und sortierbare Listen

### 💰 **Beitragsverwaltung & SEPA**
- SEPA-Lastschrift Integration mit Mandate-Verwaltung
- Flexible Beitragssätze nach Altersgruppen
- Automatische Mahnungen und Zahlungsübersicht
- Multi-Bank-Export-Formate

### 📅 **Terminplanung & Dienste**
- Digitale Dienstpläne (Standaufsicht, Küche, etc.)
- Automatische Erinnerungen
- Tauschbörse für Dienste
- Vereinskalender

### 🏆 **Digitales Schießbuch**
- Persönliches Schießbuch für jeden Schützen
- Ergebnisse dokumentieren und Fortschritt verfolgen
- Statistiken und Auswertungen
- Optional: Integration mit RWK-App

### 📋 **Vereinsrecht & Protokolle**
- Digitale Protokollerstellung
- Wahlen-System für Vereinswahlen
- Satzungsverwaltung
- Rechtssichere Vereinsführung

## 🛠️ Technologie-Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **UI/UX**: Tailwind CSS, Radix UI, Lucide Icons
- **Backend**: Firebase (Firestore, Auth, Functions, Storage)
- **Deployment**: Vercel
- **Multi-Tenancy**: Club-spezifische Datentrennung

## 🚀 Entwicklung

### Voraussetzungen
- Node.js 18+
- npm oder pnpm
- Firebase Account

### Installation

```bash
# Repository klonen
git clone https://github.com/Muggy663/verein-im-visier.git
cd verein-im-visier

# Dependencies installieren
npm install

# Development-Server starten
npm run dev

### Firebase Setup

1. Neues Firebase-Projekt erstellen: `vereins-manager-prod`
2. Authentication aktivieren (E-Mail/Passwort)
2. Authentication aktivieren (E-Mail/Passwort, Google)
3. Firestore Database erstellen
4. Storage aktivieren
5. Firebase-Config in `.env.local` eintragen

## 📊 Datenbank-Struktur

```
/clubs/{clubId}                    # Vereins-Stammdaten
/clubs/{clubId}/mitglieder/        # Mitglieder des Vereins
/clubs/{clubId}/service_plans/     # Dienstpläne
/clubs/{clubId}/tasks/             # Aufgaben-Management
/clubs/{clubId}/contributions/     # Beitragsverwaltung

/user_permissions/{userId}         # Benutzer-Berechtigungen
/users/{userId}/shooting_logs/     # Persönliche Schießbücher
```

## 🎯 Roadmap

- [ ] **Phase 1**: Basis-Setup und Mitgliederverwaltung
- [ ] **Phase 2**: Beitragsverwaltung mit SEPA
- [ ] **Phase 3**: Terminplanung und Dienstpläne
- [ ] **Phase 4**: Digitales Schießbuch
- [ ] **Phase 5**: Vereinsrecht und Protokolle
- [ ] **Phase 6**: RWK-App Integration (API-Brücke)

## 📞 Support & Kontakt

- **E-Mail**: rwk-leiter-ksve@gmx.de
- **GitHub Issues**: [Issues](https://github.com/Muggy663/vereins-manager-app/issues)
- **Entwickler**: KSV Einbeck

## 📄 Lizenz

**Copyright © 2025 KSV Einbeck. Alle Rechte vorbehalten.**

Diese Software ist für den Einsatz in deutschen Schützenvereinen entwickelt.

---

*Entwickelt mit ❤️ für den deutschen Schießsport*
