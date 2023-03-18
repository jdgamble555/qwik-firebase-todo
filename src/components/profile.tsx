import { component$ } from '@builder.io/qwik';
import type { userData } from '~/lib/user';
import { useUser } from '~/lib/user';
import Todos from './todos/todos';

export default component$(({ user }: { user: userData }) => {

    const { logout } = useUser();

    return (
        <>
            <h3>Hi {user.displayName}!</h3>
            <img src={user.photoURL || ''} width="100" alt="user avatar" />
            <p>Your userID is {user.uid}</p>
            <p>
                <button onClick$={() => logout()}>Logout</button>
            </p>
            <Todos {...user} />
        </>
    );
});


