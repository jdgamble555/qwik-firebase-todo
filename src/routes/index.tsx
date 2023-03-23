import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Profile from '~/components/profile';
import { useUser } from '~/lib/user';

export default component$(() => {
  const { user, loading } = useUser();

  return (
    <center>
      <h1>Qwik Firebase Todo App</h1>

      {loading ? <Loading /> : user ? <Profile {...{ user }} /> : <Login />}
    </center>
  );
});

export const Loading = () => {
  return <p>Loading...</p>;
};

export const Login = () => {

  return <button onClick$={async () => await signInWithPopup(getAuth(), new GoogleAuthProvider())}>Signin with Google</button>
};


export const head: DocumentHead = {
  title: 'Qwik Firebase Todo App',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description'
    },
  ],
};
