import { component$ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import Profile from '~/components/profile';
import { loginWithGoogle } from '~/lib/firebase';
import { useUser } from '~/lib/user';
//import { Link } from '@builder.io/qwik-city';

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
  return <button onClick$={() => loginWithGoogle()}>Signin with Google</button>
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
