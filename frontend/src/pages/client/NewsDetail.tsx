// src/pages/client/NewsDetail.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Spinner,
  Alert,
  Card,
  Image,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

interface NewsItem {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  imagePath?: string; // chemin relatif renvoyé par le back, ex: '/uploads/news/xxx.jpg'
  date: string;       // DATEONLY
}

const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // URL de base de votre backend
  const BACKEND_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

  useEffect(() => {
    const apiUrl = BACKEND_URL;
    axios.get<NewsItem>(`${apiUrl}/api/news/${id}`)
      .then(res => {
        setNews(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError("Actualité introuvable.");
        setLoading(false);
      });
  }, [id, BACKEND_URL]);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  if (error || !news) {
    return (
      <Container className="py-5">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  // Calcul de l'URL complète de l'image
  const imgUrl = news.imagePath
    ? news.imagePath.startsWith('http')
      ? news.imagePath
      : `${BACKEND_URL}${news.imagePath}`
    : undefined;

  return (
    <Container className="py-5">
      <Card className="shadow-sm">
        {imgUrl && (
          <Image
            src={imgUrl}
            alt={news.title}
            fluid
            rounded
            className="mb-4"
          />
        )}
        <Card.Body>
          <Card.Title>{news.title}</Card.Title>
          <Card.Subtitle className="mb-3 text-muted">
            Publié le {new Date(news.date).toLocaleDateString('fr-FR')}
          </Card.Subtitle>
          <Card.Text>{news.content}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default NewsDetail;
