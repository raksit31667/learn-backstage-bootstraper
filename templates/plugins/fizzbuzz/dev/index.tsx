import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { fizzbuzzPlugin, FizzbuzzPage } from '../src/plugin';

createDevApp()
  .registerPlugin(fizzbuzzPlugin)
  .addPage({
    element: <FizzbuzzPage />,
    title: 'Root Page',
    path: '/fizzbuzz'
  })
  .render();
