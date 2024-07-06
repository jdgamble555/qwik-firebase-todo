import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getAbout } from "~/lib/about";

export const useAboutPage = routeLoader$(async ({ headers, fail }) => {

    const authIdToken = headers.get('Authorization')?.split('Bearer ')[1];

    console.log(authIdToken);

    if (!authIdToken) {
        return fail(401, { message: 'Not Logged In!' });
    }

    return await getAbout(authIdToken);
});

export default component$(() => {

    const about = useAboutPage();

    if (about.value.failed) {
        return (
            <div class="p-4 text-center font-bold">
                <p class="text-red-500">
                    {about.value.message}
                </p>
            </div>
        );
    }

    return (
        <div class="flex items-center justify-center my-5">
            <div class="border w-[400px] p-5 flex flex-col gap-3">
                <h1 class="text-3xl font-semibold">{about.value.name}</h1>
                <p>{about.value.description}</p>
            </div>
        </div>
    );
});