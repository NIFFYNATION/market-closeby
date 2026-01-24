import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileTabMenu from '../common/MobileTabMenu';
import { Outlet } from 'react-router-dom'
import { useUIStore } from '../../store/uiStore';

const Layout = () => {
  const showMobileTabMenu = useUIStore((s) => s.showMobileTabMenu);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mobile-content-padding ">
        <Outlet />
      </main>
      {/* Footer - hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>
      {/* Mobile Tab Menu - only visible on mobile and when not on hero section */}
      <MobileTabMenu isVisible={showMobileTabMenu} />
    </div>
  );
};

export default Layout;