import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { foobarPlugin, FoobarPage } from '../src/plugin';

createDevApp()
  .registerPlugin(foobarPlugin)
  .addPage({
    element: <FoobarPage />,
    title: 'Root Page',
    path: '/foobar'
  })
  .render();
