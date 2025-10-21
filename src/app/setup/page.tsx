'use client';

import { useState } from 'react';
import { createTestData } from '@/lib/firebase/testData';
import { createSimpleTestData } from '@/lib/firebase/testDataSimple';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Database, CheckCircle, AlertCircle } from 'lucide-react';

export default function SetupPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleCreateTestData = async () => {
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      // Erst einfachen Test versuchen
      await createSimpleTestData();
      // Dann vollständige Testdaten
      await createTestData();
      setSuccess(true);
    } catch (err: any) {
      setError('Fehler beim Erstellen der Testdaten: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <Database className="h-12 w-12 mx-auto mb-4 text-blue-600" />
          <CardTitle className="text-2xl font-bold">Datenbank Setup</CardTitle>
          <p className="text-gray-600">Testdaten für die Entwicklung erstellen</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {success && (
            <Alert>
              <CheckCircle className="h-4 w-4" />
              <AlertDescription>
                Testdaten erfolgreich erstellt! Sie können sich jetzt mit den Demo-Zugangsdaten anmelden.
              </AlertDescription>
            </Alert>
          )}

          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2 text-sm text-gray-600">
            <p><strong>Folgende Testdaten werden erstellt:</strong></p>
            <ul className="list-disc list-inside space-y-1">
              <li>Verein: Test Verein</li>
              <li>22 Test-Mitglieder</li>
              <li>2 Aufgaben</li>
              <li>2 Termine/Events</li>
              <li>SEPA-Konfiguration</li>
              <li>Beitragskategorien</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Button 
              onClick={handleCreateTestData} 
              className="w-full" 
              disabled={loading || success}
            >
              {loading ? 'Erstelle Testdaten...' : success ? 'Testdaten erstellt' : 'Testdaten erstellen'}
            </Button>
            
            <Button 
              onClick={async () => {
                try {
                  await createSimpleTestData();
                  alert('Einfacher Test erfolgreich!');
                } catch (err: any) {
                  alert('Fehler: ' + err.message);
                }
              }}
              variant="outline"
              className="w-full"
              size="sm"
            >
              Nur einfachen Test ausführen
            </Button>
          </div>

          {success && (
            <div className="text-center text-sm text-gray-600 space-y-1">
              <p><strong>Testdaten erfolgreich erstellt!</strong></p>
              <p>Sie können sich jetzt anmelden.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}