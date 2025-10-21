import { db } from '@/lib/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { User } from 'firebase/auth';
import { VereinsAppUserPermission, UserRole } from '@/types';

/**
 * DSGVO-konforme Sicherheitsfunktionen
 */

export async function getUserClubPermissions(user: User): Promise<{clubId: string, role: UserRole} | null> {
  if (!user) return null;
  
  try {
    const permissionDoc = await getDoc(doc(db, 'user_permissions', user.uid));
    if (!permissionDoc.exists()) return null;
    
    const permissions = permissionDoc.data() as VereinsAppUserPermission;
    const clubIds = Object.keys(permissions.clubRoles);
    
    if (clubIds.length === 0) return null;
    
    // Ersten Verein zurückgeben (Multi-Verein später)
    const clubId = clubIds[0];
    const role = permissions.clubRoles[clubId];
    
    return { clubId, role };
  } catch (error) {
    console.error('Error fetching user permissions:', error);
    return null;
  }
}

export function hasClubAccess(userClubId: string | null, requestedClubId: string): boolean {
  return userClubId === requestedClubId;
}

export function canAccessMembers(role: UserRole | null): boolean {
  return role !== null;
}

export function canEditMembers(role: UserRole | null): boolean {
  return role === 'VORSTAND' || role === 'KASSENWART';
}

export function canAccessFinances(role: UserRole | null): boolean {
  return role === 'VORSTAND' || role === 'KASSENWART';
}

export function canManageClub(role: UserRole | null): boolean {
  return role === 'VORSTAND';
}

/**
 * DSGVO: Datenminimierung - nur notwendige Felder zurückgeben
 */
export function sanitizeMemberData(member: any, userRole: UserRole | null) {
  const baseData = {
    id: member.id,
    firstName: member.firstName,
    lastName: member.lastName,
    isActive: member.isActive,
    mitgliedsnummer: member.mitgliedsnummer
  };

  // Erweiterte Daten nur für berechtigte Rollen
  if (userRole === 'VORSTAND' || userRole === 'KASSENWART') {
    return {
      ...baseData,
      email: member.email,
      telefon: member.telefon,
      mobil: member.mobil,
      strasse: member.strasse,
      plz: member.plz,
      ort: member.ort,
      geburtstag: member.geburtstag,
      beitragsstatus: member.beitragsstatus,
      jahresbeitrag: member.jahresbeitrag
    };
  }

  // Finanz-/SEPA-Daten nur für Kassenwart und Vorstand
  if ((userRole as any) === 'KASSENWART' || (userRole as any) === 'VORSTAND' || (userRole as any) === 'admin') {
    return {
      ...member,
      sepa: member.sepa
    };
  }

  return baseData;
}