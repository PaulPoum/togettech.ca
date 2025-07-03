// src/pages/client/Careers.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';

interface Career {
  id: number;
  title: string;
  location?: string;
  postedAt: string;
  closingDate?: string;
  duration?: string;
}

const CareersPage: React.FC = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000' });
    api.get<Career[]>('/api/careers')
      .then(res => {
        setCareers(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Impossible de charger les offres.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <Container className="py-5 text-center"><Spinner animation="border" /></Container>;
  }
  if (error) {
    return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;
  }
  if (careers.length === 0) {
    return <Container className="py-5"><Alert variant="info">Aucune offre disponible</Alert></Container>;
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center">Nos Offres d’emploi</h2>
      <hr className="border-secondary mb-5" />
      <Row className="g-4">
        {careers.map(c => {
          const deadline = c.closingDate
            ? new Date(c.closingDate).toLocaleDateString('fr-FR')
            : '—';
          return (
            <Col key={c.id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm">
                <Card.Body className="d-flex flex-column">
                  <Card.Title>{c.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {c.location || 'Localisation non spécifiée'}
                  </Card.Subtitle>
                  <small>
                    Publié le {new Date(c.postedAt).toLocaleDateString('fr-FR')}
                  </small><br/>
                  <small>Clôture : {deadline}</small>
                  {c.duration && (
                    <p className="mt-2 mb-0"><strong>Durée :</strong> {c.duration}</p>
                  )}
                  <div className="mt-auto text-end">
                    <Button
                      as="a"
                      href={`/careers/${c.id}`}
                      variant="primary"
                    >
                      En savoir plus →
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
      <br /><br />
      <hr className="border-secondary mb-5" />
    </Container>
    
  );
};

export default CareersPage;
