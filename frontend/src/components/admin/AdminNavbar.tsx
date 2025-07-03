// src/components/admin/AdminNavbar.tsx
import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Menu } from 'react-feather';

export interface AdminNavbarProps {
  onToggleSidebar: () => void;
}

const AdminNavbar: React.FC<AdminNavbarProps> = ({ onToggleSidebar }) => (
  <Navbar
    bg="dark"
    variant="dark"
    expand={false}
    fixed="top"
    className="px-3 d-flex align-items-center"
  >
    <Button
      variant="outline-light"
      size="sm"
      onClick={onToggleSidebar}
      className="me-3"
    >
      <Menu size={20} />
    </Button>
    <Navbar.Brand>TogetTech Admin</Navbar.Brand>
  </Navbar>
);

export default AdminNavbar;

