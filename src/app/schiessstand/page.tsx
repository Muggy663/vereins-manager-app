"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target, Shield, Wrench, Clock, AlertTriangle, Users } from 'lucide-react';

export default function SchiessstandPage() {
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
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-primary">🎯 Schießstand-Verwaltung</h1>
        </div>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
          Standaufsicht, Bahnen-Belegung und Sicherheitsprotokoll
        </p>
      </div>

      <div className="space-y-6">
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-800 flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Sicherheit & Recht
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-red-700">
              <div>
                <h4 className="font-semibold mb-2">🛡️ Sicherheitsmanagement:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Standaufsichts-Protokolle digital</li>
                  <li>Sicherheitsbelehrungen dokumentieren</li>
                  <li>Unfallmeldungen & Erste Hilfe</li>
                  <li>Notfall-Prozeduren verwalten</li>
                  <li>Sicherheitsschulungen planen</li>
                  <li>Schutzausrüstung überwachen</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⚖️ Waffenrechtliche Kontrollen:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>WBK-Kontrollen dokumentieren</li>
                  <li>Munitionsverbrauch erfassen</li>
                  <li>Waffenliste führen</li>
                  <li>Behördliche Prüfungen</li>
                  <li>Lagerungskontrollen</li>
                  <li>Meldepflichten überwachen</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Target className="h-6 w-6" />
              Betrieb & Belegung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h4 className="font-semibold mb-2">🎯 Bahnen-Management:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Bahnen-Belegungsplan</li>
                  <li>Reservierungssystem</li>
                  <li>Disziplinen-Zuordnung</li>
                  <li>Trainingsgruppen verwalten</li>
                  <li>Wettkampf-Belegungen</li>
                  <li>Gäste-Schießen organisieren</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">⏰ Betriebszeiten:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Öffnungszeiten verwalten</li>
                  <li>Saisonale Anpassungen</li>
                  <li>Feiertags-Regelungen</li>
                  <li>Sonderöffnungen</li>
                  <li>Schließzeiten dokumentieren</li>
                  <li>Nutzungsstatistiken</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <Wrench className="h-6 w-6" />
              Wartung & Technik
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <h4 className="font-semibold mb-2">🔧 Wartungsmanagement:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Wartungsintervalle planen</li>
                  <li>Lüftungsanlage überwachen</li>
                  <li>Kugelfang-Zustand dokumentieren</li>
                  <li>Beleuchtung & Technik prüfen</li>
                  <li>Reinigungsplan erstellen</li>
                  <li>Reparatur-Protokolle</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📋 Technische Überwachung:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>TÜV-Termine verwalten</li>
                  <li>Prüfberichte archivieren</li>
                  <li>Mängellisten führen</li>
                  <li>Ersatzteil-Verwaltung</li>
                  <li>Energieverbrauch monitoren</li>
                  <li>Umweltauflagen beachten</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <Users className="h-6 w-6" />
              Personal & Organisation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
              <div>
                <h4 className="font-semibold mb-2">👨‍🏫 Standaufsicht:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Dienstpläne erstellen</li>
                  <li>Qualifikationen überwachen</li>
                  <li>Vertretungsregelungen</li>
                  <li>Schulungen organisieren</li>
                  <li>Arbeitszeit erfassen</li>
                  <li>Vergütung verwalten</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📱 Digitale Verwaltung:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>QR-Code Zugangskontrollen</li>
                  <li>Mobile Protokoll-Apps</li>
                  <li>Automatische Meldungen</li>
                  <li>Dashboard für Standleitung</li>
                  <li>Statistiken & Reports</li>
                  <li>Integration mit Vereinssoftware</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}