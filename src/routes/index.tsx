import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import Layout from '@components/Layout';
import Day from '@components/Pages/Day';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: ':day',
        element: <Day />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to={'/'} />,
  },
];

const router = createBrowserRouter(routes);

export default router;
