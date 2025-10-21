"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Users, Shield, ChefHat, Trash2 as Broom, Plus, Edit } from 'lucide-react';

export default function DienstplaenePage() {
  const [activeTab, setActiveTab] = useState('standaufsicht');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const dienstplaene = {
    standaufsicht: [
      { datum: '2025-01-04', zeit: '09:00-12:00', person: 'Max Mustermann', status: 'besetzt' },
      { datum: '2025-01-04', zeit: '12:00-15:00', person: 'Anna Schmidt', status: 'besetzt' },
      { datum: '2025-01-05', zeit: '09:00-12:00', person: '', status: 'offen' },
      { datum: '2025-01-05', zeit: '12:00-15:00', person: 'Peter Fischer', status: 'besetzt' }
    ],
    kueche: [
      { datum: '2025-01-10', event: 'Vereinsabend', person: 'Lisa Wagner', helfer: 'Maria Müller', status: 'besetzt' },
      { datum: '2025-01-17', event: 'Jugendtraining', person: '', helfer: '', status: 'offen' },
      { datum: '2025-01-24', event: 'Wettkampf', person: 'Hans Meier', helfer: '', status: 'teilweise' }
    ],
    reinigung: [
      { datum: '2025-01-06', bereich: 'Schießstand', person: 'Team A (Mustermann, Schmidt)', status: 'besetzt' },
      { datum: '2025-01-13', bereich: 'Vereinsheim', person: '', status: 'offen' },
      { datum: '2025-01-20', bereich: 'Schießstand', person: 'Team B (Fischer, Wagner)', status: 'besetzt' },
      { datum: '2025-01-27', bereich: 'Komplett', person: 'Alle Mitglieder', status: 'großputz' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'besetzt': return 'default';
      case 'offen': return 'destructive';
      case 'teilweise': return 'secondary';
      case 'großputz': return 'outline';
      default: return 'outline';
    }
  };

  const months = [
    'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
    'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
  ];

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
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-primary">📅 Dienstpläne</h1>
        </div>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
          Standaufsicht, Küchendienst und Reinigungspläne verwalten
        </p>
      </div>

      {/* Monats-/Jahresauswahl */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="border rounded px-3 py-2"
            >
              {months.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
              className="border rounded px-3 py-2"
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Neuer Dienst
            </Button>
            <Button variant="outline">
              📧 Erinnerungen senden
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex border-b overflow-x-auto">
          <button
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'standaufsicht'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('standaufsicht')}
          >
            <Shield className="h-4 w-4" />
            Standaufsicht
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'kueche'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('kueche')}
          >
            <ChefHat className="h-4 w-4" />
            Küchendienst
          </button>
          <button
            className={`px-4 py-2 font-medium text-sm whitespace-nowrap flex items-center gap-2 ${
              activeTab === 'reinigung'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('reinigung')}
          >
            <Broom className="h-4 w-4" />
            Reinigung
          </button>
        </div>
      </div>

      {/* Standaufsicht */}
      {activeTab === 'standaufsicht' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Standaufsicht {months[selectedMonth]} {selectedYear}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dienstplaene.standaufsicht.map((dienst, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">
                          {new Date(dienst.datum).toLocaleDateString('de-DE', { 
                            weekday: 'long', 
                            day: '2-digit', 
                            month: '2-digit' 
                          })}
                        </h3>
                        <p className="text-sm text-muted-foreground">{dienst.zeit}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-medium">{dienst.person || 'Nicht besetzt'}</p>
                          <Badge variant={getStatusColor(dienst.status)}>
                            {dienst.status === 'besetzt' ? 'Besetzt' : 'Offen'}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Küchendienst */}
      {activeTab === 'kueche' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ChefHat className="h-5 w-5" />
              Küchendienst {months[selectedMonth]} {selectedYear}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dienstplaene.kueche.map((dienst, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">
                          {new Date(dienst.datum).toLocaleDateString('de-DE', { 
                            weekday: 'long', 
                            day: '2-digit', 
                            month: '2-digit' 
                          })}
                        </h3>
                        <p className="text-sm text-muted-foreground">{dienst.event}</p>
                        <div className="mt-2 space-y-1">
                          <p className="text-sm">
                            <strong>Küchenchef:</strong> {dienst.person || 'Nicht besetzt'}
                          </p>
                          <p className="text-sm">
                            <strong>Helfer:</strong> {dienst.helfer || 'Nicht besetzt'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getStatusColor(dienst.status)}>
                          {dienst.status === 'besetzt' ? 'Vollständig' : 
                           dienst.status === 'teilweise' ? 'Teilweise' : 'Offen'}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reinigung */}
      {activeTab === 'reinigung' && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Broom className="h-5 w-5" />
              Reinigungsplan {months[selectedMonth]} {selectedYear}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dienstplaene.reinigung.map((dienst, index) => (
                <Card key={index} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold">
                          {new Date(dienst.datum).toLocaleDateString('de-DE', { 
                            weekday: 'long', 
                            day: '2-digit', 
                            month: '2-digit' 
                          })}
                        </h3>
                        <p className="text-sm text-muted-foreground">{dienst.bereich}</p>
                        <p className="text-sm mt-1">{dienst.person || 'Nicht besetzt'}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge variant={getStatusColor(dienst.status)}>
                          {dienst.status === 'besetzt' ? 'Besetzt' : 
                           dienst.status === 'großputz' ? 'Großputz' : 'Offen'}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Feature-Ideen */}
      <Card className="mt-8 bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">💡 Dienstplan-Features</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
            <div>
              <h4 className="font-semibold mb-2">🔄 Automatisierung:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Automatische Einteilung nach Verfügbarkeit</li>
                <li>E-Mail-Erinnerungen 3 Tage vorher</li>
                <li>SMS-Benachrichtigungen</li>
                <li>Tauschbörse für Dienste</li>
                <li>Urlaubsplanung berücksichtigen</li>
                <li>Faire Verteilung über das Jahr</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📋 Verwaltung:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Qualifikationen berücksichtigen (Standaufsicht)</li>
                <li>Präferenzen der Mitglieder</li>
                <li>Ausfall-Vertretungen</li>
                <li>Statistiken über geleistete Dienste</li>
                <li>Export für Aushang</li>
                <li>Mobile App für Mitglieder</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}