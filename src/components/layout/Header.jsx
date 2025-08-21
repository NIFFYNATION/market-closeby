import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryMenu from '../common/CategoryMenu';
import DropdownMenu from '../common/DropdownMenu';
import { Button } from '../common/Button';
import SearchBar from '../common/SearchBar';
import { categories } from '../common/categoryData';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // You can manage this with your auth state

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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
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
              <img src="/icons/menu-white.svg" alt="Menu" className="w-8 h-8" />
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
                <button className="text-white p-0 md:p-4 flex items-center">
                  <img src="/icons/cart.svg" alt="Cart" className="w-6 h-6" />
                  <span className="ml-1 hidden md:inline">My Cart</span>
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
                <button className="bg-secondary text-white px-4 py-2 rounded-full text-sm font-medium hidden md:block hover:bg-secondary-light">
                  Sell on Market Closeby
                </button>
              </div>
            </div>
          </div>
        </div>
        <CategoryMenu />
        <div className='block md:hidden'>
          <SearchBar />
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-lg bg-black/50 z-50 lg:hidden"
          onClick={toggleMobileMenu}
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
            onClick={toggleMobileMenu}
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
            {categories.map((category, index) => (
              <Link
                key={category.name}
                to={`/category/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center justify-between p-4 hover:bg-gray-50 border-b border-gray-100"
                onClick={toggleMobileMenu}
              >
                <span className="text-primary font-medium">{category.name}</span>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            ))}
          </div>

          {/* Additional Menu Items */}
          <div className="py-2">
            <Link
              to="/addresses"
              className="block px-4 py-3 text-primary hover:bg-gray-50"
              onClick={toggleMobileMenu}
            >
              Addresses
            </Link>
            <Link
              to="/payment-methods"
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
              to="/return-policy"
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