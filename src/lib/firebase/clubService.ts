import { db } from './config';
import { collection, doc, getDoc, getDocs, query, where, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { ClubMember, Club } from '@/types';
import { getUserClubPermissions, hasClubAccess, sanitizeMemberData } from '@/lib/auth/security';
import { User } from 'firebase/auth';

/**
 * Sichere Club-Service-Funktionen mit strikter Vereinstrennung
 */

export class ClubService {
  private user: User;
  private clubId: string | null = null;
  private userRole: string | null = null;

  constructor(user: User) {
    this.user = user;
  }

  async initialize() {
    const permissions = await getUserClubPermissions(this.user);
    if (permissions) {
      this.clubId = permissions.clubId;
      this.userRole = permissions.role;
    }
  }

  private ensureClubAccess(requestedClubId?: string): string {
    const targetClubId = requestedClubId || this.clubId;
    if (!targetClubId || !hasClubAccess(this.clubId, targetClubId)) {
      throw new Error('Keine Berechtigung für diesen Verein');
    }
    return targetClubId;
  }

  // Mitglieder abrufen (DSGVO-konform)
  async getMembers(clubId?: string): Promise<ClubMember[]> {
    const targetClubId = this.ensureClubAccess(clubId);
    
    const membersRef = collection(db, 'clubs', targetClubId, 'mitglieder');
    const snapshot = await getDocs(membersRef);
    
    return snapshot.docs.map(doc => {
      const data = { id: doc.id, ...doc.data() } as ClubMember;
      return sanitizeMemberData(data, this.userRole as any);
    });
  }

  // Mitglied abrufen
  async getMember(memberId: string, clubId?: string): Promise<ClubMember | null> {
    const targetClubId = this.ensureClubAccess(clubId);
    
    const memberDoc = await getDoc(doc(db, 'clubs', targetClubId, 'mitglieder', memberId));
    if (!memberDoc.exists()) return null;
    
    const data = { id: memberDoc.id, ...memberDoc.data() } as ClubMember;
    return sanitizeMemberData(data, this.userRole as any);
  }

  // Mitglied erstellen (nur berechtigt)
  async createMember(memberData: Omit<ClubMember, 'id'>, clubId?: string): Promise<string> {
    const targetClubId = this.ensureClubAccess(clubId);
    
    if (this.userRole !== 'VORSTAND' && this.userRole !== 'KASSENWART') {
      throw new Error('Keine Berechtigung zum Erstellen von Mitgliedern');
    }

    const membersRef = collection(db, 'clubs', targetClubId, 'mitglieder');
    const docRef = await addDoc(membersRef, {
      ...memberData,
      createdAt: new Date(),
      updatedAt: new Date(),
      createdBy: this.user.uid
    });
    
    return docRef.id;
  }

  // Mitglied aktualisieren (nur berechtigt)
  async updateMember(memberId: string, updates: Partial<ClubMember>, clubId?: string): Promise<void> {
    const targetClubId = this.ensureClubAccess(clubId);
    
    if (this.userRole !== 'VORSTAND' && this.userRole !== 'KASSENWART') {
      throw new Error('Keine Berechtigung zum Bearbeiten von Mitgliedern');
    }

    const memberRef = doc(db, 'clubs', targetClubId, 'mitglieder', memberId);
    await updateDoc(memberRef, {
      ...updates,
      updatedAt: new Date(),
      updatedBy: this.user.uid
    });
  }

  // Mitglied löschen (nur Vorstand)
  async deleteMember(memberId: string, clubId?: string): Promise<void> {
    const targetClubId = this.ensureClubAccess(clubId);
    
    if (this.userRole !== 'VORSTAND') {
      throw new Error('Nur der Vorstand kann Mitglieder löschen');
    }

    const memberRef = doc(db, 'clubs', targetClubId, 'mitglieder', memberId);
    await deleteDoc(memberRef);
  }

  // Club-Informationen abrufen
  async getClub(clubId?: string): Promise<Club | null> {
    const targetClubId = this.ensureClubAccess(clubId);
    
    const clubDoc = await getDoc(doc(db, 'clubs', targetClubId));
    if (!clubDoc.exists()) return null;
    
    return { id: clubDoc.id, ...clubDoc.data() } as Club;
  }

  // Getter für aktuelle Berechtigungen
  get currentClubId(): string | null {
    return this.clubId;
  }

  get currentUserRole(): string | null {
    return this.userRole;
  }
}