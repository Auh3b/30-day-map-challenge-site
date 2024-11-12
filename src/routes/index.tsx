import { createBrowserRouter, Navigate, RouteObject } from 'react-router-dom';
import Layout from '@components/Layout';
import Day1 from '@components/Pages/Day1';
import Day2 from '@components/Pages/Day2';
import Day3 from '@components/Pages/Day3';
import Day4 from '@components/Pages/Day4';
import Day5 from '@components/Pages/Day5';
import Day6 from '@components/Pages/Day6';
import Day7 from '@components/Pages/Day7';
import Day8 from '@components/Pages/Day8';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '1',
        element: <Day1 />,
      },
      {
        path: '2',
        element: <Day2 />,
      },
      {
        path: '3',
        element: <Day3 />,
      },
      {
        path: '4',
        element: <Day4 />,
      },
      {
        path: '5',
        element: <Day5 />,
      },
      {
        path: '6',
        element: <Day6 />,
      },
      {
        path: '7',
        element: <Day7 />,
      },
      {
        path: '8',
        element: <Day8 />,
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
