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
              <Button variant="outline" onClick={() => window.location.href = '/login'}>Anmelden</Button>
              <Button onClick={() => window.location.href = '/register'}>Registrieren</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Demo Notice */}
      <section className="bg-gradient-to-r from-green-500 to-blue-600 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="text-lg font-semibold">🎯 Live-Demo verfügbar</span>
            <span className="text-sm opacity-90">Testen Sie alle Funktionen ohne Anmeldung</span>
            <Button 
              variant="outline" 
              size="sm" 
              className="bg-white text-blue-600 hover:bg-gray-100 border-white"
              onClick={() => window.location.href = '/dashboard'}
            >
              Demo starten
            </Button>
          </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              🏆 Speziell für deutsche Schützenvereine entwickelt
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="text-blue-600">Verein-im-Visier</span><br/>
              <span className="text-4xl text-gray-700">Die moderne Vereinssoftware</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Komplette digitale Lösung für Schützenvereine: Mitgliederverwaltung, SEPA-Beiträge, 
              digitales Schießbuch, Dienstpläne und Vereinsorganisation – alles in einer App.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="text-lg px-10 py-4 bg-blue-600 hover:bg-blue-700" onClick={() => window.location.href = '/dashboard'}>
                🎯 Live-Demo starten
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-10 py-4 border-2" onClick={() => window.location.href = '/register'}>
                Kostenlos registrieren
              </Button>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              ✓ Keine Installation • ✓ DSGVO-konform • ✓ Sofort einsatzbereit
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🎯 Alles für Ihren Schützenverein
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professionelle Vereinsverwaltung mit allen Funktionen, die Schützenvereine wirklich brauchen.
              Entwickelt von Vereinsmitgliedern für Vereinsmitglieder.
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

      {/* Schießsport-spezifische Features */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              🎯 Speziell für den Schießsport
            </h2>
            <p className="text-xl text-gray-600">
              Funktionen, die andere Vereinssoftware nicht bietet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center p-6 border-2 hover:border-blue-300 transition-colors">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="font-bold mb-2">Startrechte & Lizenzen</h3>
              <p className="text-sm text-gray-600">DSB-Lizenzen, Zweitvereine, Altersklassen automatisch</p>
            </Card>
            
            <Card className="text-center p-6 border-2 hover:border-blue-300 transition-colors">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="font-bold mb-2">Standaufsicht</h3>
              <p className="text-sm text-gray-600">Dienstpläne, Qualifikationen, Sicherheitsprotokolle</p>
            </Card>
            
            <Card className="text-center p-6 border-2 hover:border-blue-300 transition-colors">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="font-bold mb-2">Schießbuch Digital</h3>
              <p className="text-sm text-gray-600">Ergebnisse erfassen, Statistiken, Fortschrittsverfolgung</p>
            </Card>
            
            <Card className="text-center p-6 border-2 hover:border-blue-300 transition-colors">
              <div className="text-4xl mb-4">📅</div>
              <h3 className="font-bold mb-2">Dienstpläne</h3>
              <p className="text-sm text-gray-600">Küchendienst, Reinigung, automatische Einteilung</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials / Vorteile */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-12">
              Warum Vereine auf Verein-im-Visier setzen
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6">
                <div className="text-5xl mb-4">⏱️</div>
                <h3 className="text-xl font-bold mb-3">Zeit sparen</h3>
                <p className="text-gray-600">
                  Automatische SEPA-Lastschriften, digitale Protokolle und 
                  intelligente Erinnerungen reduzieren den Verwaltungsaufwand um 70%.
                </p>
              </div>
              
              <div className="p-6">
                <div className="text-5xl mb-4">🔒</div>
                <h3 className="text-xl font-bold mb-3">DSGVO-sicher</h3>
                <p className="text-gray-600">
                  Deutsche Server, vollständige DSGVO-Konformität und 
                  sichere Datenverschlüsselung für alle Vereinsdaten.
                </p>
              </div>
              
              <div className="p-6">
                <div className="text-5xl mb-4">🚀</div>
                <h3 className="text-xl font-bold mb-3">Sofort startklar</h3>
                <p className="text-gray-600">
                  Keine Installation, keine Schulung nötig. 
                  Importieren Sie bestehende Daten und legen Sie direkt los.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Bereit für die digitale Vereinsverwaltung?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Testen Sie alle Funktionen kostenlos in unserer Live-Demo oder 
            registrieren Sie sich für Ihren Verein.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="text-lg px-10 py-4 bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => window.location.href = '/dashboard'}
            >
              🎯 Live-Demo starten
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-lg px-10 py-4 border-2 border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() => window.location.href = '/register'}
            >
              Jetzt registrieren
            </Button>
          </div>
        </div>
      </section>

      {/* Pricing - Auskommentiert während Entwicklung
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Transparente Preise für jeden Verein
            </h2>
          </div>
        </div>
      </section>
      */}

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
                Die moderne Vereinssoftware für deutsche Schützenvereine.
                Entwickelt von Vereinsmitgliedern für Vereinsmitglieder.
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
                <li><a href="/impressum" className="hover:text-white">Impressum</a></li>
                <li><a href="/datenschutz" className="hover:text-white">Datenschutz</a></li>
                <li>AGB</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Verein-im-Visier by KSV Einbeck. Speziell für deutsche Schützenvereine entwickelt.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}