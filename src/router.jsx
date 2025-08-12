import { createBrowserRouter } from "react-router-dom";

import App from "./App";
import Layout from "./components/layout/layout";
import HomePage from "./pages/HomePage";
import SearchResultsPage from "./pages/SearchResultsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import ContactUs from "./pages/ContactUs";

// Auth imports
import Auth from "./pages/Auth/Auth";
import Verification from "./pages/Auth/Verification";
import PasskeySecurity from "./pages/Auth/PasskeySecurity";
import AccountComplete from "./pages/Auth/AccountComplete";

// Store Setup imports
import StoreInfo from "./pages/StoreSetup/StoreInfo";
import StoreImageUpload from "./pages/StoreSetup/StoreImageUpload";
import Kyc from "./pages/StoreSetup/Kyc";
import LocationInfo from './pages/StoreSetup/LocationInfo';
import ConfirmBusinessId from './pages/StoreSetup/ConfirmBusinessId';
import DeliveryAndShipping from './pages/StoreSetup/DeliveryAndShipping';
import BankDetails from './pages/StoreSetup/BankDetails';

// Help Center imports
import HelpCenter from "./pages/HelpCenter/HelpCenter";
import FAQ from "./pages/HelpCenter/FAQ";
import OrdersPayments from "./pages/HelpCenter/OrdersPayments";
import ShippingDelivery from "./pages/HelpCenter/ShippingDelivery";
import ReturnsRefunds from "./pages/HelpCenter/ReturnsRefunds";
import AccountSettings from "./pages/HelpCenter/AccountSettings";
import BuyersSellers from "./pages/HelpCenter/BuyersSellers";
import CustomerSupport from "./pages/HelpCenter/CustomerSupport";
import TrackOrder from "./pages/HelpCenter/TrackOrder";

// My Account imports
import MyAccount from "./pages/MyAccount/MyAccount";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Auth routes - WITHOUT Layout (no header/footer)
      { path: "/auth", element: <Auth /> },
      { path: "/login", element: <Auth /> },
      { path: "/signup", element: <Auth /> },
      { path: "/verification", element: <Verification /> },
      { path: "/passkey-security", element: <PasskeySecurity /> },
      { path: "/account-complete", element: <AccountComplete /> },

      // Store Setup routes - WITHOUT Layout
      { path: "/store-setup", element: <StoreInfo /> },
      // Add this route in your routes configuration
      { path: "/store-image-upload", element: <StoreImageUpload /> },
      { path: "/kyc", element: <Kyc />, },
      { path: '/location-info', element: <LocationInfo /> },
      { path: '/confirm-business-id', element: <ConfirmBusinessId /> },
      { path: '/delivery-shipping', element: <DeliveryAndShipping /> },
      { path: '/bank-details', element: <BankDetails /> },

      // Main app routes - WITH Layout (includes header/footer)
      {
        path: "/",
        element: <Layout />,
        children: [
          { path: "/", element: <HomePage /> },
          { path: "/search", element: <SearchResultsPage /> },
          { path: "/product/:id", element: <ProductDetailsPage /> },
          { path: "/contact", element: <ContactUs /> },

          // My Account routes
          { path: "/account", element: <MyAccount /> },

          // Help Center routes
          { path: "/help", element: <HelpCenter /> },
          { path: "/help/faqs", element: <FAQ /> },
          { path: "/help/orders-payments", element: <OrdersPayments /> },
          { path: "/help/shipping-delivery", element: <ShippingDelivery /> },
          { path: "/help/returns-refunds", element: <ReturnsRefunds /> },
          { path: "/help/account-settings", element: <AccountSettings /> },
          { path: "/help/buyers-sellers", element: <BuyersSellers /> },
          { path: "/help/customer-support", element: <CustomerSupport /> },
          { path: "/help/track-order", element: <TrackOrder /> },
        ],
      },
    ],
  },
]);
