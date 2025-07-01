// src/components/OddContributions.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { motion } from 'framer-motion';

export interface Contribution {
  sdgIconUrl: string;    // icône de l’ODD
  sdgNumber: string;     // ex. "ODD 2"
  sdgTitle: string;      // ex. "Faim Zéro"
  description: string;    // comment TogetTech contribue
  statValue: string;      // ex. "30 %"
  statLabel: string;      // ex. "diminution des pertes"
}

interface OddContributionsProps {
  contributions: Contribution[];
}

const OddContributions: React.FC<OddContributionsProps> = ({ contributions }) => (
  <section
    className="py-6 text-white"
    style={{ background: 'linear-gradient(180deg, #0B0E14 0%, #141824 100%)' }}
  >
    <Container>
      {/* Section header */}
      <h2 className="display-4 text-center mb-3">Contributions aux ODD</h2>
      <p className="text-center fs-5 mb-5">
        Découvrez comment les solutions TogetTech soutiennent les Objectifs de Développement Durable de l’ONU.
      </p>

      {contributions.map((c, idx) => {
        const flipped = idx % 2 === 1;
        return (
          <Row
            key={idx}
            className={`align-items-center mb-5 ${flipped ? 'flex-row-reverse' : ''}`}
          >
            {/* Icône ODD + carte descriptive */}
            <Col md={6} className="position-relative">
              <motion.div
                className="d-flex align-items-center bg-dark rounded p-4 shadow"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + idx * 0.2, duration: 0.6 }}
              >
                <img
                  src={c.sdgIconUrl}
                  alt={c.sdgTitle}
                  style={{ width: 64, height: 64, marginRight: '1rem' }}
                />
                <div>
                  <h5 className="mb-1 text-info">{c.sdgNumber} – {c.sdgTitle}</h5>
                  <p className="mb-0">{c.description}</p>
                </div>
              </motion.div>
            </Col>

            {/* Statistique */}
            <Col md={6} className={`text-center text-md-${flipped ? 'start' : 'end'}`}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.2, duration: 0.6 }}
              >
                <div className="display-1 fw-bold">{c.statValue}</div>
                <div className="fs-5 text-muted">{c.statLabel}</div>
              </motion.div>
            </Col>
          </Row>
        );
      })}
    </Container>
    <br /><br />
  </section>
);

export default OddContributions;
