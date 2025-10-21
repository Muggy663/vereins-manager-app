import { db } from './config';
import { doc, setDoc } from 'firebase/firestore';

export async function createSimpleTestData() {
  try {
    // Einfacher Test - nur ein Dokument
    const testDoc = {
      name: 'Test Verein',
      created: new Date().toISOString(),
      test: true
    };

    await setDoc(doc(db, 'test', 'simple'), testDoc);
    console.log('Simple test data created successfully!');
    return true;
  } catch (error) {
    console.error('Error creating test data:', error);
    throw error;
  }
}