import type { DocumentHead } from '@builder.io/qwik-city';
import Home from '~/components/home';

export default () => <Home />;

export const head: DocumentHead = {
  title: 'Qwik Firebase Todo App',
  meta: [
    {
      name: 'description',
      content: 'Qwik Firebase Todo App'
    },
  ],
};
