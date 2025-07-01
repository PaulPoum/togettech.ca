// src/pages/Contact.tsx
import React, { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';

interface ContactForm {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [form, setForm] = useState<ContactForm>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      // TODO: remplacer par votre endpoint d'envoi
      // await fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) });
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-5 bg-light">
      <Container className="max-w-md">
        <h2 className="mb-4 text-center">Contactez-nous</h2>

        {status === 'success' && <Alert variant="success">Votre message a été envoyé !</Alert>}
        {status === 'error'   && <Alert variant="danger">Une erreur est survenue. Réessayez.</Alert>}

        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="contactName">
            <Form.Label>Nom</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Votre nom"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="contactEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Votre email"
              required
            />
          </Form.Group>

          <Form.Group className="mb-4" controlId="contactMessage">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              name="message"
              value={form.message}
              onChange={handleChange}
              rows={5}
              placeholder="Votre message"
              required
            />
          </Form.Group>

          <div className="d-grid">
            <Button type="submit" variant="primary" size="lg" disabled={status === 'sending'}>
              {status === 'sending' ? 'Envoi…' : 'Envoyer'}
            </Button>
          </div>
        </Form>
      </Container>
    </section>
  );
};

export default Contact;
