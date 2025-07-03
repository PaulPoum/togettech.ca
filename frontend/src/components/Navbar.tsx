// src/components/Navbar.tsx
import React, { useState, useEffect } from 'react';
import logo from '../assets/togettech-logo.svg';

interface NavItem {
  key: string;
  href: string;
  labelFr: string;
  labelEn: string;
}

const navItems: NavItem[] = [
  { key: 'home',      href: '/#',               labelFr: 'Accueil',     labelEn: 'Home' },
  { key: 'domains',   href: '/#features',       labelFr: 'Domaines',    labelEn: 'Domains' },
  { key: 'projects',  href: '/#use-cases',      labelFr: 'Projets',     labelEn: 'Projects' },
  { key: 'news',      href: '/#news',           labelFr: 'Actualités',  labelEn: 'News' },
  { key: 'careers',      href: '/careers',       labelFr: 'Carrières',   labelEn: 'Careers' },
  // { key: 'contact',   href: '/#contact',        labelFr: 'Contact',     labelEn: 'Contact' },
];

const Navbar: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const ANNOUNCE_HEIGHT = 28;

  // Langue courante, stockée en localStorage pour persistance
  const [lang, setLang] = useState<'fr' | 'en'>('fr');
  useEffect(() => {
    const stored = localStorage.getItem('lang');
    if (stored === 'en' || stored === 'fr') setLang(stored);
  }, []);
  const toggleLang = () => {
    const next = lang === 'en' ? 'fr' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
    // TODO: déclencher votre i18n.changeLanguage(next) si vous utilisez react-i18next
  };

  return (
    <>
      {/* Bannière d’annonce fixée en haut */}
      <div
        className="bg-info text-dark text-center small"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: `${ANNOUNCE_HEIGHT}px`,
          lineHeight: `${ANNOUNCE_HEIGHT}px`,
          zIndex: 1030,
        }}
      >
        {lang === 'fr'
          ? "TogetTech au CONIA du 07 AU 08 Juillet 2025 – Palais des Congrès, Yaoundé —"
          : 'TogetTech at CONIA from July 7 to 8, 2025 – Palais des Congrès, Yaoundé —'}{' '}
        <a href="#meet" className="text-dark text-decoration-underline">
          {lang === 'fr' ? 'Rejoignez-nous' : 'Join us'}
        </a>
      </div>

      {/* Navbar fixée juste en dessous de la bannière */}
      <nav
        className="navbar navbar-expand-lg navbar-dark"
        style={{
          backgroundColor: '#0B0E14',
          position: 'fixed',
          top: `${ANNOUNCE_HEIGHT}px`,
          left: 0,
          right: 0,
          zIndex: 1031,
        }}
      >
        <div className="container">
          {/* Logo */}
          <a className="navbar-brand d-flex align-items-center" href="/">
            <img
              src={logo}
              alt="TogetTech"
              style={{ height: '32px', marginRight: '0.5rem' }}
            />
            <span className="fw-bold">TOGETTECH</span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            aria-controls="mainNav"
            aria-expanded={expanded}
            aria-label="Toggle navigation"
            onClick={() => setExpanded(!expanded)}
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div
            className={`collapse navbar-collapse${expanded ? ' show' : ''}`}
            id="mainNav"
          >
            {/* Liens principaux */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navItems.map(item => (
                <li className="nav-item" key={item.key}>
                  <a
                    className="nav-link"
                    href={item.href}
                    onClick={() => setExpanded(false)}
                  >
                    {lang === 'fr' ? item.labelFr : item.labelEn}
                  </a>
                </li>
              ))}
            </ul>

            <div className="d-flex align-items-center">
              {/* Choix de la langue */}
              <button
                onClick={toggleLang}
                className="btn btn-outline-light btn-sm me-3"
                style={{ width: '2.5rem', padding: 0 }}
                aria-label={
                  lang === 'fr' ? 'Switch to English' : 'Passer en français'
                }
              >
                {lang.toUpperCase()}
              </button>

              <a
                href="/login"
                className="text-light me-3 text-decoration-none"
                rel="noopener noreferrer"
              >
                {lang === 'fr' ? 'Connexion' : 'Login'}
              </a>
              <button className="btn btn-light">
                {lang === 'fr' ? 'Commencer' : 'Start for free'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Compensation pour bannière + navbar */}
      <div style={{ height: `${ANNOUNCE_HEIGHT + 56}px` }} />
    </>
  );
};

export default Navbar;
