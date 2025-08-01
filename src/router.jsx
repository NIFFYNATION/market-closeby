import { createBrowserRouter } from 'react-router-dom';

import App from './App'; 
import Layout from './components/layout/layout';
import HomePage from './pages/HomePage';
import SearchResultsPage from './pages/SearchResultsPage'; 
import ProductDetailsPage from './pages/ProductDetailsPage';

// Help Center imports
import HelpCenter from './pages/HelpCenter/HelpCenter';
import FAQ from './pages/HelpCenter/FAQ';
import OrdersPayments from './pages/HelpCenter/OrdersPayments';
import ShippingDelivery from './pages/HelpCenter/ShippingDelivery';
import ReturnsRefunds from './pages/HelpCenter/ReturnsRefunds';
import AccountSettings from './pages/HelpCenter/AccountSettings';
import BuyersSellers from './pages/HelpCenter/BuyersSellers';
import CustomerSupport from './pages/HelpCenter/CustomerSupport';

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
          
          // Help Center routes
          { path: '/help', element: <HelpCenter /> },
          { path: '/help/faqs', element: <FAQ /> },
          { path: '/help/orders-payments', element: <OrdersPayments /> },
          { path: '/help/shipping-delivery', element: <ShippingDelivery /> },
          { path: '/help/returns-refunds', element: <ReturnsRefunds /> },
          { path: '/help/account-settings', element: <AccountSettings /> },
          { path: '/help/buyers-sellers', element: <BuyersSellers /> },
          { path: '/help/customer-support', element: <CustomerSupport /> },
        ],
      },
    ],
  },
]);