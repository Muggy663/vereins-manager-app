"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Target, Users, Clock, Trophy, Wrench } from 'lucide-react';

export default function TerminePage() {
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
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-primary">📅 Termine & Events</h1>
        </div>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
          Vereinskalender, Trainingszeiten und Wettkampfplanung
        </p>
      </div>

      <div className="space-y-6">
        <Card className="bg-yellow-50 border-yellow-200">
          <CardHeader>
            <CardTitle className="text-yellow-800 flex items-center gap-2">
              <Calendar className="h-6 w-6" />
              Schießsport-spezifische Termine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-yellow-700">
              <div>
                <h4 className="font-semibold mb-2">🎯 Wettkämpfe & Training:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Wettkampfkalender mit DSB-Integration</li>
                  <li>Trainingszeiten nach Disziplinen</li>
                  <li>Ligawettkämpfe koordinieren</li>
                  <li>Vereinsmeisterschaften planen</li>
                  <li>Pokalturniere organisieren</li>
                  <li>Jugendwettkämpfe betreuen</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🛡️ Sicherheit & Aufsicht:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Standaufsichts-Dienstpläne</li>
                  <li>Schießleiter-Einteilung</li>
                  <li>Sicherheitsbelehrungen terminieren</li>
                  <li>Waffenprüfungen & TÜV-Termine</li>
                  <li>Munitions-Bestelltermine</li>
                  <li>Wartungstermine Schießstand</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Users className="h-6 w-6" />
              Vereinsorganisation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h4 className="font-semibold mb-2">🏛️ Offizielle Termine:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Jahreshauptversammlung planen</li>
                  <li>Vorstandssitzungen terminieren</li>
                  <li>Mitgliederversammlungen</li>
                  <li>Kassenprüfung organisieren</li>
                  <li>Wahlen vorbereiten</li>
                  <li>Behördliche Termine</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🎉 Vereinsfeste & Events:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Schützenfest organisieren</li>
                  <li>Königsschießen planen</li>
                  <li>Weihnachtsfeier vorbereiten</li>
                  <li>Vereinsausflüge organisieren</li>
                  <li>Grillabende & gesellige Runden</li>
                  <li>Ehrungen & Jubiläen planen</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Clock className="h-6 w-6" />
              Digitale Terminverwaltung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <h4 className="font-semibold mb-2">📱 Smart Features:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Kalender-Integration (Google, Outlook)</li>
                  <li>Automatische Erinnerungen</li>
                  <li>Push-Benachrichtigungen</li>
                  <li>Teilnehmer-Management</li>
                  <li>Raumbuchung & Ressourcen</li>
                  <li>Konflikt-Erkennung</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔄 Automatisierung:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Wiederkehrende Termine</li>
                  <li>Vorlagen für Standard-Events</li>
                  <li>Einladungen automatisch versenden</li>
                  <li>Anwesenheitslisten generieren</li>
                  <li>Protokoll-Vorlagen erstellen</li>
                  <li>Nachbereitung-Checklisten</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}