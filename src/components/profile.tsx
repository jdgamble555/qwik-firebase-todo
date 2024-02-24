import { component$ } from '@builder.io/qwik';
import { logout, useUser } from '~/lib/user';
import Todos from './todos';

export default component$(() => {

    const { user } = useUser();

    if (!user) {
        return;
    }

    return (
        <div class="flex flex-col gap-3 items-center">
            <h3 class="font-bold">Hi {user.displayName}!</h3>
            <img src={user.photoURL || ''} width="100" height="100" alt="user avatar" />
            <p>Your userID is {user.uid}</p>
            <p>
                <button type="button" class="border p-2 rounded-md text-white bg-lime-600" onClick$={() => logout()}>
                    Logout
                </button>
            </p>
            <Todos {...user} />
        </div>
    );
});


