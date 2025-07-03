// src/pages/client/CareerDetail.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Spinner,
  Alert,
  Card,
  Button,
  Form,
} from "react-bootstrap";
import { useParams } from "react-router-dom";

interface Career {
  id: number;
  title: string;
  description: string;
  location?: string;
  postedAt: string;
  closingDate?: string;
  duration?: string;
}

const CareerDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [career, setCareer] = useState<Career | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Formulaire de candidature
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [letterFile, setLetterFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
    axios
      .get<Career>(`${apiUrl}/api/careers/${id}`)
      .then((res) => setCareer(res.data))
      .catch((err) => {
        console.error(err);
        setError("Offre introuvable.");
      })
      .then(() => setLoading(false));
  }, [id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    if (e.target.name === "cv") {
      setCvFile(e.target.files[0]);
    } else {
      setLetterFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:4000";
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("careerId", id!);
      formData.append("name", name);
      formData.append("email", email);
      formData.append("message", message);
      if (cvFile) formData.append("cv", cvFile);
      if (letterFile) formData.append("letter", letterFile);

      await axios.post(`${apiUrl}/api/applications`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      setSubmitSuccess(true);
    } catch (err) {
      console.error(err);
      setSubmitError("Échec de l'envoi, réessayez.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }
  if (error || !career) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      {/* Détail de l'offre */}
      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <Card.Title>{career.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            {career.location || "Localisation non spécifiée"} — Publié le{" "}
            {new Date(career.postedAt).toLocaleDateString("fr-FR")}
          </Card.Subtitle>
          <Card.Text>{career.description}</Card.Text>
          {career.duration && (
            <p>
              <strong>Durée :</strong> {career.duration}
            </p>
          )}
          {career.closingDate && (
            <p>
              <strong>Clôture :</strong>{" "}
              {new Date(career.closingDate).toLocaleDateString("fr-FR")}
            </p>
          )}
        </Card.Body>
      </Card>

      {/* Formulaire de candidature */}
      <h4>Postuler à cette offre</h4>
      {submitSuccess ? (
        <Alert variant="success">
          Votre candidature a bien été envoyée !
        </Alert>
      ) : (
        <Form onSubmit={handleSubmit} className="mb-5">
          {submitError && <Alert variant="danger">{submitError}</Alert>}

          <Form.Group controlId="appName" className="mb-3">
            <Form.Label>Nom complet</Form.Label>
            <Form.Control
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="appEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="appMessage" className="mb-3">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Expliquez brièvement pourquoi vous postulez..."
              required
            />
          </Form.Group>

          <Form.Group controlId="appCv" className="mb-3">
            <Form.Label>CV (PDF ou DOCX)</Form.Label>
            <Form.Control
              type="file"
              name="cv"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="appLetter" className="mb-4">
            <Form.Label>Lettre de motivation (PDF ou DOCX)</Form.Label>
            <Form.Control
              type="file"
              name="letter"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />
          </Form.Group>

          <Button type="submit" disabled={submitting}>
            {submitting ? "Envoi…" : "Envoyer ma candidature"}
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default CareerDetail;
