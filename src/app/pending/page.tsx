"use client";

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle, Mail } from 'lucide-react';
import Link from 'next/link';

export default function PendingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-lg">
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
            <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-primary">
              Registrierung erfolgreich!
            </CardTitle>
            <p className="text-gray-600">Ihr Konto wartet auf Freischaltung</p>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">Was passiert jetzt?</h3>
            <div className="space-y-3 text-sm text-blue-700">
              <div className="flex items-center gap-3">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Ihre Registrierung wurde erfolgreich übermittelt</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span>Ein Vereinsadmin prüft Ihre Anfrage</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-blue-600" />
                <span>Sie erhalten eine E-Mail bei der Freischaltung</span>
              </div>
            </div>
          </div>

          <div className="text-sm text-gray-600">
            <p className="mb-2">
              <strong>Durchschnittliche Bearbeitungszeit:</strong> 1-2 Werktage
            </p>
            <p>
              Bei Fragen wenden Sie sich direkt an Ihren Vereinsvorstand.
            </p>
          </div>

          <div className="space-y-3">
            <Button asChild className="w-full">
              <Link href="/login">
                Zur Anmeldung
              </Link>
            </Button>
            <Button variant="outline" asChild className="w-full">
              <Link href="/">
                Zur Startseite
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}