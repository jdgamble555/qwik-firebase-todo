import { doc, getDoc, getFirestore } from "firebase/firestore/lite";
//import { app } from "./firebase";
import { getAuth } from "firebase/auth";
import { getApp, getApps, initializeApp } from "firebase/app";

type AboutDoc = {
    name: string;
    description: string;
};

const firebase_config = JSON.parse(
    import.meta.env.PUBLIC_FIREBASE_CONFIG
);

// initialize firebase

export const app = getApps().length
    ? getApp()
    : initializeApp(firebase_config);

const auth = getAuth(app);

const db = getFirestore(app);

export const getAbout = async () => {

    console.log(auth.config.authDomain);

    const aboutSnap = await getDoc(
        doc(db, '/about/ZlNJrKd6LcATycPRmBPA')
    );

    if (!aboutSnap.exists()) {
        throw 'Document does not exist!';
    }

    return aboutSnap.data() as AboutDoc;
};