import { component$ } from "@builder.io/qwik";
import { loginWithGoogle, useUser } from "~/lib/user";
import Profile from "./profile";

export default component$(() => {
    const { user, loading } = useUser();
    return (
      <center>
        <h1 class="text-3xl font-semibold my-3">Qwik Firebase Todo App</h1>
        {loading ? <Loading /> : user ? <Profile /> : <Login />}
      </center>
    );
  });
  
  export const Loading = () => {
    return <p>Loading...</p>;
  };
  
  export const Login = () => {
    return <button type="button" class="border p-2 rounded-md text-white bg-red-600" onClick$={() => loginWithGoogle()}>
      Signin with Google
    </button>
  };