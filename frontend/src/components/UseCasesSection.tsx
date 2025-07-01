// src/components/UseCasesSection.tsx
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

export interface UseCaseBlock {
  label?: string;
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  mediaUrl: string;
}

interface UseCasesSectionProps {
  blocks: UseCaseBlock[];
}

const UseCasesSection: React.FC<UseCasesSectionProps> = ({ blocks }) => (
  <section style={{ backgroundColor: '#0B0E14' }} className="py-6 text-white">
    <Container>
      <Row className="mb-5">
        <Col>
          <h2 className="text-center text-info mb-4">Nos Cas d'Utilisation</h2>
          <p className="text-center lead">
            Découvrez comment nos solutions transforment les défis en opportunités.
          </p>
        </Col>
      </Row>
      {blocks.map((block, idx) => (
        <Row
          key={idx}
          className={`align-items-center gy-4 mb-5 ${
            idx % 2 === 1 ? 'flex-row-reverse' : ''
          }`}
        >
          <Col md={6}>
            {block.label && (
              <p className="text-info text-uppercase small mb-2">
                {block.label}
              </p>
            )}
            <motion.h3
              className="h3 text-white mb-3"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
            >
              {block.title}
            </motion.h3>
            <motion.p
              className="mb-4"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 + 0.1 }}
            >
              {block.description}
            </motion.p>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 + 0.3 }}
            >
              <Button
                variant={idx === 0 ? 'light' : 'outline-light'}
                href={block.ctaHref}
                className={idx === 0 ? '' : 'text-white'}
              >
                {block.ctaText}
              </Button>
            </motion.div>
          </Col>
          <Col md={6} className="text-center">
            <motion.img
              src={block.mediaUrl}
              alt={block.title}
              className="img-fluid rounded"
              style={{ maxHeight: '350px' }}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: idx * 0.2 + 0.5 }}
            />
          </Col>
        </Row>
      ))}
    </Container>
  </section>
);

export default UseCasesSection;
