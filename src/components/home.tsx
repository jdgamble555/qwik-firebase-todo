import { component$ } from "@builder.io/qwik";
import { useUser } from "~/lib/user";
import Profile from "./profile";
import { Loading, Login } from "./helpers";

export default component$(() => {

  const { user, loading } = useUser();

  return (
    <div class="text-center">
      <h1 class="text-3xl font-semibold my-3">Qwik Firebase Todo App</h1>
      {loading ? <Loading /> : user ? <Profile {...user} /> : <Login />}
    </div>
  );
});
