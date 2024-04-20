import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import { getAbout } from "~/lib/about";

export const useAboutPage = routeLoader$(async () => {

    //cacheControl({ maxAge: 31536000, public: true });

    return await getAbout();
});

export default component$(() => {

    const about = useAboutPage();

    return (
        <div class="flex items-center justify-center my-5">
            <div class="border w-[400px] p-5 flex flex-col gap-3">
                <h1 class="text-3xl font-semibold">{about.value.name}</h1>
                <p>{about.value.description}</p>
            </div>
        </div>
    );
});