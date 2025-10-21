'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Users, CreditCard, Calendar, BookOpen, Settings, Plus, CheckSquare, Target, FileText, Shield, Award, Zap, GraduationCap, Trophy } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { isDemoMode } from '@/lib/firebase/mockData';

// Typdefinition für ein Mitglied, konsistent mit mitglieder/page.tsx
interface Member {
  id: string;
  isActive: boolean;
  // Weitere Felder sind für die Statistik hier nicht nötig
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalMembers: 0,
    activeMembers: 0,
    openPayments: 8, // Platzhalter
    upcomingEvents: 3, // Platzhalter
  });

  useEffect(() => {
    if (isDemoMode()) {
      setStats({
        totalMembers: 48,
        activeMembers: 45,
        openPayments: 8,
        upcomingEvents: 3
      });
    } else {
      loadStats();
    }
  }, []);

  const loadStats = async () => {
    try {
      const clubId = 'ksv-einbeck';
      const mitgliederCollection = `clubs/${clubId}/mitglieder`;
      const membersSnapshot = await getDocs(collection(db, mitgliederCollection));
      
      const members = membersSnapshot.docs.map(doc => doc.data());
      const activeMembers = members.filter(m => m.isActive !== false);
      const openPayments = members.filter(m => m.beitragsstatus === 'offen').length;
      
      setStats({
        totalMembers: members.length,
        activeMembers: activeMembers.length,
        openPayments: openPayments,
        upcomingEvents: 3, // Platzhalter
      });
    } catch (error) {
      console.error('Fehler beim Laden der Statistiken:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Cockpit</h1>
          <p className="text-gray-600">Test Verein</p>
        </div>
        <div className="flex items-center gap-3">
          <Button 
            variant="outline" 
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = '/';
              }
            }}
            className="flex items-center gap-2"
          >
            ← Zur Startseite
          </Button>
          {!isDemoMode() && (
            <>
              <Button 
                variant="outline" 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    window.location.href = '/admin';
                  }
                }}
                className="flex items-center gap-2"
              >
                Admin-Bereich
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    localStorage.removeItem('real_admin_mode');
                    window.location.href = '/';
                  }
                }}
                className="flex items-center gap-2"
              >
                Abmelden
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Mitglieder gesamt</p>
                <p className="text-2xl font-bold">{stats.totalMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Aktive Mitglieder</p>
                <p className="text-2xl font-bold">{stats.activeMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Offene Beiträge</p>
                <p className="text-2xl font-bold">{stats.openPayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Termine diese Woche</p>
                <p className="text-2xl font-bold">{stats.upcomingEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Link href="/mitglieder">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="h-8 w-8 text-blue-600" />
                <CardTitle>Mitgliederverwaltung</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Verwalten Sie alle Vereinsmitglieder, Kontaktdaten und Stammdaten.
              </p>
              <Button variant="outline" className="w-full">
                Mitglieder verwalten
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/beitraege">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CreditCard className="h-8 w-8 text-green-600" />
                <CardTitle>Beitragsverwaltung</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                SEPA-Lastschriften, Beitragskategorien und Zahlungsübersicht.
              </p>
              <Button variant="outline" className="w-full">
                Beiträge verwalten
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/schiessbook">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <BookOpen className="h-8 w-8 text-purple-600" />
                <CardTitle>Digitales Schießbuch</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Erfassen Sie Schussergebnisse und verfolgen Sie Trainingsfortschritte.
              </p>
              <Button variant="outline" className="w-full">
                Schießbuch öffnen
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/termine">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-yellow-600" />
                <CardTitle>Termine & Events</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Vereinskalender, Trainingszeiten und Wettkampfplanung.
              </p>
              <Button variant="outline" className="w-full">
                Termine verwalten
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/aufgaben">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <CheckSquare className="h-8 w-8 text-red-600" />
                <CardTitle>Aufgaben-Management</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                To-Do-Listen für den Vorstand, Aufgabenverteilung und Fortschritts-Tracking.
              </p>
              <Button variant="outline" className="w-full">
                Aufgaben verwalten
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/einstellungen">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Settings className="h-8 w-8 text-gray-600" />
                <CardTitle>Vereinseinstellungen</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                SEPA-Konfiguration, Beitragssätze und allgemeine Einstellungen.
              </p>
              <Button variant="outline" className="w-full">
                Einstellungen verwalten
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/ausbildungen">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <GraduationCap className="h-8 w-8 text-orange-600" />
                <CardTitle>Ausbildungen & Lizenzen</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Standaufsicht, Jugendlizenz, Schießsportleiter und weitere Qualifikationen.
              </p>
              <Button variant="outline" className="w-full">
                Ausbildungen verwalten
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full opacity-60">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600" />
              <CardTitle className="flex items-center gap-2">
                Inventar & Waffen
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Geplant</span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Waffenregister, Munitionsverwaltung und Vereinsinventar.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Geplant
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full opacity-60">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Zap className="h-8 w-8 text-purple-600" />
              <CardTitle className="flex items-center gap-2">
                Spenden & Sponsoren
                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">Geplant</span>
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Spendenverwaltung, Sponsoren und Zuwendungsbescheinigungen.
            </p>
            <Button variant="outline" className="w-full" disabled>
              Geplant
            </Button>
          </CardContent>
        </Card>

        <Link href="/schiessstand">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Target className="h-8 w-8 text-blue-600" />
                <CardTitle>Schießstand-Verwaltung</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Standaufsicht, Bahnen-Belegung und Sicherheitsprotokoll.
              </p>
              <Button variant="outline" className="w-full">
                Schießstand verwalten
              </Button>
            </CardContent>
          </Card>
        </Link>



        <Link href="/jubilaeen">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Award className="h-8 w-8 text-yellow-600" />
                <CardTitle>Geburtstage & Jubiläen</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Geburtstage, Vereinsjubiläen und Ehrungen verwalten.
              </p>
              <Button variant="outline" className="w-full">
                Jubiläen verwalten
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/startrechte">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Trophy className="h-8 w-8 text-gold-600" />
                <CardTitle>Startrechte & Lizenzen</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Wettkampf-Startberechtigungen, DSB-Lizenzen und Zweitvereine.
              </p>
              <Button variant="outline" className="w-full">
                Startrechte verwalten
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/dienstplaene">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Calendar className="h-8 w-8 text-indigo-600" />
                <CardTitle>Dienstpläne</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Standaufsicht, Küchendienst und Reinigungspläne verwalten.
              </p>
              <Button variant="outline" className="w-full">
                Dienstpläne verwalten
              </Button>
            </CardContent>
          </Card>
        </Link>

        <Link href="/protokolle">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="flex items-center gap-3">
                <FileText className="h-8 w-8 text-green-600" />
                <CardTitle>Protokoll-System</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Digitale Protokolle, Wahlen und Satzungsverwaltung.
              </p>
              <Button variant="outline" className="w-full">
                Protokolle verwalten
              </Button>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Feature-Ideensammlungen */}
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Geplante Features & Ideen</h2>
        
        {/* Termine & Events */}
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800 flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Termine & Events - Ideensammlung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <div>
                <h4 className="font-semibold mb-2">🎯 Schießsport-spezifisch:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Wettkampfkalender mit DSB-Integration</li>
                  <li>Trainingszeiten nach Disziplinen</li>
                  <li>Standaufsichts-Dienstpläne</li>
                  <li>Schießleiter-Einteilung</li>
                  <li>Munitions-Bestelltermine</li>
                  <li>Waffenprüfungen & TÜV-Termine</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🏛️ Vereinsorganisation:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Jahreshauptversammlung planen</li>
                  <li>Vorstandssitzungen</li>
                  <li>Vereinsfeste & Schützenfeste</li>
                  <li>Königsschießen & Pokale</li>
                  <li>Jugendtraining & Ferienaktionen</li>
                  <li>Wartungstermine Schießstand</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Vereinseinstellungen */}
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader>
            <CardTitle className="text-gray-800 flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Vereinseinstellungen - Ideensammlung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <h4 className="font-semibold mb-2">💰 Finanzen & SEPA:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Beitragssätze nach Altersgruppen</li>
                  <li>Familienbeiträge & Ermäßigungen</li>
                  <li>SEPA-Mandate verwalten</li>
                  <li>Bankverbindungen konfigurieren</li>
                  <li>Mahnwesen automatisieren</li>
                  <li>Kassenprüfung vorbereiten</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⚙️ Vereinskonfiguration:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Vereinsdaten & Satzung hinterlegen</li>
                  <li>Vorstandsrollen definieren</li>
                  <li>Benutzerrechte verwalten</li>
                  <li>E-Mail-Templates anpassen</li>
                  <li>Datenschutz-Einstellungen</li>
                  <li>Backup & Export-Funktionen</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Schießstand-Verwaltung */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Target className="h-6 w-6" />
              Schießstand-Verwaltung - Ideensammlung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h4 className="font-semibold mb-2">🔒 Sicherheit & Recht:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Standaufsichts-Protokolle digital</li>
                  <li>Sicherheitsbelehrungen dokumentieren</li>
                  <li>Unfallmeldungen & Erste Hilfe</li>
                  <li>Waffenrechtliche Kontrollen</li>
                  <li>Munitionsverbrauch erfassen</li>
                  <li>Betriebszeiten überwachen</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎯 Betrieb & Wartung:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Bahnen-Belegungsplan</li>
                  <li>Wartungsintervalle planen</li>
                  <li>Lüftungsanlage überwachen</li>
                  <li>Kugelfang-Zustand dokumentieren</li>
                  <li>Beleuchtung & Technik prüfen</li>
                  <li>Reinigungsplan erstellen</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Protokoll-System */}
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Protokoll-System - Ideensammlung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <h4 className="font-semibold mb-2">📋 Vereinsrecht & Protokolle:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>JHV-Protokolle rechtssicher erstellen</li>
                  <li>Vorstandssitzungen dokumentieren</li>
                  <li>Wahlen digital durchführen</li>
                  <li>Beschlüsse verwalten & nachverfolgen</li>
                  <li>Satzungsänderungen dokumentieren</li>
                  <li>Mitgliederversammlungen planen</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⚖️ Rechtliche Aspekte:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Vereinsregister-Anmeldungen</li>
                  <li>Gemeinnützigkeit dokumentieren</li>
                  <li>Datenschutz-Einverständnisse</li>
                  <li>Versicherungsangelegenheiten</li>
                  <li>Steuerliche Nachweise</li>
                  <li>Behördliche Meldungen</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Erweiterte Vereinsfeatures (SPG Verein, WISO, David21)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
              <div>
                <h4 className="font-semibold mb-2">💰 Finanzen & Spenden:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Spendenverwaltung mit Zuwendungsbescheinigungen</li>
                  <li>Sponsoren-Management</li>
                  <li>Familien-Mitgliedschaften</li>
                  <li>Beitragsbefreiungen verwalten</li>
                  <li>Mahnwesen automatisiert</li>
                  <li>Kassenbuch digital</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔫 Schießsport-spezifisch:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Waffenregister & Munitionsverwaltung</li>
                  <li>Inventar-Management (Ausrüstung)</li>
                  <li>Wettkampf-Anmeldungen</li>
                  <li>Mannschafts-Aufstellungen</li>
                  <li>Gastschützen-Verwaltung</li>
                  <li>DSB-Schnittstelle</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-teal-50 border-teal-200">
          <CardHeader>
            <CardTitle className="text-teal-800 flex items-center gap-2">
              <Trophy className="h-6 w-6" />
              Wettkampf & Startrechte (Schießsport-spezifisch)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-teal-700">
              <div>
                <h4 className="font-semibold mb-2">🏆 Startberechtigungen:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>DSB-Lizenz Verwaltung (A/B/C-Lizenz)</li>
                  <li>Zweitverein-Startrechte</li>
                  <li>Altersklassen automatisch berechnen</li>
                  <li>Gastschützen-Verwaltung</li>
                  <li>Wettkampf-Anmeldungen</li>
                  <li>Mannschafts-Aufstellungen</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎯 Disziplinen & Klassen:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Luftgewehr/Luftpistole 10m</li>
                  <li>Kleinkaliber 50m/100m</li>
                  <li>Großkaliber 100m/300m</li>
                  <li>Bogen & Armbrust</li>
                  <li>Jugend/Schützen/Senioren-Klassen</li>
                  <li>Damen/Herren Kategorien</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-indigo-50 border-indigo-200">
          <CardHeader>
            <CardTitle className="text-indigo-800 flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Dienstpläne & Organisation (Wichtig für Schützenvereine)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-indigo-700">
              <div>
                <h4 className="font-semibold mb-2">🛡️ Standaufsicht & Sicherheit:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Standaufsichts-Dienstpläne</li>
                  <li>Qualifikations-Prüfung (Standaufsicht-Lizenz)</li>
                  <li>Schießleiter-Einteilung</li>
                  <li>Vertretungsregelungen</li>
                  <li>Sicherheitsprotokoll-Integration</li>
                  <li>Notfall-Kontakte</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🍽️ Küche & Reinigung:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Küchendienst für Vereinsabende</li>
                  <li>Reinigungspläne (Schießstand, Vereinsheim)</li>
                  <li>Großputz-Aktionen</li>
                  <li>Tauschbörse für Dienste</li>
                  <li>Automatische E-Mail-Erinnerungen</li>
                  <li>Faire Verteilung über das Jahr</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

    </div>
  );
}