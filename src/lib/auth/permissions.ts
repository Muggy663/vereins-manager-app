import { UserRole, ClubPermission } from '@/types';

// Role-based permissions mapping
const ROLE_PERMISSIONS: Record<UserRole, ClubPermission[]> = {
  VORSTAND: [
    'members.read',
    'members.write',
    'finances.read',
    'finances.write',
    'events.read',
    'events.write',
    'settings.read',
    'settings.write',
  ],
  KASSENWART: [
    'members.read',
    'finances.read',
    'finances.write',
    'events.read',
    'settings.read',
  ],
  SPORTLEITER: [
    'members.read',
    'events.read',
    'events.write',
  ],
  MITGLIED: [
    'events.read',
  ],
};

export function hasPermission(
  userRole: UserRole | undefined,
  requiredPermission: ClubPermission
): boolean {
  if (!userRole) return false;
  
  const permissions = ROLE_PERMISSIONS[userRole];
  return permissions.includes(requiredPermission);
}

export function canAccessMembers(userRole: UserRole | undefined): boolean {
  return hasPermission(userRole, 'members.read');
}

export function canManageMembers(userRole: UserRole | undefined): boolean {
  return hasPermission(userRole, 'members.write');
}

export function canAccessFinances(userRole: UserRole | undefined): boolean {
  return hasPermission(userRole, 'finances.read');
}

export function canManageFinances(userRole: UserRole | undefined): boolean {
  return hasPermission(userRole, 'finances.write');
}