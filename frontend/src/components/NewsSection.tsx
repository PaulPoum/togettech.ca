// src/components/NewsSection.tsx
import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

export interface NewsItem {
  id: string;
  title: string;
  excerpt: string;
  date: string;       // format ISO ou lisible
  imageUrl: string;
  linkHref: string;
}

interface NewsSectionProps {
  items: NewsItem[];
}

const NewsSection: React.FC<NewsSectionProps> = ({ items }) => (
  <section className="py-6" style={{ backgroundColor: '#0B0E14', color: '#fff' }}>
    <Container>
      {/* Header */}
      <motion.div
        className="text-center mb-5"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-info text-uppercase small mb-2">À la une</p>
        <h2 className="display-4 fw-bold text-left">Dernières actualités</h2>
      </motion.div>

      {/* Cartes d’articles */}
      <Row className="g-4">
        {items.map((item, idx) => (
          <Col key={item.id} xs={12} md={6} lg={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              <Card className="h-100 border-0" style={{ backgroundColor: '#1A1C24' }}>
                <Card.Img
                  variant="top"
                  src={item.imageUrl}
                  alt={item.title}
                  className="rounded-top"
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <small className="text-white mb-2">{item.date}</small>
                  <Card.Title className="h5 text-white">{item.title}</Card.Title>
                  <Card.Text className="text-muted flex-grow-1">
                    {item.excerpt}
                  </Card.Text>
                  <div className="mt-3">
                    <Button variant="info" size="sm" href={item.linkHref}>
                      Lire la suite →
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Voir toutes les actualités */}
      <motion.div
        className="text-center mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: items.length * 0.2 + 0.5, duration: 0.6 }}
      >
        <Button variant="outline-light" href="/actualites">
          Voir toutes les actualités
        </Button>
        <br /><br /><br />
      </motion.div>
    </Container>
  </section>
);

export default NewsSection;
