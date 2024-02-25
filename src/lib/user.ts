import { useStore, useVisibleTask$, $ } from '@builder.io/qwik';
import {
    GoogleAuthProvider,
    onIdTokenChanged,
    signOut,
    type User
} from 'firebase/auth';
import { auth, signIn } from './firebase';

export interface userData {
    photoURL: string | null;
    uid: string;
    displayName: string | null;
    email: string | null;
};

export const loginWithGoogle = $(() => {
    if (signIn && auth) {
        signIn(auth, new GoogleAuthProvider());
    }
});

export const logout = $(() => {
    if (auth) {
        signOut(auth);
    }
});

export function useUser() {

    const _store = useStore<{ loading: boolean, data: userData | null }>({ loading: true, data: null });

    useVisibleTask$(() => {

        if (!auth) {
            _store.data = null;
            return;
        }

        // toggle loading
        _store.loading = true;

        // subscribe to user changes
        return onIdTokenChanged(auth, (_user: User | null) => {
            _store.loading = false;
            if (!_user) {
                _store.data = null;
                return;
            }

            // map data to user data type
            const { photoURL, uid, displayName, email } = _user;
            const data = { photoURL, uid, displayName, email };

            // print data in dev mode
            if (import.meta.env.DEV) {
                console.log(data);
            }

            // set store
            _store.data = data;
        });

    });

    return _store;
};
