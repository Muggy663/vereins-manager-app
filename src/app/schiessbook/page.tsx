"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, Calendar, TrendingUp, Award, Users } from 'lucide-react';

export default function SchiessBookPage() {
  const [entries, setEntries] = useState([
    {
      id: '1',
      date: '2024-01-15',
      discipline: 'Luftgewehr 10m',
      shots: 40,
      rings: 385,
      teiler: 12,
      location: 'Schießstand Einbeck',
      supervisor: 'Max Mustermann',
      notes: 'Gute Konzentration, Atmung verbessert',
      isCompetition: false
    },
    {
      id: '2', 
      date: '2024-01-20',
      discipline: 'Luftgewehr 10m',
      shots: 40,
      rings: 392,
      teiler: 15,
      location: 'Schießstand Einbeck',
      supervisor: 'Anna Schmidt',
      notes: 'Neuer persönlicher Rekord!',
      isCompetition: true
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const avgRings = entries.length > 0 ? 
    (entries.reduce((sum, e) => sum + e.rings, 0) / entries.length).toFixed(1) : 0;

  return (
    <div className="w-full px-2 md:px-4 py-4 md:py-8">
      <div className="mb-4 md:mb-8">
        <div className="flex items-center mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.history.back()}
            className="mr-4"
          >
            ← Zurück
          </Button>
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-primary">🎯 Digitales Schießbuch</h1>
        </div>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
          Persönliches Schießbuch für Trainingsfortschritte
        </p>
      </div>

      {/* Statistiken */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">{entries.length}</div>
            <p className="text-sm text-gray-600">Einträge</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">{avgRings}</div>
            <p className="text-sm text-gray-600">Ø Ringe</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {entries.filter(e => e.isCompetition).length}
            </div>
            <p className="text-sm text-gray-600">Wettkämpfe</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-600">
              {Math.max(...entries.map(e => e.rings), 0)}
            </div>
            <p className="text-sm text-gray-600">Bestes Ergebnis</p>
          </CardContent>
        </Card>
      </div>

      {/* Aktionen */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex gap-3">
            <Button onClick={() => setShowAddForm(!showAddForm)}>
              <Plus className="h-4 w-4 mr-2" />
              Neuer Eintrag
            </Button>
            <Button variant="outline">
              <TrendingUp className="h-4 w-4 mr-2" />
              Statistiken
            </Button>
            <Button variant="outline">
              <Award className="h-4 w-4 mr-2" />
              Fortschritte
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Einträge */}
      <Card>
        <CardHeader>
          <CardTitle>Schießbuch-Einträge</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {entries.map(entry => (
              <Card key={entry.id} className="border">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{entry.discipline}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(entry.date).toLocaleDateString('de-DE')} • {entry.location}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant={entry.isCompetition ? 'default' : 'outline'}>
                        {entry.isCompetition ? 'Wettkampf' : 'Training'}
                      </Badge>
                      <Badge variant="secondary">
                        {entry.rings} Ringe
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Schuss:</span>
                      <span className="ml-2 font-medium">{entry.shots}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Teiler:</span>
                      <span className="ml-2 font-medium">{entry.teiler}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Aufsicht:</span>
                      <span className="ml-2 font-medium">{entry.supervisor}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Schnitt:</span>
                      <span className="ml-2 font-medium">{(entry.rings / entry.shots).toFixed(1)}</span>
                    </div>
                  </div>
                  
                  {entry.notes && (
                    <div className="mt-3 p-3 bg-gray-50 rounded">
                      <p className="text-sm">{entry.notes}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Feature-Ideen */}
      <div className="mt-8 space-y-6">
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800">🎯 Schießsport Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h4 className="font-semibold mb-2">🏹 Disziplinen & Training:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Luftgewehr 10m (Auflage/Freihand)</li>
                  <li>Luftpistole 10m</li>
                  <li>Kleinkaliber 50m (liegend/stehend)</li>
                  <li>Großkaliber 100m/300m</li>
                  <li>Bogen & Armbrust</li>
                  <li>Trainingsempfehlungen basierend auf Ergebnissen</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📊 Auswertungen & Statistiken:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Leistungsentwicklung grafisch</li>
                  <li>Vergleich mit Vereinskameraden</li>
                  <li>Saisonstatistiken</li>
                  <li>Wettkampf vs. Training</li>
                  <li>Schussgruppen-Analyse</li>
                  <li>Munitionsverbrauch</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800">⚖️ Deutsches Waffenrecht & Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-red-700">
              <div>
                <h4 className="font-semibold mb-2">📋 Rechtliche Dokumentation:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>WBK-Nummern & Gültigkeitsdaten erfassen</li>
                  <li>Waffenbesitzkarten-Verwaltung</li>
                  <li>Munitionserwerbsscheine dokumentieren</li>
                  <li>Sachkunde-Nachweise verwalten</li>
                  <li>Vereinsmitgliedschaft für WBK bestätigen</li>
                  <li>Schießnachweis für Behörden generieren</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔒 Sicherheit & Kontrolle:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Mindestschusszahl (18 Schuss/Jahr) überwachen</li>
                  <li>Waffenrechtliche Zuverlässigkeit dokumentieren</li>
                  <li>Sicherheitsbelehrungen protokollieren</li>
                  <li>Unfallmeldungen an Behörden</li>
                  <li>Standaufsicht-Protokolle</li>
                  <li>Munitionskontrolle & Lagerung</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800">🏆 Wettkämpfe & Abzeichen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <h4 className="font-semibold mb-2">🥇 Leistungsabzeichen:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>DSB-Leistungsabzeichen (Bronze/Silber/Gold)</li>
                  <li>Landesverband-Abzeichen</li>
                  <li>Schützenschnur-Qualifikationen</li>
                  <li>Jugend-Leistungsabzeichen</li>
                  <li>Automatische Abzeichen-Erkennung</li>
                  <li>Urkunden-Generator</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎯 Wettkampf-Integration:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>DSB-Wettkampf Import/Export</li>
                  <li>Landesliga-Ergebnisse</li>
                  <li>Vereinsmeisterschaften</li>
                  <li>Königsschießen & Pokale</li>
                  <li>Mannschafts-Aufstellungen</li>
                  <li>Startgeld-Abrechnung</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800">👥 Vereins-Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
              <div>
                <h4 className="font-semibold mb-2">👨‍🏫 Trainer & Jugend:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Trainer-Dashboard für alle Schützen</li>
                  <li>Jugendtraining-Protokolle</li>
                  <li>Eltern-Benachrichtigungen</li>
                  <li>Trainingsgruppen verwalten</li>
                  <li>Fortschritts-Reports</li>
                  <li>Sicherheitsschulungen dokumentieren</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📱 Digitale Features:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Mobile App für Schützen</li>
                  <li>QR-Code Schießbuch-Zugang</li>
                  <li>Offline-Modus für Schießstand</li>
                  <li>Foto-Upload von Scheiben</li>
                  <li>Sprachnotizen für Training</li>
                  <li>Social Features (Vereins-Feed)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}