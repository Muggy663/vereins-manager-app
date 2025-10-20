"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function MitgliederPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);

  interface Member {
    id: string;
    firstName: string;
    lastName: string;
    mitgliedsnummer?: string;
    email?: string;
    telefon?: string;
    strasse?: string;
    plz?: string;
    ort?: string;
    geburtstag?: string;
    alter: number;
    gender: string;
    vereinseintritt?: string;
    isActive: boolean;
  }
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showInactive, setShowInactive] = useState(false);

  // Demo-Daten laden
  useEffect(() => {
    const demoMembers = [
      {
        id: '1',
        firstName: 'Max',
        lastName: 'Mustermann',
        mitgliedsnummer: '001',
        email: 'max@example.com',
        telefon: '0123456789',
        strasse: 'Musterstraße 1',
        plz: '12345',
        ort: 'Musterstadt',
        geburtstag: '1980-01-15',
        alter: 44,
        gender: 'male',
        vereinseintritt: '2010-01-01',
        isActive: true
      },
      {
        id: '2',
        firstName: 'Anna',
        lastName: 'Schmidt',
        mitgliedsnummer: '002',
        email: 'anna@example.com',
        telefon: '0987654321',
        strasse: 'Beispielweg 5',
        plz: '54321',
        ort: 'Beispielort',
        geburtstag: '1985-05-20',
        alter: 39,
        gender: 'female',
        vereinseintritt: '2015-03-01',
        isActive: true
      }
    ];
    
    setMembers(demoMembers);
    setLoading(false);
  }, []);

  // Filter und Suche
  useEffect(() => {
    const filtered = members.filter(member => {
      const matchesSearch = member.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.mitgliedsnummer?.includes(searchTerm) ||
        member.email?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = showInactive ? !member.isActive : member.isActive;
      
      return matchesSearch && matchesStatus;
    });
    
    setFilteredMembers(filtered);
  }, [members, searchTerm, showInactive]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Lade Mitgliederdaten...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Mitgliederverwaltung</h1>
        <p className="text-muted-foreground">
          Vereinsmitglieder verwalten und organisieren
        </p>
      </div>

      {/* Statistiken */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-primary">{members.length}</div>
            <p className="text-sm text-muted-foreground">Mitglieder gesamt</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {members.filter(m => m.isActive).length}
            </div>
            <p className="text-sm text-muted-foreground">Aktive Mitglieder</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round(members.reduce((sum, m) => sum + m.alter, 0) / members.length) || 0}
            </div>
            <p className="text-sm text-muted-foreground">Durchschnittsalter</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {members.filter(m => m.email).length}
            </div>
            <p className="text-sm text-muted-foreground">Mit E-Mail</p>
          </CardContent>
        </Card>
      </div>

      {/* Suche und Filter */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Suchen (Name, Mitgl.-Nr., E-Mail)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={showInactive}
                  onChange={(e) => setShowInactive(e.target.checked)}
                  className="rounded"
                />
                Ausgetretene einblenden
              </label>
              <Button>+ Neues Mitglied</Button>
              <Button variant="outline">📊 CSV Import</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Mitgliederliste */}
      <Card>
        <CardHeader>
          <CardTitle>Mitgliederliste ({filteredMembers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Desktop Tabelle */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-3">Mitgl.-Nr.</th>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">E-Mail</th>
                  <th className="text-left p-3">Telefon</th>
                  <th className="text-left p-3">Adresse</th>
                  <th className="text-center p-3">Alter</th>
                  <th className="text-center p-3">Status</th>
                  <th className="text-left p-3">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map(member => (
                  <tr key={member.id} className="border-b hover:bg-muted/20">
                    <td className="p-3 font-mono font-bold">
                      {member.mitgliedsnummer ? `0${member.mitgliedsnummer}` : '-'}
                    </td>
                    <td className="p-3">
                      <div>
                        <div className="font-medium">{member.firstName} {member.lastName}</div>
                        <div className="text-sm text-muted-foreground">
                          {member.gender === 'female' ? 'Weiblich' : 'Männlich'}
                        </div>
                      </div>
                    </td>
                    <td className="p-3">{member.email || '-'}</td>
                    <td className="p-3">{member.telefon || '-'}</td>
                    <td className="p-3">
                      {member.strasse ? `${member.strasse}, ${member.plz} ${member.ort}` : '-'}
                    </td>
                    <td className="p-3 text-center font-medium">{member.alter}</td>
                    <td className="p-3 text-center">
                      <Badge variant={member.isActive ? 'default' : 'destructive'}>
                        {member.isActive ? 'Aktiv' : 'Inaktiv'}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">Bearbeiten</Button>
                        <Button size="sm" variant="outline">Details</Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Karten */}
          <div className="md:hidden space-y-4">
            {filteredMembers.map(member => (
              <Card key={member.id} className="border">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{member.firstName} {member.lastName}</h3>
                      <p className="text-sm text-muted-foreground">Mitgl.-Nr. {member.mitgliedsnummer || '-'}</p>
                    </div>
                    <Badge variant={member.isActive ? 'default' : 'destructive'}>
                      {member.isActive ? 'Aktiv' : 'Inaktiv'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {member.email && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground w-16">E-Mail:</span>
                        <span>{member.email}</span>
                      </div>
                    )}
                    {member.telefon && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground w-16">Telefon:</span>
                        <span>{member.telefon}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground w-16">Alter:</span>
                      <span>{member.alter} Jahre</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline" className="flex-1">
                      Bearbeiten
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}