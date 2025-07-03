// src/pages/admin/Applications.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Table,
  Spinner,
  Alert,
  Modal,
  Button,
} from 'react-bootstrap';

interface Application {
  id: number;
  careerId: number;
  name: string;
  email: string;
  message: string;
  cvPath?: string;
  letterPath?: string;
  createdAt: string;
}

const AdminApplications: React.FC = () => {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState<Application | null>(null);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token') || ''}`,
    }
  });

  const fetchApplications = async () => {
    setLoading(true);
    try {
      const res = await api.get<Application[]>('/api/applications');
      setApplications(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Impossible de charger les candidatures");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const openModal = (app: Application) => {
    setSelected(app);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelected(null);
  };

  const replyByEmail = () => {
    if (!selected) return;
    const subject = encodeURIComponent(`Réponse à votre candidature #${selected.id}`);
    const body = encodeURIComponent(`Bonjour ${selected.name},%0D%0A%0D%0A`);
    window.location.href = `mailto:${selected.email}?subject=${subject}&body=${body}`;
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Gestion des Candidatures</h2>

      {applications.length === 0 ? (
        <Alert variant="info">Aucune candidature pour le moment.</Alert>
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Offre (ID)</th>
              <th>Candidat</th>
              <th>Email</th>
              <th>Reçu le</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app.id}>
                <td>{app.id}</td>
                <td>{app.careerId}</td>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{new Date(app.createdAt).toLocaleString('fr-FR')}</td>
                <td>
                  <Button
                    size="sm"
                    variant="outline-primary"
                    onClick={() => openModal(app)}
                  >
                    Voir / Répondre
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal de détail */}
      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {selected ? `Candidature #${selected.id}` : 'Détail candidature'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selected && (
            <>
              <p>
                <strong>Offre ID :</strong> {selected.careerId}
              </p>
              <p>
                <strong>Nom :</strong> {selected.name}
              </p>
              <p>
                <strong>Email :</strong> {selected.email}
              </p>
              <p>
                <strong>Message :</strong><br />
                {selected.message}
              </p>
              {selected.cvPath && (
                <p>
                  <strong>CV :</strong>{' '}
                  <a
                    href={`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}${selected.cvPath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Télécharger
                  </a>
                </p>
              )}
              {selected.letterPath && (
                <p>
                  <strong>Lettre :</strong>{' '}
                  <a
                    href={`${import.meta.env.VITE_API_URL || 'http://localhost:4000'}${selected.letterPath}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Télécharger
                  </a>
                </p>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Fermer
          </Button>
          <Button variant="primary" onClick={replyByEmail} disabled={!selected}>
            Répondre par mail
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminApplications;
