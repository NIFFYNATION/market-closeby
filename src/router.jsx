import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layouts - Keep eager to prevent layout flickering
import App from "./App";
import Layout from "./components/layout/layout";
import DashboardLayout from "./pages/SellerDashboard/DashboardLayout";
import ErrorPage from "./components/common/ErrorPage";

// Loading Fallback
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500"></div>
  </div>
);

// Helper to wrap lazy components
const Load = (element) => (
  <Suspense fallback={<PageLoader />}>
    {element}
  </Suspense>
);

// Lazy Imports - Auth
const SignUp = lazy(() => import("./pages/Auth/SignUp"));
const SignIn = lazy(() => import("./pages/Auth/SignIn"));
const Verification = lazy(() => import("./pages/Auth/Verification"));
const PasskeySecurity = lazy(() => import("./pages/Auth/PasskeySecurity"));
const AccountComplete = lazy(() => import("./pages/Auth/AccountComplete"));

// Lazy Imports - Store Setup
const StoreInfo = lazy(() => import("./pages/StoreSetup/StoreInfo"));
const StoreImageUpload = lazy(() => import("./pages/StoreSetup/StoreImageUpload"));
const Kyc = lazy(() => import("./pages/StoreSetup/Kyc"));
const LocationInfo = lazy(() => import("./pages/StoreSetup/LocationInfo"));
const ConfirmBusinessId = lazy(() => import("./pages/StoreSetup/ConfirmBusinessId"));
const DeliveryAndShipping = lazy(() => import("./pages/StoreSetup/DeliveryAndShipping"));
const BankDetails = lazy(() => import("./pages/StoreSetup/BankDetails"));

// Lazy Imports - Main Pages
const HomePage = lazy(() => import("./pages/HomePage"));
const SellerLandingPage = lazy(() => import("./pages/SellerLandingPage"));
const SearchResultsPage = lazy(() => import("./pages/SearchResultsPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const ContactUs = lazy(() => import("./pages/ContactUs"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));
const BulkPurchase = lazy(() => import("./pages/BulkPurchase"));
const CartPage = lazy(() => import("./pages/CartPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const OrdersPage = lazy(() => import("./pages/OrdersPage"));
const InboxPage = lazy(() => import("./pages/InboxPage"));
const MyAccount = lazy(() => import("./pages/MyAccount/MyAccount"));

// Lazy Imports - Help Center
const HelpCenter = lazy(() => import("./pages/HelpCenter/HelpCenter"));
const FAQ = lazy(() => import("./pages/HelpCenter/FAQ"));
const OrdersPayments = lazy(() => import("./pages/HelpCenter/OrdersPayments"));
const ShippingDelivery = lazy(() => import("./pages/HelpCenter/ShippingDelivery"));
const ReturnsRefunds = lazy(() => import("./pages/HelpCenter/ReturnsRefunds"));
const AccountSettings = lazy(() => import("./pages/HelpCenter/AccountSettings"));
const BuyersSellers = lazy(() => import("./pages/HelpCenter/BuyersSellers"));
const CustomerSupport = lazy(() => import("./pages/HelpCenter/CustomerSupport"));
const TrackOrder = lazy(() => import("./pages/HelpCenter/TrackOrder"));

// Lazy Imports - Seller Dashboard (Standalone Page)
const Dashboard = lazy(() => import("./pages/SellerDashboard/Dashboard"));

// Lazy Imports - Seller Dashboard Inner Pages
const DashboardHome = lazy(() => import("./pages/SellerDashboard/DashboardHome"));
const Products = lazy(() => import("./pages/SellerDashboard/Products"));
const AddProduct = lazy(() => import("./pages/SellerDashboard/AddProduct"));
const EditProduct = lazy(() => import("./pages/SellerDashboard/EditProduct"));
const Orders = lazy(() => import("./pages/SellerDashboard/Orders"));
const OrderDetails = lazy(() => import("./pages/SellerDashboard/OrderDetails"));
const Wallet = lazy(() => import("./pages/SellerDashboard/Wallet"));
const Settings = lazy(() => import("./pages/SellerDashboard/Settings"));
const Stores = lazy(() => import("./pages/SellerDashboard/Stores"));
const AddStoreWizard = lazy(() => import("./pages/SellerDashboard/AddStore/AddStoreWizard"));
const VerificationStatus = lazy(() => import("./pages/SellerDashboard/VerificationStatus"));
const VerificationDetails = lazy(() => import("./pages/SellerDashboard/VerificationDetails"));
const Support = lazy(() => import("./pages/SellerDashboard/Support"));
const AiFeatures = lazy(() => import("./pages/SellerDashboard/AiFeatures"));

// Route Definitions
const authRoutes = [
  { path: "/signup", element: Load(<SignUp />) },
  { path: "/signin", element: Load(<SignIn />) },
  { path: "/verification", element: Load(<Verification />) },
  { path: "/passkey-security", element: Load(<PasskeySecurity />) },
  { path: "/account-complete", element: Load(<AccountComplete />) },
];

const storeSetupRoutes = [
  { path: "/store-setup", element: Load(<StoreInfo />) },
  { path: "/store-image-upload", element: Load(<StoreImageUpload />) },
  { path: "/kyc", element: Load(<Kyc />) },
  { path: "/location-info", element: Load(<LocationInfo />) },
  { path: "/confirm-business-id", element: Load(<ConfirmBusinessId />) },
  { path: "/delivery-shipping", element: Load(<DeliveryAndShipping />) },
  { path: "/bank-details", element: Load(<BankDetails />) },
];

const helpCenterRoutes = [
  { path: "/help", element: Load(<HelpCenter />) },
  { path: "/help/faqs", element: Load(<FAQ />) },
  { path: "/help/orders-payments", element: Load(<OrdersPayments />) },
  { path: "/help/shipping-delivery", element: Load(<ShippingDelivery />) },
  { path: "/help/returns-refunds", element: Load(<ReturnsRefunds />) },
  { path: "/help/account-settings", element: Load(<AccountSettings />) },
  { path: "/help/buyers-sellers", element: Load(<BuyersSellers />) },
  { path: "/help/customer-support", element: Load(<CustomerSupport />) },
  { path: "/help/track-order", element: Load(<TrackOrder />) },
];

const mainRoutes = [
  { path: "/", element: Load(<HomePage />) },
  { path: "/seller-landing-page", element: Load(<SellerLandingPage />) },
  { path: "/search", element: Load(<SearchResultsPage />) },
  { path: "/category/:slug", element: Load(<SearchResultsPage />) },
  { path: "/product/:id", element: Load(<ProductDetailsPage />) },
  { path: "/contact", element: Load(<ContactUs />) },
  { path: "/about", element: Load(<AboutUs />) },
  { path: "/privacy-policy", element: Load(<PrivacyPolicy />) },
  { path: "/terms", element: Load(<TermsAndConditions />) },
  { path: "/bulk", element: Load(<BulkPurchase />) },
  { path: "/cart", element: Load(<CartPage />) },
  { path: "/wishlist", element: Load(<WishlistPage />) },
  { path: "/checkout", element: Load(<CheckoutPage />) },
  { path: "/orders/:orderId", element: Load(<OrdersPage />) },
  { path: "/orders", element: Load(<OrdersPage />) },
  { path: "/account", element: Load(<MyAccount />) },
  { path: "/inbox", element: Load(<InboxPage />) },
  ...helpCenterRoutes,
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      // Routes without Main Layout
      ...authRoutes,
      ...storeSetupRoutes,
      { path: "/dashboard", element: Load(<Dashboard />) },

      // Routes with Main Layout
      {
        path: "/",
        element: <Layout />,
        children: mainRoutes,
      },
    ],
  },
  {
    path: "/seller-dashboard",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: Load(<DashboardHome />) },
      { path: "products", element: Load(<Products />) },
      { path: "add-product", element: Load(<AddProduct />) },
      { path: "edit-product/:id", element: Load(<EditProduct />) },
      { path: "orders", element: Load(<Orders />) },
      { path: "order-details/:id", element: Load(<OrderDetails />) },
      { path: "wallet", element: Load(<Wallet />) },
      { path: "stores", element: Load(<Stores />) },
      { path: "add-store", element: Load(<AddStoreWizard />) },
      { path: "verification-status", element: Load(<VerificationStatus />) },
      { path: "verification-details/:id", element: Load(<VerificationDetails />) },
      { path: "support", element: Load(<Support />) },
      { path: "ai-features", element: Load(<AiFeatures />) },
      { path: "settings", element: Load(<Settings />) },
    ],
  },
]);

export default router;
