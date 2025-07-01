// src/components/PartnerLogos.tsx
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

export interface PartnerLogo {
  src: string;
  alt?: string;
}

interface PartnerLogosProps {
  logos: PartnerLogo[];
}

const PartnerLogos: React.FC<PartnerLogosProps> = ({ logos }) => (
  <section className="py-5 bg-white">
    <Container>
      <h2 className="text-center mb-4">Partners</h2>
      <Row className="justify-content-center align-items-center">
        {logos.map((logo, idx) => (
          <Col
            key={idx}
            xs={6}
            sm={4}
            md={3}
            lg={2}
            className="d-flex justify-content-center mb-3"
          >
            <img
              src={logo.src}
              alt={logo.alt || `Partner ${idx + 1}`}
              className="img-fluid"
              style={{ filter: 'grayscale(100%)', transition: 'filter 0.3s' }}
              onMouseOver={(e) => (e.currentTarget.style.filter = 'grayscale(0%)')}
              onMouseOut={(e) => (e.currentTarget.style.filter = 'grayscale(100%)')}
            />
          </Col>
        ))}
      </Row>
    </Container>
  </section>
);

export default PartnerLogos;
