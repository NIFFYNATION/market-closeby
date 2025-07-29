import { createBrowserRouter } from 'react-router-dom';

import App from './App'; 
import Layout from './components/layout/layout';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage'; 

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          { path: '/', element: <HomePage /> },
          { path: '/search', element: <SearchResultsPage /> }, 
        ],
      },
    ],
  },
]);
