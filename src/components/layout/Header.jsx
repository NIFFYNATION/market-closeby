import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import CategoryMenu from '../common/CategoryMenu';
import NationwideModal from '../NationwideModal';
import DropdownMenu from '../common/DropdownMenu';
import { Button } from '../common/Button';
import SearchBar from '../common/SearchBar';



function Header() {
  

  // Icons (replace with your own SVGs or icon components)
  const helpIcon = <img src="/icons/help.svg" alt="Help" className="w-5 h-5" />;
  const userIcon = <img src="/icons/user.svg" alt="User" className="w-6 h-6" />;
  const arrowDown = <img src="/icons/arrow-down-white.svg" alt="Dropdown" className="ml-1 w-4 h-4 hidden md:inline" />;

  // Help Dropdown Data
  const helpMenu = [
    { label: "Help Center", to: "/help" },
    { label: "Contact Us", to: "/contact" },
    { label: "Track My Order", to: "/track" },
    { label: "Return & Refund Policy", to: "/refund" },
    { label: "FAQs", to: "/faqs" },
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

  return (
    <header className="fixed w-full z-50">
      <div className="bg-primary py-5 px-4 md:px-6 lg:px-10 w-full top-0 z-50">
        <div className=" mx-auto flex items-center justify-between">
          {/* Mobile Menu Button - Visible only on mobile */}
          <button className="lg:hidden pr-4">
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
            <div className='block 
            md:hidden'>
            <SearchBar />
            </div>
    </header>
  )
}

export default Header