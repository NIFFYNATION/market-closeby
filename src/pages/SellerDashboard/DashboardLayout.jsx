import React, { useState, createContext, useContext, useEffect } from 'react';
import { FiSun, FiMoon, FiChevronDown, FiChevronRight, FiPlus, FiGrid } from "react-icons/fi";
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import styles from './DashboardLayout.module.css';
import { useSellerStore } from '../../store/sellerStore';
import MobileBottomNav from './MobileBottomNav';

const DashboardThemeContext = createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

export const useDashboardTheme = () => useContext(DashboardThemeContext);

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [collapsedSections, setCollapsedSections] = useState({});
  const [collapsedGroups, setCollapsedGroups] = useState({});

  const { 
    stores, 
    currentStoreId, 
    setCurrentStore, 
    getCurrentStore 
  } = useSellerStore();
  
  const currentStore = getCurrentStore();
  const [isStoreDropdownOpen, setIsStoreDropdownOpen] = useState(false);

  const sidebarSections = [
    {
      id: 'overview',
      label: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: '/icons/home.svg', path: '/seller-dashboard' },
      ],
    },
    {
      id: 'ai-tools',
      label: 'AI Tools',
      items: [
        { id: 'ai-features', label: 'AI Assistant', icon: '/icons/star.svg', path: '/seller-dashboard/ai-features' },
      ],
    },
    { id: 'store',
      label: 'Store Management',
      items: [
        { id: 'my-stores', label: 'My Stores', icon: '/icons/location-bold.svg', path: '/seller-dashboard/stores' },
        { id: 'verification', label: 'Verification Status', icon: '/icons/verified-user.svg', path: '/seller-dashboard/verification-status' },
        {
          id: 'products-group',
          label: 'Products',
          icon: '/icons/shop.svg',
          path: '/seller-dashboard/products',
          children: [
            { id: 'products', label: 'All Products', path: '/seller-dashboard/products' },
            { id: 'add-product', label: 'Add Product', path: '/seller-dashboard/add-product' },
          ],
        },
        { id: 'orders', label: 'Orders', icon: '/icons/orders-white.svg', path: '/seller-dashboard/orders' },
      ],
    },
    {
      id: 'customer-service',
      label: 'Customer Service',
      items: [
        { id: 'support', label: 'Live Chat', icon: '/icons/chat.svg', path: '/seller-dashboard/support' },
      ],
    },
    {
      id: 'finance',
      label: 'Finance',
      items: [
        { id: 'wallet', label: 'Wallet', icon: '/icons/wallet-bold.svg', path: '/seller-dashboard/wallet' },
      ],
    },
    {
      id: 'account',
      label: 'Account',
      items: [
        { id: 'settings', label: 'Settings', icon: '/icons/settings-white.svg', path: '/seller-dashboard/settings' },
      ],
    },
  ];

  const handleLogout = () => {
    navigate('/signin');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleSection = (sectionId) => {
    setCollapsedSections((prev) => {
      const next = { ...prev, [sectionId]: !prev[sectionId] };
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('dashboardSidebarSections', JSON.stringify(next));
      }
      return next;
    });
  };

  const toggleGroup = (groupId) => {
    setCollapsedGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    const handleResize = () => {
      const isNowDesktop = window.innerWidth >= 1024;
      setIsDesktop(isNowDesktop);
      setIsSidebarOpen(isNowDesktop);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.localStorage) {
      return;
    }
    const stored = window.localStorage.getItem('dashboardSidebarSections');
    if (stored) {
      setCollapsedSections(JSON.parse(stored));
    }
  }, []);

  return (
    <DashboardThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={`h-screen overflow-x-hidden overflow-y-hidden font-['Poppins'] ${
          theme === 'dark' ? 'bg-[#121212] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
        }`}
      >
        {/* <MobileBottomNav theme={theme} /> */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 backdrop-blur-sm bg-black/10 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        <div className="flex h-screen">
          <div
            className={`
              fixed inset-y-0 left-0 z-50 w-[82vw] sm:w-60 lg:w-64 bg-primary text-white flex flex-col transform transition-transform duration-300 ease-in-out
              ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}
          >
            <div className="flex items-center px-4 pt-5 pb-4 border-b border-white/10">
              <img src="/icons/Logo.svg" alt="MarketCloseBy" className="h-8" />
            </div>

            {/* Store Selector */}
            <div className="px-4 py-4 border-b border-white/10">
              <div className="relative">
                <button
                  onClick={() => setIsStoreDropdownOpen(!isStoreDropdownOpen)}
                  className="w-full flex items-center justify-between p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white border border-white/10"
                >
                  <div className="flex items-center gap-2 truncate">
                    <div className="w-6 h-6 rounded bg-amber-500 flex items-center justify-center text-xs font-bold text-[#1a1a4b]">
                      {currentStore?.name?.charAt(0) || 'S'}
                    </div>
                    <span className="text-sm font-medium truncate">{currentStore?.name || 'Select Store'}</span>
                  </div>
                  <FiChevronDown className={`w-4 h-4 transition-transform ${isStoreDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isStoreDropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setIsStoreDropdownOpen(false)}
                    />
                    <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a4b] border border-white/10 rounded-lg shadow-xl overflow-hidden z-50">
                      <div className="max-h-48 overflow-y-auto custom-scrollbar">
                        {stores.map(store => (
                          <button
                            key={store.id}
                            onClick={() => {
                              setCurrentStore(store.id);
                              setIsStoreDropdownOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-colors flex items-center justify-between ${currentStoreId === store.id ? 'bg-white/5 text-amber-400' : 'text-white/80'}`}
                          >
                            <span className="truncate">{store.name}</span>
                            {currentStoreId === store.id && <div className="w-2 h-2 rounded-full bg-amber-400" />}
                          </button>
                        ))}
                      </div>
                      <div className="border-t border-white/10 p-2">
                         <button
                           onClick={() => {
                             navigate('/seller-dashboard/stores'); // Navigate to stores list which will have "Add" button
                             setIsStoreDropdownOpen(false);
                           }}
                           className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-amber-400 hover:text-amber-300 font-medium"
                         >
                           <FiPlus className="w-3 h-3" />
                           Manage Stores
                         </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <nav className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
              {sidebarSections.map((section) => {
                const isCollapsed = collapsedSections[section.id];
                const sectionContentId = `sidebar-section-${section.id}`;

                return (
                  <div key={section.id}>
                    <button
                      type="button"
                      className={`w-full flex items-center justify-between px-3 py-2 text-[11px] text-white/60 ${styles.sectionHeader}`}
                      onClick={() => toggleSection(section.id)}
                      aria-expanded={!isCollapsed}
                      aria-controls={sectionContentId}
                    >
                      <span>{section.label}</span>
                      {isCollapsed ? (
                        <FiChevronRight className="w-4 h-4" aria-hidden="true" />
                      ) : (
                        <FiChevronDown className="w-4 h-4" aria-hidden="true" />
                      )}
                    </button>
                    <div
                      id={sectionContentId}
                      className={`${styles.sectionContent} ${
                        isCollapsed ? styles.sectionCollapsed : styles.sectionExpanded
                      }`}
                    >
                      <div className="space-y-1">
                        {section.items.map((item) => {
                          if (item.children) {
                            const isParentActive = item.children.some(
                              (child) => child.path === location.pathname
                            );
                            const isGroupCollapsed = collapsedGroups[item.id];
                            const groupContentId = `sidebar-group-${item.id}`;
                            return (
                              <div key={item.id}>
                                <button
                                  type="button"
                                  className={`w-full flex items-center justify-between px-4 py-2 rounded-lg text-xs font-medium border-l-2 transition-colors duration-200 ${
                                    isParentActive
                                      ? 'bg-white/10 text-white border-amber-400'
                                      : 'text-white/70 border-transparent hover:bg-white/10 hover:text-white'
                                  }`}
                                  onClick={() => toggleGroup(item.id)}
                                  aria-expanded={!isGroupCollapsed}
                                  aria-controls={groupContentId}
                                  aria-current={isParentActive ? 'page' : undefined}
                                >
                                  <div className="flex items-center">
                                    {item.icon && (
                                      <img
                                        src={item.icon}
                                        alt={item.label}
                                        className={`${styles.sidebarIcon} mr-2`}
                                      />
                                    )}
                                    <span>{item.label}</span>
                                  </div>
                                  {isGroupCollapsed ? (
                                    <FiChevronRight className="w-4 h-4" aria-hidden="true" />
                                  ) : (
                                    <FiChevronDown className="w-4 h-4" aria-hidden="true" />
                                  )}
                                </button>
                                <div
                                  id={groupContentId}
                                  className={`${styles.sectionContent} ${
                                    isGroupCollapsed
                                      ? styles.sectionCollapsed
                                      : styles.sectionExpanded
                                  }`}
                                >
                                  <div className="mt-1 space-y-1 pl-8">
                                    {item.children.map((child) => {
                                      const isActive = location.pathname === child.path;
                                      return (
                                        <Link
                                          key={child.id}
                                          to={child.path}
                                          className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all duration-200 border-l-2 ${
                                            isActive
                                              ? 'bg-background text-primary font-semibold border-amber-400'
                                              : 'text-background/80 border-transparent hover:bg-white/10 hover:text-white'
                                          }`}
                                          onClick={() => {
                                            if (!isDesktop) {
                                              setIsSidebarOpen(false);
                                            }
                                          }}
                                          aria-current={isActive ? 'page' : undefined}
                                        >
                                          <span>{child.label}</span>
                                        </Link>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            );
                          }

                          const isActive = item.path === location.pathname;
                          return (
                            <Link
                              key={item.id}
                              to={item.path}
                              className={`flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 border-l-2 ${
                                isActive
                                  ? 'bg-amber-400 text-[#1a1a4b] border-amber-300'
                                  : 'text-background border-transparent hover:text-background hover:bg-[#2c2678]'
                              }`}
                              onClick={() => {
                                if (!isDesktop) {
                                  setIsSidebarOpen(false);
                                }
                              }}
                              aria-current={isActive ? 'page' : undefined}
                            >
                              {item.icon && (
                                <img
                                  src={item.icon}
                                  alt={item.label}
                                  className={`${styles.sidebarIcon} mr-3`}
                                />
                              )}
                              <span>{item.label}</span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </nav>

            <div className="p-4 border-t border-white/10">
              <div className="flex items-center gap-3 p-2 rounded-xl bg-white/5 border border-white/10">
                <div className="size-10 rounded-full bg-cover bg-center ring-2 ring-amber-400/50">
                  <img src="/icons/profile-avatar.svg" alt="Seller avatar" className="w-10 h-10 rounded-full" />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-bold truncate text-white">Fortune</p>
                  <p className="text-[10px] text-amber-400 uppercase tracking-tight font-bold">Premium Seller</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-slate-300 hover:text-red-400 transition-colors"
                >
                  <img src="/icons/logout-white.svg" alt="Logout" className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          <div
            className={`flex-1 flex flex-col transition-[margin] duration-300 ${
              isDesktop && isSidebarOpen ? 'lg:ml-64' : ''
            }`}
          >
            <header
              className={`flex items-center justify-between px-4 lg:px-8 py-4 border-b ${
                theme === 'dark'
                  ? 'bg-[#121212]/80 border-white/10 backdrop-blur-md'
                  : 'bg-white border-slate-200'
              } sticky top-0 z-30`}
            >
              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  onClick={toggleSidebar}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    theme === 'dark' ? 'bg-white/10 hover:bg-white/20' : 'bg-slate-100 hover:bg-slate-200'
                  }`}
                >
                  <img
                    src={
                      isDesktop
                        ? isSidebarOpen
                          ? '/icons/arrow-left.svg'
                          : '/icons/arrow-right.svg'
                        : '/icons/menu-white.svg'
                    }
                    alt="Toggle sidebar"
                    className="w-5 h-5"
                  />
                </button>
                
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative w-40 sm:w-48 lg:w-64 hidden md:block">
                  <span
                    className={`absolute left-3 top-1/2 -translate-y-1/2 text-lg ${
                      theme === 'dark' ? 'text-slate-500' : 'text-slate-400'
                    }`}
                  >
                    🔍
                  </span>
                  <input
                    type="text"
                    placeholder="Quick search..."
                    className={`w-full h-10 pl-9 pr-4 rounded-lg text-sm transition-all outline-none ${
                      theme === 'dark'
                        ? 'bg-[#1e1e1e] border border-white/10 text-slate-200 placeholder-slate-500 focus:ring-2 focus:ring-amber-400/40'
                        : 'bg-slate-50 border border-slate-200 text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-amber-400/40'
                    }`}
                  />
                </div>
                <div className="relative">
                  <button
                    type="button"
                    onClick={toggleTheme}
                    className={`size-10 flex items-center justify-center rounded-lg border transition-all ${
                      theme === 'dark'
                        ? 'bg-[#1e1e1e] border-white/10 text-slate-200 hover:border-amber-400'
                        : 'bg-white border-slate-200 text-slate-700 hover:border-amber-400'
                    }`}
                  >
                    {theme === 'dark' ? (
                      <FiSun className="w-5 h-5 text-amber-400" />
                    ) : (
                      <FiMoon className="w-5 h-5 text-slate-600" />
                    )}
                  </button>
                </div>
                <button
                  type="button"
                  className={`size-10 flex items-center justify-center rounded-lg transition-all shadow-sm ${
                    theme === 'dark'
                      ? 'bg-[#1e1e1e] border border-white/10 text-slate-300 hover:border-amber-400'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-amber-400'
                  }`}
                >
                  <img src="/icons/calendar.svg" alt="Calendar" className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  className={`size-10 relative flex items-center justify-center rounded-lg transition-all shadow-sm ${
                    theme === 'dark'
                      ? 'bg-[#1e1e1e] border border-white/10 text-slate-300 hover:border-amber-400'
                      : 'bg-white border border-slate-200 text-slate-600 hover:border-amber-400'
                  }`}
                >
                  <img src="/icons/bell.svg" alt="Notifications" className="w-5 h-5" />
                  <span
                    className={`absolute top-2.5 right-2.5 size-2 rounded-full ${
                      theme === 'dark' ? 'bg-amber-400 border-2 border-[#1e1e1e]' : 'bg-amber-400 border-2 border-white'
                    }`}
                  />
                </button>
                <div className="h-8 w-px mx-2" />
                <button
                  type="button"
                  onClick={() => navigate('/seller-dashboard/add-product')}
                  className="bg-amber-500 text-[#1a1a4b] h-10 px-3 sm:px-4 rounded-lg flex items-center gap-2 text-sm font-bold shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  <span className="text-lg">+</span>
                  <span className="hidden sm:inline">New Product</span>
                  <span className="inline sm:hidden">New</span>
                </button>
                <div className="w-10 h-10 rounded-full flex items-center justify-center">
                  <img src="/icons/profile-avatar.svg" alt="Profile" className="w-10 h-10" />
                </div>
              </div>
            </header>
            <main className="px-4 lg:px-8 py-6 lg:py-8 flex-1 overflow-y-auto min-w-0">
              <Outlet />
            </main>
          </div>
        </div>
      </div>
    </DashboardThemeContext.Provider>
  );
};

export default DashboardLayout;
