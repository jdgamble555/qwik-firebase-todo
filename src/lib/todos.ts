import { useStore, useVisibleTask$ } from '@builder.io/qwik';
import {
    collection,
    deleteDoc,
    doc,
    FirestoreError,
    onSnapshot,
    orderBy,
    query,
    serverTimestamp,
    setDoc,
    Timestamp,
    type FirestoreDataConverter,
    updateDoc,
    where
} from 'firebase/firestore';
import { getUser } from './auth';
import { auth, db } from './firebase';

// Only used to create example texts -- DO NOT USE IN PRODUCTION
export const generateText = () =>
    doc(collection(db, 'todos'))
        .id
        .substring(0, 10)
        .toLowerCase();

const todoConverter: FirestoreDataConverter<TodoDoc> = {
    toFirestore(todo) {
        return todo;
    },

    fromFirestore(snapshot): TodoDoc {

        // Use an estimated date for pending server timestamps
        const data = snapshot.data({
            serverTimestamps: 'estimate'
        });

        // Convert the Firestore timestamp to a Date
        const createdAt = data.createdAt as Timestamp;

        return {
            id: snapshot.id,
            uid: data.uid,
            text: data.text,
            complete: data.complete,
            createdAt: createdAt.toDate()
        };
    }
};

export const useTodos = () => {

    const user = getUser();

    const todos = useStore<{
        value: {
            data: TodoDoc[];
            loading: boolean;
            error: string | null;
        };
    }>({
        value: {
            data: [],
            loading: true,
            error: null
        }
    });

    useVisibleTask$(({ track, cleanup }) => {

        // Reconnect when the logged-in user changes
        const currentUser = track(() => user.value.data);

        // Must be logged in
        if (!currentUser) {
            todos.value = {
                data: [],
                loading: false,
                error: null
            };
            return;
        }

        todos.value = {
            data: [],
            loading: true,
            error: null
        };

        // Subscribe to this user's todos
        const unsubscribe = onSnapshot(
            query(
                collection(db, 'todos'),
                where('uid', '==', currentUser.uid),
                orderBy('createdAt')
            ).withConverter(todoConverter),
            (snapshot) => {

                const data = snapshot.docs.map((item) => item.data());

                if (import.meta.env.DEV) {
                    console.log(data);
                }

                todos.value = {
                    data,
                    loading: false,
                    error: null
                };
            },
            (error) => {
                todos.value = {
                    data: [],
                    loading: false,
                    error: error.message
                };
            }
        );

        // Remove the previous listener when the user changes
        cleanup(unsubscribe);
    });

    return todos;
};

export const addTodo = async (text: string) => {

    const user = auth.currentUser;

    if (!user) {
        return { error: 'No user' };
    }

    try {
        await setDoc(
            doc(collection(db, 'todos')),
            {
                uid: user.uid,
                text,
                complete: false,
                createdAt: serverTimestamp()
            }
        );

        return { error: null };
    } catch (error) {
        if (error instanceof FirestoreError) {
            return { error: error.message };
        }

        throw error;
    }
};

export const updateTodo = async (id: string, newStatus: boolean) => {

    try {
        await updateDoc(
            doc(db, 'todos', id),
            {
                complete: newStatus,
                updatedAt: serverTimestamp()
            }
        );

        return { error: null };
    } catch (error) {
        if (error instanceof FirestoreError) {
            return { error: error.message };
        }

        throw error;
    }
};

export const deleteTodo = async (id: string) => {

    try {
        await deleteDoc(
            doc(db, 'todos', id)
        );

        return { error: null };
    } catch (error) {
        if (error instanceof FirestoreError) {
            return { error: error.message };
        }

        throw error;
    }
};
