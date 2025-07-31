import { createBrowserRouter } from 'react-router-dom';

import App from './App'; 
import Layout from './components/layout/layout';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage'; 
import ProductDetailsPage from './pages/ProductDetailsPage';
import HelpCenter from './pages/HelpCenter';

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
          { path: '/product/:id', element: <ProductDetailsPage /> },
          { path: '/help', element: <HelpCenter /> },
        ],
      },
    ],
  },
]);
