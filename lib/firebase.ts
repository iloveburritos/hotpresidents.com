// lib/firebase.ts
import type { FirebaseApp } from 'firebase/app';
import type { Firestore } from 'firebase/firestore';

let app: FirebaseApp | null = null;
let db: Firestore | null = null;

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Lazy initialization - only loads Firebase when first called
export const getFirebaseApp = async (): Promise<FirebaseApp> => {
    if (app) return app;

    const { initializeApp, getApps } = await import('firebase/app');
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
    return app;
};

export const getDb = async (): Promise<Firestore> => {
    if (db) return db;

    const firebaseApp = await getFirebaseApp();
    const { getFirestore } = await import('firebase/firestore');
    db = getFirestore(firebaseApp);
    return db;
};

export async function subscribeToPresidentStats(presidentId: string, callback: (data: any) => void) {
    const firestore = await getDb();
    const { doc, onSnapshot } = await import('firebase/firestore');
    const docRef = doc(firestore, 'hotpresidents', presidentId);
    return onSnapshot(docRef, (docSnap) => {
        if (docSnap.exists()) {
            callback(docSnap.data());
        }
    });
}
