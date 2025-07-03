// src/components/Programs.tsx
import React from 'react';
import { Container, Row, Col, Card, ListGroup, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';
import {
  Database as DatabaseIcon,
  Cpu as CpuIcon,
  BarChart2 as ChartIcon,
  BookOpen as LearningIcon,
  Users,
  Cloud as CloudIcon,
} from 'react-feather';


const Programs: React.FC = () => (
  <section id="program-data-clevers" className="py-6" style={{ backgroundColor: '#141824', color: '#fff' }}>
    <Container>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-5"
      >
        <br /><br />
        <h2 className="display-5 fw-bold">DataClevers</h2>
        <p className="lead mx-auto" style={{ maxWidth: 720 }}>
          DataClevers est un programme stratégique développé par TOGETTECH, visant à structurer et valoriser la science des données comme levier d’innovation, de performance et de résilience dans les secteurs critiques du développement. 
        </p>
      </motion.div>

      {/* Trois enjeux */}
      <Row className="g-4 mb-5">
        {[
          'Fracture d’accès aux données fiables et structurées',
          'Absence de capital humain qualifié pour leur exploitation',
          'Manque d’outils décisionnels adaptés aux contextes africains',
        ].map((text, idx) => (
          <Col key={idx} md={4}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.2, duration: 0.5 }}
            >
              <Card className="h-100 bg-transparent border border-secondary">
                <Card.Body>
                  <Badge bg="info" className="mb-3">Enjeu {idx + 1}</Badge>
                  <Card.Text>{text}</Card.Text>
                </Card.Body>
              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Actions modulaires */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h3 className="h4 text-info mb-4">Axes d’intervention</h3>
        <ListGroup variant="flush" className="mb-5">
          <ListGroup.Item className="bg-transparent text-white border-0 px-0">
            <DatabaseIcon className="me-2" /> Collecte, traitement et structuration des données (brutes ou satellitaires)
          </ListGroup.Item>
          <ListGroup.Item className="bg-transparent text-white border-0 px-0">
            <CpuIcon className="me-2" /> Production de modèles prédictifs et d’aide à la décision (climat, agriculture, santé, finance, éducation…)
          </ListGroup.Item>
          <ListGroup.Item className="bg-transparent text-white border-0 px-0">
            <LearningIcon className="me-2" /> Formation des talents via e-learning en science des données
          </ListGroup.Item>
          <ListGroup.Item className="bg-transparent text-white border-0 px-0">
            <ChartIcon className="me-2" /> Valorisation via tableaux de bord interactifs, rapports et services sectoriels
          </ListGroup.Item>
        </ListGroup>
      </motion.div>

      {/* Illustration de l’intégration */}
      <Row className="align-items-center gy-4 mb-5">
        <Col md={6}>
          <motion.img
            src="/images/programs/dataclevers-architecture.svg"
            alt="Architecture DataClevers"
            className="img-fluid rounded"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          />
        </Col>
        <Col md={6}>
          <p className="text-justify">
            DataClevers agit comme réacteur analytique au cœur de plusieurs projets phares de TOGETTECH : il alimente <strong>EcoSystem+</strong> en modélisation climatique, soutient <strong>DronePlex</strong> dans l’agriculture de précision, optimise les interfaces éducatives de <strong>LinguaKids</strong>, et renforce la gouvernance de la donnée dans les services publics et privés via <strong>SILIA Pro</strong>.
          </p>
          <p>
            Sa mission est claire : convertir la complexité des données en actions concrètes, mesurables et durables, au service des Objectifs de Développement Durable (ODD).
          </p>
        </Col>
      </Row>

      {/* ODD ciblés */}
      <h3 className="h4 text-info mb-4 text-center">ODD ciblés</h3>
      <Row className="justify-content-center g-4">
        {[
          { icon: <Users size={32} />, label: 'Égalité entre les sexes' },
          { icon: <ChartIcon size={32} />, label: 'Industrie, innovation et infrastructure' },
          { icon: <CloudIcon size={32} />, label: ' Énergie propre et abordable' },
        ].map((o, i) => (
          <Col key={i} xs={6} sm={4} md={3} className="text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 * i, duration: 0.5 }}
            >
              <div className="mb-2 text-info">{o.icon}</div>
              <div>{o.label}</div>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
    <br /><br />
  </section>
);

export default Programs;
