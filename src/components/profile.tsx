import { component$ } from '@builder.io/qwik';
import type { userData } from '~/lib/user';
import Todos from './todos';
import { Logout } from './helpers';

export default component$((user: userData) => {

    return (
        <div class="flex flex-col gap-3 items-center">
            <h3 class="font-bold">Hi {user.displayName}!</h3>
            <img src={user.photoURL || ''} width="100" height="100" alt="user avatar" />
            <p>Your userID is {user.uid}</p>
            <Logout />
            <Todos {...user} />
        </div>
    );    
});


