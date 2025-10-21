"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Vote, Scale, Archive, Users, Shield } from 'lucide-react';

export default function ProtokolleSeite() {
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
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-primary">📋 Protokoll-System</h1>
        </div>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
          Digitale Protokolle, Wahlen und Satzungsverwaltung
        </p>
      </div>

      <div className="space-y-6">
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <FileText className="h-6 w-6" />
              Vereinsrecht & Protokolle
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <h4 className="font-semibold mb-2">📋 Protokoll-Management:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>JHV-Protokolle rechtssicher erstellen</li>
                  <li>Vorstandssitzungen dokumentieren</li>
                  <li>Mitgliederversammlungen protokollieren</li>
                  <li>Ausschusssitzungen verwalten</li>
                  <li>Protokoll-Templates verwenden</li>
                  <li>Automatische Nummerierung</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">✅ Beschlüsse & Nachverfolgung:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Beschlüsse verwalten & nachverfolgen</li>
                  <li>Abstimmungsergebnisse dokumentieren</li>
                  <li>To-Do-Listen aus Protokollen</li>
                  <li>Umsetzungsstatus überwachen</li>
                  <li>Fristen & Deadlines verwalten</li>
                  <li>Verantwortlichkeiten zuweisen</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Vote className="h-6 w-6" />
              Wahlen & Abstimmungen
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h4 className="font-semibold mb-2">🗳️ Digitale Wahlen:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Wahlen digital durchführen</li>
                  <li>Kandidaten-Verwaltung</li>
                  <li>Geheime Abstimmungen</li>
                  <li>Wahlberechtigung prüfen</li>
                  <li>Stimmauszählung automatisch</li>
                  <li>Wahlergebnisse dokumentieren</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📊 Abstimmungs-Management:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Anträge verwalten</li>
                  <li>Abstimmungsverfahren definieren</li>
                  <li>Quorum-Überwachung</li>
                  <li>Enthaltungen & Gegenstimmen</li>
                  <li>Satzungsänderungen verfolgen</li>
                  <li>Rechtsgültige Dokumentation</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <Scale className="h-6 w-6" />
              Rechtliche Aspekte
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
              <div>
                <h4 className="font-semibold mb-2">⚖️ Vereinsrecht:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Satzungsänderungen dokumentieren</li>
                  <li>Vereinsregister-Anmeldungen</li>
                  <li>Gemeinnützigkeit dokumentieren</li>
                  <li>Rechtliche Fristen überwachen</li>
                  <li>Haftungsausschlüsse verwalten</li>
                  <li>Rechtsberatung integrieren</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🛡️ Compliance & Meldungen:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Datenschutz-Einverständnisse</li>
                  <li>Versicherungsangelegenheiten</li>
                  <li>Steuerliche Nachweise</li>
                  <li>Behördliche Meldungen</li>
                  <li>Audit-Trails führen</li>
                  <li>Rechtssichere Archivierung</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <Archive className="h-6 w-6" />
              Digitale Verwaltung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-700">
              <div>
                <h4 className="font-semibold mb-2">📱 Smart Features:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Protokoll-Generator mit KI</li>
                  <li>Spracherkennung für Protokolle</li>
                  <li>Automatische Zusammenfassungen</li>
                  <li>Suchfunktion in allen Protokollen</li>
                  <li>Versionskontrolle</li>
                  <li>Kollaborative Bearbeitung</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🔄 Integration & Export:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>PDF-Export mit Signatur</li>
                  <li>E-Mail-Versand automatisch</li>
                  <li>Kalender-Integration</li>
                  <li>Mitglieder-Benachrichtigungen</li>
                  <li>Backup & Archivierung</li>
                  <li>Rechtssichere Langzeitspeicherung</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}