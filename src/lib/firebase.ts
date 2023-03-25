import { initializeApp } from 'firebase/app';
//import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import * as Auth from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { $ } from '@builder.io/qwik';
import type { User } from 'firebase/auth';

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

export const auth = Auth.getAuth(firebaseApp);

export const onAuthChange = (
    nextOrObserver: Auth.NextOrObserver<Auth.User>,
    error?: Auth.ErrorFn | undefined,
    completed?: Auth.CompleteFn | undefined
) => Auth.onIdTokenChanged(auth, nextOrObserver, error, completed);

export const signInWithGoogle = $(async () => await Auth.signInWithPopup(auth, new Auth.GoogleAuthProvider()));

export const logout = $(async () => await Auth.signOut(auth));

// firestore

export const db = getFirestore(firebaseApp);
