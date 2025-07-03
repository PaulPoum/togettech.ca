// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// layouts
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";

// public components
import Hero from "./components/Hero";
import FeatureCard from "./components/FeatureCard";
import type { FeatureCardProps } from "./components/FeatureCard";
import UseCasesSection from "./components/UseCasesSection";
import type { UseCaseBlock } from "./components/UseCasesSection";
import OddContributions from "./components/OddContributions";
import type { Contribution } from "./components/OddContributions";
import Roadmap from "./components/PricingRecognitionMindmap";
import type { Recognition } from "./components/PricingRecognitionMindmap";
import Programs from "./components/Programs";

import NewsSection from "./components/NewsSection";

import CareersPage from "./pages/client/Careers";
import CareerDetail from "./pages/client/CareerDetail";
import NewsDetail from "./pages/client/NewsDetail";
import NewsPage from "./pages/client/News";

// admin pages
import Dashboard from "./pages/admin/Dashboard";
import AdminCareers from "./pages/admin/Careers";
import AdminNews from "./pages/admin/News"; 

// auth
import Login from "./pages/Login";
import Register from "./pages/Register";

// utilities
import { Container, Row, Col } from "react-bootstrap";
import {
  Activity,
  Users,
  Cpu,
  CloudRain,
  Satellite,
  Globe,
  Smartphone,
  Cloud,
  CreditCard,
} from "lucide-react";

const App: React.FC = () => {
  // Domaines d’activité
  const features: FeatureCardProps[] = [
    {
      icon: <Activity size={20} color="#fff" />,
      title: "Intelligence Artificielle Appliquée",
      description:
        "Développement de solutions (vision par ordinateur, NLP multilingue, reconnaissance vocale) pour automatiser et personnaliser l’expérience utilisateur dans l’éducation, la finance, l’agriculture…",
      linkText: "En savoir plus",
      linkHref: "#ia",
    },
    {
      icon: <Users size={20} color="#fff" />,
      title: "Éducation Numérique Inclusive",
      description:
        "Outils intelligents (gamification, suivi personnalisé, offline) pour l’alphabétisation en langues locales sur appareils bas de gamme.",
      linkText: "Découvrir",
      linkHref: "#education",
    },
    {
      icon: <Cpu size={20} color="#fff" />,
      title: "Data Science & Analyse Prédictive",
      description:
        "Extraction et valorisation de données (climatiques, agricoles, économiques) pour générer des insights et piloter la planification et la gestion des risques.",
      linkText: "Explorer",
      linkHref: "#datascience",
    },
    {
      icon: <CloudRain size={20} color="#fff" />,
      title: "AgriTech & Agriculture de Précision",
      description:
        "Solutions drones & IA (modélisation sol-climat, irrigation intelligente, prévisions) pour optimiser les cultures et réduire les pertes (ex. DronePlex, EcoSystem+).",
      linkText: "Voir la démo",
      linkHref: "#agritech",
    },
    {
      icon: <Satellite size={20} color="#fff" />,
      title: "SIG & Cartographie Interactive",
      description:
        "Intégration de SIG pour la planification urbaine, la surveillance environnementale et la cartographie des besoins communautaires.",
      linkText: "Voir la démo",
      linkHref: "#sig",
    },
    {
      icon: <Globe size={20} color="#fff" />,
      title: "Adaptation Climatique & Résilience",
      description:
        "Plateformes pour anticiper les événements extrêmes, planifier les infrastructures et gérer les ressources pour renforcer la résilience territoriale.",
      linkText: "En savoir plus",
      linkHref: "#climat",
    },
    {
      icon: <Smartphone size={20} color="#fff" />,
      title: "FinTech & Inclusion Financière",
      description:
        "Création de plateformes de paiement mobile, micro-crédit, QR/NFC pour bancariser les populations non connectées au système financier classique.",
      linkText: "Découvrir",
      linkHref: "#fintech",
    },
    {
      icon: <Cloud size={20} color="#fff" />,
      title: "Dev Full-Stack & Cloud",
      description:
        "Plateformes cloud-native (microservices, CI/CD), apps mobiles (Flutter), web (React), backend (Node.js, MongoDB/PostgreSQL).",
      linkText: "Explorer",
      linkHref: "#dev",
    },
    {
      icon: <CreditCard size={20} color="#fff" />,
      title: "PPI & Accompagnement Digital",
      description:
        "Conseil, formation et intégration pour ONG, collectivités et gouvernements autour de solutions numériques durables.",
      linkText: "En savoir plus",
      linkHref: "#ppi",
    },
  ];
  // Use case blocks (projets)
  const useCaseBlocks: UseCaseBlock[] = [
    {
      label: "Agritech durable",
      title: "EcoSystem+",
      description:
        "EcoSystem+ combine données satellites, capteurs IoT et modèles d’IA pour optimiser l’irrigation, la fertilisation et anticiper les stress climatiques, augmentant les rendements tout en réduisant déchets et consommation d’eau.",
      ctaText: "Voir EcoSystem+",
      ctaHref: "#ecosystem",
      mediaUrl: "/images/ecosystem.webp",
    },
    {
      label: "Éducation intelligente",
      title: "LinguaKids",
      description:
        "LinguaKids est une plateforme d’apprentissage ludique des langues locales, utilisant NLP et gamification pour adapter automatiquement les leçons au niveau de chaque enfant, même en mode hors-ligne.",
      ctaText: "Découvrir LinguaKids",
      ctaHref: "#linguakids",
      mediaUrl: "/images/linguakids-demo.svg",
    },
    {
      label: "Inclusion financière",
      title: "SILIA",
      description:
        "SILIA est un portefeuille mobile tout-en-un qui permet aux populations non bancarisées d’envoyer, recevoir et stocker de l’argent, d’accéder au micro-crédit et d’effectuer des paiements QR/NFC sans réseau traditionnel.",
      ctaText: "Explorer SILIA",
      ctaHref: "#silia",
      mediaUrl: "/images/silia.webp",
    },
    {
      label: "Plateforme d’entreprise",
      title: "AGROSuite IA",
      description:
        "AGROSuite IA fournit aux coopératives et agrégateurs un tableau de bord centralisé pour suivre la qualité des récoltes, prédire les rendements et gérer la logistique grâce à des tableaux de bord et API intégrées.",
      ctaText: "En savoir plus sur AGROSuite IA",
      ctaHref: "#agrosuite",
      mediaUrl: "/images/agrosuite-demo.svg",
    },
    {
      label: "Surveillance par drone",
      title: "DronePlex",
      description:
        "DronePlex associe drones autonomes et vision par ordinateur pour scanner vos parcelles, détecter maladies et stress hydriques, et générer des cartes de santé des cultures en quelques minutes.",
      ctaText: "Voir DronePlex",
      ctaHref: "#droneplex",
      mediaUrl: "/images/droneplex-demo.svg",
    },
    {
      label: "Version avancée",
      title: "SILIA Pro",
      description:
        "SILIA Pro ajoute des fonctionnalités KYC intégrées, des rapports de conformité en temps réel et l’intégration de passerelles bancaires pour répondre aux besoins des PME et institutions financières.",
      ctaText: "Découvrir SILIA Pro",
      ctaHref: "#siliapro",
      mediaUrl: "/images/siliapro-demo.svg",
    },
    {
      label: "Analyse climatique avancée",
      title: "EcoSystem+ GeoClimate Explorer",
      description:
        "GeoClimate Explorer est un module d’EcoSystem+ qui combine SIG, modèles climatiques et IA pour simuler différents scénarios d’irrigation et de rendement sous divers futurs climatiques.",
      ctaText: "Explorer GeoClimate Explorer",
      ctaHref: "#geoclimate",
      mediaUrl: "/images/geoclimate-demo.svg",
    },
  ];
  // ODD contributions
  const contributions: Contribution[] = [
    {
      sdgIconUrl: "/images/odds/zero-hunger.png",
      sdgNumber: "ODD 2",
      sdgTitle: "Faim Zéro",
      description:
        "Grâce à EcoSystem+, les agriculteurs ont réduit de 30 % les pertes post-récolte en optimisant l’irrigation et le stockage.",
      statValue: "30 %",
      statLabel: "Réduction des pertes",
    },
    {
      sdgIconUrl: "/images/odds/quality-education.png",
      sdgNumber: "ODD 4",
      sdgTitle: "Éducation de qualité",
      description:
        "LinguaKids a permis à plus de 5 000 enfants d’apprendre une nouvelle langue hors ligne via une plateforme gamifiée.",
      statValue: "5 000+",
      statLabel: "Enfants formés",
    },
    {
      sdgIconUrl: "/images/odds/clean-water.png",
      sdgNumber: "ODD 6",
      sdgTitle: "Eau propre & assainissement",
      description:
        "EcoSystem+ GeoClimate Explorer anticipe les stress hydriques pour économiser jusqu’à 20 % d’eau d’irrigation.",
      statValue: "20 %",
      statLabel: "D’économie d’eau",
    },
    {
      sdgIconUrl: "/images/odds/climate-action.png",
      sdgNumber: "ODD 13",
      sdgTitle: "Lutte contre les changements climatiques",
      description:
        "Nos alertes climatiques en temps réel ont aidé des communautés à se préparer à 15 % plus tôt aux tempêtes et inondations.",
      statValue: "15 %",
      statLabel: "Préavis accru",
    },
  ];
  // Roadmap / reconnaissances
  const recognitions: Recognition[] = [
    {
      year: "2021",
      logoUrl: "/images/tsv.jpg",
      alt: "Innovation 2024",
      label: "Innovation 2024",
    },
    {
      year: "2022",
      logoUrl: "/images/kta.png",
      alt: "Agritech Best 2023",
      label: "Best Agritech 2023",
    },
    {
      year: "2023",
      logoUrl: "/images/cdic.jpg",
      alt: "UN SDG Champion",
      label: "SDG Champion",
    },
    {
      year: "2024",
      logoUrl: "/images/Logo_12.png",
      alt: "Global Impact Award",
      label: "Global Impact Award",
    },
  ];
  
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Public client routes */}
        <Route element={<ClientLayout />}>
          <Route
            index
            element={
              <>
                <Hero />
                <hr className="border-secondary mb-5" />

                {/* Domaines */}
                <section
                  id="features"
                  className="py-6"
                  style={{ backgroundColor: "#0B0E14" }}
                >
                  <Container>
                    <div className="text-start mb-5">
                      <p className="text-info text-uppercase small mb-2">
                        Notre expertise
                      </p>
                      <h2 className="text-white fw-bold mb-3">
                        Des solutions sur-mesure pour tous vos enjeux
                      </h2>
                      <p className="text-white fs-5 mb-5">
                        De l’IA appliquée à l’agritech, en passant par la
                        FinTech…
                      </p>
                    </div>
                    <Row className="g-4">
                      {features.map((f, idx) => (
                        <Col key={idx} xs={12} md={6} lg={4}>
                          <FeatureCard {...f} />
                        </Col>
                      ))}
                    </Row>
                  </Container>
                </section>
                <hr className="border-secondary mb-5" />

                {/* Use Cases */}
                <section id="use-cases">
                  <UseCasesSection blocks={useCaseBlocks} />
                </section>
                <hr className="border-secondary mb-5" />

                {/* Contributions ODD */}
                <section id="odd">
                  <OddContributions contributions={contributions} />
                </section>
                <hr className="border-secondary mb-5" />

                {/* Roadmap & Récompenses */}
                <section id="recognitions">
                  <Roadmap recognitions={recognitions} />
                </section>

                {/* Programme DataClevers */}
                <Programs />

                {/* Actualités */}
                <section id="news">
                  <NewsSection />
                </section>
                <hr className="border-secondary mb-5" />
              </>
            }
          />

          {/* Public Careers */}
          <Route path="careers" element={<CareersPage />} />
          <Route path="careers/:id" element={<CareerDetail />} />

          {/* Public News Detail */}
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:id" element={<NewsDetail />} />
        </Route>

        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="careers" element={<AdminCareers />} />
          <Route path="/admin/news" element={<AdminNews />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
