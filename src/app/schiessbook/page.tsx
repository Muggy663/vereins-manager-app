'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Target, Plus, BarChart3, Calendar, Trophy } from 'lucide-react';

interface SchussEintrag {
  id: string;
  datum: string;
  disziplin: string;
  schussanzahl: number;
  ringe: number;
  teiler: number;
  bemerkung?: string;
}

export default function SchiessbuchPage() {
  const [eintraege, setEintraege] = useState<SchussEintrag[]>([
    {
      id: '1',
      datum: '2025-01-15',
      disziplin: 'Luftgewehr 10m',
      schussanzahl: 40,
      ringe: 385,
      teiler: 15,
      bemerkung: 'Gutes Training, Atmung verbessert'
    },
    {
      id: '2', 
      datum: '2025-01-12',
      disziplin: 'Luftpistole 10m',
      schussanzahl: 40,
      ringe: 365,
      teiler: 28,
      bemerkung: 'Konzentration am Ende nachgelassen'
    }
  ]);

  const [neuerEintrag, setNeuerEintrag] = useState({
    datum: new Date().toISOString().split('T')[0],
    disziplin: 'Luftgewehr 10m',
    schussanzahl: 40,
    ringe: 0,
    teiler: 0,
    bemerkung: ''
  });

  const [showForm, setShowForm] = useState(false);

  const disziplinen = [
    'Luftgewehr 10m',
    'Luftpistole 10m', 
    'Kleinkaliber 50m',
    'Großkaliber 100m',
    'Bogen 18m',
    'Armbrust 10m'
  ];

  const addEintrag = () => {
    const eintrag: SchussEintrag = {
      id: Date.now().toString(),
      ...neuerEintrag
    };
    
    setEintraege([eintrag, ...eintraege]);
    setNeuerEintrag({
      datum: new Date().toISOString().split('T')[0],
      disziplin: 'Luftgewehr 10m',
      schussanzahl: 40,
      ringe: 0,
      teiler: 0,
      bemerkung: ''
    });
    setShowForm(false);
  };

  const durchschnittRinge = eintraege.length > 0 
    ? (eintraege.reduce((sum, e) => sum + e.ringe, 0) / eintraege.length).toFixed(1)
    : '0';

  const durchschnittTeiler = eintraege.length > 0
    ? (eintraege.reduce((sum, e) => sum + e.teiler, 0) / eintraege.length).toFixed(1) 
    : '0';

  const bestersSchuss = eintraege.length > 0
    ? Math.max(...eintraege.map(e => e.ringe))
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Target className="h-8 w-8 text-blue-600" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Digitales Schießbuch</h1>
            <p className="text-gray-600">Erfassen und verfolgen Sie Ihre Schussergebnisse</p>
          </div>
        </div>
        <Button onClick={() => setShowForm(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Neuer Eintrag
        </Button>
      </div>

      {/* Statistiken */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Target className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Einträge gesamt</p>
                <p className="text-2xl font-bold">{eintraege.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">⌀ Ringe</p>
                <p className="text-2xl font-bold">{durchschnittRinge}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Bester Schuss</p>
                <p className="text-2xl font-bold">{bestersSchuss}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">⌀ Teiler</p>
                <p className="text-2xl font-bold">{durchschnittTeiler}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Neuer Eintrag Form */}
      {showForm && (
        <Card className="mb-8 border-2 border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="text-blue-900">Neuer Schusseintrag</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-blue-800">Datum</label>
                <Input
                  type="date"
                  value={neuerEintrag.datum}
                  onChange={(e) => setNeuerEintrag({...neuerEintrag, datum: e.target.value})}
                  className="bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-blue-800">Disziplin</label>
                <select
                  value={neuerEintrag.disziplin}
                  onChange={(e) => setNeuerEintrag({...neuerEintrag, disziplin: e.target.value})}
                  className="w-full p-2 border rounded-md bg-white"
                >
                  {disziplinen.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-blue-800">Schussanzahl</label>
                <Input
                  type="number"
                  value={neuerEintrag.schussanzahl}
                  onChange={(e) => setNeuerEintrag({...neuerEintrag, schussanzahl: parseInt(e.target.value) || 0})}
                  className="bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-blue-800">Ringe</label>
                <Input
                  type="number"
                  value={neuerEintrag.ringe}
                  onChange={(e) => setNeuerEintrag({...neuerEintrag, ringe: parseInt(e.target.value) || 0})}
                  className="bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-blue-800">Teiler</label>
                <Input
                  type="number"
                  value={neuerEintrag.teiler}
                  onChange={(e) => setNeuerEintrag({...neuerEintrag, teiler: parseInt(e.target.value) || 0})}
                  className="bg-white"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-blue-800">Schnitt</label>
                <Input
                  value={neuerEintrag.schussanzahl > 0 ? (neuerEintrag.ringe / neuerEintrag.schussanzahl).toFixed(2) : '0.00'}
                  disabled
                  className="bg-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-blue-800">Bemerkung (optional)</label>
              <Input
                value={neuerEintrag.bemerkung}
                onChange={(e) => setNeuerEintrag({...neuerEintrag, bemerkung: e.target.value})}
                placeholder="z.B. Wetterbedingungen, Gefühl, Verbesserungen..."
                className="bg-white"
              />
            </div>

            <div className="flex gap-3">
              <Button onClick={addEintrag} className="bg-blue-600 hover:bg-blue-700">
                Eintrag speichern
              </Button>
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Abbrechen
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Schussliste */}
      <Card>
        <CardHeader>
          <CardTitle>Schussergebnisse ({eintraege.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {eintraege.length === 0 ? (
            <div className="text-center py-12">
              <Target className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Noch keine Einträge</h3>
              <p className="text-gray-600 mb-4">Erfassen Sie Ihren ersten Schusseintrag</p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Ersten Eintrag erstellen
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {eintraege.map(eintrag => (
                <div key={eintrag.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{eintrag.disziplin}</Badge>
                      <span className="text-sm text-gray-600">
                        {new Date(eintrag.datum).toLocaleDateString('de-DE')}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-lg font-bold text-blue-600">
                          {eintrag.ringe} Ringe
                        </div>
                        <div className="text-sm text-gray-600">
                          {eintrag.teiler} Teiler
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Schüsse:</span>
                      <span className="ml-2 font-medium">{eintrag.schussanzahl}</span>
                    </div>
                    <div>
                      <span className="text-gray-600">Schnitt:</span>
                      <span className="ml-2 font-medium">
                        {(eintrag.ringe / eintrag.schussanzahl).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Teiler/Schuss:</span>
                      <span className="ml-2 font-medium">
                        {(eintrag.teiler / eintrag.schussanzahl).toFixed(2)}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-600">Prozent:</span>
                      <span className="ml-2 font-medium">
                        {((eintrag.ringe / (eintrag.schussanzahl * 10)) * 100).toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  
                  {eintrag.bemerkung && (
                    <div className="mt-3 p-3 bg-gray-100 rounded text-sm">
                      <span className="text-gray-600">Bemerkung:</span>
                      <span className="ml-2">{eintrag.bemerkung}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}