import { createPlugin, createRoutableExtension } from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const fizzbuzzPlugin = createPlugin({
  id: 'fizzbuzz',
  routes: {
    root: rootRouteRef,
  },
});

export const FizzbuzzPage = fizzbuzzPlugin.provide(
  createRoutableExtension({
    name: 'FizzbuzzPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);
