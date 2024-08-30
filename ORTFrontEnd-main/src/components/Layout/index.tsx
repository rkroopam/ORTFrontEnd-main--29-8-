import React from 'react';
import { AppHeader } from '../AppHeader';
import { AppFooter } from '../AppFooter';

const Layout = ({ children }:any) => {
  return (
    <div className="app-layout">
      {/* Header */}
      <AppHeader />

      {/* Main Content */}
      <main className="content">
        {children}
      </main>

      {/* Footer */}
      <AppFooter />
    </div>
  );
};

export default Layout;
