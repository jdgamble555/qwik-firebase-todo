import { onSnapshot } from 'firebase/firestore';
import {
    addDoc,
    collection,
    CollectionReference,
    deleteDoc,
    doc,
    orderBy,
    query,
    serverTimestamp,
    updateDoc,
    where
} from 'firebase/firestore';
import { useClientEffect$, useStore } from '@builder.io/qwik';
import { userData } from './user';
import { db } from './firebase';

export interface TodoItem {
    id: string;
    text: string;
    complete: boolean;
    createdAt: Date;
    uid: string;
};

export function useTodos(user: userData) {
    const _store = useStore<{ todos: TodoItem[], loading: boolean }>({ todos: [], loading: true });

    useClientEffect$(() => {
        _store.loading = true;
        const unsubscribe = onSnapshot<TodoItem[]>(

            // query realtime todo list
            query<TodoItem[]>(
                collection(db, 'todos') as CollectionReference<TodoItem[]>,
                where('uid', '==', user.uid),
                orderBy('created')
            ), (q) => {

                // toggle loading
                _store.loading = false;

                // if no data
                if (q.empty) {
                    _store.todos = [];
                    return;
                }

                // get data, map to todo type
                let data = q.docs.map((doc) => ({ ...doc.data() as any, id: doc.id }));
                data = data.map(({
                    id,
                    complete,
                    created,
                    text,
                    uid
                }) => ({
                    id,
                    complete,
                    createdAt: created ? new Date(created?.toMillis()) : new Date(),
                    text,
                    uid
                }));

                /**
                 * Note: Will get triggered 2x on add 
                 * 1 - for optimistic update
                 * 2 - update real date from server date
                 */

                // print data in dev mode
                if (import.meta.env.DEV) {
                    console.log(data);
                }

                // add to store
                _store.todos = data;

            });
        return unsubscribe;
    });

    return _store;
};


export const addTodo = (uid: string, text: string) => {
    addDoc(collection(db, 'todos'), {
        uid,
        text,
        complete: false,
        created: serverTimestamp()
    });
}

export const updateTodo = (id: string, newStatus: boolean) => {
    updateDoc(doc(db, 'todos', id), { complete: newStatus });
}

export const deleteTodo = (id: string) => {
    deleteDoc(doc(db, 'todos', id));
}