// src/pages/client/News.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert
} from 'react-bootstrap';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  date: string;       // DATEONLY string, ex. "2025-07-01"
  imagePath?: string; // ex. "/uploads/news/xxx.jpg"
}

const NewsPage: React.FC = () => {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // URL de base pour vos images et API
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  useEffect(() => {
    axios.get<NewsItem[]>(`${API_BASE}/api/news`)
      .then(res => {
        setItems(res.data);
        setError(null);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Impossible de charger les actualités.");
        setLoading(false);
      });
  }, [API_BASE]);

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

  if (items.length === 0) {
    return (
      <Container className="py-5">
        <Alert variant="info">Aucune actualité disponible pour le moment.</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Toutes les actualités</h2>
      <Row className="g-4">
        {items.map((item) => {
          // Construction de l'URL complète de l'image
          const imgUrl = item.imagePath
            ? item.imagePath.startsWith('http')
              ? item.imagePath
              : `${API_BASE}${item.imagePath}`
            : undefined;

          return (
            <Col key={item.id} xs={12} md={6} lg={4}>
              <Card className="h-100 shadow-sm">
                {imgUrl && (
                  <Card.Img
                    variant="top"
                    src={imgUrl}
                    alt={item.title}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                )}
                <Card.Body className="d-flex flex-column">
                  <small className="text-muted mb-2">
                    Publié le {new Date(item.date).toLocaleDateString('fr-FR')}
                  </small>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Text className="flex-grow-1">
                    {item.excerpt}
                  </Card.Text>
                  <div className="mt-3 text-end">
                    <Button
                      as="a"
                      href={`/news/${item.id}`}
                      variant="primary"
                      size="sm"
                    >
                      Lire la suite →
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default NewsPage;
