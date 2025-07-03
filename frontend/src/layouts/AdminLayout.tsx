// src/layouts/AdminLayout.tsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../components/admin/AdminNavbar';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminFooter from '../components/admin/AdminFooter';
import { Container } from 'react-bootstrap';

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="d-flex flex-column vh-100">
      <AdminNavbar onToggleSidebar={() => setSidebarOpen(o => !o)} />
      <AdminSidebar show={sidebarOpen} onHide={() => setSidebarOpen(false)} />
      <Container
        fluid
        as="main"
        className="flex-grow-1 overflow-auto p-3"
        style={{ marginTop: '56px' /* navbar height */ }}
      >
        <Outlet />
      </Container>
      <AdminFooter />
    </div>
  );
};

export default AdminLayout;


