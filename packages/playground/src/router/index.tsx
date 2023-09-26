import { createHashRouter, RouterProvider } from 'react-router-dom';
import { pages } from '../containers/page';
import { experiments } from '../containers/experiment';

const router = createHashRouter([
  {
    path: '/',
    children: pages,
  },
  {
    path: '/experiments',
    children: experiments,
  },
]);

const Router = () => <RouterProvider router={router} />;

export { Router };
