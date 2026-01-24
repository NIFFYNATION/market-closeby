import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiPlus, FiClipboard, FiMessageSquare } from 'react-icons/fi';

const MobileBottomNav = ({ theme }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', icon: FiHome, path: '/seller-dashboard' },
    { id: 'products', icon: FiShoppingBag, path: '/seller-dashboard/products' },
    { id: 'add', icon: FiPlus, path: '/seller-dashboard/add-product', isPrimary: true },
    { id: 'orders', icon: FiClipboard, path: '/seller-dashboard/orders' },
    { id: 'support', icon: FiMessageSquare, path: '/seller-dashboard/support' },
  ];

  return (
    <div className={`fixed bottom-0 left-0 right-0 h-16 flex items-center justify-around px-2 z-50 lg:hidden border-t backdrop-blur-xl transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-[#121212]/90 border-white/5 text-slate-400' 
        : 'bg-white/90 border-slate-200 text-slate-500'
    }`}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        if (item.isPrimary) {
           return (
             <button
               key={item.id}
               onClick={() => navigate(item.path)}
               className={`relative -top-5 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ${
                 theme === 'dark' 
                    ? 'bg-amber-500 text-[#1a1a4b] shadow-amber-500/20' 
                    : 'bg-amber-500 text-white shadow-amber-500/30'
               }`}
             >
               <Icon className="w-6 h-6" />
             </button>
           );
        }

        return (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center justify-center w-12 h-full gap-1 transition-all ${
              isActive 
                ? theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                : 'hover:text-amber-500/70'
            }`}
          >
            <Icon className={`w-5 h-5 transition-all ${isActive ? 'scale-110' : ''}`} />
            {isActive && (
                <span className={`w-1 h-1 rounded-full ${
                    theme === 'dark' ? 'bg-amber-400' : 'bg-amber-600'
                }`} />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
