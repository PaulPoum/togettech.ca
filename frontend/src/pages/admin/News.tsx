// src/pages/admin/News.tsx
import React, { useEffect, useState } from 'react';
import type { ChangeEvent } from 'react';
import axios from 'axios';
import {
  Container,
  Table,
  Button,
  Spinner,
  Modal,
  Form,
  Alert,
} from 'react-bootstrap';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content?: string;
  imagePath?: string; // chemin renvoyé par le serveur après upload
  date: string;       // DATEONLY
}

const AdminNews: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<NewsItem|null>(null);
  const [form, setForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    date: '',
  });
  const [imageFile, setImageFile] = useState<File|null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string|null>(null);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000',
  });

  const fetchNews = async () => {
    setLoading(true);
    try {
      const res = await api.get<NewsItem[]>('/api/news');
      setNews(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Erreur lors du chargement des actualités');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title: '', excerpt: '', content: '', date: '' });
    setImageFile(null);
    setSaveError(null);
    setShowModal(true);
  };

  const openEdit = (item: NewsItem) => {
    setEditing(item);
    setForm({
      title: item.title,
      excerpt: item.excerpt,
      content: item.content || '',
      date: item.date,
    });
    setImageFile(null);  // si on ne veut pas remplacer l'image, on le laisse à null
    setSaveError(null);
    setShowModal(true);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveError(null);

    try {
      const payload = new FormData();
      payload.append('title', form.title);
      payload.append('excerpt', form.excerpt);
      payload.append('content', form.content);
      payload.append('date', form.date);
      if (imageFile) {
        payload.append('image', imageFile);
      }

      if (editing) {
        await api.put(`/api/news/${editing.id}`, payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/api/news', payload, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setShowModal(false);
      fetchNews();
    } catch (err) {
      console.error(err);
      setSaveError('Impossible de sauvegarder');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Supprimer cette actualité ?')) return;
    try {
      await api.delete(`/api/news/${id}`);
      fetchNews();
    } catch (err) {
      console.error(err);
      alert('Erreur lors de la suppression');
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }
  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Gestion des Actualités</h2>
      <Button className="mb-3" onClick={openNew}>
        Nouvelle actualité
      </Button>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Titre</th>
            <th>Extrait</th>
            <th>Publié le</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {news.map(n => (
            <tr key={n.id}>
              <td>{n.id}</td>
              <td>{n.title}</td>
              <td>{n.excerpt}</td>
              <td>{new Date(n.date).toLocaleDateString('fr-FR')}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => openEdit(n)}
                >
                  Éditer
                </Button>{' '}
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => handleDelete(n.id)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal
        show={showModal}
        onHide={() => setShowModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {editing ? 'Éditer l’actualité' : 'Nouvelle actualité'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {saveError && <Alert variant="danger">{saveError}</Alert>}

          <Form.Group className="mb-3">
            <Form.Label>Titre</Form.Label>
            <Form.Control
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Extrait</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={form.excerpt}
              onChange={e => setForm(f => ({ ...f, excerpt: e.target.value }))}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Contenu</Form.Label>
            <Form.Control
              as="textarea"
              rows={6}
              value={form.content}
              onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Image (fichier)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
            {editing && !imageFile && editing.imagePath && (
              <small className="text-muted">
                Image actuelle: {editing.imagePath}
              </small>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Date de publication</Form.Label>
            <Form.Control
              type="date"
              value={form.date}
              onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminNews;
