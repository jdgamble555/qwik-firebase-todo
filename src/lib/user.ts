import { useStore, $, useVisibleTask$ } from '@builder.io/qwik';
import {
    GoogleAuthProvider,
    onIdTokenChanged,
    signOut,
    type User
} from 'firebase/auth';
import * as FireSetup from './firebase';
import { useShared } from './use-shared';
import * as FirebaseAuth from 'firebase/auth';

export interface userData {
    photoURL: string | null;
    uid: string;
    displayName: string | null;
    email: string | null;
};

export const loginWithGoogle = () => {
    FirebaseAuth.signInWithPopup(FireSetup.auth, new GoogleAuthProvider());
};

export const logout = () => {
    signOut(FireSetup.auth);
};

export function _useUser() {

    const _store = useStore<{
        loading: boolean,
        data: userData | null
    }>({
        loading: true,
        data: null
    });

    useVisibleTask$(() => {

        // toggle loading
        _store.loading = true;

        // server environment
        if (!FireSetup.auth) {
            _store.loading = false;
            _store.data = null;
            return;
        }

        // subscribe to user changes
        return onIdTokenChanged(FireSetup.auth, (_user: User | null) => {

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

export const useUser = () => useShared(_useUser, 'user');
