import React from 'react';
import Header from './Header';
import Footer from './Footer';
import MobileTabMenu from '../common/MobileTabMenu';
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 mobile-content-padding">
        <Outlet />
      </main>
      {/* Footer - hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>
      {/* Mobile Tab Menu - only visible on mobile */}
      <MobileTabMenu />
    </div>
  );
};

export default Layout;