"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/lib/auth/context';
import { collection, query, where, getDocs, doc, updateDoc, addDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';

export default function BeitraegeVerwaltungPage() {
  const { user, clubId, userRole } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<any[]>([]);
  const [userClub, setUserClub] = useState<any>(null);
  const [sortField, setSortField] = useState('lastName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [beitragssaetze, setBeitragssaetze] = useState<any>({
    erwachsene: { name: 'Erwachsene', alterVon: 21, alterBis: null, betrag: 120, aktiv: true },
    jugend: { name: 'Jugend', alterVon: 0, alterBis: 20, betrag: 60, aktiv: true },
    senioren: { name: 'Senioren', alterVon: 65, alterBis: null, betrag: 90, aktiv: false },
    familie: { name: 'Familie', alterVon: null, alterBis: null, betrag: 200, aktiv: false }
  });
  
  const [vereinsEinstellungen, setVereinsEinstellungen] = useState({
    glaeubigerID: '',
    vereinsname: '',
    adresse: '',
    plz: '',
    ort: '',
    email: '',
    iban: '',
    bic: '',
    bankname: '',
    verwendungszweck: 'Mitgliedsbeitrag 2025'
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('alle');
  const [activeTab, setActiveTab] = useState('uebersicht');
  const [selectedBank, setSelectedBank] = useState('sparkasse');
  const sepaFileInputRef = useRef(null);
  const [editingBeitragssatz, setEditingBeitragssatz] = useState(null);
  const [newBeitragssatz, setNewBeitragssatz] = useState({
    name: '',
    alterVon: '',
    alterBis: '',
    betrag: '',
    aktiv: true
  });

  // Demo-Modus: Erlaube Zugriff ohne Authentifizierung

  useEffect(() => {
    // Demo-Modus: Lade Daten ohne Auth-Check
    loadMembersWithBeitraege();
  }, []);

  const handleSort = (field: string) => {
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
  };

  const loadMembersWithBeitraege = async () => {
    const demoClubId = 'ksv-einbeck';
    if (!demoClubId) return;
    
    try {
      // Lade Club-Daten
      const clubQuery = query(collection(db, 'clubs'), where('__name__', '==', demoClubId));
      const clubSnapshot = await getDocs(clubQuery);
      
      if (!clubSnapshot.empty) {
        const clubData = clubSnapshot.docs[0].data();
        setUserClub({ id: demoClubId, ...clubData });
        
        // Lade gespeicherte Beitragssätze falls vorhanden
        if (clubData.beitragssaetze) {
          setBeitragssaetze(clubData.beitragssaetze);
        }
        
        // Lade gespeicherte Vereinseinstellungen
        if (clubData.settings?.sepa) {
          setVereinsEinstellungen(clubData.settings.sepa);
        }
        
        // Lade Mitglieder aus club-spezifischer Collection
        const mitgliederCollection = `clubs/${demoClubId}/mitglieder`;
        const membersSnapshot = await getDocs(collection(db, mitgliederCollection));
        
        const membersList = membersSnapshot.docs.map(doc => {
          const data = doc.data();
          const alter = data.geburtstag ? 
            new Date().getFullYear() - new Date(data.geburtstag).getFullYear() :
            new Date().getFullYear() - (data.birthYear || 0);
          
          // Berechne Beitragskategorie basierend auf aktuellen Regeln
          let kategorie = 'erwachsene';
          let jahresbeitrag = 120; // Fallback
          
          // Verwende die aktuellen beitragssaetze
          const currentBeitragssaetze = clubData.beitragssaetze || beitragssaetze;
          
          // Finde passende Kategorie
          for (const [key, config] of Object.entries(currentBeitragssaetze)) {
            const configObj = config as any;
            if (!configObj.aktiv) continue;
            
            const passt = (configObj.alterVon === null || alter >= configObj.alterVon) &&
                         (configObj.alterBis === null || alter <= configObj.alterBis);
            
            if (passt) {
              kategorie = key;
              jahresbeitrag = configObj.betrag;
              break;
            }
          }
          
          // SEPA-Daten aus Mitgliederdaten
          const sepaData = data.sepa || {};
          const hasSepaData = sepaData.iban && sepaData.bic;
          
          const zahlungsart = hasSepaData ? 'sepa_lastschrift' : 'ueberweisung';
          
          const sepaMandat = hasSepaData ? {
            mandatsreferenz: sepaData.mandatsreferenz || `SGI-${data.mitgliedsnummer || doc.id.slice(-3)}-2025`,
            mandatsdatum: sepaData.mandatsdatum || new Date().toISOString().split('T')[0],
            iban: sepaData.iban,
            bic: sepaData.bic,
            kontoinhaber: sepaData.kontoinhaber || `${data.firstName || data.vorname || ''} ${data.lastName || data.name || ''}`.trim(),
            bankname: getBankNameFromBIC(sepaData.bic),
            sepaAusfuehrung: 'folge_lastschrift',
            verwendungszweck: sepaData.verwendungszweck || 'Mitgliedsbeitrag'
          } : null;
          
          return {
            id: doc.id,
            ...data,
            alter,
            firstName: data.firstName || data.vorname || data.name?.split(' ')[0] || '',
            lastName: data.lastName || data.name?.split(' ').slice(1).join(' ') || '',
            isActive: data.isActive !== false && data.status !== 'inaktiv',
            beitragskategorie: kategorie,
            jahresbeitrag,
            zahlungsart,
            sepaMandat,
            // Beitragsstatus - standardmäßig offen für neues Jahr
            beitragsstatus: data.beitragsstatus || 'offen',
            letzteZahlung: data.letzteZahlung || null,
            mahnungen: data.mahnungen || 0
          };
        });
        
        setMembers(membersList);
      }
    } catch (error) {
      console.error('Fehler beim Laden:', error);
    } finally {
      setLoading(false);
    }
  };

  const getBankNameFromBIC = (bic: string) => {
    if (!bic) return 'Unbekannte Bank';
    
    const bankMap: { [key: string]: string } = {
      'GENODEF1SES': 'VR Bank Südniedersachsen eG',
      'NOLADE21EIN': 'Sparkasse Einbeck',
      'NOLADE21GOE': 'Sparkasse Göttingen',
      'HELADEF1GOE': 'Sparkasse Göttingen',
      'COBADEFFXXX': 'Commerzbank AG',
      'INGDDEFFXXX': 'ING-DiBa AG', 
      'PBNKDEFFXXX': 'Postbank',
      'BYLADEM1001': 'Deutsche Kreditbank AG',
      'DEUTDEFFXXX': 'Deutsche Bank AG',
      'DEUTDEDBHAN': 'Deutsche Bank AG'
    };
    
    return bankMap[bic] || 'Regionale Bank';
  };

  const updateBeitragsstatus = async (memberId: string, newStatus: string) => {
    try {
      const clubId = 'ksv-einbeck';
      const mitgliederCollection = `clubs/${clubId}/mitglieder`;
      const memberRef = doc(db, mitgliederCollection, memberId);
      
      const updateData: any = {
        beitragsstatus: newStatus,
        updatedAt: new Date()
      };
      
      if (newStatus === 'bezahlt') {
        updateData.letzteZahlung = new Date().toISOString().split('T')[0];
      }
      
      await updateDoc(memberRef, updateData);
      
      setMembers(prev => prev.map(m => 
        m.id === memberId ? { 
          ...m, 
          beitragsstatus: newStatus,
          letzteZahlung: newStatus === 'bezahlt' ? new Date().toISOString().split('T')[0] : m.letzteZahlung
        } : m
      ));
    } catch (error) {
      console.error('Fehler beim Update:', error);
      alert('Fehler beim Aktualisieren des Beitragsstatus');
    }
  };

  const saveBeitragssaetze = async () => {
    try {
      const clubId = 'ksv-einbeck';
      const clubRef = doc(db, 'clubs', clubId);
      
      await updateDoc(clubRef, {
        beitragssaetze: beitragssaetze,
        updatedAt: new Date()
      });
      
      alert('Beitragssätze erfolgreich gespeichert');
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      alert('Fehler beim Speichern der Beitragssätze');
    }
  };

  const addBeitragssatz = () => {
    if (!newBeitragssatz.name || !newBeitragssatz.betrag) {
      alert('Bitte Name und Betrag eingeben');
      return;
    }
    
    const id = newBeitragssatz.name.toLowerCase().replace(/\s+/g, '_');
    
    setBeitragssaetze((prev: any) => ({
      ...prev,
      [id]: {
        name: newBeitragssatz.name,
        alterVon: newBeitragssatz.alterVon ? parseInt(newBeitragssatz.alterVon) : null,
        alterBis: newBeitragssatz.alterBis ? parseInt(newBeitragssatz.alterBis) : null,
        betrag: parseFloat(newBeitragssatz.betrag),
        aktiv: newBeitragssatz.aktiv
      }
    }));
    
    setNewBeitragssatz({
      name: '',
      alterVon: '',
      alterBis: '',
      betrag: '',
      aktiv: true
    });
  };

  const deleteBeitragssatz = (id: string) => {
    if (confirm('Beitragssatz wirklich löschen?')) {
      setBeitragssaetze((prev: any) => {
        const newSaetze: any = { ...prev };
        delete newSaetze[id];
        return newSaetze;
      });
    }
  };

  const updateBeitragssatz = (id: string, updates: any) => {
    setBeitragssaetze((prev: any) => ({
      ...prev,
      [id]: { ...prev[id], ...updates }
    }));
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateSEPAXML = () => {
    const sepaMembers = (members || []).filter(m => m.sepaMandat && m.beitragsstatus === 'offen');
    
    if (sepaMembers.length === 0) {
      alert('Keine offenen SEPA-Lastschriften gefunden');
      return;
    }
    
    const totalAmount = sepaMembers.reduce((sum, m) => sum + m.jahresbeitrag, 0);
    const executionDate = new Date();
    executionDate.setDate(executionDate.getDate() + 5);
    
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<Document xmlns="urn:iso:std:iso:20022:tech:xsd:pain.008.001.02">
  <CstmrDrctDbtInitn>
    <GrpHdr>
      <MsgId>SGI-${Date.now()}</MsgId>
      <CreDtTm>${new Date().toISOString()}</CreDtTm>
      <NbOfTxs>${sepaMembers.length}</NbOfTxs>
      <CtrlSum>${totalAmount.toFixed(2)}</CtrlSum>
      <InitgPty>
        <Nm>${vereinsEinstellungen.vereinsname}</Nm>
      </InitgPty>
    </GrpHdr>
    <PmtInf>
      <PmtInfId>SGI-BEITRAG-${executionDate.getFullYear()}</PmtInfId>
      <PmtMtd>DD</PmtMtd>
      <NbOfTxs>${sepaMembers.length}</NbOfTxs>
      <CtrlSum>${totalAmount.toFixed(2)}</CtrlSum>
      <ReqdColltnDt>${executionDate.toISOString().split('T')[0]}</ReqdColltnDt>
      <Cdtr>
        <Nm>${vereinsEinstellungen.vereinsname}</Nm>
      </Cdtr>
      <CdtrAcct>
        <Id>
          <IBAN>${vereinsEinstellungen.iban}</IBAN>
        </Id>
      </CdtrAcct>
${sepaMembers.map(member => `      <DrctDbtTxInf>
        <PmtId>
          <EndToEndId>${member.sepaMandat.mandatsreferenz}</EndToEndId>
        </PmtId>
        <InstdAmt Ccy="EUR">${member.jahresbeitrag.toFixed(2)}</InstdAmt>
        <Dbtr>
          <Nm>${member.sepaMandat.kontoinhaber}</Nm>
        </Dbtr>
        <DbtrAcct>
          <Id>
            <IBAN>${member.sepaMandat.iban}</IBAN>
          </Id>
        </DbtrAcct>
        <RmtInf>
          <Ustrd>${member.sepaMandat.verwendungszweck}</Ustrd>
        </RmtInf>
      </DrctDbtTxInf>`).join('\n')}
    </PmtInf>
  </CstmrDrctDbtInitn>
</Document>`;
    
    downloadFile(xml, `SEPA-Lastschrift-${executionDate.toISOString().split('T')[0]}.xml`, 'application/xml');
  };

  const filteredMembers = (members || []).filter(member => {
    const matchesSearch = member.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.mitgliedsnummer?.includes(searchTerm);
    
    const matchesStatus = filterStatus === 'alle' || member.beitragsstatus === filterStatus;
    
    return matchesSearch && matchesStatus && member.isActive;
  }).sort((a, b) => {
    let aVal = a[sortField] || '';
    let bVal = b[sortField] || '';
    
    if (sortField === 'alter' || sortField === 'jahresbeitrag' || sortField === 'mahnungen') {
      aVal = parseInt(aVal) || 0;
      bVal = parseInt(bVal) || 0;
    } else if (sortField === 'letzteZahlung') {
      aVal = new Date(aVal || '1900-01-01');
      bVal = new Date(bVal || '1900-01-01');
    } else {
      aVal = String(aVal).toLowerCase();
      bVal = String(bVal).toLowerCase();
    }
    
    if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1;
    if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const statistiken = {
    gesamt: (members || []).filter(m => m.isActive).length,
    bezahlt: (members || []).filter(m => m.isActive && m.beitragsstatus === 'bezahlt').length,
    offen: (members || []).filter(m => m.isActive && m.beitragsstatus === 'offen').length,
    gesamtbeitrag: (members || []).filter(m => m.isActive).reduce((sum, m) => sum + (m.jahresbeitrag || 0), 0),
    offeneBeitraege: (members || []).filter(m => m.isActive && m.beitragsstatus === 'offen').reduce((sum, m) => sum + (m.jahresbeitrag || 0), 0)
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-10">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Lade Beitragsdaten...</p>
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
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-primary">💰 Beitragsverwaltung</h1>
        </div>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
          {userClub ? `Beitragsverwaltung für ${userClub.name}` : 'Beitragsverwaltung'}
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-4 md:mb-6">
        <div className="flex border-b overflow-x-auto">
          <button
            className={`px-3 md:px-4 py-2 font-medium text-sm md:text-base whitespace-nowrap ${
              activeTab === 'uebersicht'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('uebersicht')}
          >
            Übersicht
          </button>
          <button
            className={`px-3 md:px-4 py-2 font-medium text-sm md:text-base whitespace-nowrap ${
              activeTab === 'sepa'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('sepa')}
          >
            SEPA-Lastschrift
          </button>
          <button
            className={`px-3 md:px-4 py-2 font-medium text-sm md:text-base whitespace-nowrap ${
              activeTab === 'beitragssaetze'
                ? 'border-b-2 border-primary text-primary'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('beitragssaetze')}
          >
            Beitragssätze
          </button>
        </div>
      </div>

      {activeTab === 'uebersicht' && (
        <div>
          {/* Statistiken */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 md:gap-4 mb-4 md:mb-8">
            <Card>
              <CardContent className="p-2 md:p-4">
                <div className="text-lg md:text-2xl font-bold text-primary">{statistiken.gesamt}</div>
                <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400">Aktive Mitglieder</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-green-600">{statistiken.bezahlt}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Bezahlt</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-red-600">{statistiken.offen}</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Offen</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-blue-600">{statistiken.gesamtbeitrag}€</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Gesamtbeitrag</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="text-2xl font-bold text-orange-600">{statistiken.offeneBeitraege}€</div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Offene Beiträge</p>
              </CardContent>
            </Card>
          </div>

          {/* Filter und Suche */}
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Suchen (Name, Mitgl.-Nr.)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border rounded px-3 py-2"
                >
                  <option value="alle">Alle Status</option>
                  <option value="bezahlt">Bezahlt</option>
                  <option value="offen">Offen</option>
                </select>
                <Button onClick={generateSEPAXML} size="sm">
                  📄 SEPA-XML
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Beitragsliste */}
          <Card>
            <CardHeader>
              <CardTitle>Beitragsliste ({filteredMembers.length})</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Desktop Tabelle */}
              <div className="hidden lg:block w-full overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('mitgliedsnummer')}>Nr. {sortField === 'mitgliedsnummer' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                      <th className="text-left p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('lastName')}>Name {sortField === 'lastName' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                      <th className="text-center p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('alter')}>Alter {sortField === 'alter' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                      <th className="text-center p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('beitragskategorie')}>Kategorie {sortField === 'beitragskategorie' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                      <th className="text-center p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('jahresbeitrag')}>Beitrag {sortField === 'jahresbeitrag' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                      <th className="text-center p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('beitragsstatus')}>Status {sortField === 'beitragsstatus' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                      <th className="text-center p-2 cursor-pointer hover:bg-muted/70" onClick={() => handleSort('zahlungsart')}>Zahlungsart {sortField === 'zahlungsart' && (sortDirection === 'asc' ? '↑' : '↓')}</th>
                      <th className="text-left p-2">IBAN</th>
                      <th className="text-left p-2">Bank</th>
                      <th className="text-center p-2">Aktionen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map(member => (
                      <tr key={member.id} className="border-b hover:bg-muted/20">
                        <td className="p-2 font-mono font-bold">
                          {member.mitgliedsnummer ? `${member.mitgliedsnummer.padStart(3, '0')}` : '-'}
                        </td>
                        <td className="p-2 font-medium">
                          {member.firstName} {member.lastName}
                        </td>
                        <td className="p-2 text-center">{member.alter}</td>
                        <td className="p-2 text-center">
                          <Badge variant={
                            member.beitragskategorie === 'jugend' ? 'default' :
                            member.beitragskategorie === 'senioren' ? 'secondary' : 'outline'
                          }>
                            {beitragssaetze[member.beitragskategorie]?.name || 'Unbekannt'}
                          </Badge>
                        </td>
                        <td className="p-2 text-center font-medium">{member.jahresbeitrag}€</td>
                        <td className="p-2 text-center">
                          <Badge variant={member.beitragsstatus === 'bezahlt' ? 'default' : 'destructive'}>
                            {member.beitragsstatus === 'bezahlt' ? 'Bezahlt' : 'Offen'}
                          </Badge>
                        </td>
                        <td className="p-2 text-center">
                          <Badge variant={member.zahlungsart === 'sepa_lastschrift' ? 'secondary' : 'outline'}>
                            {member.zahlungsart === 'sepa_lastschrift' ? 'SEPA' : 'Überweisung'}
                          </Badge>
                        </td>
                        <td className="p-2 font-mono text-xs">
                          {member.sepaMandat?.iban ? 
                            `${member.sepaMandat.iban.substring(0, 8)}****${member.sepaMandat.iban.slice(-4)}` : 
                            '-'
                          }
                        </td>
                        <td className="p-2 text-xs">
                          {member.sepaMandat?.bankname || '-'}
                        </td>
                        <td className="p-2 text-center">
                          {member.beitragsstatus === 'offen' ? (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateBeitragsstatus(member.id, 'bezahlt')}
                            >
                              ✓ Bezahlt
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => updateBeitragsstatus(member.id, 'offen')}
                            >
                              ↩ Offen
                            </Button>
                          )}
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
                          <p className="text-sm text-muted-foreground">
                            Mitgl.-Nr. {member.mitgliedsnummer || '-'} • {member.jahresbeitrag}€
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Badge variant={member.beitragsstatus === 'bezahlt' ? 'default' : 'destructive'}>
                            {member.beitragsstatus === 'bezahlt' ? 'Bezahlt' : 'Offen'}
                          </Badge>
                          <Badge variant={member.zahlungsart === 'sepa_lastschrift' ? 'secondary' : 'outline'}>
                            {member.zahlungsart === 'sepa_lastschrift' ? 'SEPA' : 'Überweisung'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-muted-foreground w-20">Kategorie:</span>
                          <Badge variant="outline">
                            {beitragssaetze[member.beitragskategorie]?.name || 'Unbekannt'}
                          </Badge>
                        </div>
                        {member.sepaMandat && (
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground w-20">SEPA:</span>
                            <span className="font-mono text-xs">
                              {member.sepaMandat.iban.substring(0, 8)}****{member.sepaMandat.iban.slice(-4)}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        {member.beitragsstatus === 'offen' ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateBeitragsstatus(member.id, 'bezahlt')}
                            className="flex-1"
                          >
                            ✓ Als bezahlt markieren
                          </Button>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateBeitragsstatus(member.id, 'offen')}
                            className="flex-1"
                          >
                            ↩ Als offen markieren
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'sepa' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SEPA-Lastschrift Verwaltung</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-green-600">
                      {(members || []).filter(m => m.zahlungsart === 'sepa_lastschrift').length}
                    </div>
                    <p className="text-sm text-gray-600">SEPA-Lastschrift</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-blue-600">
                      {(members || []).filter(m => m.zahlungsart === 'ueberweisung').length}
                    </div>
                    <p className="text-sm text-gray-600">Überweisung</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-purple-600">
                      {(members || []).filter(m => m.sepaMandat).length}
                    </div>
                    <p className="text-sm text-gray-600">SEPA-Mandate</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-4">
                    <div className="text-2xl font-bold text-orange-600">
                      {(members || []).filter(m => m.sepaMandat && m.beitragsstatus === 'offen').length}
                    </div>
                    <p className="text-sm text-gray-600">Offene SEPA</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-2 mb-4">
                <Button onClick={generateSEPAXML}>
                  📄 SEPA-XML erstellen
                </Button>
                <Button variant="outline">
                  📊 CSV Export
                </Button>
              </div>

              <div className="space-y-4">
                {(members || []).filter(m => m.sepaMandat).map(member => (
                  <Card key={member.id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{member.firstName} {member.lastName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {member.sepaMandat.mandatsreferenz} • {member.sepaMandat.bankname}
                          </p>
                          <p className="text-xs font-mono text-gray-500">
                            {member.sepaMandat.iban.substring(0, 8)}****{member.sepaMandat.iban.slice(-4)}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">{member.jahresbeitrag}€</div>
                          <Badge variant={member.beitragsstatus === 'bezahlt' ? 'default' : 'destructive'}>
                            {member.beitragsstatus === 'bezahlt' ? 'Bezahlt' : 'Offen'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'beitragssätze' && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Beitragssätze verwalten</CardTitle>
                <Button onClick={saveBeitragssaetze}>
                  💾 Speichern
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(beitragssaetze).map(([id, satz]) => {
                  const satzObj = satz as any;
                  return (
                  <Card key={id} className="border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-5 gap-4">
                          <div>
                            <label className="text-sm font-medium">Name</label>
                            <Input
                              value={satzObj.name}
                              onChange={(e) => updateBeitragssatz(id, { name: e.target.value })}
                              placeholder="z.B. Erwachsene"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Alter von</label>
                            <Input
                              type="number"
                              value={satzObj.alterVon || ''}
                              onChange={(e) => updateBeitragssatz(id, { alterVon: e.target.value ? parseInt(e.target.value) : null })}
                              placeholder="z.B. 18"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Alter bis</label>
                            <Input
                              type="number"
                              value={satzObj.alterBis || ''}
                              onChange={(e) => updateBeitragssatz(id, { alterBis: e.target.value ? parseInt(e.target.value) : null })}
                              placeholder="z.B. 65"
                            />
                          </div>
                          <div>
                            <label className="text-sm font-medium">Betrag (€)</label>
                            <Input
                              type="number"
                              step="0.01"
                              value={satzObj.betrag}
                              onChange={(e) => updateBeitragssatz(id, { betrag: parseFloat(e.target.value) })}
                              placeholder="120.00"
                            />
                          </div>
                          <div className="flex items-end gap-2">
                            <label className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={satzObj.aktiv}
                                onChange={(e) => updateBeitragssatz(id, { aktiv: e.target.checked })}
                              />
                              <span className="text-sm">Aktiv</span>
                            </label>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600"
                              onClick={() => deleteBeitragssatz(id)}
                            >
                              Löschen
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  );
                })}
                
                {/* Neuer Beitragssatz */}
                <Card className="border-dashed border-2">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-4">Neuen Beitragssatz hinzufügen</h3>
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                      <div>
                        <label className="text-sm font-medium">Name</label>
                        <Input
                          value={newBeitragssatz.name}
                          onChange={(e) => setNewBeitragssatz({...newBeitragssatz, name: e.target.value})}
                          placeholder="z.B. Studenten"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Alter von</label>
                        <Input
                          type="number"
                          value={newBeitragssatz.alterVon}
                          onChange={(e) => setNewBeitragssatz({...newBeitragssatz, alterVon: e.target.value})}
                          placeholder="18"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Alter bis</label>
                        <Input
                          type="number"
                          value={newBeitragssatz.alterBis}
                          onChange={(e) => setNewBeitragssatz({...newBeitragssatz, alterBis: e.target.value})}
                          placeholder="25"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Betrag (€)</label>
                        <Input
                          type="number"
                          step="0.01"
                          value={newBeitragssatz.betrag}
                          onChange={(e) => setNewBeitragssatz({...newBeitragssatz, betrag: e.target.value})}
                          placeholder="80.00"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button onClick={addBeitragssatz} className="w-full">
                          + Hinzufügen
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}