import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileTabMenu = () => {
  const location = useLocation();
  
  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: '/icons/home.svg',
      path: '/',
      isActive: location.pathname === '/'
    },
    {
      id: 'location',
      label: 'Location',
      icon: '/icons/location-bold.svg',
      path: '/location',
      isActive: location.pathname === '/location'
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: '/icons/cart-bold.svg',
      path: '/cart',
      isActive: location.pathname === '/cart'
    },
    {
      id: 'menu',
      label: 'Menu',
      icon: '/icons/menu-mobile.svg',
      path: '/menu',
      isActive: location.pathname === '/menu'
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white  shadow-2xl  z-50 md:hidden">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.path}
            className={`flex flex-col items-center justify-center py-2 px-4 min-w-0 flex-1 transition-colors duration-200 ${
              tab.isActive ? 'text-primary' : 'text-gray-500'
            }`}
          >
            <div className="w-6 h-6 mb-2 flex items-center justify-center">
              <img 
                src={tab.icon} 
                alt={tab.label}
                className={`w-6 h-6 ${
                  tab.isActive ? ' ' : ' '
                }`}
              />
            </div>
            <span className={`text-sm font-medium ${
              tab.isActive ? 'text-primary' : 'text-gray-500'
            }`}>
              {tab.label}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MobileTabMenu;