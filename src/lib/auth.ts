import {
    createContextId,
    useContext,
    useContextProvider,
    useStore,
    useVisibleTask$
} from '@builder.io/qwik';
import {
    GoogleAuthProvider,
    onIdTokenChanged,
    signInWithPopup,
    signOut,
    type User
} from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { auth } from './firebase';

// User context key
const USER_CONTEXT = createContextId<{ value: UserState }>('user');

export const loginWithGoogle = async () => {
    try {
        await signInWithPopup(auth, new GoogleAuthProvider());
        return { error: null };
    } catch (error) {
        if (error instanceof FirebaseError) {
            return { error: error.message };
        }
        throw error;
    }
};

export const logout = async () => {
    try {
        await signOut(auth);
        return { error: null };
    } catch (error) {
        if (error instanceof FirebaseError) {
            return { error: error.message };
        }
        throw error;
    }
};

export const setUser = () => {

    const user = useStore<{ value: UserState }>({
        value: {
            loading: true,
            data: null
        }
    });

    // Share the same user state with child components
    useContextProvider(USER_CONTEXT, user);

    // Create user listener
    useVisibleTask$(({ cleanup }) => {

        const unsubscribe = onIdTokenChanged(auth, (_user: User | null) => {

            // Not logged in
            if (!_user) {
                user.value = {
                    loading: false,
                    data: null
                };
                return;
            }

            // Logged in
            const { displayName, photoURL, uid, email } = _user;

            user.value = {
                loading: false,
                data: { displayName, photoURL, uid, email }
            };
        });

        // Remove the listener when the layout is destroyed
        cleanup(unsubscribe);
    });

    return user;
};

export const getUser = () => {
    return useContext(USER_CONTEXT);
};
