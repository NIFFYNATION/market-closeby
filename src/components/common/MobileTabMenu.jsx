import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCartStore } from '../../store/cartStore';
import NationwideModal from '../modal/NationwideModal';
import { useUIStore } from '../../store/uiStore';

const MobileTabMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const openMobileMenu = useUIStore((s) => s.openMobileMenu);

  const cartCount = useCartStore((state) => state.cartCount());
  const isActive = (path) => (path === '/' ? location.pathname === '/' : location.pathname.startsWith(path));

  const [isLocationOpen, setLocationOpen] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');

  const tabs = [
    {
      id: 'home',
      label: 'Home',
      icon: '/icons/home.svg',
      path: '/',
      isActive: location.pathname === '/',
      onClick: () => navigate('/')        
    },
    {
      id: 'location',
      label: selectedCity ? selectedCity : 'Location',
      icon: '/icons/location-bold.svg',
      path: '/location',
      isActive: isLocationOpen,
      onClick: () => setLocationOpen(true)
    },
    {
      id: 'cart',
      label: 'Cart',
      icon: '/icons/cart-bold.svg',
      path: '/cart',
      isActive: location.pathname === '/cart',
      onClick: () => navigate('/cart')
    },
    {
      id: 'menu',
      label: 'Menu',
      icon: '/icons/menu-mobile.svg',
      path: '/menu',
      isActive: false,
      onClick: () => openMobileMenu()


    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-2xl z-20 md:hidden">
      <div className="flex items-center justify-around py-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={tab.onClick}
            className={`flex flex-col items-center justify-center py-2 px-4 min-w-0 flex-1 transition-colors duration-200 ${
              tab.isActive ? 'text-primary' : 'text-gray-500'
            }`}
          >
            <div className="w-7 h-7 mb-1 flex items-center justify-center relative">
              <img src={tab.icon} alt={tab.label} className="w-7 h-7" />
              {tab.id === 'cart' && cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-secondary text-white text-[10px] font-semibold rounded-full min-w-[1.15rem] px-1 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className={`text-xs font-semibold ${isActive(tab.path) || tab.isActive ? 'text-primary' : 'text-gray-500'}`}>
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Location Picker Modal */}
      <NationwideModal
        isOpen={isLocationOpen}
        onClose={() => setLocationOpen(false)}
        setSelectedCity={(city) => setSelectedCity(city)}
      />
    </div>
  );
};

export default MobileTabMenu;
