import { lazy } from 'react';
import AdminPage from '../pages/admin'
import Loadable from '../components/lodable';
const Student = Loadable(lazy(() => import('../pages/admin/students')));
const Teacher = Loadable(lazy(() => import('../pages/admin/teachers')));
const Dashboard = Loadable(lazy(() => import('../pages/admin/dashboard')));

const AdminRoutes = {
  path: '/',
  element: <AdminPage />,
  children: [
    {
      path: '/admin',
      element: <Dashboard />
    },
    {
      path: 'dashboard',
      element: <Dashboard />
    },
    {
      path: 'students',
      element: <Student />
    },
    {
      path: 'teachers',
      element: <Teacher />
    },
  ]
};

export default AdminRoutes;
