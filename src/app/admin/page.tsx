"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Users, UserCheck, UserX, Clock, Mail, Shield } from 'lucide-react';
import { collection, getDocs, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase/config';
import { isDemoMode } from '@/lib/firebase/mockData';

export default function AdminPage() {
  const [pendingUsers, setPendingUsers] = useState<any[]>([]);
  const [allUsers, setAllUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState('member');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const clubId = 'ksv-einbeck';

  const roles = [
    { id: 'member', name: 'Mitglied', color: 'blue' },
    { id: 'trainer', name: 'Trainer', color: 'green' },
    { id: 'board', name: 'Vorstand', color: 'purple' },
    { id: 'admin', name: 'Admin', color: 'red' }
  ];

  useEffect(() => {
    // Prüfe Authentication für Admin-Bereich
    const checkAuth = async () => {
      try {
        // Simuliere Auth-Check - in Produktion echte Firebase Auth verwenden
        const isLoggedIn = !isDemoMode() && localStorage.getItem('real_admin_mode') === 'true';
        setIsAuthenticated(isLoggedIn);
        
        if (isLoggedIn) {
          loadPendingUsers();
          loadAllUsers();
        }
      } catch (error) {
        console.error('Auth-Fehler:', error);
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);

  const loadPendingUsers = async () => {
    try {
      const pendingSnapshot = await getDocs(collection(db, `clubs/${clubId}/pending_users`));
      const pendingList = pendingSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPendingUsers(pendingList);
    } catch (error) {
      console.error('Fehler beim Laden der wartenden Benutzer:', error);
    }
  };

  const loadAllUsers = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, 'user_permissions'));
      const usersList = usersSnapshot.docs
        .filter(doc => doc.data().clubId === clubId)
        .map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
      setAllUsers(usersList);
    } catch (error) {
      console.error('Fehler beim Laden aller Benutzer:', error);
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (userId: string, role: string) => {
    try {
      // Update user permissions
      await updateDoc(doc(db, 'user_permissions', userId), {
        role: role,
        status: 'active',
        approvedBy: 'current-admin-id', // Später dynamisch
        approvedAt: new Date()
      });

      // Remove from pending
      await deleteDoc(doc(db, `clubs/${clubId}/pending_users`, userId));

      // Reload data
      loadPendingUsers();
      loadAllUsers();
    } catch (error) {
      console.error('Fehler beim Freischalten:', error);
    }
  };

  const rejectUser = async (userId: string) => {
    try {
      // Remove from pending
      await deleteDoc(doc(db, `clubs/${clubId}/pending_users`, userId));
      
      // Update permissions to rejected
      await updateDoc(doc(db, 'user_permissions', userId), {
        status: 'rejected',
        rejectedBy: 'current-admin-id',
        rejectedAt: new Date()
      });

      loadPendingUsers();
      loadAllUsers();
    } catch (error) {
      console.error('Fehler beim Ablehnen:', error);
    }
  };

  const changeUserRole = async (userId: string, newRole: string) => {
    try {
      await updateDoc(doc(db, 'user_permissions', userId), {
        role: newRole,
        updatedAt: new Date()
      });
      loadAllUsers();
    } catch (error) {
      console.error('Fehler beim Ändern der Rolle:', error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Lade Benutzerdaten...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">🔒 Admin-Bereich</h1>
          <p className="text-gray-600 mb-6">Dieser Bereich ist nur für Administratoren zugänglich.</p>
          <div className="space-y-4">
            <Button 
              onClick={() => window.location.href = '/login'}
              className="w-full"
            >
              Anmelden
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.history.back()}
              className="w-full"
            >
              ← Zurück zum Dashboard
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => window.history.back()}
            className="mr-4"
          >
            ← Zurück
          </Button>
          <h1 className="text-2xl lg:text-4xl font-bold text-primary">👥 Benutzer-Verwaltung</h1>
        </div>
        <p className="text-base lg:text-lg text-muted-foreground">
          Neue Mitglieder freischalten und Rollen verwalten
        </p>
      </div>

      {/* Statistiken */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-yellow-600">{pendingUsers.length}</div>
            <p className="text-sm text-gray-600">Wartende Benutzer</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-600">
              {allUsers.filter(u => u.status === 'active').length}
            </div>
            <p className="text-sm text-gray-600">Aktive Benutzer</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-blue-600">
              {allUsers.filter(u => u.role === 'member').length}
            </div>
            <p className="text-sm text-gray-600">Mitglieder</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-purple-600">
              {allUsers.filter(u => ['admin', 'board'].includes(u.role)).length}
            </div>
            <p className="text-sm text-gray-600">Vorstand/Admins</p>
          </CardContent>
        </Card>
      </div>

      {/* Wartende Benutzer */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Wartende Freischaltungen ({pendingUsers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingUsers.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Keine wartenden Benutzer</p>
          ) : (
            <div className="space-y-4">
              {pendingUsers.map(user => (
                <div key={user.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{user.firstName} {user.lastName}</h3>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">
                        Angemeldet: {new Date(user.requestedAt?.toDate()).toLocaleDateString('de-DE')}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" onClick={() => setSelectedUser(user)}>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Freischalten
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Benutzer freischalten</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <p>Rolle für <strong>{user.firstName} {user.lastName}</strong> auswählen:</p>
                            <select
                              value={selectedRole}
                              onChange={(e) => setSelectedRole(e.target.value)}
                              className="w-full border rounded px-3 py-2"
                            >
                              {roles.map(role => (
                                <option key={role.id} value={role.id}>{role.name}</option>
                              ))}
                            </select>
                            <div className="flex gap-2">
                              <Button onClick={() => approveUser(user.id, selectedRole)}>
                                Freischalten
                              </Button>
                              <Button variant="outline" onClick={() => setSelectedUser(null)}>
                                Abbrechen
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-red-600"
                        onClick={() => rejectUser(user.id)}
                      >
                        <UserX className="h-4 w-4 mr-2" />
                        Ablehnen
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Alle Benutzer */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Alle Benutzer ({allUsers.filter(u => u.status === 'active').length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {allUsers.filter(u => u.status === 'active').map(user => {
              const role = roles.find(r => r.id === user.role);
              return (
                <div key={user.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="font-medium">Benutzer ID: {user.id}</p>
                        <p className="text-sm text-gray-600">
                          Seit: {new Date(user.approvedAt?.toDate()).toLocaleDateString('de-DE')}
                        </p>
                      </div>
                      <Badge className={`bg-${role?.color}-100 text-${role?.color}-800`}>
                        {role?.name || user.role}
                      </Badge>
                    </div>
                    <select
                      value={user.role}
                      onChange={(e) => changeUserRole(user.id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm"
                    >
                      {roles.map(role => (
                        <option key={role.id} value={role.id}>{role.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}