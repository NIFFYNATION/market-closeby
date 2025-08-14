import React, { useState } from 'react';
import { Link, useNavigate, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '/icons/home.svg', path: '/seller-dashboard', active: true },
    { id: 'products', label: 'All Products', icon: '/icons/shop.svg', path: '/seller-dashboard/products' },
    { id: 'add-product', label: 'Add Product', icon: '/icons/shop-bold.svg', path: '/seller-dashboard/add-product' },
    { id: 'orders', label: 'Orders', icon: '/icons/orders-white.svg', path: '/seller-dashboard/orders' },
    { id: 'wallet', label: 'Wallet', icon: '/icons/wallet-bold.svg', path: '/seller-dashboard/wallet' },
    { id: 'settings', label: 'Settings', icon: '/icons/settings-white.svg', path: '/seller-dashboard/settings' },
  ];

  const handleLogout = () => {
    navigate('/auth');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 font-['Poppins']">
      {/* Header */}
      <div className="bg-primary fixed w-full z-10 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="./icons/Logo.svg" alt="" /> 
            <button 
              onClick={toggleSidebar}
              className="w-6 h-6 block lg:hidden"
            >
              <img src="./icons/menu-white.svg" alt="Menu" className="w-6 h-6" /> 
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img src="/icons/bell.svg" alt="Notifications" className="w-6 h-6 text-gray-400" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </div>
            <img src="/icons/help.svg" alt="Help" className="w-6 h-6 text-gray-400" />
            <div className="w-10 h-10 rounded-full flex items-center justify-center">
              <img src="/icons/profile-avatar.svg" alt="Profile" className="w-10 h-10 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-sm bg-black/40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-50 mt-0 lg:mt-19 bg-primary text-white flex flex-col transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        {/* Navigation */}
        <nav className="flex-1 mt-16 lg:mt-0">
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`grid items-center px-6 py-6 gap-3 text-sm font-medium transition-all duration-200 ${
                item.active
                  ? 'bg-background text-primary'
                  : 'text-background hover:text-background hover:bg-[#2c2678]'
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <img src={item.icon} alt={item.label} className="w-5 h-5 justify-self-center" />
              <span className="justify-self-center">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-6">
          <button
            onClick={handleLogout}
            className="grid gap-3 items-center justify-self-center text-gray-300 hover:text-white transition-colors duration-200"
          >
            <img src="/icons/logout-white.svg" alt="Logout" className="w-5 h-5 justify-self-center" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="max-w-[100%] lg:ml-50">
        {/* Content */}
        <div className="p-8 space-y-8 overflow-y-auto h-full w-full">
          <div className="mt-20">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;