// src/components/FeatureCard.tsx
import React from 'react';
import type { ReactNode } from 'react';
import { Card } from 'react-bootstrap';

export interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  linkText,
  linkHref,
}) => (
  <Card
    className="border-0 text-white h-100"
    style={{ backgroundColor: '#11131A', borderRadius: '0.75rem' }}
  >
    <Card.Body className="d-flex flex-column">
      <div className="d-flex align-items-center mb-3">
        <div
          className="d-flex align-items-center justify-content-center me-3"
          style={{
            width: '3rem',
            height: '3rem',
            backgroundColor: '#00C2FF',
            borderRadius: '0.75rem',
          }}
        >
          {icon}
        </div>
        <Card.Title className="h5 mb-0" style={{ fontWeight: 500 }}>
          {title}
        </Card.Title>
      </div>
      <Card.Text className="text-white flex-grow-1" style={{ fontWeight: 400 }}>
        {description}
      </Card.Text>
      <a href={linkHref} className="text-info fw-bold mt-3" style={{ fontWeight: 700 }}>
        {linkText} →
      </a>
    </Card.Body>
  </Card>
);

export default FeatureCard;
