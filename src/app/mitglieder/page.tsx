"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth/context';
import { collection, query, where, getDocs, orderBy, doc, updateDoc, deleteDoc, addDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { mockMembers, isDemoMode } from '@/lib/firebase/mockData';

export default function MitgliederPage() {
  const { user, clubId, userRole } = useAuth();
  
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [userClub, setUserClub] = useState(null);
  const [editingMember, setEditingMember] = useState(null);
  const [showInactive, setShowInactive] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importData, setImportData] = useState([]);
  const fileInputRef = useRef(null);
  const [sortField, setSortField] = useState('lastName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [newMember, setNewMember] = useState<any>({
    firstName: '',
    lastName: '',
    email: '',
    telefon: '',
    strasse: '',
    plz: '',
    ort: '',
    geburtstag: '',
    vereinseintritt: '',
    gender: 'male',
    mitgliedsnummer: '',
    isActive: true,
    mitgliedschaftstyp: 'vollmitglied',
    ehrenmitglied: false,
    beitragsbefreiung: false,
    familienrabatt: false,
    notizen: ''
  });

  // Demo-Modus: Erlaube Zugriff ohne Authentifizierung

  useEffect(() => {
    if (isDemoMode()) {
      setMembers(mockMembers);
      setUserClub({ id: 'demo-club', name: 'Demo Schützenverein' });
      setLoading(false);
    } else {
      loadMembers();
    }
  }, []);

  const handleSort = (field) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
  };

  useEffect(() => {
    // Filter and sort members
    let filtered = members.filter(member => {
      const matchesSearch = member.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.mitgliedsnummer && member.mitgliedsnummer.includes(searchTerm)) ||
        (member.email && member.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (member.telefon && member.telefon.includes(searchTerm)) ||
        (member.strasse && member.strasse.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (member.ort && member.ort.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesStatus = showInactive ? member.isActive === false : member.isActive !== false;
      
      return matchesSearch && matchesStatus;
    });
    
    // Sort filtered members
    filtered.sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';
      
      // Special handling for different field types
      if (sortField === 'alter') {
        aVal = parseInt(aVal) || 0;
        bVal = parseInt(bVal) || 0;
      } else if (sortField === 'geburtstag' || sortField === 'vereinseintritt' || sortField === 'dsbeintritt') {
        aVal = new Date(aVal || '1900-01-01');
        bVal = new Date(bVal || '1900-01-01');
      } else if (sortField === 'isActive') {
        aVal = a.isActive ? 1 : 0;
        bVal = b.isActive ? 1 : 0;
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }
      
      if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setFilteredMembers(filtered);
  }, [members, searchTerm, showInactive, sortField, sortDirection]);

  const loadMembers = async () => {
    const targetClubId = 'ksv-einbeck'; // Fest für Demo
    console.log('Loading members for club:', targetClubId);
    
    try {
      // Lade Club-Daten
      const clubsSnapshot = await getDocs(collection(db, 'clubs'));
      console.log('Found clubs:', clubsSnapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name })));
      
      const clubDoc = clubsSnapshot.docs.find(doc => doc.id === targetClubId);
      if (clubDoc) {
        const clubData = clubDoc.data();
        setUserClub({ id: targetClubId, ...clubData });
        console.log('Club data loaded:', clubData.name);
      }
      
      // Lade Mitglieder aus club-spezifischer Collection
      const mitgliederCollection = `clubs/${targetClubId}/mitglieder`;
      console.log('Loading from collection:', mitgliederCollection);
      const membersSnapshot = await getDocs(collection(db, mitgliederCollection));
      console.log('Found members:', membersSnapshot.docs.length);
      
      const membersList = membersSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          alter: data.geburtstag ? 
            (() => {
              const heute = new Date();
              const geburtstag = new Date(data.geburtstag);
              let alter = heute.getFullYear() - geburtstag.getFullYear();
              const hatGeburtstagNochNichtGehabt = heute.getMonth() < geburtstag.getMonth() || 
                (heute.getMonth() === geburtstag.getMonth() && heute.getDate() < geburtstag.getDate());
              return hatGeburtstagNochNichtGehabt ? alter - 1 : alter;
            })() :
            new Date().getFullYear() - (data.birthYear || 0),
          // Feldname-Mapping für migrierte Daten
          firstName: data.firstName || data.vorname || data.name?.split(' ')[0] || '',
          lastName: data.lastName || data.name?.split(' ').slice(1).join(' ') || '',
          mitgliedsnummer: data.mitgliedsnummer || '',
          strasse: data.strasse || data.adresse?.strasse || '',
          plz: data.plz || data.adresse?.plz || '',
          ort: data.ort || data.adresse?.ort || '',
          email: data.email || '',
          telefon: data.telefon || '',
          mobil: data.mobil || '',
          geburtstag: data.geburtstag || data.geburtsdatum || '',
          vereinseintritt: data.vereinseintritt || data.eintrittsdatum || '',
          dsbeintritt: data.dsbeintritt || '',
          gender: data.gender || data.geschlecht || 'male',
          geschlecht: data.geschlecht || data.gender || 'male',
          isActive: data.isActive !== false && data.status !== 'inaktiv'
        };
      });
      
      console.log('Processed members:', membersList.length);
      setMembers(membersList);
      
    } catch (error) {
      console.error('Fehler beim Laden der Daten:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateMember = async (memberId, updates) => {
    try {
      const clubId = 'ksv-einbeck';
      const mitgliederCollection = `clubs/${clubId}/mitglieder`;
      const memberRef = doc(db, mitgliederCollection, memberId);
      await updateDoc(memberRef, {
        ...updates,
        updatedAt: new Date()
      });
      
      setMembers(prev => prev.map(m => 
        m.id === memberId ? { ...m, ...updates } : m
      ));
      
      setEditingMember(null);
    } catch (error) {
      console.error('Fehler beim Aktualisieren:', error);
      alert('Fehler beim Speichern der Änderungen');
    }
  };

  const handleCreateMember = async () => {
    try {
      const clubId = 'ksv-einbeck';
      const mitgliederCollection = `clubs/${clubId}/mitglieder`;
      
      const memberData = {
        ...newMember,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      const docRef = await addDoc(collection(db, mitgliederCollection), memberData);
      
      const newMemberWithId = {
        id: docRef.id,
        ...memberData,
        alter: newMember.geburtstag ? 
          new Date().getFullYear() - new Date(newMember.geburtstag).getFullYear() : 0
      };
      
      setMembers(prev => [...prev, newMemberWithId]);
      setNewMember({
        firstName: '',
        lastName: '',
        email: '',
        telefon: '',
        strasse: '',
        plz: '',
        ort: '',
        geburtstag: '',
        vereinseintritt: '',
        gender: 'male',
        mitgliedsnummer: '',
        isActive: true
      });
      setEditingMember(null);
    } catch (error) {
      console.error('Fehler beim Erstellen:', error);
      alert('Fehler beim Erstellen des Mitglieds');
    }
  };

  const handleDeleteMember = async (memberId) => {
    if (!confirm('Mitglied wirklich löschen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
      return;
    }
    
    try {
      const clubId = 'ksv-einbeck';
      const mitgliederCollection = `clubs/${clubId}/mitglieder`;
      await deleteDoc(doc(db, mitgliederCollection, memberId));
      
      setMembers(prev => prev.filter(m => m.id !== memberId));
    } catch (error) {
      console.error('Fehler beim Löschen:', error);
      alert('Fehler beim Löschen des Mitglieds');
    }
  };

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
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-primary">Mitgliederverwaltung</h1>
        </div>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
          {userClub ? `Mitglieder von ${userClub.name}` : 'Vereinsmitglieder verwalten'}
        </p>
      </div>

      {/* Statistiken */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 mb-4 md:mb-8">
        <Card>
          <CardContent className="p-2 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-primary">{members.length}</div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Gesamt</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-green-600">
              {members.filter(m => m.isActive).length}
            </div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Aktiv</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-red-600">
              {members.filter(m => !m.isActive).length}
            </div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Inaktiv</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-purple-600">
              {members.filter(m => m.email).length}
            </div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Mit E-Mail</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2 md:p-4">
            <div className="text-lg md:text-2xl font-bold text-orange-600">
              {members.filter(m => m.mitgliedsnummer).length}
            </div>
            <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Mit Mitgl.-Nr.</p>
          </CardContent>
        </Card>
      </div>

      {/* Suche und Aktionen */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Suchen (Name, Mitgl.-Nr., E-Mail, Adresse)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex items-center gap-2">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={showInactive}
                    onChange={(e) => setShowInactive(e.target.checked)}
                    className="rounded"
                  />
                  Ausgetretene einblenden
                </label>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 flex-1">
                <Button onClick={() => setEditingMember('new')} className="w-full sm:w-auto">
                  + Neues Mitglied
                </Button>
                <Button variant="outline" onClick={() => window.print()} className="w-full sm:w-auto">
                  Liste drucken
                </Button>
              </div>
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
          <div className="hidden lg:block w-full overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="text-left p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('mitgliedsnummer')}>Nr. {sortField === 'mitgliedsnummer' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                  <th className="text-left p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('firstName')}>Vorname {sortField === 'firstName' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                  <th className="text-left p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('lastName')}>Nachname {sortField === 'lastName' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                  <th className="text-left p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('email')}>E-Mail {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                  <th className="text-left p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('telefon')}>Telefon {sortField === 'telefon' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                  <th className="text-left p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('strasse')}>Adresse {sortField === 'strasse' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                  <th className="text-center p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('geburtstag')}>Geburtstag {sortField === 'geburtstag' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                  <th className="text-center p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('alter')}>Alter {sortField === 'alter' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                  <th className="text-center p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('gender')}>G {sortField === 'gender' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                  <th className="text-center p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('vereinseintritt')}>Eintritt {sortField === 'vereinseintritt' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                  <th className="text-center p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('isActive')}>Status {sortField === 'isActive' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                  <th className="text-left p-2">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredMembers.map(member => (
                  <tr key={member.id} className="border-b hover:bg-muted/20">
                    <td className="p-2 font-mono font-bold">
                      {member.mitgliedsnummer ? `${member.mitgliedsnummer.padStart(3, '0')}` : '-'}
                    </td>
                    <td className="p-2 font-medium">{member.firstName}</td>
                    <td className="p-2 font-medium">{member.lastName}</td>
                    <td className="p-2">{member.email || '-'}</td>
                    <td className="p-2">{member.telefon || member.mobil || '-'}</td>
                    <td className="p-2">
                      {member.strasse ? `${member.strasse}, ${member.plz} ${member.ort}` : '-'}
                    </td>
                    <td className="p-2 text-center">
                      {member.geburtstag ? new Date(member.geburtstag).toLocaleDateString('de-DE') : '-'}
                    </td>
                    <td className="p-2 text-center font-medium">{member.alter}</td>
                    <td className="p-2 text-center">
                      <Badge variant={member.gender === 'female' ? 'secondary' : 'outline'}>
                        {member.gender === 'male' ? 'M' : 'W'}
                      </Badge>
                    </td>
                    <td className="p-2 text-center">
                      {member.vereinseintritt ? new Date(member.vereinseintritt).getFullYear() : '-'}
                    </td>
                    <td className="p-2 text-center">
                      <Badge variant={member.isActive ? 'default' : 'destructive'}>
                        {member.isActive ? 'Aktiv' : 'Inaktiv'}
                      </Badge>
                    </td>
                    <td className="p-2">
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingMember(editingMember === member.id ? null : member.id)}
                        >
                          {editingMember === member.id ? 'Fertig' : 'Bearbeiten'}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-red-600"
                          onClick={() => handleDeleteMember(member.id)}
                        >
                          Löschen
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {/* Mobile Cards */}
          <div className="lg:hidden space-y-4">
            {filteredMembers.map(member => (
              <Card key={member.id} className="border">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{member.firstName} {member.lastName}</h3>
                      <p className="text-sm text-muted-foreground">Mitgl.-Nr. {member.mitgliedsnummer || '-'}</p>
                    </div>
                    <div className="flex gap-1">
                      <Badge variant={member.isActive ? 'default' : 'destructive'}>
                        {member.isActive ? 'Aktiv' : 'Inaktiv'}
                      </Badge>
                      <Badge variant={member.gender === 'female' ? 'secondary' : 'outline'}>
                        {member.gender === 'male' ? 'M' : 'W'}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    {member.email && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground w-16">E-Mail:</span>
                        <span>{member.email}</span>
                      </div>
                    )}
                    {(member.telefon || member.mobil) && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground w-16">Telefon:</span>
                        <span>{member.telefon || member.mobil}</span>
                      </div>
                    )}
                    {(member.strasse || member.ort) && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground w-16">Adresse:</span>
                        <span>{member.strasse}, {member.plz} {member.ort}</span>
                      </div>
                    )}
                    {member.geburtstag && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground w-16">Geboren:</span>
                        <span>{new Date(member.geburtstag).toLocaleDateString('de-DE')} (Alter: {member.alter})</span>
                      </div>
                    )}
                    {member.vereinseintritt && (
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground w-16">Eintritt:</span>
                        <span>{new Date(member.vereinseintritt).getFullYear()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingMember(editingMember === member.id ? null : member.id)}
                      className="flex-1"
                    >
                      {editingMember === member.id ? 'Fertig' : 'Bearbeiten'}
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-red-600"
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      Löschen
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Neues Mitglied Dialog */}
      {editingMember === 'new' && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Neues Mitglied hinzufügen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Vorname</label>
                  <Input
                    value={newMember.firstName}
                    onChange={(e) => setNewMember({...newMember, firstName: e.target.value})}
                    placeholder="Max"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Nachname</label>
                  <Input
                    value={newMember.lastName}
                    onChange={(e) => setNewMember({...newMember, lastName: e.target.value})}
                    placeholder="Mustermann"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">E-Mail</label>
                  <Input
                    type="email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                    placeholder="max@beispiel.de"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Telefon</label>
                  <Input
                    value={newMember.telefon}
                    onChange={(e) => setNewMember({...newMember, telefon: e.target.value})}
                    placeholder="0123 456789"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium">Straße</label>
                <Input
                  value={newMember.strasse}
                  onChange={(e) => setNewMember({...newMember, strasse: e.target.value})}
                  placeholder="Musterstraße 123"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">PLZ</label>
                  <Input
                    value={newMember.plz}
                    onChange={(e) => setNewMember({...newMember, plz: e.target.value})}
                    placeholder="12345"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Ort</label>
                  <Input
                    value={newMember.ort}
                    onChange={(e) => setNewMember({...newMember, ort: e.target.value})}
                    placeholder="Musterstadt"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium">Geburtstag</label>
                  <Input
                    type="date"
                    value={newMember.geburtstag}
                    onChange={(e) => setNewMember({...newMember, geburtstag: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Vereinseintritt</label>
                  <Input
                    type="date"
                    value={newMember.vereinseintritt}
                    onChange={(e) => setNewMember({...newMember, vereinseintritt: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Geschlecht</label>
                  <select
                    value={newMember.gender}
                    onChange={(e) => setNewMember({...newMember, gender: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="male">Männlich</option>
                    <option value="female">Weiblich</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Mitgliedsnummer</label>
                  <Input
                    value={newMember.mitgliedsnummer}
                    onChange={(e) => setNewMember({...newMember, mitgliedsnummer: e.target.value})}
                    placeholder="123"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Mitgliedschaftstyp</label>
                  <select
                    value={newMember.mitgliedschaftstyp}
                    onChange={(e) => setNewMember({...newMember, mitgliedschaftstyp: e.target.value})}
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="vollmitglied">Vollmitglied</option>
                    <option value="jugendmitglied">Jugendmitglied</option>
                    <option value="familienmitglied">Familienmitglied</option>
                    <option value="gastschuetze">Gastschütze</option>
                    <option value="foerdermitglied">Fördermitglied</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newMember.ehrenmitglied}
                    onChange={(e) => setNewMember({...newMember, ehrenmitglied: e.target.checked})}
                  />
                  <span className="text-sm">Ehrenmitglied</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newMember.beitragsbefreiung}
                    onChange={(e) => setNewMember({...newMember, beitragsbefreiung: e.target.checked})}
                  />
                  <span className="text-sm">Beitragsbefreiung</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={newMember.familienrabatt}
                    onChange={(e) => setNewMember({...newMember, familienrabatt: e.target.checked})}
                  />
                  <span className="text-sm">Familienrabatt</span>
                </label>
              </div>
              
              <div>
                <label className="text-sm font-medium">Notizen</label>
                <textarea
                  value={newMember.notizen}
                  onChange={(e) => setNewMember({...newMember, notizen: e.target.value})}
                  placeholder="Besondere Hinweise, Allergien, etc."
                  className="w-full border rounded px-3 py-2 h-20 resize-none"
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <Button onClick={handleCreateMember} className="flex-1">
                  Mitglied erstellen
                </Button>
                <Button variant="outline" onClick={() => setEditingMember(null)}>
                  Abbrechen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}