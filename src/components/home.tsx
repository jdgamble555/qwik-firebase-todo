import { component$ } from "@builder.io/qwik";
import { setUser } from "~/lib/auth";
import Profile from "./profile";
import { Loading, Login } from "./helpers";

export default component$(() => {

  const user = setUser();

  return (
    <div class="text-center">
      <h1 class="text-3xl font-semibold my-3">Qwik Firebase Todo App</h1>
      {user.value.loading ? <Loading /> : user.value.data ? <Profile /> : <Login />}
    </div>
  );
});
