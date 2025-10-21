'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { VereinsAppUserPermission, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  userRole: UserRole | null;
  clubId: string | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [clubId, setClubId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      
      if (user) {
        try {
          const permissionDoc = await getDoc(doc(db, 'user_permissions', user.uid));
          if (permissionDoc.exists()) {
            const permissions = permissionDoc.data() as VereinsAppUserPermission;
            const firstClubId = Object.keys(permissions.clubRoles)[0];
            setClubId(firstClubId || 'ksv-einbeck');
            setUserRole(permissions.clubRoles[firstClubId] || 'MITGLIED');
          } else {
            // Erstelle User Permissions für Demo-User
            const newPermissions: VereinsAppUserPermission = {
              uid: user.uid,
              email: user.email || '',
              clubRoles: {
                'ksv-einbeck': 'VORSTAND'
              }
            };
            
            await setDoc(doc(db, 'user_permissions', user.uid), newPermissions);
            setClubId('ksv-einbeck');
            setUserRole('VORSTAND');
          }
        } catch (error) {
          console.error('Error with user permissions:', error);
          // Fallback
          setClubId('ksv-einbeck');
          setUserRole('VORSTAND');
        }
      } else {
        setUserRole(null);
        setClubId(null);
      }
      
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signOut = async () => {
    await auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, userRole, clubId, loading, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}