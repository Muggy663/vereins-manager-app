"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (error: any) {
      setError('Anmeldung fehlgeschlagen. Bitte prüfen Sie Ihre Daten.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.history.back()}
            className="mb-4 w-fit"
          >
            ← Zurück
          </Button>
          <div className="text-center">
            <CardTitle className="text-2xl font-bold text-primary">
              🎯 Verein-im-Visier
            </CardTitle>
            <p className="text-gray-600">Anmeldung für Vereinsmitglieder</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email">E-Mail-Adresse</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ihre.email@beispiel.de"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Ihr Passwort"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 text-sm bg-red-50 p-3 rounded">
                {error}
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? 'Anmeldung läuft...' : 'Anmelden'}
            </Button>
          </form>

          <div className="mt-6 text-center space-y-2">
            <p className="text-sm text-gray-600">
              Noch kein Konto? 
              <Link href="/register" className="text-primary hover:underline ml-1">
                Jetzt registrieren
              </Link>
            </p>
            <p className="text-xs text-gray-500">
              Passwort vergessen? Wenden Sie sich an Ihren Vereinsadmin.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}