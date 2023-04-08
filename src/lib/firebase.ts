import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { $ } from '@builder.io/qwik';
import { CompleteFn, ErrorFn, NextOrObserver, User } from 'firebase/auth';
import { GoogleAuthProvider, onIdTokenChanged, signOut } from 'firebase/auth';

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

// initialize firebase

const firebaseApp = initializeApp(firebase_config);

// firebase auth

/* can't import firebase auth on server, import dynamically in browser */

const auth = async () => (await import('firebase/auth')).getAuth(firebaseApp);


export const signInWithGoogle = $(async () => {
    const _auth = await auth();
    return (await import('firebase/auth')).signInWithPopup(_auth, new GoogleAuthProvider());
});

export const logout = $(async () => {
    const _auth = await auth();
    await signOut(_auth);
});

export const onAuthChange = async (
    nextOrObserver: NextOrObserver<User>,
    error?: ErrorFn | undefined,
    completed?: CompleteFn | undefined
) => {
    const _auth = await auth();
    return onIdTokenChanged(_auth, nextOrObserver, error, completed);
};

// firestore
export const db = getFirestore(firebaseApp);
