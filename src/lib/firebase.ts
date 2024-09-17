import { getApp, getApps, initializeApp } from 'firebase/app';
import { signInWithPopup as _signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import * as FA from 'firebase/auth';

// import your .env variable
// PUBLIC_FIREBASE_CONFIG={YOUR FIREBASE CONFIG}
// make sure the Firebase keys are in Quotes ""
const firebase_config = JSON.parse(
    import.meta.env.PUBLIC_FIREBASE_CONFIG
);

// initialize firebase
export const app = getApps().length
    ? getApp()
    : initializeApp(firebase_config);

export const db = getFirestore(app);
export const auth = FA.getAuth(app);

