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
import { useStore, useVisibleTask$ } from '@builder.io/qwik';
import { useUser } from './user';
import { db } from './firebase';

export interface TodoItem {
    id: string;
    text: string;
    complete: boolean;
    createdAt: Date;
    uid: string;
};

export function useTodos(user: ReturnType<typeof useUser>) {

    const _store = useStore<{
        todos: TodoItem[],
        loading: boolean
    }>({
        todos: [],
        loading: true
    });

    if (user) {

        useVisibleTask$(() => {

            _store.loading = true;

            if (user.data) {

                return onSnapshot(

                    // query realtime todo list
                    query(
                        collection(db, 'todos') as CollectionReference<TodoItem[]>,
                        where('uid', '==', user.data.uid),
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
            }
        });
    }

    return _store;
};


export const addTodo = (e: SubmitEvent, uid: string) => {

    // get and reset form
    const target = e.target as HTMLFormElement;
    const form = new FormData(target);
    const { task } = Object.fromEntries(form);

    if (typeof task !== 'string') {
        return;
    }

    // reset form
    target.reset();

    addDoc(collection(db, 'todos'), {
        uid,
        text: task,
        complete: false,
        created: serverTimestamp()
    });
}

export const updateTodo = (id: string, complete: boolean) => {
    updateDoc(doc(db, 'todos', id), { complete });
}

export const deleteTodo = (id: string) => {
    deleteDoc(doc(db, 'todos', id));
}