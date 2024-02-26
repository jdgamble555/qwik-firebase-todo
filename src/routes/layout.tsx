import { component$, Slot } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
  return (
    <>
      <Slot />
      <nav class="flex gap-3 justify-center mt-5">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
      </nav>
    </>
  );
});
