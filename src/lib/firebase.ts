import { getApp, getApps, initializeApp } from 'firebase/app';
import { getAuth as _getAuth, signInWithPopup as _signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { isBrowser } from '@builder.io/qwik/build';

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

export const db = isBrowser ? getFirestore(app) : null;
export const auth = isBrowser ? _getAuth(app) : null;
export const signInWithPopup = isBrowser ? _signInWithPopup : null;
