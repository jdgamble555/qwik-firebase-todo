import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";

const firebase_config = JSON.parse(
    import.meta.env.PUBLIC_FIREBASE_CONFIG
);

const workerApp = getApps().length
    ? getApp()
    : initializeApp(firebase_config);

const auth = getAuth(workerApp);

export const getIdTokenPromise = (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            unsubscribe();
            if (!user) {
                return resolve(null);
            }
            try {
                const idToken = await getIdToken(user);
                resolve(idToken);
            } catch (e) {
                reject(e);
            }
        }, reject);
    });
};