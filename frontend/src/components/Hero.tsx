// src/components/Hero.tsx
import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { motion } from "framer-motion";

const Hero: React.FC = () => (
  <section style={{ backgroundColor: "#0B0E14" }} className="text-white py-5">
    <Container className="py-5">
      <Row className="align-items-center">
        {/* Vision & Mission */}
        <Col md={6} className="mb-4 mb-md-0">
          <motion.h1
            className="display-1 fw-bold lh-1"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Technology to build a sustainable, <br />self-reliant, and inclusive Africa.
          
          </motion.h1>
          <motion.p
            className="lead my-4"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <strong>
              Developing innovative technological solutions to address the continent's educational, food, financial, agricultural, and climate challenges.
            </strong>
          </motion.p>
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="d-flex gap-3"
          >
            <Button
              variant="info"
              size="lg"
              onClick={() => (window.location.href = "/contact")}
            >
              Contactez-nous →
            </Button>
            <Button
              variant="outline-light"
              size="lg"
              onClick={() => (window.location.href = "#features")}
            >
              Découvrir nos solutions
            </Button>
          </motion.div>
        </Col>

        {/* Illustration vidéo */}
        <Col md={6} className="text-center">
          <motion.video
            src="/videos/Hero-2025May-Agents.webm"
            autoPlay
            loop
            muted
            playsInline
            className="img-fluid rounded"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          />
        </Col>
      </Row>
    </Container>
  </section>
);

export default Hero;
