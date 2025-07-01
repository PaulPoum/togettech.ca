// src/components/Footer.tsx
import React, { useEffect, useState } from 'react';
import { Linkedin, Twitter, Youtube, Facebook } from 'lucide-react';
import logo from '../assets/togettech-logo.svg';

export default function Footer() {
  const [lang, setLang] = useState<'fr' | 'en'>('en');

  useEffect(() => {
    const nav = navigator.language;
    setLang(nav.startsWith('fr') ? 'fr' : 'en');
  }, []);

  const t = {
    fr: {
      sections: {
        domaines: 'Domaines',
        domaine1: 'Intelligence Artificielle Appliquée',
        domaine2: 'Éducation Numérique Inclusive',
        domaine3: 'Data Science & Analyse Prédictive',
        domaine4: 'AgriTech & Agriculture de Précision',
        projets: 'Projets',
        projet1: 'EcoSystem+',
        projet2: 'LinguaKids',
        projet3: 'SILIA',
        odd: 'ODD',
        odd2: 'Faim Zéro',
        odd4: 'Éducation de qualité',
        odd6: 'Eau propre & assainissement',
        odd13: 'Lutte contre les changements climatiques',
        actualites: 'Actualités',
        contact: 'Contact',
        entreprise: 'Entreprise',
        about: 'À propos',
        careers: 'Carrières',
      },
      copyright: `© ${new Date().getFullYear()} TogetTech. Tous droits réservés.`,
    },
    en: {
      sections: {
        domaines: 'Domains',
        domaine1: 'Intelligence Artificielle Appliquée',
        domaine2: 'Éducation Numérique Inclusive',
        domaine3: 'Data Science & Analyse Prédictive',
        domaine4: 'AgriTech & Agriculture de Précision',
        projets: 'Projects',
        projet1: 'EcoSystem+',
        projet2: 'LinguaKids',
        projet3: 'SILIA',
        odd: 'SDGs',
        odd2: 'Faim Zéro',
        odd4: 'Éducation de qualité',
        odd6: 'Eau propre & assainissement',
        odd13: 'Lutte contre les changements climatiques',
        actualites: 'News',
        contact: 'Contact',
        entreprise: 'Company',
        about: 'About',
        careers: 'Careers',
      },
      copyright: `© ${new Date().getFullYear()} TogetTech. All rights reserved.`,
    },
  };

  const L = t[lang].sections;

  return (
    <footer className="text-light pt-5 pb-4" style={{ backgroundColor: '#0B0E14' }}>
      <div className="container">
        <div className="row">

          {/* Logo & Social Icons */}
          <div className="col-12 col-md-3 mb-4">
            <a href="/" className="d-flex align-items-center mb-3 text-decoration-none">
              <img src={logo} alt="TogetTech" style={{ height: '32px', marginRight: '0.5rem' }} />
              <span className="h5 mb-0 text-white">TOGETTECH</span>
            </a>
            <div>
              <a href="https://linkedin.com/company/togettech" className="text-light me-3" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
              <a href="https://twitter.com/togettech" className="text-light me-3" aria-label="Twitter">
                <Twitter size={20} />
              </a>
              <a href="https://youtube.com/togettech" className="text-light me-3" aria-label="YouTube">
                <Youtube size={20} />
              </a>
              <a href="https://facebook.com/togettech" className="text-light" aria-label="Facebook">
                <Facebook size={20} />
              </a>
            </div>
          </div>

          {/* Entreprise */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="text-white">{L.entreprise}</h6>
            <ul className="list-unstyled">
              <li><a href="/about" className="text-light text-decoration-none">{L.about}</a></li>
              <li><a href="/careers" className="text-light text-decoration-none">{L.careers}</a></li>
              <li><a href="/contact" className="text-light text-decoration-none">{L.contact}</a></li>
            </ul>
          </div>

          {/* Domaines */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="text-white">{L.domaines}</h6>
            <ul className="list-unstyled">
              <li><a href="/#features" className="text-light text-decoration-none">{L.domaine1}</a></li>
              <li><a href="/#features" className="text-light text-decoration-none">{L.domaine2}</a></li>
              <li><a href="/#features" className="text-light text-decoration-none">{L.domaine3}</a></li>
              <li><a href="/#features" className="text-light text-decoration-none">{L.domaine4}</a></li>
            </ul>
          </div>

          {/* Projets */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="text-white">{L.projets}</h6>
            <ul className="list-unstyled">
              <li><a href="/#use-cases" className="text-light text-decoration-none">{L.projet1}</a></li>
              <li><a href="/#use-cases" className="text-light text-decoration-none">{L.projet2}</a></li>
              <li><a href="/#use-cases" className="text-light text-decoration-none">{L.projet3}</a></li>
            </ul>
          </div>

          {/* ODD */}
          <div className="col-6 col-md-2 mb-4">
            <h6 className="text-white">{L.odd}</h6>
            <ul className="list-unstyled">
              <li><a href="/#odd" className="text-light text-decoration-none">{L.odd2}</a></li>
              <li><a href="/#odd" className="text-light text-decoration-none">{L.odd4}</a></li>
              <li><a href="/#odd" className="text-light text-decoration-none">{L.odd6}</a></li>
              <li><a href="/#odd" className="text-light text-decoration-none">{L.odd13}</a></li>
            </ul>
          </div>

        </div>

        <div className="text-center border-top border-secondary pt-3 mt-3">
          <small className="text-secondary">{t[lang].copyright}</small>
        </div>
      </div>
    </footer>
  );
}
