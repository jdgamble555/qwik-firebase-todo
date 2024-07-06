import { doc, getDoc } from "firebase/firestore/lite";
import { firebaseServer } from "./firebase-lite";

type AboutDoc = {
    name: string;
    description: string;
};

export const getAbout = async (authIdToken: string) => {

    const { db } = firebaseServer(authIdToken);

    const aboutSnap = await getDoc(
        doc(db, '/about/ZlNJrKd6LcATycPRmBPA')
    );

    if (!aboutSnap.exists()) {
        throw 'Document does not exist!';
    }

    return aboutSnap.data() as AboutDoc;
};