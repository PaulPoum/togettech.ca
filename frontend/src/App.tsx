// src/App.tsx
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Hero from "./components/Hero";
import FeatureCard from "./components/FeatureCard";
import type { FeatureCardProps } from "./components/FeatureCard";
import UseCasesSection from "./components/UseCasesSection";
import type { UseCaseBlock } from "./components/UseCasesSection";
import OddContributions from "./components/OddContributions";
import type { Contribution } from "./components/OddContributions";
import Roadmap from "./components/PricingRecognitionMindmap";
import type { Recognition } from "./components/PricingRecognitionMindmap";
import NewsSection from "./components/NewsSection";
import type { NewsItem } from "./components/NewsSection";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Container, Row, Col } from "react-bootstrap";
import {
  Cpu,
  Activity,
  CreditCard,
  CloudRain,
  Smartphone,
  Globe,
  Cloud,
  Users,
  Satellite,
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
  // Full-width Use Case blocks (Projets TogetTech)
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
  // Contributions ODD
  // const contributions: Contribution[] = [
  //   {
  //     logoUrl: "/images/vision.webp",
  //     title: "OpenTable",
  //     description:
  //       "OpenTable a réduit de 48 % ses tickets de support en déployant notre IA.",
  //     linkText: "Read more",
  //     linkHref: "#",
  //     imageUrl: "/images/vision.webp",
  //     statValue: "48 %",
  //     statLabel: "support tickets reduced",
  //   },
  // ];

  const contributions: Contribution[] = [
    {
      sdgIconUrl: "/images/odds/zero-hunger.png",
      sdgNumber: "ODD 2",
      sdgTitle: "Faim Zéro",
      description:
        "Grâce à EcoSystem+, les agriculteurs ont réduit de 30 % les pertes post-récolte en optimisant l’irrigation et le stockage.",
      statValue: "30 %",
      statLabel: "réduction des pertes",
    },
    {
      sdgIconUrl: "/images/odds/quality-education.png",
      sdgNumber: "ODD 4",
      sdgTitle: "Éducation de qualité",
      description:
        "LinguaKids a permis à plus de 5 000 enfants d’apprendre une nouvelle langue hors ligne via une plateforme gamifiée.",
      statValue: "5 000+",
      statLabel: "enfants formés",
    },
    {
      sdgIconUrl: "/images/odds/clean-water.png",
      sdgNumber: "ODD 6",
      sdgTitle: "Eau propre & assainissement",
      description:
        "EcoSystem+ GeoClimate Explorer anticipe les stress hydriques pour économiser jusqu’à 20 % d’eau d’irrigation.",
      statValue: "20 %",
      statLabel: "d’économie d’eau",
    },
    {
      sdgIconUrl: "/images/odds/climate-action.png",
      sdgNumber: "ODD 13",
      sdgTitle: "Lutte contre les changements climatiques",
      description:
        "Nos alertes climatiques en temps réel ont aidé des communautés à se préparer à 15 % plus tôt aux tempêtes et inondations.",
      statValue: "15 %",
      statLabel: "préavis accru",
    },
  ];

  // Roadmap / Reconnaissances
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
  // News
  const newsItems: NewsItem[] = [
    {
      id: "1",
      title: "TogetTech lève 5M€ pour accélérer son IA agricole",
      excerpt:
        "Grâce à ce nouveau financement, nous allons déployer notre solution sur l'ensemble de l'Afrique de l'Ouest.",
      date: "15 juin 2025",
      imageUrl: "/images/ecosystem.webp",
      linkHref: "/actualites/funding-2025",
    },
    {
      id: "2",
      title: "Partenariat stratégique avec SatAgro",
      excerpt:
        "TogetTech s’associe à SatAgro pour intégrer des données satellites en temps réel.",
      date: "30 mai 2025",
      imageUrl: "/images/silia.webp",
      linkHref: "/actualites/partenariat-satagro",
    },
    {
      id: "3",
      title: "Lancement de l’API publique TogetTech",
      excerpt:
        "Accédez dès aujourd’hui à notre API pour intégrer nos modèles d’IA dans vos applications.",
      date: "10 mai 2025",
      imageUrl: "/images/ecosystem.webp",
      linkHref: "/actualites/lancement-api",
    },
  ];

  return (
    <BrowserRouter>
      <Routes>
        {/* Login route without Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* All other routes wrapped in Layout */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route
                  index
                  element={
                    <>
                      <Hero />
                      <hr className="border-secondary mb-5" />
                      <section
                        id="features"
                        style={{ backgroundColor: "#0B0E14" }}
                        className="py-6"
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
                              FinTech et la cartographie, découvrez comment
                              TogetTech transforme vos défis en opportunités.
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
                      <section id="use-cases">
                        <UseCasesSection blocks={useCaseBlocks} />
                      </section>
                      <hr className="border-secondary mb-5" />
                      <section id="odd">
                        <OddContributions contributions={contributions} />
                      </section>

                      <section id="recognitions">
                        <Roadmap recognitions={recognitions} />
                      </section>

                      <hr className="border-secondary mb-5" />

                      <section id="news">
                        <NewsSection items={newsItems} />
                      </section>
                      <hr className="border-secondary mb-5" />
                    </>
                  }
                />
                {/* Redirect unknown */}
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
