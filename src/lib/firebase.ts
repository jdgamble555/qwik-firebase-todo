import { FirebaseApp, initializeApp } from 'firebase/app';
//import { getAuth, GoogleAuthProvider,  signOut } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { $ } from '@builder.io/qwik';
import { CompleteFn, ErrorFn, getAuth, NextOrObserver, signOut, User } from 'firebase/auth';
//import { signInWithPopup } from 'firebase/auth';

// normally you should put this in your .env file
const firebase_config = {
    apiKey: "AIzaSyC7Tu56_1ry-u9AnZfg_AjiMWvvNmFIPGU",
    authDomain: "test-projects-19046.firebaseapp.com",
    projectId: "test-projects-19046",
    storageBucket: "test-projects-19046.appspot.com",
    messagingSenderId: "736849418469",
    appId: "1:736849418469:web:7546f16c5e355b1c6a9c0c",
    measurementId: "G-FKRCW93P0X"
};

// initialize and login

export const firebaseApp = initializeApp(firebase_config);

//export const auth = getAuth(firebaseApp);

const auth = $(async (_firebaseApp: FirebaseApp) => (await import('firebase/auth')).getAuth(_firebaseApp));

export const onAuthChange = $(async (
    nextOrObserver: NextOrObserver<User>,
    error?: ErrorFn | undefined,
    completed?: CompleteFn | undefined
) => {
    const _firebaseApp = (await import('firebase/app')).initializeApp(firebase_config);
    const _auth = await auth(_firebaseApp);
    const _onIdTokenChanged = (await import('firebase/auth')).onIdTokenChanged;
    return _onIdTokenChanged(_auth, nextOrObserver, error, completed);
});

//export const signInWithGoogle = $(async () => (await import('firebase/auth')).signInWithPopup(auth, new GoogleAuthProvider()));

export const signInWithGoogle = $(async () => {});

export const logout = async () => {
    const _auth = await auth(firebaseApp);
    await signOut(_auth);
} 

//export const logout = async () => {};

// firestore

export const db = getFirestore(firebaseApp);
