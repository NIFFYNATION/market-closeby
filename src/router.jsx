import { createBrowserRouter } from 'react-router-dom';

import App from './App'; // <-- import App
import Layout from './components/layout/layout';
import HomePage from './pages/HomePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />, // <-- App is now the root
    children: [
      {
        path: '/',
        element: <Layout />, // <-- Layout wraps all pages with header/footer
        children: [
          {
            path: '/',
            element: <HomePage />,
          },
          // ...other routes
        ],
      },
    ],
  },
]);
