"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Settings, CreditCard, Shield, Database, Mail, Users, UserPlus, Edit, Trash2, Target, FileText } from 'lucide-react';

export default function EinstellungenPage() {
  const [customRoles, setCustomRoles] = useState([
    {
      id: 'schuetzenwart',
      name: 'Schützenwart',
      permissions: ['shooting_logs_all', 'competitions_manage', 'safety_protocols'],
      color: 'blue',
      icon: 'target',
      members: 2
    },
    {
      id: 'jugendwart', 
      name: 'Jugendwart',
      permissions: ['youth_training', 'members_youth_only', 'events_youth'],
      color: 'green',
      icon: 'users',
      members: 1
    }
  ]);

  const [isNewRoleOpen, setIsNewRoleOpen] = useState(false);
  const [newRole, setNewRole] = useState<any>({ name: '', permissions: [], color: 'blue', icon: 'users' });

  const availablePermissions = [
    { id: 'members_read', name: 'Mitglieder anzeigen', category: 'Mitglieder' },
    { id: 'members_write', name: 'Mitglieder bearbeiten', category: 'Mitglieder' },
    { id: 'finances_read', name: 'Finanzen einsehen', category: 'Finanzen' },
    { id: 'finances_write', name: 'Finanzen verwalten', category: 'Finanzen' },
    { id: 'shooting_logs_all', name: 'Alle Schießbücher', category: 'Schießsport' },
    { id: 'competitions_manage', name: 'Wettkämpfe verwalten', category: 'Schießsport' },
    { id: 'youth_training', name: 'Jugendtraining', category: 'Schießsport' },
    { id: 'safety_protocols', name: 'Sicherheitsprotokolle', category: 'Sicherheit' },
    { id: 'equipment_manage', name: 'Ausrüstung verwalten', category: 'Sicherheit' },
    { id: 'events_read', name: 'Termine einsehen', category: 'Termine' },
    { id: 'events_write', name: 'Termine verwalten', category: 'Termine' },
    { id: 'protocols_read', name: 'Protokolle lesen', category: 'Verwaltung' },
    { id: 'protocols_write', name: 'Protokolle erstellen', category: 'Verwaltung' },
    { id: 'settings_manage', name: 'Einstellungen verwalten', category: 'Verwaltung' }
  ];

  const colors = ['blue', 'green', 'red', 'purple', 'yellow', 'orange'];
  const icons = ['users', 'target', 'shield', 'file-text', 'calendar', 'award'];

  const roleTemplates = [
    {
      name: 'Kassierer',
      permissions: ['finances_read', 'finances_write', 'members_read'],
      color: 'green',
      icon: 'credit-card'
    },
    {
      name: 'Schriftführer', 
      permissions: ['protocols_write', 'events_write', 'members_read'],
      color: 'blue',
      icon: 'file-text'
    },
    {
      name: 'Zeugwart',
      permissions: ['equipment_manage', 'safety_protocols', 'members_read'],
      color: 'orange',
      icon: 'shield'
    },
    {
      name: 'Trainer C',
      permissions: ['youth_training', 'shooting_logs_all', 'events_write'],
      color: 'purple',
      icon: 'users'
    },
    {
      name: 'Standaufsicht',
      permissions: ['safety_protocols', 'shooting_logs_all', 'events_read'],
      color: 'red',
      icon: 'shield'
    },
    {
      name: 'Wettkampfleiter',
      permissions: ['competitions_manage', 'shooting_logs_all', 'events_write'],
      color: 'yellow',
      icon: 'target'
    },
    {
      name: 'Pressewart',
      permissions: ['events_write', 'members_read', 'protocols_read'],
      color: 'indigo',
      icon: 'megaphone'
    },
    {
      name: 'Ehrenmitglied',
      permissions: ['events_read', 'protocols_read'],
      color: 'amber',
      icon: 'award'
    }
  ];

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
          <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-primary">⚙️ Vereinseinstellungen</h1>
        </div>
        <p className="text-sm md:text-base lg:text-lg text-muted-foreground">
          SEPA-Konfiguration, Beitragssätze und allgemeine Einstellungen
        </p>
      </div>

      <div className="space-y-6">
        <Card className="bg-green-50 border-green-200">
          <CardHeader>
            <CardTitle className="text-green-800 flex items-center gap-2">
              <CreditCard className="h-6 w-6" />
              Finanzen & SEPA
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <h4 className="font-semibold mb-2">💰 Beitragsverwaltung:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Beitragssätze nach Altersgruppen</li>
                  <li>Familienbeiträge & Ermäßigungen</li>
                  <li>Aufnahmegebühren konfigurieren</li>
                  <li>Sonderbeiträge (Schießstand, Events)</li>
                  <li>Rabatte für Langzeitmitglieder</li>
                  <li>Beitragsbefreiungen verwalten</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🏦 SEPA & Banking:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>SEPA-Mandate verwalten</li>
                  <li>Bankverbindungen konfigurieren</li>
                  <li>Lastschrift-Zyklen festlegen</li>
                  <li>Mahnwesen automatisieren</li>
                  <li>Rücklastschriften bearbeiten</li>
                  <li>Kassenprüfung vorbereiten</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-800 flex items-center gap-2">
              <Settings className="h-6 w-6" />
              Vereinskonfiguration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-blue-700">
              <div>
                <h4 className="font-semibold mb-2">🏛️ Vereinsdaten:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Vereinsdaten & Satzung hinterlegen</li>
                  <li>Vorstandsrollen definieren</li>
                  <li>Vereinsregister-Nummer</li>
                  <li>Gemeinnützigkeits-Status</li>
                  <li>Versicherungsdaten</li>
                  <li>Behördliche Genehmigungen</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">👥 Benutzer & Rechte:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Benutzerrechte verwalten</li>
                  <li>Rollen-basierte Zugriffe</li>
                  <li>Vorstand-Berechtigungen</li>
                  <li>Trainer-Zugriffe</li>
                  <li>Mitglieder-Portal</li>
                  <li>Gäste-Accounts</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-purple-50 border-purple-200">
          <CardHeader>
            <CardTitle className="text-purple-800 flex items-center gap-2">
              <Shield className="h-6 w-6" />
              Datenschutz & Sicherheit
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-purple-700">
              <div>
                <h4 className="font-semibold mb-2">🔒 DSGVO-Compliance:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Datenschutz-Einstellungen</li>
                  <li>Einverständniserklärungen</li>
                  <li>Datenaufbewahrung konfigurieren</li>
                  <li>Löschfristen automatisieren</li>
                  <li>Auskunftsrechte verwalten</li>
                  <li>Datenschutzbeauftragte</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">🛡️ Sicherheit:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Backup & Export-Funktionen</li>
                  <li>Zwei-Faktor-Authentifizierung</li>
                  <li>Passwort-Richtlinien</li>
                  <li>Audit-Logs</li>
                  <li>Verschlüsselung konfigurieren</li>
                  <li>Notfall-Zugriffe</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-orange-50 border-orange-200">
          <CardHeader>
            <CardTitle className="text-orange-800 flex items-center gap-2">
              <Mail className="h-6 w-6" />
              Kommunikation & Templates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-orange-700">
              <div>
                <h4 className="font-semibold mb-2">📧 E-Mail-System:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>E-Mail-Templates anpassen</li>
                  <li>Automatische Benachrichtigungen</li>
                  <li>Newsletter-Verwaltung</li>
                  <li>Erinnerungs-E-Mails</li>
                  <li>Geburtstags-Grüße</li>
                  <li>Mahnungs-Templates</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">📱 Digitale Kommunikation:</h4>
                <ul className="space-y-1 list-disc list-inside">
                  <li>SMS-Benachrichtigungen</li>
                  <li>Push-Notifications</li>
                  <li>WhatsApp-Integration</li>
                  <li>Vereins-App Einstellungen</li>
                  <li>Social Media Links</li>
                  <li>Website-Integration</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Rollen-Management */}
        <Card className="bg-indigo-50 border-indigo-200">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-indigo-800 flex items-center gap-2">
                <Users className="h-6 w-6" />
                Rollen-Management
              </CardTitle>
              <Dialog open={isNewRoleOpen} onOpenChange={setIsNewRoleOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Neue Rolle
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Neue Rolle erstellen</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>Rollenname</Label>
                        <Input 
                          value={newRole.name}
                          onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                          placeholder="z.B. Kassierer"
                        />
                      </div>
                      <div>
                        <Label>Farbe</Label>
                        <select 
                          value={newRole.color}
                          onChange={(e) => setNewRole({...newRole, color: e.target.value})}
                          className="w-full border rounded px-3 py-2"
                        >
                          {colors.map(color => (
                            <option key={color} value={color}>{color}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    
                    <div>
                      <Label>Berechtigungen</Label>
                      <div className="border rounded p-3 max-h-48 overflow-y-auto">
                        {availablePermissions.map(perm => (
                          <label key={perm.id} className="flex items-center gap-2 p-2 hover:bg-gray-50">
                            <input 
                              type="checkbox"
                              checked={newRole.permissions.includes(perm.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setNewRole({...newRole, permissions: [...newRole.permissions, perm.id]});
                                } else {
                                  setNewRole({...newRole, permissions: newRole.permissions.filter((p: any) => p !== perm.id)});
                                }
                              }}
                            />
                            <span className="text-sm">{perm.name}</span>
                            <Badge variant="outline" className="text-xs">{perm.category}</Badge>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end gap-2 mt-6">
                    <Button variant="outline" onClick={() => setIsNewRoleOpen(false)}>Abbrechen</Button>
                    <Button onClick={() => {
                      if (newRole.name) {
                        setCustomRoles([...customRoles, {
                          id: newRole.name.toLowerCase().replace(/\s+/g, '_'),
                          ...newRole,
                          members: 0
                        }]);
                        setNewRole({ name: '', permissions: [], color: 'blue', icon: 'users' });
                        setIsNewRoleOpen(false);
                      }
                    }}>Erstellen</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Standard-Rollen */}
              <div>
                <h4 className="font-semibold mb-2 text-indigo-700">🛡️ Standard-Rollen:</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="border rounded-lg p-3 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-red-100 text-red-800">Vereinsadmin</Badge>
                      <span className="text-sm text-gray-500">1 Mitglied</span>
                    </div>
                    <p className="text-xs text-gray-600">Vollzugriff auf alle Funktionen</p>
                  </div>
                  <div className="border rounded-lg p-3 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-blue-100 text-blue-800">Mitglied</Badge>
                      <span className="text-sm text-gray-500">45 Mitglieder</span>
                    </div>
                    <p className="text-xs text-gray-600">Schießbuch, Termine einsehen</p>
                  </div>
                  <div className="border rounded-lg p-3 bg-white">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className="bg-gray-100 text-gray-800">Wartend</Badge>
                      <span className="text-sm text-gray-500">3 Personen</span>
                    </div>
                    <p className="text-xs text-gray-600">Warten auf Freigabe</p>
                  </div>
                </div>
              </div>

              {/* Benutzerdefinierte Rollen */}
              <div>
                <h4 className="font-semibold mb-2 text-indigo-700">⚙️ Vereins-spezifische Rollen:</h4>
                <div className="space-y-3">
                  {customRoles.map(role => (
                    <div key={role.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Badge className={`bg-${role.color}-100 text-${role.color}-800`}>
                            {role.name}
                          </Badge>
                          <span className="text-sm text-gray-500">{role.members} Mitglieder</span>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {role.permissions.slice(0, 3).map(perm => {
                          const permInfo = availablePermissions.find(p => p.id === perm);
                          return (
                            <Badge key={perm} variant="outline" className="text-xs">
                              {permInfo?.name || perm}
                            </Badge>
                          );
                        })}
                        {role.permissions.length > 3 && (
                          <Badge variant="outline" className="text-xs text-gray-500">
                            +{role.permissions.length - 3} weitere
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rollen-Templates */}
              <div className="mt-6 p-4 bg-indigo-100 rounded-lg">
                <h4 className="font-semibold mb-3 text-indigo-800">💡 Rollen-Vorlagen für Schützenvereine:</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {roleTemplates.map(template => (
                    <Button
                      key={template.name}
                      variant="outline"
                      size="sm"
                      className="h-auto p-2 flex flex-col items-center gap-1 text-xs"
                      onClick={() => {
                        const roleExists = customRoles.some(role => role.name === template.name);
                        if (!roleExists) {
                          setCustomRoles([...customRoles, {
                            id: template.name.toLowerCase().replace(/\s+/g, '_'),
                            name: template.name,
                            permissions: template.permissions,
                            color: template.color,
                            icon: template.icon,
                            members: 0
                          }]);
                        }
                      }}
                    >
                      <span className={`w-6 h-6 rounded bg-${template.color}-100 flex items-center justify-center`}>
                        {template.name.charAt(0)}
                      </span>
                      {template.name}
                    </Button>
                  ))}
                </div>
                <p className="text-xs text-indigo-600 mt-2">
                  Klicken Sie auf eine Vorlage, um sie als neue Rolle hinzuzufügen.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}