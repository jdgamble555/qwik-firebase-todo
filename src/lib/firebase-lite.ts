import { initializeServerApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";

const firebase_config = JSON.parse(
    import.meta.env.PUBLIC_FIREBASE_CONFIG
);

export const firebaseServer = (authIdToken: string) => {

    const serverApp = initializeServerApp(firebase_config, {
        authIdToken
    });

    const db = getFirestore(serverApp);

    return {
        db
    };
};