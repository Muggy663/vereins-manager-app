import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

// Email-Konfiguration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: functions.config().email.user,
    pass: functions.config().email.password
  }
});

// Trigger bei neuer Registrierung
export const onUserRegistration = functions.firestore
  .document('clubs/{clubId}/pending_users/{userId}')
  .onCreate(async (snap, context) => {
    const userData = snap.data();
    const clubId = context.params.clubId;
    
    try {
      const clubDoc = await admin.firestore().doc(`clubs/${clubId}`).get();
      const clubData = clubDoc.data();
      
      // Admin-E-Mails finden
      const adminsSnapshot = await admin.firestore()
        .collection('user_permissions')
        .where('clubId', '==', clubId)
        .where('role', 'in', ['admin', 'vorstand'])
        .get();
      
      const adminEmails: string[] = [];
      for (const adminDoc of adminsSnapshot.docs) {
        const userDoc = await admin.firestore().doc(`users/${adminDoc.id}`).get();
        if (userDoc.exists) {
          adminEmails.push(userDoc.data()?.email);
        }
      }
      
      if (adminEmails.length === 0) {
        adminEmails.push('rwk-leiter-ksve@gmx.de');
      }
      
      // E-Mail an Admins
      await transporter.sendMail({
        from: functions.config().email.user,
        to: adminEmails.join(','),
        subject: `Neue Registrierung - ${clubData?.name || clubId}`,
        html: `
          <h2>Neue Mitglieder-Registrierung</h2>
          <p><strong>Verein:</strong> ${clubData?.name || clubId}</p>
          <p><strong>Name:</strong> ${userData.firstName} ${userData.lastName}</p>
          <p><strong>E-Mail:</strong> ${userData.email}</p>
          <p><strong>Registriert am:</strong> ${userData.requestedAt.toDate().toLocaleString('de-DE')}</p>
          <a href="https://vereins-manager.vercel.app/admin">Zur Admin-Verwaltung</a>
        `
      });
      
      // Bestätigung an User
      await transporter.sendMail({
        from: functions.config().email.user,
        to: userData.email,
        subject: `Registrierung bei ${clubData?.name || clubId}`,
        html: `
          <h2>Registrierung erfolgreich</h2>
          <p>Hallo ${userData.firstName},</p>
          <p>Ihre Registrierung bei <strong>${clubData?.name || clubId}</strong> war erfolgreich.</p>
          <p>Ein Administrator wird Ihre Anfrage prüfen und freischalten.</p>
        `
      });
      
    } catch (error) {
      console.error('E-Mail-Fehler:', error);
    }
  });

export const onUserApproval = functions.firestore
  .document('user_permissions/{userId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    
    if (before.status === 'pending' && after.status === 'approved') {
      try {
        const userDoc = await admin.firestore().doc(`users/${context.params.userId}`).get();
        const userData = userDoc.data();
        
        const clubDoc = await admin.firestore().doc(`clubs/${after.clubId}`).get();
        const clubData = clubDoc.data();
        
        await transporter.sendMail({
          from: functions.config().email.user,
          to: userData?.email,
          subject: `Zugang freigeschaltet - ${clubData?.name}`,
          html: `
            <h2>Zugang freigeschaltet</h2>
            <p>Hallo ${userData?.firstName},</p>
            <p>Ihr Zugang zu <strong>${clubData?.name}</strong> wurde freigeschaltet!</p>
            <a href="https://vereins-manager.vercel.app/login">Jetzt anmelden</a>
          `
        });
      } catch (error) {
        console.error('Freischaltungs-E-Mail-Fehler:', error);
      }
    }
  });