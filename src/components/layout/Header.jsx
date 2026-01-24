import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CategoryMenu from '../common/CategoryMenu';
import DropdownMenu from '../common/DropdownMenu';
import { Button } from '../common/Button';
import SearchBar from '../common/SearchBar';
import { categories } from '../common/categoryData';
import { useCartStore } from '../../store/cartStore';
import { useUIStore } from '../../store/uiStore';

function Header() {
  const isMobileMenuOpen = useUIStore((s) => s.isMobileMenuOpen);
  const toggleMobileMenu = useUIStore((s) => s.toggleMobileMenu);
  const closeMobileMenu = useUIStore((s) => s.closeMobileMenu);
  const [isLoggedIn, setIsLoggedIn] = useState(false); 
  // Mobile category drilldown state (mobile-only)
  const [mobileMenuView, setMobileMenuView] = useState("categories"); // "categories" | "submenu"
  const [mobileActiveCategoryIndex, setMobileActiveCategoryIndex] = useState(0);
  
  const navigate = useNavigate();
  const cartCount = useCartStore((state) => state.cartCount());

  // Icons (replace with your own SVGs or icon components)
  const helpIcon = <img src="/icons/help.svg" alt="Help" className="w-5 h-5" />;
  const userIcon = <img src="/icons/user.svg" alt="User" className="w-6 h-6" />;
  const arrowDown = <img src="/icons/arrow-down-white.svg" alt="Dropdown" className="ml-1 w-4 h-4 hidden md:inline" />;

  // Help Dropdown Data
  const helpMenu = [
    { label: "Help Center", to: "/help" },
    { label: "Contact Us", to: "/contact" },
    { label: "Track My Order", to: "/help/track-order" },
    { label: "Return & Refund Policy", to: "/help/returns-refunds" },
    { label: "FAQs", to: "/help/faqs" },
  ];
  
  const accountHeader = (
    <Button
      variant="secondary"
      size="md"
      shape="rounded"
      fullWidth
      icon={<img src="/icons/signin.svg" alt="Sign In" className="w-5 h-5" />}
    >
      Sign In
    </Button>
  );
  
  const helpFooter = (
    <Button
      variant="secondary"
      size="md"
      shape="rounded"
      fullWidth
      icon={<img src="/icons/chat.svg" alt="Live Chat" className="w-5 h-5" />}
    >
      Live Chat
    </Button>
  );

  // Account Dropdown Data
  const accountMenu = [
    {
      label: (
        <span className="flex items-center">
          <img src="/icons/account.svg" alt="Account" className="w-5 h-5 mr-2" />
          My Account
        </span>
      ),
      to: "/account",
    },
    {
      label: (
        <span className="flex items-center">
          <img src="/icons/orders.svg" alt="Orders" className="w-5 h-5 mr-2" />
          Orders
        </span>
      ),
      to: "/orders",
    },
    {
      label: (
        <span className="flex items-center">
          <img src="/icons/inbox.svg" alt="Inbox" className="w-5 h-5 mr-2" />
          Inbox
        </span>
      ),
      to: "/inbox",
    },
    {
      label: (
        <span className="flex items-center">
          <img src="/icons/wishlist.svg" alt="Wishlist" className="w-5 h-5 mr-2" />
          Wishlist
        </span>
      ),
      to: "/wishlist",
    },
    {
      label: (
        <span className="flex items-center">
          <img src="/icons/logout.svg" alt="Log Out" className="w-5 h-5 mr-2" />
          Log Out
        </span>
      ),
      onClick: () => {
        // handle logout
      },
    },
  ];

  // Menu control moved to global UI store for cross-component control

  const createSlug = (name = "") => name.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");

  const openMobileSubMenu = (index) => {
    setMobileActiveCategoryIndex(index);
    setMobileMenuView("submenu");
  };

  const closeMobileSubMenu = () => setMobileMenuView("categories");

  const handleMobileSearchNavigation = (searchTerm) => {
    closeMobileMenu();
    setMobileMenuView("categories");
    navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
  };

  const handleMobileCategoryNavigation = (categoryName) => {
    closeMobileMenu();
    setMobileMenuView("categories");
    navigate(`/category/${createSlug(categoryName)}`);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    // Add your login logic here
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Add your logout logic here
  };

  return (
    <>
      <header className="fixed w-full z-50">
        <div className="bg-primary py-5 px-4 md:px-6 lg:px-10 w-full top-0 z-50">
      <div className=" mx-auto flex items-center justify-between">
        {/* Mobile Menu Button - Visible only on mobile */}
            <button 
              className="lg:hidden pr-4"
              onClick={toggleMobileMenu}
            >
              <img src="/icons/menu-white.png" alt="Menu" className="w-8 h-8" />
            </button>
            
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src="/icons/Logo.svg" alt="Market Closeby" className="w-[120px] md:w-full" />
        </Link>

        {/* Search and Navigation */}
        <div className="flex-1 flex items-center justify-end lg:justify-between ml-4  ">
          {/* Search Bar - Hidden on mobile */}
              <div className='max-w-[900px] hidden lg:flex'>
                <SearchBar />
          </div>

          {/* Navigation Items */}
              <div className="flex items-center space-x-2 md:space-x-4">
                {/* Help Dropdown */}
                <DropdownMenu
                  buttonContent={
                    <>
                      {helpIcon}
              <span className="ml-1 hidden md:inline">Help</span>
                      {arrowDown}
                    </>
                  }
                  menuItems={helpMenu}
                  footer={helpFooter}
                  buttonClass="text-white p-4  hidden lg:flex"
                />

            {/* Cart Button */}
            <button
              onClick={() => navigate('/cart')}
              className="relative text-white p-0 md:p-4 flex items-center hover:opacity-80 transition"
              aria-label="Open cart"
            >
              <img src="/icons/cart.svg" alt="Cart" className="w-6 h-6" />
              <span className="ml-1 hidden md:inline">My Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 md:-top-2 md:-right-2 bg-secondary text-white text-xs font-bold rounded-full h-5 min-w-[1.25rem] px-1 flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

                {/* Account Dropdown */}
                <DropdownMenu
                  buttonContent={
                    <>
                      {userIcon}
                      {arrowDown}
                    </>
                  }
                  menuItems={accountMenu}
                  header={accountHeader}
                  align="right"
                  buttonClass="text-white flex px-4 items-center"
                />

            {/* User shop */}
            <button className="text-white flex items-center block md:hidden">
              <img src="/icons/shop.svg" alt="shop" className="w-6 h-6" />
              <img src="/icons/arrow-down-white.svg" alt="Dropdown" className="ml-1 w-4 h-4 hidden md:inline" />
            </button>

            {/* Sell Button */}
            <Link to='/seller-landing-page'  className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium hidden md:block hover:bg-secondary-light">
              Sell on Market Closeby
            </Link>
              </div>
            </div>
          </div>
        </div>
        <CategoryMenu />
        {/* <div className='block md:hidden'>
          <SearchBar />
        </div> */}
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-lg bg-black/50 z-50 lg:hidden"
          onClick={() => {
            closeMobileMenu();
            setMobileMenuView("categories");
          }}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out lg:hidden flex flex-col ${
        isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        {/* Header with Logo and Close Button - Fixed */}
        <div className="flex items-center justify-between p-4 border-b border-primary flex-shrink-0">
          <img src="/icons/Logo-mobile.svg" alt="Market Closeby" className="w-12" />
          <button 
            onClick={() => {
              toggleMobileMenu();
              setMobileMenuView("categories");
            }}
            className="p-2"
          >
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Login/Logout Buttons - Fixed */}
        <div className="p-4 border-b border-primary flex-shrink-0">
          <div className="flex space-x-3">
            {!isLoggedIn ? (
              <>
                <button 
                  onClick={handleLogin}
                  className="flex-1 bg-primary text-white py-2 px-4 rounded text-sm font-medium"
                >
                  Login
                </button>
                <button className="flex-1 border border-primary text-primary py-2 px-4 rounded text-sm font-medium">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="flex-1 bg-primary text-white py-2 px-4 rounded text-sm font-medium">
                  Login
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex-1 border border-primary text-primary py-2 px-4 rounded text-sm font-medium"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Scrollable Menu Content */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {/* Categories Section */}
          <div className="border-b border-primary">
            {mobileMenuView === "categories" ? (
              <div className="py-2">
                <div className="px-4 pt-3 pb-2">
                  <p className="text-xs font-semibold tracking-wide text-text-grey uppercase">Shop by category</p>
                </div>

                {categories.map((category, index) => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => openMobileSubMenu(index)}
                    className="w-full flex items-center justify-between px-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <span className="text-primary font-semibold text-left">{category.name}</span>
                    <span className="w-9 h-9 rounded-full bg-background-alt flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="py-2">
                {/* Submenu header */}
                <div className="px-4 pt-2 pb-3 border-b border-gray-100 bg-white sticky top-0 z-10">
                  <button
                    type="button"
                    onClick={closeMobileSubMenu}
                    className="inline-flex items-center gap-2 text-primary font-semibold"
                  >
                    <span className="w-9 h-9 rounded-full bg-background-alt flex items-center justify-center">
                      <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </span>
                    Back
                  </button>

                  <div className="mt-3">
                    <p className="text-lg font-bold text-text-primary leading-tight">
                      {categories[mobileActiveCategoryIndex]?.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => handleMobileCategoryNavigation(categories[mobileActiveCategoryIndex]?.name)}
                      className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-secondary"
                    >
                      View all
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Submenu content */}
                <div className="px-4 py-4 space-y-5">
                  {(categories[mobileActiveCategoryIndex]?.sections || []).length === 0 ? (
                    <div className="p-4 rounded-2xl bg-background-alt text-text-grey">
                      No subcategories available.
                    </div>
                  ) : (
                    (categories[mobileActiveCategoryIndex]?.sections || []).map((section) => (
                      <div key={section.title} className="rounded-2xl border border-gray-100 overflow-hidden">
                        <button
                          type="button"
                          onClick={() => handleMobileSearchNavigation(section.title)}
                          className="w-full flex items-center justify-between px-4 py-3 bg-white hover:bg-gray-50 transition"
                        >
                          <span className="text-text-primary font-semibold text-left">{section.title}</span>
                          <span className="text-xs text-text-grey">Search</span>
                        </button>

                        <div className="bg-white px-4 pb-3">
                          <div className="h-px bg-gray-100 mb-3" />
                          <div className="flex flex-col">
                            {(section.items || []).map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => handleMobileSearchNavigation(item)}
                                className="text-left py-2 text-sm font-medium text-text-secondary hover:text-primary transition"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Additional Menu Items */}
          <div className="py-2">
            <Link
              to="/account"
              className="block px-4 py-3 text-primary hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Addresses
            </Link>
            <Link
              to="/account"
              className="block px-4 py-3 text-primary hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Payment Methods
            </Link>
            <Link
              to="/orders"
              className="block px-4 py-3 text-primary hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Orders
            </Link>
          </div>

          {/* Footer Links */}
          <div className="border-t mt-4 pt-4 text-primary">
            <Link
              to="/privacy-policy"
              className="block px-4 py-3  hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Privacy Policy
            </Link>
            <Link
              to="/help/returns-refunds"
              className="block px-4 py-3  hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Return Policy
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-3  hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3  hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              About Us
            </Link>
          </div>

          {/* Login Button at Bottom */}
          <div className="p-4 mt-8">
            <button 
              className="w-full bg-primary text-white py-3 rounded font-medium"
              onClick={toggleMobileMenu}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Header
