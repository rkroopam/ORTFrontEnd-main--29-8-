import { lazy } from 'react';
import Loadable from '../components/lodable';

const Courses = Loadable(lazy(() => import('../pages/courses')));

const MainRoutes = {
  path: '/',
  element: <Courses />,
  children: [
    {
      path: '/',
      element: <Courses />
    },
  ]
};

export default MainRoutes;
