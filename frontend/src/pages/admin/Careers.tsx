// src/pages/admin/Careers.tsx
import React, { useEffect, useState } from 'react';
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

interface Career {
  id: number;
  title: string;
  location?: string;
  postedAt: string;
  closingDate?: string;
  duration?: string;
  description: string;
}

const AdminCareers: React.FC = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string|null>(null);

  // Modal de création/édition
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState<Career|null>(null);
  const [form, setForm] = useState({
    title: '', description: '', location: '', closingDate: '', duration: ''
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string|null>(null);

  const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000' });

  const fetchCareers = async () => {
    setLoading(true);
    try {
      const res = await api.get<Career[]>('/api/careers');
      setCareers(res.data);
    } catch {
      setError('Erreur chargement careers');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCareers();
  }, []);

  const openNew = () => {
    setEditing(null);
    setForm({ title:'',description:'',location:'',closingDate:'',duration:'' });
    setSaveError(null);
    setShowModal(true);
  };

  const openEdit = (c: Career) => {
    setEditing(c);
    setForm({
      title: c.title,
      description: c.description,
      location: c.location||'',
      closingDate: c.closingDate||'',
      duration: c.duration||'',
    });
    setSaveError(null);
    setShowModal(true);
  };

  const handleSave = async () => {
    setSaveError(null);
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/api/careers/${editing.id}`, form);
      } else {
        await api.post('/api/careers', form);
      }
      setShowModal(false);
      fetchCareers();
    } catch {
      setSaveError('Impossible de sauvegarder');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Supprimer cette offre ?')) return;
    try {
      await api.delete(`/api/careers/${id}`);
      fetchCareers();
    } catch {
      alert('Erreur suppression');
    }
  };

  if (loading) return <Container className="py-5 text-center"><Spinner animation="border"/></Container>;
  if (error)   return <Container className="py-5"><Alert variant="danger">{error}</Alert></Container>;

  return (
    <Container className="py-5">
      <h2 className="mb-4">Gestion des Careers</h2>
      <Button className="mb-3" onClick={openNew}>Nouvelle offre</Button>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th><th>Titre</th><th>Lieu</th><th>Publié</th><th>Clôture</th><th>Durée</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {careers.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.title}</td>
              <td>{c.location||'—'}</td>
              <td>{new Date(c.postedAt).toLocaleDateString('fr-FR')}</td>
              <td>{c.closingDate ? new Date(c.closingDate).toLocaleDateString('fr-FR') : '—'}</td>
              <td>{c.duration||'—'}</td>
              <td>
                <Button size="sm" variant="outline-primary" onClick={()=>openEdit(c)}>Édit</Button>{' '}
                <Button size="sm" variant="outline-danger" onClick={()=>handleDelete(c.id)}>Supprimer</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal création / édition */}
      <Modal show={showModal} onHide={()=>setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editing ? 'Éditer' : 'Nouvelle'} offre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {saveError && <Alert variant="danger">{saveError}</Alert>}
          <Form.Group className="mb-3">
            <Form.Label>Titre</Form.Label>
            <Form.Control
              value={form.title}
              onChange={e=>setForm(f=>({...f,title:e.target.value}))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea" rows={4}
              value={form.description}
              onChange={e=>setForm(f=>({...f,description:e.target.value}))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Localisation</Form.Label>
            <Form.Control
              value={form.location}
              onChange={e=>setForm(f=>({...f,location:e.target.value}))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Date de clôture</Form.Label>
            <Form.Control
              type="date"
              value={form.closingDate.split('T')[0]}
              onChange={e=>setForm(f=>({...f,closingDate:e.target.value}))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Durée</Form.Label>
            <Form.Control
              placeholder="ex. 6 mois"
              value={form.duration}
              onChange={e=>setForm(f=>({...f,duration:e.target.value}))}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={()=>setShowModal(false)}>Annuler</Button>
          <Button variant="primary" onClick={handleSave} disabled={saving}>
            {saving ? 'Enregistrement…' : 'Enregistrer'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminCareers;
