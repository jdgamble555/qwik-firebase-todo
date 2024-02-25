import { loginWithGoogle, logout } from "~/lib/user";

export const Loading = () => {
    return <p>Loading...</p>;
};

export const Login = () => {
    return <button type="button" class="border p-2 rounded-md text-white bg-red-600" onClick$={() => loginWithGoogle()}>
        Signin with Google
    </button>
};

export const Logout = () => {
    return <p>
        <button type="button" class="border p-2 rounded-md text-white bg-lime-600" onClick$={() => logout()}>
            Logout
        </button>
    </p>;
};
