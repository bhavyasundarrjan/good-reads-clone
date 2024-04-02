import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
// import Home from 'pages/components-overview/Home';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/SamplePage')));

// render - utilities
const WantToRead = Loadable(lazy(() => import('pages/components-overview/WantToRead')));
const CurrentlyReading = Loadable(lazy(() => import('pages/components-overview/CurrentlyReading')));
const Read = Loadable(lazy(() => import('pages/components-overview/Read')));
const Home = Loadable(lazy(() => import('pages/components-overview/Home')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <Home />
    },
    {
      path: 'currentlyReading',
      element: <CurrentlyReading />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <Home />
        },
        {
          path: 'myBooks',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'detail-page/:bookid',
      element: <SamplePage />
    },
    {
      path: 'read',
      element: <Read />
    },
    {
      path: 'wantToRead',
      element: <WantToRead />
    }
  ]
};

export default MainRoutes;
