'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, CreditCard, Calendar, BookOpen, Settings, Plus, CheckSquare } from 'lucide-react';

export default function DashboardPage() {
  // Mock data - will be replaced with real Firebase data
  const stats = {
    totalMembers: 127,
    activeMembers: 119,
    openPayments: 8,
    upcomingEvents: 3,
    recentShootingLogs: 15,
    totalRevenue: 15240
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Vereins-Dashboard</h1>
          <p className="text-gray-600">Schützengesellschaft Einbeck von 1457 e.V.</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Neues Mitglied
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Mitglieder gesamt</p>
                <p className="text-2xl font-bold">{stats.totalMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-sm text-gray-600">Aktive Mitglieder</p>
                <p className="text-2xl font-bold">{stats.activeMembers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Offene Beiträge</p>
                <p className="text-2xl font-bold">{stats.openPayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-sm text-gray-600">Termine diese Woche</p>
                <p className="text-2xl font-bold">{stats.upcomingEvents}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Navigation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Users className="h-8 w-8 text-blue-600" />
              <CardTitle>Mitgliederverwaltung</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Verwalten Sie alle Vereinsmitglieder, Kontaktdaten und Stammdaten.
            </p>
            <Button variant="outline" className="w-full">
              Mitglieder verwalten
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CreditCard className="h-8 w-8 text-green-600" />
              <CardTitle>Beitragsverwaltung</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              SEPA-Lastschriften, Beitragskategorien und Zahlungsübersicht.
            </p>
            <Button variant="outline" className="w-full">
              Beiträge verwalten
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-purple-600" />
              <CardTitle>Digitales Schießbuch</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Erfassen Sie Schussergebnisse und verfolgen Sie Trainingsfortschritte.
            </p>
            <Button variant="outline" className="w-full">
              Schießbuch öffnen
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-yellow-600" />
              <CardTitle>Termine & Events</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Vereinskalender, Trainingszeiten und Wettkampfplanung.
            </p>
            <Button variant="outline" className="w-full">
              Termine verwalten
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <CheckSquare className="h-8 w-8 text-red-600" />
              <CardTitle>Aufgaben-Management</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              To-Do-Listen für den Vorstand, Aufgabenverteilung und Fortschritts-Tracking.
            </p>
            <Button variant="outline" className="w-full">
              Aufgaben verwalten
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Settings className="h-8 w-8 text-gray-600" />
              <CardTitle>Vereinseinstellungen</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              SEPA-Konfiguration, Beitragssätze und allgemeine Einstellungen.
            </p>
            <Button variant="outline" className="w-full">
              Einstellungen
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Schnellzugriff</h2>
        <div className="flex flex-wrap gap-3">
          <Button size="sm">SEPA-Lastschrift erstellen</Button>
          <Button size="sm" variant="outline">Neuen Termin anlegen</Button>
          <Button size="sm" variant="outline">Mitglieder importieren</Button>
          <Button size="sm" variant="outline">Statistiken exportieren</Button>
        </div>
      </div>
    </div>
  );
}