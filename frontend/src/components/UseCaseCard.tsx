// src/components/UseCaseCard.tsx
import React from 'react';
import { Card, Button } from 'react-bootstrap';

export interface UseCase {
  title: string;
  description: string;
  mediaUrl: string;
  ctaText: string;
  ctaHref: string;
}

const UseCaseCard: React.FC<UseCase> = ({
  title,
  description,
  mediaUrl,
  ctaText,
  ctaHref,
}) => (
  <Card
    className="h-100 border-0"
    style={{ backgroundColor: '#11131A', borderRadius: '0.75rem' }}
  >
    <Card.Body className="d-flex flex-column">
      <h3 className="h5 text-white mb-3">{title}</h3>
      <p className="text-muted flex-grow-1">{description}</p>

      {/* Illustration / graphique */}
      <div className="mb-3 text-center">
        <img
          src={mediaUrl}
          alt={title}
          className="img-fluid"
          style={{ maxHeight: '200px', borderRadius: '0.5rem' }}
        />
      </div>

      {/* Call to action */}
      <div className="text-end">
        <Button variant="outline-info" href={ctaHref} className="px-4">
          {ctaText}
        </Button>
      </div>
    </Card.Body>
  </Card>
);

export default UseCaseCard;
