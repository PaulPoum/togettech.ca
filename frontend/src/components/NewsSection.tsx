// src/components/NewsSection.tsx
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Alert } from 'react-bootstrap';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Link } from 'react-router-dom';

export interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;       // DATEONLY string
  imagePath?: string; // chemin renvoyé par le serveur après upload, ex: '/uploads/news/xxx.jpg'
}

const NewsSection: React.FC = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Base URL de votre backend pour servir les images
  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  useEffect(() => {
    axios.get<NewsItem[]>(`${BACKEND_URL}/api/news`)
      .then(res => {
        setItems(res.data);
        setError(null);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Impossible de charger les actualités");
        setLoading(false);
      });
  }, [BACKEND_URL]);

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
    <section className="py-6" style={{ backgroundColor: '#0B0E14', color: '#fff' }}>
      <Container>
        {/* Header */}
        <motion.div
          className="text-center mb-5"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <br /><br />
          <p className="text-info text-uppercase small mb-2">À la une</p>
          <h2 className="display-4 fw-bold text-left">Dernières actualités</h2>
        </motion.div>

        {/* Cartes d’articles */}
        <Row className="g-4">
          {items.map((item, idx) => {
            // calcule l'URL complète de l'image
            const imgUrl = item.imagePath
              ? item.imagePath.startsWith('http')
                ? item.imagePath
                : `${BACKEND_URL}${item.imagePath}`
              : undefined;

            return (
              <Col key={item.id} xs={12} md={6} lg={4}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.2, duration: 0.6 }}
                >
                  <Card className="h-100 border-0" style={{ backgroundColor: '#1A1C24' }}>
                    {imgUrl && (
                      <Card.Img
                        variant="top"
                        src={imgUrl}
                        alt={item.title}
                        className="rounded-top"
                        style={{ height: '180px', objectFit: 'cover' }}
                      />
                    )}
                    <Card.Body className="d-flex flex-column">
                      <small className="text-white mb-2">
                        Publié le {new Date(item.date).toLocaleDateString('fr-FR')}
                      </small>
                      <Card.Title className="h5 text-white">{item.title}</Card.Title>
                      <Card.Text className="text-muted flex-grow-1">
                        {item.excerpt}
                      </Card.Text>
                      <div className="mt-3">
                        <Button
                          as={Link}
                          to={`/news/${item.id}`}
                          variant="info"
                          size="sm"
                        >
                          Lire la suite →
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>
            );
          })}
        </Row>

        {/* Voir toutes les actualités */}
        <motion.div
          className="text-center mt-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: items.length * 0.2 + 0.5, duration: 0.6 }}
        >
          <Button as={Link} to="/news" variant="outline-light">
            Voir toutes les actualités
          </Button>
          <br /><br /><br />
        </motion.div>
      </Container>
    </section>
  );
};

export default NewsSection;
