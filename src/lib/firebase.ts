import { getApps, initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// import your .env variable
// PUBLIC_FIREBASE_CONFIG={YOUR FIREBASE CONFIG}
// make sure the Firebase keys are in Quotes ""
const firebase_config = JSON.parse(import.meta.env.PUBLIC_FIREBASE_CONFIG);

// initialize firebase

if (!getApps().length) {
    initializeApp(firebase_config);
}

export const db = getFirestore();
export const auth = getAuth();

