import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiShoppingBag, FiPlus, FiClipboard, FiMessageSquare } from 'react-icons/fi';

const MobileBottomNav = ({ theme }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { id: 'home', label: 'Home', icon: FiHome, path: '/seller-dashboard' },
    { id: 'products', label: 'Products', icon: FiShoppingBag, path: '/seller-dashboard/products' },
    { id: 'add', label: 'Add', icon: FiPlus, path: '/seller-dashboard/add-product', isPrimary: true },
    { id: 'orders', label: 'Orders', icon: FiClipboard, path: '/seller-dashboard/orders' },
    { id: 'support', label: 'Support', icon: FiMessageSquare, path: '/seller-dashboard/support' },
  ];

  return (
    <div className={`fixed bottom-4 left-4 right-4 h-16 rounded-2xl flex items-center justify-between px-6 shadow-2xl z-50 transition-all duration-300 lg:hidden ${
      theme === 'dark' 
        ? 'bg-[#1e1e1e]/95 backdrop-blur-md border border-white/10 text-slate-400 shadow-black/50' 
        : 'bg-white/95 backdrop-blur-md border border-slate-200 text-slate-500 shadow-slate-200/50'
    }`}>
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        const Icon = item.icon;
        
        if (item.isPrimary) {
           return (
             <button
               key={item.id}
               onClick={() => navigate(item.path)}
               className={`relative -top-8 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 ring-4 ${
                 theme === 'dark' 
                    ? 'bg-amber-500 text-[#1a1a4b] ring-[#121212]' 
                    : 'bg-amber-500 text-white ring-[#f8fafc]'
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
            className={`flex flex-col items-center justify-center w-12 h-full gap-1 transition-colors relative ${
              isActive 
                ? theme === 'dark' ? 'text-amber-400' : 'text-amber-600'
                : 'hover:text-amber-500/70'
            }`}
          >
            <Icon className={`w-5 h-5 ${isActive ? 'fill-current' : ''}`} />
            {isActive && (
                <span className={`absolute -bottom-1 w-1 h-1 rounded-full ${
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
