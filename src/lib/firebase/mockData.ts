// Mock-Daten für Demo-Modus
export const mockMembers = [
  {
    id: 'demo-1',
    firstName: 'Max',
    lastName: 'Mustermann',
    email: 'max.mustermann@example.com',
    telefon: '0551-123456',
    strasse: 'Musterstraße 1',
    plz: '37073',
    ort: 'Göttingen',
    geburtstag: '1985-03-15',
    vereinseintritt: '2010-01-01',
    gender: 'männlich',
    mitgliedsnummer: '001',
    mitgliedschaftstyp: 'vollmitglied',
    isActive: true,
    beitragsstatus: 'bezahlt',
    jahresbeitrag: 120
  },
  {
    id: 'demo-2',
    firstName: 'Anna',
    lastName: 'Schmidt',
    email: 'anna.schmidt@example.com',
    telefon: '0551-789012',
    strasse: 'Beispielweg 5',
    plz: '37073',
    ort: 'Göttingen',
    geburtstag: '1992-07-22',
    vereinseintritt: '2015-03-01',
    gender: 'weiblich',
    mitgliedsnummer: '002',
    mitgliedschaftstyp: 'vollmitglied',
    isActive: true,
    beitragsstatus: 'offen',
    jahresbeitrag: 120
  },
  {
    id: 'demo-3',
    firstName: 'Tim',
    lastName: 'Weber',
    email: 'tim.weber@example.com',
    telefon: '0551-345678',
    strasse: 'Jugendstraße 12',
    plz: '37073',
    ort: 'Göttingen',
    geburtstag: '2008-11-10',
    vereinseintritt: '2020-09-01',
    gender: 'männlich',
    mitgliedsnummer: '003',
    mitgliedschaftstyp: 'jugend',
    isActive: true,
    beitragsstatus: 'bezahlt',
    jahresbeitrag: 60
  }
];

export const mockShootingLogs = [
  {
    id: 'log-1',
    memberId: 'demo-1',
    date: '2024-01-15',
    discipline: 'Luftgewehr',
    distance: '10m',
    shots: 40,
    result: 385,
    rings: [9.8, 9.5, 9.7, 9.9, 9.6],
    notes: 'Gute Leistung, Atmung verbessern'
  },
  {
    id: 'log-2',
    memberId: 'demo-2',
    date: '2024-01-16',
    discipline: 'Luftpistole',
    distance: '10m',
    shots: 40,
    result: 365,
    rings: [9.2, 9.0, 9.4, 9.1, 9.3],
    notes: 'Standfestigkeit üben'
  }
];

export const mockTasks = [
  {
    id: 'task-1',
    title: 'Jahreshauptversammlung vorbereiten',
    description: 'Einladungen versenden, Tagesordnung erstellen, Raum buchen',
    priority: 'high',
    status: 'in_progress',
    assignedTo: 'Max Mustermann',
    dueDate: '2024-03-15',
    progress: 75
  },
  {
    id: 'task-2',
    title: 'Neue Zielscheiben bestellen',
    description: '500 Stück Luftgewehr-Scheiben für Training',
    priority: 'medium',
    status: 'todo',
    assignedTo: 'Anna Schmidt',
    dueDate: '2024-02-28',
    progress: 0
  }
];

export const mockServicePlans = [
  {
    id: 'service-1',
    type: 'standaufsicht',
    date: '2024-01-20',
    time: '09:00-12:00',
    person: 'Max Mustermann',
    status: 'besetzt'
  },
  {
    id: 'service-2',
    type: 'kueche',
    date: '2024-01-25',
    event: 'Vereinsabend',
    person: 'Anna Schmidt',
    helper: 'Tim Weber',
    status: 'besetzt'
  }
];

export const mockTraining = [
  {
    id: 'training-1',
    memberId: 'demo-1',
    type: 'Trainer C',
    issueDate: '2020-05-15',
    expiryDate: '2024-05-15',
    status: 'gültig'
  },
  {
    id: 'training-2',
    memberId: 'demo-2',
    type: 'Standaufsicht',
    issueDate: '2021-03-10',
    expiryDate: '2025-03-10',
    status: 'gültig'
  }
];

export const isDemoMode = () => {
  if (typeof window === 'undefined') {
    return true; // Default to demo mode during SSR
  }
  return !localStorage.getItem('real_admin_mode');
};