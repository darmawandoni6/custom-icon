import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import List from './Element/List.tsx';
import Login from './Element/Login.tsx';
import MyFiles from './Element/MyFiles';
import Register from './Element/Register.tsx';
import ProviderReact from './helpers/ProviderReact.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <MyFiles />,
      },
      {
        path: '/my-files/:type',
        element: <MyFiles />,
      },
      {
        path: '/document',
        element: <List title="Document" />,
      },
      {
        path: '/recent',
        element: <List title="Recent" />,
      },
      {
        path: '/favorite',
        element: <List title="Favorite" />,
      },
      {
        path: '/archived',
        element: <List title="Archived" />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ProviderReact>
    <RouterProvider router={router} />
  </ProviderReact>,
);
