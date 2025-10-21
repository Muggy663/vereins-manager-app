'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, CreditCard, Calendar, BookOpen, Settings, CheckSquare } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Verein-im-Visier</h1>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Anmelden</Button>
              <Button>Registrieren</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Die digitale <span className="text-blue-600">Vereinsverwaltung</span> mit dem Schießsport im Fokus
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Komplette Vereinsverwaltung mit Mitgliederdatenbank, SEPA-Beitragsverwaltung, 
              digitalem Schießbuch und allen Funktionen für professionelle Schützenvereine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="text-lg px-8 py-3">
                <Users className="mr-2 h-5 w-5" />
                Verein verwalten
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-3">
                Demo ansehen
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Alles für Ihren Schützenverein
            </h2>
            <p className="text-lg text-gray-600">
              Von der Mitgliederverwaltung bis zum digitalen Schießbuch - eine Software für alle Bedürfnisse
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Users className="h-12 w-12 text-blue-600 mb-4" />
                <CardTitle>Mitgliederverwaltung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Vollständige Mitgliederdatenbank mit Kontaktdaten, Geburtstagen, 
                  Jubiläen und automatischer Altersberechnung.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <CreditCard className="h-12 w-12 text-green-600 mb-4" />
                <CardTitle>SEPA-Beitragsverwaltung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Automatische SEPA-Lastschriften, Beitragskategorien, Mahnwesen 
                  und Export für alle deutschen Banken.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <BookOpen className="h-12 w-12 text-purple-600 mb-4" />
                <CardTitle>Digitales Schießbuch</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Erfassen Sie Schussergebnisse digital, verfolgen Sie Fortschritte 
                  und erstellen Sie automatische Auswertungen.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Calendar className="h-12 w-12 text-yellow-600 mb-4" />
                <CardTitle>Termine & Events</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Vereinskalender, Wettkampfplanung, Trainingszeiten und 
                  automatische Erinnerungen für alle Mitglieder.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <CheckSquare className="h-12 w-12 text-red-600 mb-4" />
                <CardTitle>Aufgaben-Management</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Vereinsaufgaben, To-Do-Listen für den Vorstand und 
                  Aufgabenverteilung mit Fälligkeitsdaten.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <Settings className="h-12 w-12 text-gray-600 mb-4" />
                <CardTitle>Vereinsrecht & Protokolle</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Digitale Protokolle, Wahlen, Satzungsverwaltung und 
                  Aufgaben-Management für den Vorstand.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Migration Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Migration aus der RWK Einbeck App
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Bereits RWK App Nutzer? Übernehmen Sie alle Vereinsdaten automatisch. 
            Mitglieder, SEPA-Daten und Einstellungen werden nahtlos migriert.
          </p>
          <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
            Daten migrieren
          </Button>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Transparente Preise für jeden Verein
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Basis</CardTitle>
                <div className="text-3xl font-bold text-blue-600">Kostenlos</div>
                <p className="text-gray-600">Für kleine Vereine</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Bis 50 Mitglieder</li>
                  <li>✓ Grundfunktionen</li>
                  <li>✓ Digitales Schießbuch</li>
                  <li>✓ E-Mail Support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">Beliebt</span>
              </div>
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Professional</CardTitle>
                <div className="text-3xl font-bold text-blue-600">15€<span className="text-lg">/Monat</span></div>
                <p className="text-gray-600">Für aktive Vereine</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Unbegrenzte Mitglieder</li>
                  <li>✓ SEPA-Lastschrift</li>
                  <li>✓ Wettkampf-Management</li>
                  <li>✓ Prioritäts-Support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="text-3xl font-bold text-blue-600">Individuell</div>
                <p className="text-gray-600">Für Kreisverbände</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>✓ Multi-Verein-Management</li>
                  <li>✓ API-Zugang</li>
                  <li>✓ Custom Features</li>
                  <li>✓ Persönlicher Support</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-6 w-6" />
                <span className="font-bold text-lg">Verein-im-Visier</span>
              </div>
              <p className="text-gray-400">
                Moderne Vereinssoftware für deutsche Schützenvereine
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Funktionen</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Mitgliederverwaltung</li>
                <li>SEPA-Beiträge</li>
                <li>Digitales Schießbuch</li>
                <li>Aufgaben-Management</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Dokumentation</li>
                <li>Migration</li>
                <li>Kontakt</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Rechtliches</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Impressum</li>
                <li>Datenschutz</li>
                <li>AGB</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Verein-im-Visier. Speziell für deutsche Schützenvereine entwickelt.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}