// src/components/admin/AdminSidebar.tsx
import React from "react";
import { Offcanvas, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Briefcase, BarChart2, FileText } from "react-feather";

export interface AdminSidebarProps {
  show: boolean;
  onHide: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ show, onHide }) => {
  const { pathname } = useLocation();
  return (
    <Offcanvas
      show={show}
      onHide={onHide}
      backdrop={false}
      scroll
      className="bg-dark text-white"
    >
      <Offcanvas.Header closeButton closeVariant="white">
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-0">
        <Nav className="flex-column">
          <Nav.Link
            as={Link}
            to="/admin/dashboard"
            onClick={onHide}
            active={pathname === "/admin/dashboard"}
            className="d-flex align-items-center py-2 px-3 text-white"
          >
            <Home className="me-2" /> Accueil
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/users"
            onClick={onHide}
            active={pathname === "/admin/users"}
            className="d-flex align-items-center py-2 px-3 text-white"
          >
            <Users className="me-2" /> Utilisateurs
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/careers"
            onClick={onHide}
            active={pathname === "/admin/careers"}
            className="d-flex align-items-center py-2 px-3 text-white"
          >
            <Briefcase className="me-2" /> Offres
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/news"
            onClick={onHide}
            active={pathname === "/admin/news"}
            className="d-flex align-items-center py-2 px-3 text-white"
          >
            <FileText className="me-2" /> Actualités
          </Nav.Link>
          <Nav.Link
            as={Link}
            to="/admin/stats"
            onClick={onHide}
            active={pathname === "/admin/stats"}
            className="d-flex align-items-center py-2 px-3 text-white"
          >
            <BarChart2 className="me-2" /> Statistiques
          </Nav.Link>
        </Nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default AdminSidebar;
