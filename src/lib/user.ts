import { useStore, useVisibleTask$ } from '@builder.io/qwik';
import { onIdTokenChanged, User } from 'firebase/auth';
import { auth } from './firebase';

export interface userData {
    photoURL: string | null;
    uid: string;
    displayName: string | null;
    email: string | null;
};

export function useUser() {
    const _store = useStore<{ loading: boolean, user: userData | null }>({ loading: true, user: null });

    useVisibleTask$(() => {

        // toggle loading
        _store.loading = true;

        // subscribe to user changes
        const unsubscribe = onIdTokenChanged(auth, (_user: User | null) => {
            _store.loading = false;
            if (!_user) {
                _store.user = null;
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
            _store.user = data;
        });
        return unsubscribe;
    });

    return _store;
};
