"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase/config';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    clubId: ''
  });
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    loadClubs();
  }, []);

  const loadClubs = async () => {
    try {
      const clubsSnapshot = await getDocs(collection(db, 'clubs'));
      let clubsList = clubsSnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name || doc.id,
        location: doc.data().location
      }));
      
      // Falls keine Vereine vorhanden, Demo-Vereine hinzufügen
      if (clubsList.length === 0) {
        const demoClubs = [
          { id: 'ksv-einbeck', name: 'KSV Einbeck', location: 'Einbeck' },
          { id: 'sg-goettingen', name: 'SG Göttingen 1889', location: 'Göttingen' },
          { id: 'ssv-hannover', name: 'SSV Hannover', location: 'Hannover' },
          { id: 'bsv-braunschweig', name: 'BSV Braunschweig', location: 'Braunschweig' },
          { id: 'sv-hildesheim', name: 'SV Hildesheim 1901', location: 'Hildesheim' }
        ];
        
        // Demo-Vereine in Firebase erstellen
        for (const club of demoClubs) {
          await setDoc(doc(db, 'clubs', club.id), {
            name: club.name,
            location: club.location,
            founded: 1950,
            members: 50,
            createdAt: new Date()
          });
        }
        clubsList = demoClubs;
      }
      
      setClubs(clubsList);
    } catch (error) {
      console.error('Fehler beim Laden der Vereine:', error);
    }
  };

  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>"'&]/g, '');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Input-Validierung
    const sanitizedData = {
      email: sanitizeInput(formData.email),
      firstName: sanitizeInput(formData.firstName),
      lastName: sanitizeInput(formData.lastName),
      clubId: sanitizeInput(formData.clubId)
    };

    if (formData.password !== formData.confirmPassword) {
      setError('Passwörter stimmen nicht überein');
      setLoading(false);
      return;
    }

    if (!sanitizedData.clubId) {
      setError('Bitte wählen Sie einen Verein aus');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Passwort muss mindestens 6 Zeichen haben');
      setLoading(false);
      return;
    }

    try {
      // Benutzer in Firebase Auth erstellen
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        sanitizedData.email, 
        formData.password
      );
      
      const user = userCredential.user;

      // Benutzer-Profil erstellen
      await setDoc(doc(db, 'users', user.uid), {
        email: sanitizedData.email,
        firstName: sanitizedData.firstName,
        lastName: sanitizedData.lastName,
        createdAt: new Date(),
        status: 'active'
      });

      // Pending-Berechtigung erstellen
      await setDoc(doc(db, 'user_permissions', user.uid), {
        clubId: sanitizedData.clubId,
        role: 'pending',
        status: 'pending',
        requestedAt: new Date(),
        approvedBy: null,
        approvedAt: null
      });

      // Pending-User für Admin-Dashboard
      await setDoc(doc(db, `clubs/${sanitizedData.clubId}/pending_users`, user.uid), {
        email: sanitizedData.email,
        firstName: sanitizedData.firstName,
        lastName: sanitizedData.lastName,
        requestedAt: new Date(),
        status: 'pending'
      });

      router.push('/pending');
    } catch (error: any) {
      console.error('Registrierungsfehler:', error.code);
      let errorMessage = 'Registrierung fehlgeschlagen';
      
      switch (error.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'E-Mail-Adresse bereits registriert';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Ungültige E-Mail-Adresse';
          break;
        case 'auth/weak-password':
          errorMessage = 'Passwort zu schwach';
          break;
        default:
          errorMessage = 'Registrierung fehlgeschlagen. Versuchen Sie es erneut.';
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
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
            <p className="text-gray-600">Registrierung für neue Mitglieder</p>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">Vorname</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  placeholder="Max"
                  required
                />
              </div>
              <div>
                <Label htmlFor="lastName">Nachname</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  placeholder="Mustermann"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email">E-Mail-Adresse</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="max.mustermann@beispiel.de"
                required
              />
            </div>

            <div>
              <Label htmlFor="clubId">Verein auswählen</Label>
              <select
                id="clubId"
                value={formData.clubId}
                onChange={(e) => setFormData({...formData, clubId: e.target.value})}
                className="w-full border rounded px-3 py-2"
                required
              >
                <option value="">Bitte wählen Sie Ihren Verein</option>
                {clubs.map(club => (
                  <option key={club.id} value={club.id}>
                    {club.name} {club.location ? `(${club.location})` : ''}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <Label htmlFor="password">Passwort</Label>
              <Input
                id="password"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Mindestens 6 Zeichen"
                required
                minLength={6}
              />
            </div>

            <div>
              <Label htmlFor="confirmPassword">Passwort bestätigen</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                placeholder="Passwort wiederholen"
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
              {loading ? 'Registrierung läuft...' : 'Registrieren'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Bereits registriert? 
              <Link href="/login" className="text-primary hover:underline ml-1">
                Jetzt anmelden
              </Link>
            </p>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded text-xs text-blue-700">
            <p><strong>Hinweis:</strong> Nach der Registrierung müssen Sie von einem Vereinsadmin freigeschaltet werden.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}