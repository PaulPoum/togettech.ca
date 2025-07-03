// src/components/admin/AdminFooter.tsx
import React from 'react';
import { Container } from 'react-bootstrap';

const AdminFooter: React.FC = () => (
  <footer className="bg-light text-center py-2 mt-auto">
    <Container>
      <small className="text-muted">
        © {new Date().getFullYear()} TogetTech. Tous droits réservés.
      </small>
    </Container>
  </footer>
);

export default AdminFooter;

