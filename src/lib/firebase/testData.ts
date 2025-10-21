import { db } from './config';
import { collection, doc, setDoc, writeBatch } from 'firebase/firestore';
import { ClubMember, Club, Task, ClubEvent, VereinsAppUserPermission } from '@/types';

export async function createTestData() {
  const batch = writeBatch(db);
  const clubId = 'ksv-einbeck';

  // Club-Daten
  const clubData: Club = {
    id: clubId,
    name: 'Test Verein',
    logoUrl: '',
    subscriptionStatus: 'active',
    settings: {
      sepa: {
        glaeubigerID: 'DE98ZZZ09999999999',
        vereinsname: 'Test Verein',
        adresse: 'Musterstraße 123',
        plz: '37574',
        ort: 'Einbeck',
        email: 'kassenwart@ksv-einbeck.de',
        iban: 'DE89370400440532013000',
        bic: 'COBADEFFXXX',
        bankname: 'Commerzbank',
        verwendungszweck: 'Mitgliedsbeitrag {jahr} - {name}'
      },
      beitraege: {
        erwachsene: { name: 'Erwachsene', alterVon: 18, alterBis: 64, betrag: 120, aktiv: true },
        jugend: { name: 'Jugend', alterVon: 0, alterBis: 17, betrag: 60, aktiv: true },
        senioren: { name: 'Senioren', alterVon: 65, alterBis: null, betrag: 90, aktiv: true },
        familie: { name: 'Familie', alterVon: null, alterBis: null, betrag: 200, aktiv: true }
      }
    },
    createdAt: new Date(),
    updatedAt: new Date()
  };

  batch.set(doc(db, 'clubs', clubId), clubData);

  // Test-Mitglieder (22 Mitglieder)
  const testMembers: Omit<ClubMember, 'id'>[] = [
    { firstName: 'Max', lastName: 'Mustermann', email: 'max.mustermann@email.de', telefon: '05561-123456', mobil: '0171-1234567', strasse: 'Musterstraße 1', plz: '37574', ort: 'Teststadt', geburtstag: '1985-03-15', vereinseintritt: '2020-01-01', dsbeintritt: '2020-01-01', gender: 'male', isActive: true, beitragsstatus: 'bezahlt', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '001', sepa: { iban: 'DE89370400440532013000', bic: 'COBADEFFXXX', kontoinhaber: 'Max Mustermann', mandatsreferenz: 'MAND-001-2024', mandatsdatum: '2024-01-01', verwendungszweck: 'Mitgliedsbeitrag 2024 - Max Mustermann', bankname: 'Commerzbank', sepaAusfuehrung: 'folge_lastschrift' }, createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Anna', lastName: 'Schmidt', email: 'anna.schmidt@email.de', telefon: '05561-789012', mobil: '0172-9876543', strasse: 'Hauptstraße 45', plz: '37574', ort: 'Teststadt', geburtstag: '1992-07-22', vereinseintritt: '2021-03-15', dsbeintritt: '2021-03-15', gender: 'female', isActive: true, beitragsstatus: 'offen', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '002', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Tim', lastName: 'Weber', email: 'tim.weber@email.de', telefon: '05561-345678', strasse: 'Jugendstraße 12', plz: '37574', ort: 'Teststadt', geburtstag: '2008-11-03', vereinseintritt: '2023-09-01', dsbeintritt: '2023-09-01', gender: 'male', isActive: true, beitragsstatus: 'bezahlt', beitragskategorie: 'jugend', jahresbeitrag: 60, mitgliedsnummer: '003', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Maria', lastName: 'Müller', email: 'maria.mueller@email.de', telefon: '05561-456789', mobil: '0173-2345678', strasse: 'Bergstraße 8', plz: '37574', ort: 'Teststadt', geburtstag: '1978-12-05', vereinseintritt: '2019-05-20', dsbeintritt: '2019-05-20', gender: 'female', isActive: true, beitragsstatus: 'bezahlt', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '004', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Peter', lastName: 'Fischer', email: 'peter.fischer@email.de', telefon: '05561-567890', mobil: '0174-3456789', strasse: 'Waldweg 15', plz: '37574', ort: 'Teststadt', geburtstag: '1965-08-18', vereinseintritt: '2015-02-10', dsbeintritt: '2015-02-10', gender: 'male', isActive: true, beitragsstatus: 'bezahlt', beitragskategorie: 'senioren', jahresbeitrag: 90, mitgliedsnummer: '005', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Lisa', lastName: 'Wagner', email: 'lisa.wagner@email.de', telefon: '05561-678901', mobil: '0175-4567890', strasse: 'Gartenstraße 22', plz: '37574', ort: 'Teststadt', geburtstag: '1990-04-12', vereinseintritt: '2022-08-15', dsbeintritt: '2022-08-15', gender: 'female', isActive: true, beitragsstatus: 'offen', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '006', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Klaus', lastName: 'Becker', email: 'klaus.becker@email.de', telefon: '05561-789012', mobil: '0176-5678901', strasse: 'Kirchstraße 7', plz: '37574', ort: 'Teststadt', geburtstag: '1972-11-30', vereinseintritt: '2018-01-05', dsbeintritt: '2018-01-05', gender: 'male', isActive: true, beitragsstatus: 'bezahlt', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '007', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Sabine', lastName: 'Hoffmann', email: 'sabine.hoffmann@email.de', telefon: '05561-890123', mobil: '0177-6789012', strasse: 'Schulstraße 33', plz: '37574', ort: 'Teststadt', geburtstag: '1988-06-25', vereinseintritt: '2021-11-12', dsbeintritt: '2021-11-12', gender: 'female', isActive: true, beitragsstatus: 'bezahlt', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '008', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Thomas', lastName: 'Klein', email: 'thomas.klein@email.de', telefon: '05561-901234', mobil: '0178-7890123', strasse: 'Bahnhofstraße 18', plz: '37574', ort: 'Teststadt', geburtstag: '1983-09-14', vereinseintritt: '2020-06-08', dsbeintritt: '2020-06-08', gender: 'male', isActive: true, beitragsstatus: 'offen', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '009', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Julia', lastName: 'Wolf', email: 'julia.wolf@email.de', telefon: '05561-012345', mobil: '0179-8901234', strasse: 'Marktplatz 5', plz: '37574', ort: 'Teststadt', geburtstag: '1995-01-08', vereinseintritt: '2023-03-20', dsbeintritt: '2023-03-20', gender: 'female', isActive: true, beitragsstatus: 'bezahlt', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '010', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Michael', lastName: 'Richter', email: 'michael.richter@email.de', telefon: '05561-123457', mobil: '0170-9012345', strasse: 'Lindenstraße 11', plz: '37574', ort: 'Teststadt', geburtstag: '1976-05-03', vereinseintritt: '2017-09-25', dsbeintritt: '2017-09-25', gender: 'male', isActive: true, beitragsstatus: 'bezahlt', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '011', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Sandra', lastName: 'Neumann', email: 'sandra.neumann@email.de', telefon: '05561-234568', mobil: '0171-0123456', strasse: 'Rosenweg 9', plz: '37574', ort: 'Teststadt', geburtstag: '1987-10-17', vereinseintritt: '2022-01-30', dsbeintritt: '2022-01-30', gender: 'female', isActive: true, beitragsstatus: 'offen', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '012', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Frank', lastName: 'Braun', email: 'frank.braun@email.de', telefon: '05561-345679', mobil: '0172-1234567', strasse: 'Eichenstraße 14', plz: '37574', ort: 'Teststadt', geburtstag: '1969-02-28', vereinseintritt: '2016-07-18', dsbeintritt: '2016-07-18', gender: 'male', isActive: true, beitragsstatus: 'bezahlt', beitragskategorie: 'senioren', jahresbeitrag: 90, mitgliedsnummer: '013', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Petra', lastName: 'Zimmermann', email: 'petra.zimmermann@email.de', telefon: '05561-456780', mobil: '0173-2345678', strasse: 'Ahornweg 6', plz: '37574', ort: 'Teststadt', geburtstag: '1991-07-11', vereinseintritt: '2023-05-14', dsbeintritt: '2023-05-14', gender: 'female', isActive: true, beitragsstatus: 'bezahlt', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '014', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Ralf', lastName: 'Krüger', email: 'ralf.krueger@email.de', telefon: '05561-567891', mobil: '0174-3456789', strasse: 'Buchenallee 21', plz: '37574', ort: 'Teststadt', geburtstag: '1980-12-09', vereinseintritt: '2019-10-07', dsbeintritt: '2019-10-07', gender: 'male', isActive: true, beitragsstatus: 'offen', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '015', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Claudia', lastName: 'Hartmann', email: 'claudia.hartmann@email.de', telefon: '05561-678902', mobil: '0175-4567890', strasse: 'Birkenstraße 3', plz: '37574', ort: 'Teststadt', geburtstag: '1984-04-16', vereinseintritt: '2021-02-22', dsbeintritt: '2021-02-22', gender: 'female', isActive: true, beitragsstatus: 'bezahlt', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '016', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Stefan', lastName: 'Lange', email: 'stefan.lange@email.de', telefon: '05561-789013', mobil: '0176-5678901', strasse: 'Tannenweg 17', plz: '37574', ort: 'Teststadt', geburtstag: '1977-08-23', vereinseintritt: '2018-12-03', dsbeintritt: '2018-12-03', gender: 'male', isActive: true, beitragsstatus: 'bezahlt', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '017', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Monika', lastName: 'Schulz', email: 'monika.schulz@email.de', telefon: '05561-890124', mobil: '0177-6789012', strasse: 'Kastanienstraße 25', plz: '37574', ort: 'Teststadt', geburtstag: '1989-11-07', vereinseintritt: '2022-09-11', dsbeintritt: '2022-09-11', gender: 'female', isActive: true, beitragsstatus: 'offen', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '018', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Jürgen', lastName: 'Koch', email: 'juergen.koch@email.de', telefon: '05561-901235', mobil: '0178-7890123', strasse: 'Fichtenstraße 12', plz: '37574', ort: 'Teststadt', geburtstag: '1963-06-19', vereinseintritt: '2014-04-28', dsbeintritt: '2014-04-28', gender: 'male', isActive: true, beitragsstatus: 'bezahlt', beitragskategorie: 'senioren', jahresbeitrag: 90, mitgliedsnummer: '019', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Birgit', lastName: 'Weiß', email: 'birgit.weiss@email.de', telefon: '05561-012346', mobil: '0179-8901234', strasse: 'Ulmenstraße 8', plz: '37574', ort: 'Teststadt', geburtstag: '1993-03-26', vereinseintritt: '2023-07-09', dsbeintritt: '2023-07-09', gender: 'female', isActive: true, beitragsstatus: 'bezahlt', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '020', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Markus', lastName: 'Schmitt', email: 'markus.schmitt@email.de', telefon: '05561-123458', mobil: '0170-9012345', strasse: 'Pappelweg 4', plz: '37574', ort: 'Teststadt', geburtstag: '1981-09-12', vereinseintritt: '2020-03-16', dsbeintritt: '2020-03-16', gender: 'male', isActive: true, beitragsstatus: 'offen', beitragskategorie: 'erwachsene', jahresbeitrag: 120, mitgliedsnummer: '021', createdAt: new Date(), updatedAt: new Date() },
    { firstName: 'Lena', lastName: 'Jung', email: 'lena.jung@email.de', telefon: '05561-234569', mobil: '0171-0123456', strasse: 'Weidenstraße 19', plz: '37574', ort: 'Teststadt', geburtstag: '2009-05-14', vereinseintritt: '2024-01-08', dsbeintritt: '2024-01-08', gender: 'female', isActive: true, beitragsstatus: 'bezahlt', beitragskategorie: 'jugend', jahresbeitrag: 60, mitgliedsnummer: '022', createdAt: new Date(), updatedAt: new Date() }
  ];

  testMembers.forEach((member, index) => {
    const memberId = `member-${index + 1}`;
    batch.set(doc(db, 'clubs', clubId, 'mitglieder', memberId), { ...member, id: memberId });
  });

  // Test-Aufgaben
  const testTasks: Omit<Task, 'id'>[] = [
    {
      title: 'Jahreshauptversammlung vorbereiten',
      description: 'Einladungen versenden, Tagesordnung erstellen',
      priority: 'high',
      status: 'in_progress',
      assignedTo: 'member-1',
      assignedToName: 'Max Mustermann',
      dueDate: new Date('2024-03-15'),
      progress: 60,
      category: 'vorstand',
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'SEPA-Lastschriften für 2024 erstellen',
      description: 'Alle Mitgliedsbeiträge für das neue Jahr einziehen',
      priority: 'medium',
      status: 'todo',
      assignedTo: 'member-2',
      assignedToName: 'Anna Schmidt',
      dueDate: new Date('2024-02-01'),
      progress: 0,
      category: 'finanzen',
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  testTasks.forEach((task, index) => {
    const taskId = `task-${index + 1}`;
    batch.set(doc(db, 'clubs', clubId, 'tasks', taskId), { ...task, id: taskId });
  });

  // Test-Events
  const testEvents: Omit<ClubEvent, 'id'>[] = [
    {
      title: 'Wöchentliches Training',
      description: 'Luftgewehr Training für alle Altersklassen',
      date: new Date('2024-02-15'),
      startTime: '18:00',
      endTime: '20:00',
      location: 'Schießstand Einbeck',
      type: 'training',
      participants: ['member-1', 'member-3'],
      maxParticipants: 12,
      isPublic: true,
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      title: 'Kreismeisterschaft',
      description: 'Teilnahme an der Kreismeisterschaft Luftgewehr',
      date: new Date('2024-03-10'),
      startTime: '09:00',
      endTime: '16:00',
      location: 'Schießstand Northeim',
      type: 'wettkampf',
      participants: ['member-1', 'member-2'],
      isPublic: true,
      createdBy: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  testEvents.forEach((event, index) => {
    const eventId = `event-${index + 1}`;
    batch.set(doc(db, 'clubs', clubId, 'events', eventId), { ...event, id: eventId });
  });

  // User Permissions
  const userPermissions: VereinsAppUserPermission = {
    uid: 'demo-user-id',
    email: 'admin@rwk-einbeck.de',
    clubRoles: {
      [clubId]: 'VORSTAND'
    }
  };

  batch.set(doc(db, 'user_permissions', 'demo-user-id'), userPermissions);

  await batch.commit();
  console.log('Test data created successfully!');
}