import { RequestEventCommon } from "@builder.io/qwik-city";
import { initializeServerApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

const firebase_config = JSON.parse(
    import.meta.env.PUBLIC_FIREBASE_CONFIG
);

export const firebaseServer = async ({ headers }: RequestEventCommon<QwikCityPlatform>) => {

    const authIdToken = headers.get('Authorization')?.split('Bearer ')[1];

    const serverApp = initializeServerApp(firebase_config, {
        authIdToken
    });

    // auth
    try {
            const serverAuth = getAuth(serverApp);
    await serverAuth.authStateReady();

    console.log(serverApp.settings.authIdToken);

    if (serverAuth.currentUser === null) {
        return {
            error: 'Invalid Token',
            serverAuth: null,
            serverDB: null
        };
    }

    // db
    const serverDB = getFirestore(serverApp);

    return {
        serverAuth,
        serverDB,
        error: null
    };
    } catch(e: any) {
        return {
            error: e.message
        };        
    }
};