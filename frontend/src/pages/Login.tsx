// src/pages/Login.tsx
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Image,
  Alert,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import heroImg from "../assets/login-visual.webp";
import logo from "../assets/togettech-logo.svg";
import { FaGithub as Github } from "react-icons/fa";
import { SiGoogle } from "react-icons/si";

interface User {
  id: number;
  email: string;
  role: string;
}

interface LoginResponse {
  token: string;
  user: User;
}

// Type guard pour nos erreurs Axios/API
interface ApiError {
  response?: {
    status: number;
    data: unknown;
  };
  request?: unknown;
  message?: string;
}
const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === "object" &&
    error !== null &&
    ("response" in error || "request" in error)
  );
};

const Login: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
      const res = await axios.post<LoginResponse>(`${apiUrl}/api/auth/login`, {
        email: values.email,
        password: values.password,
      });
      const { token, user } = res.data;

      // Sauvegarde du token et de l'utilisateur
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      // Redirection selon le rôle
      if (user.role === "admin") {
        navigate("/admin", { replace: true });
      } else {
        navigate("/"); // homepage client
      }
    } catch (err: unknown) {
      console.error(err);

      if (isApiError(err) && err.response) {
        if (err.response.status === 401) {
          setError(t("login.invalidCredentials") || "Identifiants invalides");
        } else {
          setError(t("login.error") || "Une erreur est survenue, réessayez");
        }
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(t("login.error") || "Une erreur est survenue, réessayez");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="p-0" style={{ minHeight: "100vh" }}>
      <Row className="gx-0" style={{ minHeight: "100vh" }}>
        {/* Illustration gauche */}
        <Col
          md={6}
          className="d-none d-md-flex bg-dark align-items-center justify-content-center p-0"
        >
          <Image
            src={heroImg}
            alt="Illustration"
            fluid
            style={{ maxHeight: "80vh", objectFit: "contain" }}
          />
        </Col>

        {/* Formulaire */}
        <Col
          xs={12}
          md={6}
          className="d-flex align-items-center justify-content-center bg-white p-4 p-md-5"
        >
          <div style={{ width: "100%", maxWidth: 400 }}>
            {/* Logo et titre */}
            <div className="text-center mb-4">
              <Image src={logo} alt="TogetTech" style={{ height: 40 }} />
              <h3 className="mt-3">{t("login.title")}</h3>
              <small className="text-muted">
                {t("login.noAccount")}{" "}
                <Link to="/register">{t("login.signUp")}</Link>
              </small>
            </div>

            {error && <Alert variant="danger">{error}</Alert>}

            <Card className="border-0 shadow-sm">
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="loginEmail"
                      type="email"
                      name="email"
                      placeholder={t("login.emailPlaceholder")}
                      value={values.email}
                      onChange={handleChange}
                      required
                    />
                    <Form.Label htmlFor="loginEmail">
                      {t("login.email")}
                    </Form.Label>
                  </Form.Floating>

                  <Form.Floating className="mb-3">
                    <Form.Control
                      id="loginPassword"
                      type="password"
                      name="password"
                      placeholder={t("login.passwordPlaceholder")}
                      value={values.password}
                      onChange={handleChange}
                      required
                    />
                    <Form.Label htmlFor="loginPassword">
                      {t("login.password")}
                    </Form.Label>
                  </Form.Floating>

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <Form.Check
                      type="checkbox"
                      name="remember"
                      label={t("login.remember")}
                      checked={values.remember}
                      onChange={handleChange}
                    />
                    <Link to="/forgot-password">{t("login.forgot")}</Link>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? t("login.loading") : t("login.submit")}
                  </Button>

                  <div className="text-center text-muted mb-3">or</div>

                  <Button
                    variant="outline-secondary"
                    className="w-100 mb-2 d-flex align-items-center justify-content-center"
                  >
                    <Github className="me-2" /> {t("login.github")}
                  </Button>

                  <Button
                    variant="outline-secondary"
                    className="w-100 d-flex align-items-center justify-content-center"
                  >
                    <SiGoogle className="me-2" /> {t("login.google")}
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
