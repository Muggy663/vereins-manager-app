# 🎯 Vereins-Manager: Fokussierte Vereinssoftware

## 📋 Kernfunktionen (OHNE Wettkampf-Management)

### 1. 👥 **Mitgliederverwaltung** (Kernfunktion)
- Vollständige Mitgliederdatenbank
- Kontaktdaten, Geburtstage, Jubiläen
- Import/Export, Suchfunktionen
- Automatische Altersberechnung

### 2. 💰 **SEPA-Beitragsverwaltung** (Kernfunktion)
- Automatische Lastschriften
- Beitragskategorien (Jugend, Erwachsene, Senioren)
- Mahnwesen, Zahlungsübersicht
- Export für alle deutschen Banken

### 3. 📖 **Digitales Schießbuch** (Feature)
- Persönliche Schussergebnisse erfassen
- Trainingsfortschritt verfolgen
- Statistiken und Auswertungen
- Mobile-optimiert für Schießstand

### 4. 📅 **Termine & Events** (Feature)
- Vereinskalender
- Trainingszeiten
- Vereinsveranstaltungen
- Automatische Erinnerungen

### 5. ✅ **Aufgaben-Management** (Feature)
- To-Do-Listen für den Vorstand
- Aufgabenverteilung mit Fälligkeitsdaten
- Prioritäten-System (Hoch/Mittel/Niedrig)
- Fortschritts-Tracking (0-100%)

### 6. ⚖️ **Vereinsrecht & Protokolle** (Feature)
- Digitale Protokolle
- Wahlen-System
- Satzungsverwaltung
- Rechtssichere Vereinsführung

## 🚫 **NICHT enthalten:**
- **Wettkampf-Management** → Bleibt in der RWK App
- **Rundenwettkämpfe** → RWK App
- **Kreismeisterschaften** → RWK App
- **Startlisten/Ergebnisse** → RWK App

## 🔄 **Klare Abgrenzung:**

### **RWK App** (Wettkampf-fokussiert):
- Rundenwettkämpfe (RWK)
- Kreismeisterschaften (KM)
- Startlisten, Ergebnisauswertungen
- Wettkampf-Tabellen
- DSB-konforme Berechnungen

### **Vereins-Manager** (Verwaltungs-fokussiert):
- Mitgliederverwaltung
- Beitragsverwaltung
- Digitales Schießbuch (persönlich)
- Vereinstermine
- Aufgaben-Management
- Vereinsrecht

## 🌉 **Integration zwischen beiden Apps:**

### **API-Brücke für Schießbuch:**
- RWK-Ergebnisse können ins persönliche Schießbuch übertragen werden
- Button "Ins Schießbuch übertragen" in der RWK App
- Automatische Synchronisation der Schussergebnisse

### **Getrennte Datenbanken:**
- **RWK App**: `rwk-einbeck-live` (Wettkampfdaten)
- **Vereins-Manager**: `vereins-manager-prod` (Vereinsdaten)

## 💰 **Geschäftsmodell:**

### **Zielgruppen:**
1. **Vereine ohne RWK** → Nur Vereins-Manager (15€/Monat)
2. **Vereine mit RWK** → Beide Apps (RWK kostenlos + Vereins-Manager 15€/Monat)
3. **Einzelschützen** → Nur Schießbuch-Feature (5€/Monat)

### **Preismodell:**
- **Basis (Kostenlos):** Bis 25 Mitglieder, Grundfunktionen
- **Professional (15€/Monat):** Unbegrenzte Mitglieder, SEPA, alle Features
- **Enterprise (Individuell):** Multi-Verein, API, Custom Features

## 🎯 **Fokus auf Vereinsverwaltung:**

Die Vereins-Manager App konzentriert sich ausschließlich auf die **interne Vereinsverwaltung** und überlässt das **Wettkampf-Management** komplett der bewährten RWK App.

**Vorteile:**
- ✅ Klare Funktionsabgrenzung
- ✅ Keine Code-Duplizierung
- ✅ Spezialisierte Apps für spezielle Aufgaben
- ✅ RWK App bleibt fokussiert und stabil
- ✅ Vereins-Manager wird nicht überladen

**Ergebnis:** Zwei spezialisierte, schlanke Apps statt einer überladenen Alles-in-einem-Lösung.