// src/pages/Login.tsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Github } from 'lucide-react';
import { SiGoogle } from 'react-icons/si';
import heroImg from '../assets/login-visual.webp';
import logo from '../assets/togettech-logo.svg';

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: '', password: '', remember: false });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setValues(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: appel API login
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="p-0" style={{ minHeight: '100vh' }}>
      <Row className="gx-0 gy-0" style={{ minHeight: '100vh' }}>
        {/* Visuel (caché < md) */}
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

        {/* Formulaire */}
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center bg-white p-4 p-md-5"
        >
          <div style={{ width: '100%', maxWidth: 400 }}>
            {/* Logo */}
            <div className="text-center mb-4">
              <Image src={logo} alt="TogetTech" style={{ height: 40 }} />
              <h3 className="mt-3">{t('login.title')}</h3>
              <small className="text-muted">
                {t('login.noAccount')}{' '}
                <a href="/signup">{t('login.signUp')}</a>
              </small>
            </div>

            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="loginEmail"
                      type="email"
                      name="email"
                      placeholder={t('login.emailPlaceholder')}
                      value={values.email}
                      onChange={handleChange}
                      required
                    />
                    <Form.Label htmlFor="loginEmail">{t('login.email')}</Form.Label>
                  </Form.Floating>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="loginPassword"
                      type="password"
                      name="password"
                      placeholder={t('login.passwordPlaceholder')}
                      value={values.password}
                      onChange={handleChange}
                      required
                    />
                    <Form.Label htmlFor="loginPassword">{t('login.password')}</Form.Label>
                  </Form.Floating>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      name="remember"
                      label={t('login.remember')}
                      checked={values.remember}
                      onChange={handleChange}
                    />
                    <a href="/forgot-password">{t('login.forgot')}</a>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? t('login.loading') : t('login.submit')}
                  </Button>

                  <div className="text-center text-muted mb-3">or</div>

                  <Button
                    variant="outline-secondary"
                    className="w-100 mb-2 d-flex align-items-center justify-content-center"
                    onClick={() => {/* OAuth GitHub */}}
                  >
                    <Github className="me-2" /> {t('login.github')}
                  </Button>
                  <Button
                    variant="outline-secondary"
                    className="w-100 d-flex align-items-center justify-content-center"
                    onClick={() => {/* OAuth Google */}}
                  >
                    <SiGoogle className="me-2" /> {t('login.google')}
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
