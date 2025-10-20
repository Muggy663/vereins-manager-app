// Shared TypeScript interfaces for Vereins-Manager

export interface Club {
  id: string;
  name: string;
  logoUrl?: string;
  subscriptionStatus: 'active' | 'trial' | 'canceled';
  settings: {
    sepa: SEPASettings;
    beitraege: BeitragSettings;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface SEPASettings {
  glaeubigerID: string;
  vereinsname: string;
  adresse: string;
  plz: string;
  ort: string;
  email: string;
  iban: string;
  bic: string;
  bankname: string;
  verwendungszweck: string;
}

export interface BeitragSettings {
  erwachsene: BeitragKategorie;
  jugend: BeitragKategorie;
  senioren: BeitragKategorie;
  familie: BeitragKategorie;
}

export interface BeitragKategorie {
  name: string;
  alterVon: number | null;
  alterBis: number | null;
  betrag: number;
  aktiv: boolean;
}

export interface VereinsAppUserPermission {
  uid: string;
  email: string;
  clubRoles: {
    [clubId: string]: 'VORSTAND' | 'KASSENWART' | 'MITGLIED' | 'SPORTLEITER';
  };
}

export interface ClubMember {
  id: string;
  firstName: string;
  lastName: string;
  email?: string;
  telefon?: string;
  mobil?: string;
  strasse?: string;
  plz?: string;
  ort?: string;
  geburtstag?: string;
  vereinseintritt?: string;
  dsbeintritt?: string;
  gender: 'male' | 'female';
  isActive: boolean;
  sepa?: SEPAMandat;
  beitragsstatus: 'offen' | 'bezahlt';
  beitragskategorie: string;
  jahresbeitrag: number;
  mitgliedsnummer?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SEPAMandat {
  iban: string;
  bic: string;
  kontoinhaber: string;
  mandatsreferenz: string;
  mandatsdatum: string;
  verwendungszweck: string;
  bankname?: string;
  sepaAusfuehrung: 'erst_lastschrift' | 'folge_lastschrift';
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'completed';
  assignedTo?: string; // Member ID
  assignedToName?: string;
  dueDate?: Date;
  progress: number; // 0-100
  category: 'vorstand' | 'finanzen' | 'events' | 'mitglieder' | 'sonstiges';
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ClubEvent {
  id: string;
  title: string;
  description?: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  location?: string;
  type: 'training' | 'wettkampf' | 'versammlung' | 'feier' | 'sonstiges';
  participants?: string[]; // Member IDs
  maxParticipants?: number;
  isPublic: boolean;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ShootingLogEntry {
  id: string;
  date: Date;
  disciplineId: string;
  disciplineName: string;
  shotCount: number;
  rings?: number;
  teiler?: number;
  location: string; // Schießstand
  supervisorName?: string; // Aufsicht
  notes?: string; // Eigene Notizen
  isCompetition: boolean;
  rwkScoreId?: string; // Verknüpfung zur RWK-App
  weather?: string;
  equipment?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  uid: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl?: string;
  preferences: {
    notifications: boolean;
    theme: 'light' | 'dark' | 'system';
    language: 'de' | 'en';
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Discipline {
  id: string;
  name: string;
  category: 'Luftgewehr' | 'Luftpistole' | 'Kleinkaliber' | 'Großkaliber' | 'Bogen' | 'Armbrust';
  distance: string; // "10m", "50m", "100m"
  maxRings: number;
  shotCount: number;
  isActive: boolean;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Form Types
export interface ClubRegistrationForm {
  clubName: string;
  adminFirstName: string;
  adminLastName: string;
  adminEmail: string;
  password: string;
  confirmPassword: string;
  plan: 'trial' | 'professional' | 'enterprise';
  acceptTerms: boolean;
}

export interface MemberInviteForm {
  email: string;
  firstName: string;
  lastName: string;
  role: 'MITGLIED' | 'SPORTLEITER' | 'KASSENWART';
  message?: string;
}

// Dashboard Types
export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  inactiveMembers: number;
  openPayments: number;
  totalRevenue: number;
  upcomingEvents: number;
  recentShootingLogs: number;
}

// Subscription Types
export interface Subscription {
  id: string;
  clubId: string;
  plan: 'trial' | 'professional' | 'enterprise';
  status: 'active' | 'canceled' | 'past_due';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
  trialEnd?: Date;
}

export type UserRole = 'VORSTAND' | 'KASSENWART' | 'MITGLIED' | 'SPORTLEITER';

export type ClubPermission = 
  | 'members.read' 
  | 'members.write' 
  | 'finances.read' 
  | 'finances.write'
  | 'events.read' 
  | 'events.write'
  | 'settings.read' 
  | 'settings.write';