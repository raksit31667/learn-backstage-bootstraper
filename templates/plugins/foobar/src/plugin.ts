import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const foobarPlugin = createPlugin({
  id: 'foobar',
  routes: {
    root: rootRouteRef,
  },
});

export const FoobarPage = foobarPlugin.provide(
  createRoutableExtension({
    name: 'FoobarPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
