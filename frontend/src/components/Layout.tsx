// src/components/Layout.tsx
import React from 'react';
import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;
