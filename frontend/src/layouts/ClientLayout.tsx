// src/layouts/ClientLayout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.js';
import Footer from '../components/Footer.js';

const ClientLayout: React.FC = () => (
  <>
    <Navbar />
    <main>
      <Outlet />
    </main>
    <Footer />
  </>
);

export default ClientLayout;
