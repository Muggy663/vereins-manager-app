"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trophy, Plus } from 'lucide-react';

export default function StartrechtePage() {
  const [startrechte] = useState([
    {
      id: '1',
      mitglied: 'Max Mustermann',
      disziplin: 'Luftgewehr 10m',
      klasse: 'Schützenklasse',
      startberechtigung: 'A-Lizenz',
      zweitverein: null,
      gueltigBis: '2025-12-31'
    },
    {
      id: '2',
      mitglied: 'Anna Schmidt',
      disziplin: 'Luftpistole 10m', 
      klasse: 'Jugendklasse',
      startberechtigung: 'Jugend-Lizenz',
      zweitverein: 'SG Göttingen',
      gueltigBis: '2025-12-31'
    }
  ]);

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
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-primary">🏆 Startrechte & Lizenzen</h1>
        </div>
      </div>

      <Card className="mb-6">
        <CardContent className="p-4">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Neues Startrecht
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Startrechte Übersicht</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {startrechte.map(startrecht => (
              <Card key={startrecht.id} className="border">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold">{startrecht.mitglied}</h3>
                      <p className="text-sm text-muted-foreground">{startrecht.disziplin}</p>
                    </div>
                    {startrecht.zweitverein && (
                      <Badge variant="secondary">Zweitverein</Badge>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Klasse:</span>
                      <span className="ml-2 font-medium">{startrecht.klasse}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Lizenz:</span>
                      <span className="ml-2 font-medium">{startrecht.startberechtigung}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Gültig bis:</span>
                      <span className="ml-2 font-medium">{startrecht.gueltigBis}</span>
                    </div>
                  </div>
                  
                  {startrecht.zweitverein && (
                    <div className="mt-3 p-3 bg-blue-50 rounded">
                      <p className="text-sm"><strong>Zweitverein:</strong> {startrecht.zweitverein}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8 bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-800">💡 Vereinssoftware-Features (SPG Verein, WISO, David21)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h4 className="font-semibold mb-2">🏆 Wettkampf & Startrechte:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>DSB-Lizenz Verwaltung (A/B/C)</li>
                <li>Zweitverein-Startrechte</li>
                <li>Altersklassen automatisch</li>
                <li>Gastschützen-Verwaltung</li>
                <li>Wettkampf-Anmeldungen</li>
                <li>Mannschafts-Aufstellungen</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">📊 Erweiterte Verwaltung:</h4>
              <ul className="space-y-1 list-disc list-inside">
                <li>Familien-Mitgliedschaften</li>
                <li>Ehrenmitglieder-Status</li>
                <li>Beitragsbefreiungen</li>
                <li>Mahnwesen automatisch</li>
                <li>Spenden-Verwaltung</li>
                <li>Inventar-Management</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}