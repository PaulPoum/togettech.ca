// src/components/Testimonials.tsx
import React from 'react';
import { Container, Carousel, Image } from 'react-bootstrap';

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  avatarUrl: string;
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="py-5 bg-light">
      <Container>
        <h2 className="text-center mb-4">Testimonials</h2>
        <Carousel
          indicators={false}
          controls={testimonials.length > 1}
          interval={5000}
        >
          {testimonials.map((t) => (
            <Carousel.Item key={t.id}>
              <div className="d-flex flex-column align-items-center">
                <Image
                  src={t.avatarUrl}
                  alt={t.author}
                  roundedCircle
                  width={100}
                  height={100}
                  className="mb-3"
                />
                <blockquote className="blockquote text-center">
                  <p className="mb-3">“{t.quote}”</p>
                  <footer className="blockquote-footer">
                    {t.author} in <cite title="Role">{t.role}</cite>
                  </footer>
                </blockquote>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default Testimonials;
