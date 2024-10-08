import { RequestEventCommon } from "@builder.io/qwik-city";
import { initializeServerApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore as getFirestore } from "firebase/firestore/lite";

const firebase_config = JSON.parse(
    import.meta.env.PUBLIC_FIREBASE_CONFIG
);

export const firebaseServer = async ({ headers }: RequestEventCommon<QwikCityPlatform>) => {

    const authIdToken = headers.get('Authorization')?.split('Bearer ')[1];

    console.log(authIdToken);

    const serverApp = initializeServerApp(firebase_config, {
        authIdToken
    });

    const serverAuth = getAuth(serverApp);
    await serverAuth.authStateReady();

    const serverDB = getFirestore(serverApp);

    return {
        serverAuth,
        serverDB
    };
};