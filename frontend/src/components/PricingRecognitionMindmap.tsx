// src/components/PricingRecognitionMindmap.tsx
import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { motion } from 'framer-motion';

export interface Recognition {
  year: string;
  logoUrl: string;
  alt: string;
  label: string;
}

interface RoadmapProps {
  recognitions: Recognition[];
}

const Roadmap: React.FC<RoadmapProps> = ({ recognitions }) => (
  <section
    className="py-6"
    style={{ backgroundColor: '#0B0E14', color: '#fff' }}
  >
    <br /><br />
    <Container>
      <h2 className="display-4 text-center mb-5">Notre Roadmap & Récompenses</h2>
      <div className="position-relative">
        {/* Ligne centrale */}
        <div
          className="position-absolute top-0 start-50 translate-middle-x"
          style={{
            width: '4px',
            height: '100%',
            background: 'linear-gradient(to bottom, #00C2FF, transparent)',
            zIndex: 1,
          }}
        />

        {recognitions.map((rec, idx) => {
          const isLeft = idx % 2 === 0;
          return (
            <Row
              key={idx}
              className="align-items-center mb-5"
              style={{ position: 'relative', zIndex: 2 }}
            >
              {/* Carte Jalons */}
              <Col
                xs={12}
                md={{ span: 5, order: isLeft ? 1 : 2 }}
                className="mb-4 mb-md-0"
              >
                <motion.div
                  className="d-flex justify-content-end"
                  initial={{ x: isLeft ? -100 : 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                >
                  <Card
                    className="border-0"
                    style={{
                      backdropFilter: 'blur(12px)',
                      backgroundColor: 'rgba(255,255,255,0.05)',
                      width: '100%',
                    }}
                  >
                    <Card.Body className="d-flex align-items-center py-3 px-4">
                      <img
                        src={rec.logoUrl}
                        alt={rec.alt}
                        style={{ width: 48, height: 48, marginRight: '1rem' }}
                      />
                      <div>
                        <div className="text-info fw-bold mb-1">{rec.year}</div>
                        <div className="h5 mb-0 text-white">{rec.label}</div>
                      </div>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>

              {/* Point central */}
              <Col
                xs={12}
                md={{ span: 2, order: 2 }}
                className="d-flex justify-content-center"
              >
                <motion.div
                  className="rounded-circle"
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: '#00C2FF',
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: idx * 0.2 + 0.1 }}
                />
              </Col>

              {/* Espace vide pour équilibrer */}
              <Col
                xs={12}
                md={{ span: 5, order: isLeft ? 3 : 1 }}
              />
            </Row>
          );
        })}
      </div>
    </Container>
  </section>
);

export default Roadmap;
