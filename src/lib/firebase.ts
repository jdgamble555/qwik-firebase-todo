import { initializeApp } from 'firebase/app';
import * as FB from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { $ } from '@builder.io/qwik';

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

export const auth = FB.getAuth(firebaseApp);

export const signInWithGoogle = $(async () => await FB.signInWithPopup(auth, new FB.GoogleAuthProvider()));

export const logout = async () => await FB.signOut(auth);

// firestore

export const db = getFirestore(firebaseApp);
