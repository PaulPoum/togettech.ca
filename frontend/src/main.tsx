// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// 1. Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';
// 2. Import Bootstrap JS bundle (Popper + JS)
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// 3. Initialisation de i18n (doit être avant App)
import './i18n';

// 4. Puis votre CSS custom
import './index.css';

import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Root element with id 'root' not found");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
