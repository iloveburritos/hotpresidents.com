// lib/firebase.ts
import { FirebaseApp, initializeApp } from 'firebase/app';
import { getFirestore as getFirestoreSDK, Firestore } from 'firebase/firestore';
import { doc, onSnapshot } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID,
    measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestoreSDK(app);

export function subscribeToPresidentStats(presidentId: string, callback: (data: any) => void) {
    const docRef = doc(db, 'hotpresidents', presidentId);
    return onSnapshot(docRef, (doc) => {
        if (doc.exists()) {
            callback(doc.data());
        }
    });
}

