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

// initialize and login

const firebaseApp = initializeApp(firebase_config);

// firebase auth

/* rollup bug, so have to dynamically import 'signInWithPopup' and 'getAuth()' from 'firebase/auth'
 * also needed to serialize 'signInWithPopup' but not other functions for some reason? 🤷
*/

const auth = async () => (await import('firebase/auth')).getAuth(firebaseApp);

export const signInWithGoogle = $(async () => {
    const _auth = await auth();
    return (await import('firebase/auth')).signInWithPopup(_auth, new GoogleAuthProvider());
});

export const onAuthChange = async (
    nextOrObserver: NextOrObserver<User>,
    error?: ErrorFn | undefined,
    completed?: CompleteFn | undefined
) => {
    const _auth = await auth();
    return onIdTokenChanged(_auth, nextOrObserver, error, completed);
};

export const logout = async () => {
    const _auth = await auth();
    await signOut(_auth);
};

// firestore
export const db = getFirestore(firebaseApp);
