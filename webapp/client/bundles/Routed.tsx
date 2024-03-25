import type { FunctionComponent } from 'react';
import * as React from 'react';
import Blogs from './pages/Blogs.js';
import Contact from './pages/Contact.js';
import Home from './pages/Home.js';
import Layout from './pages/Layout.js';
import NoPage from './pages/NoPage.js';

import { createHashRouter, redirect, RouterProvider } from 'react-router-dom';

const router = createHashRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'blogs',
        element: <Blogs />,
      },
      {
        path: 'contact',
        element: <Contact />,
        loader: async ({ request, params, context }) => {
          console.log(JSON.stringify({ request, params, context }, null, 4));
          const response = redirect('/');
          console.log({ response }); // instance of Response https://developer.mozilla.org/en-US/docs/Web/API/Response
          return response;
        },
      },
      {
        path: '*',
        element: <NoPage />,
      },
    ],
  },
]);

export interface Props {}

// Note, you need to declare the `FunctionComponent` type so that it complies
// with `ReactOnRails.register` type.
const Routed: FunctionComponent<Props> = (props: Props) => {
  return <RouterProvider router={router} />;
};

export default Routed;
