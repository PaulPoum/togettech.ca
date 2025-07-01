// src/pages/Register.tsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Image, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import heroImg from '../assets/login-visual.webp';
import logo from '../assets/togettech-logo.svg';

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (form.password !== form.confirm) {
      setError('Les mots de passe ne correspondent pas.');
      return;
    }

    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:4000';
      await axios.post(`${apiUrl}/api/users`, {
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
      });
      navigate('/login');
    } catch (err: unknown) {
      console.error(err);
      if (
        typeof err === 'object' &&
        err !== null &&
        'response' in err &&
        typeof (err as { response?: { status?: number } }).response === 'object' &&
        (err as { response?: { status?: number } }).response !== null &&
        'status' in (err as { response?: { status?: number } }).response!
      ) {
        const status = (err as { response?: { status?: number } }).response!.status;
        if (status === 409) {
          setError('Cet email est déjà utilisé.');
        } else {
          setError('Erreur lors de l’inscription. Merci de réessayer.');
        }
      } else {
        setError('Erreur lors de l’inscription. Merci de réessayer.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="p-0" style={{ minHeight: '100vh' }}>
      <Row className="gx-0" style={{ minHeight: '100vh' }}>
        {/* Illustration à gauche (masquée sur mobile) */}
        <Col
          md={6}
          className="d-none d-md-flex bg-dark align-items-center justify-content-center p-0"
        >
          <Image
            src={heroImg}
            alt="Illustration"
            fluid
            style={{ maxHeight: '80vh', objectFit: 'contain' }}
          />
        </Col>

        {/* Formulaire d'inscription */}
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center bg-white p-4 p-md-5"
        >
          <div style={{ width: '100%', maxWidth: 400 }}>
            {/* Logo */}
            <div className="text-center mb-4">
              <Image src={logo} alt="TogetTech" style={{ height: 40 }} />
              <h3 className="mt-3">Inscription</h3>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="firstName"
                      type="text"
                      name="firstName"
                      placeholder="Prénom"
                      value={form.firstName}
                      onChange={handleChange}
                      required
                    />
                    <Form.Label htmlFor="firstName">Prénom</Form.Label>
                  </Form.Floating>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="lastName"
                      type="text"
                      name="lastName"
                      placeholder="Nom"
                      value={form.lastName}
                      onChange={handleChange}
                      required
                    />
                    <Form.Label htmlFor="lastName">Nom</Form.Label>
                  </Form.Floating>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="email"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                    <Form.Label htmlFor="email">Email</Form.Label>
                  </Form.Floating>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Mot de passe"
                      value={form.password}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                    <Form.Label htmlFor="password">Mot de passe</Form.Label>
                  </Form.Floating>

                  <Form.Floating className="mb-4">
                    <Form.Control
                      id="confirm"
                      type="password"
                      name="confirm"
                      placeholder="Confirmer le mot de passe"
                      value={form.confirm}
                      onChange={handleChange}
                      required
                      minLength={6}
                    />
                    <Form.Label htmlFor="confirm">Confirmer le mot de passe</Form.Label>
                  </Form.Floating>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? 'Inscription...' : 'S’inscrire'}
                  </Button>
                </Form>
              </Card.Body>
            </Card>

            <div className="text-center mt-3">
              <small>
                Déjà un compte ? <Link to="/login">Connectez-vous</Link>
              </small>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
