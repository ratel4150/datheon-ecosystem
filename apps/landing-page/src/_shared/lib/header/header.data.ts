// apps/landing-page/src/_shared/lib/header/header.data.ts
import type { Lang, SubItem } from '../../types/navigation';

export const servicesData: Record<Lang, SubItem[]> = {
  es: [
    {
      label: 'AI SaaS & Agentes Autónomos',
      path: '/servicios/ai-saas-agentes-autonomos',
      description: 'Construimos productos SaaS potenciados por IA y agentes que ejecutan tareas completas sin intervención humana.',
      icon: 'FiCpu',
    },
    {
      label: 'Automatización & Lead Systems',
      path: '/servicios/automatizacion-lead-systems',
      description: 'Sistemas que capturan, califican y convierten leads de forma automática, más flujos RPA que eliminan trabajo manual.',
      icon: 'FiZap',
    },
    {
      label: 'SaaS / Web Apps & E-commerce',
      path: '/servicios/saas-web-apps-e-commerce',
      description: 'Aplicaciones web fullstack de alto rendimiento, desde MVPs hasta plataformas con millones de usuarios.',
      icon: 'FiLayers',
    },
    {
      label: 'Mobile Apps & Backend',
      path: '/servicios/mobile-apps-backend',
      description: 'Apps móviles nativas y multiplataforma conectadas a backends robustos y escalables.',
      icon: 'FiSmartphone',
    },
    {
      label: 'Cloud, DevOps & Infraestructura',
      path: '/servicios/cloud-devops',
      description: 'Infraestructura cloud escalable, segura y gestionada como código para que tu producto nunca se caiga.',
      icon: 'FiCloud',
    },
    {
      label: 'Data, Analytics & AI Systems',
      path: '/servicios/data-analytics-ai-systems',
      description: 'Arquitecturas de datos que convierten información cruda en decisiones de negocio en tiempo real.',
      icon: 'FiDatabase',
    },
    {
      label: 'IoT: Hardware + Software + SaaS',
      path: '/servicios/iot-hardware-software-saas',
      description: 'Conectamos dispositivos físicos al mundo digital: desde el firmware hasta el dashboard en la nube.',
      icon: 'FiWifi',
    },
    {
      label: 'Odoo ERP & Transformación Digital',
      path: '/servicios/odoo-erp-transformacion-digital',
      description: 'Implementamos, personalizamos y conectamos Odoo con el resto de tu stack tecnológico.',
      icon: 'FiBox',
    },
  ],
  en: [
    {
      label: 'AI SaaS & Autonomous Agents',
      path: '/services/ai-saas-autonomous-agents',
      description: 'We build AI-powered SaaS products and agents that execute complete tasks without human intervention.',
      icon: 'FiCpu',
    },
    {
      label: 'Automation & Lead Systems',
      path: '/services/automation-lead-systems',
      description: 'Systems that automatically capture, qualify and convert leads, plus RPA flows that eliminate manual work.',
      icon: 'FiZap',
    },
    {
      label: 'SaaS / Web Apps & E-commerce',
      path: '/services/saas-web-apps-e-commerce',
      description: 'High-performance fullstack web applications, from MVPs to platforms serving millions of users.',
      icon: 'FiLayers',
    },
    {
      label: 'Mobile Apps & Backend',
      path: '/services/mobile-apps-backend',
      description: 'Native and cross-platform mobile apps connected to robust and scalable backends.',
      icon: 'FiSmartphone',
    },
    {
      label: 'Cloud, DevOps & Infrastructure',
      path: '/services/cloud-devops-infrastructure',
      description: 'Scalable, secure cloud infrastructure managed as code so your product never goes down.',
      icon: 'FiCloud',
    },
    {
      label: 'Data, Analytics & AI Systems',
      path: '/services/data-analytics-ai-systems',
      description: 'Data architectures that turn raw information into business decisions in real time.',
      icon: 'FiDatabase',
    },
    {
      label: 'IoT: Hardware + Software + SaaS',
      path: '/services/iot-hardware-software-saas',
      description: 'We connect physical devices to the digital world: from firmware to cloud dashboard.',
      icon: 'FiWifi',
    },
    {
      label: 'Odoo ERP & Digital Transformation',
      path: '/services/odoo-erp-digital-transformation',
      description: 'We implement, customize and connect Odoo with the rest of your technology stack.',
      icon: 'FiBox',
    },
  ],
  fr: [
    {
      label: 'IA SaaS & Agents Autonomes',
      path: '/services/ia-saas-agents-autonomes',
      description: 'Nous construisons des produits SaaS alimentés par IA et des agents qui exécutent des tâches complètes sans intervention humaine.',
      icon: 'FiCpu',
    },
    {
      label: 'Automatisation & Systèmes de Leads',
      path: '/services/automatisation-systemes-de-leads',
      description: 'Systèmes qui capturent, qualifient et convertissent les leads automatiquement, plus des flux RPA qui éliminent le travail manuel.',
      icon: 'FiZap',
    },
    {
      label: 'SaaS / Web Apps & E-commerce',
      path: '/services/saas-web-apps-e-commerce',
      description: 'Applications web fullstack haute performance, du MVP aux plateformes avec des millions d\'utilisateurs.',
      icon: 'FiLayers',
    },
    {
      label: 'Applications Mobiles & Backend',
      path: '/services/applications-mobiles-backend',
      description: 'Applications mobiles natives et multiplateformes connectées à des backends robustes et évolutifs.',
      icon: 'FiSmartphone',
    },
    {
      label: 'Cloud, DevOps & Infrastructure',
      path: '/services/cloud-devops-infrastructure',
      description: 'Infrastructure cloud évolutive et sécurisée gérée en code pour que votre produit ne tombe jamais.',
      icon: 'FiCloud',
    },
    {
      label: 'Data, Analytics & Systèmes IA',
      path: '/services/data-analytics-systemes-ia',
      description: 'Architectures de données qui transforment les informations brutes en décisions métier en temps réel.',
      icon: 'FiDatabase',
    },
    {
      label: 'IoT : Hardware + Software + SaaS',
      path: '/services/iot-hardware-software-saas',
      description: 'Nous connectons des appareils physiques au monde numérique : du firmware au tableau de bord cloud.',
      icon: 'FiWifi',
    },
    {
      label: 'Odoo ERP & Transformation Digitale',
      path: '/services/odoo-erp-transformation-digitale',
      description: 'Nous implémentons, personnalisons et connectons Odoo avec le reste de votre stack technologique.',
      icon: 'FiBox',
    },
  ],
};

export const sectorsData: Record<Lang, SubItem[]> = {
  es: [
    { label: 'Finanzas', path: '/sectores/finanzas', description: 'Banca digital e inversión', icon: 'FiDollarSign' },
    { label: 'Salud', path: '/sectores/salud', description: 'Hospitales y telemedicina', icon: 'FiHeart' },
    { label: 'Educación', path: '/sectores/educacion', description: 'Plataformas de aprendizaje adaptativo', icon: 'FiBook' },
  ],
  en: [
    { label: 'Finance', path: '/sectors/finance', description: 'Banking and investment tech', icon: 'FiDollarSign' },
    { label: 'Health', path: '/sectors/health', description: 'Hospitals and telemedicine', icon: 'FiHeart' },
    { label: 'Education', path: '/sectors/education', description: 'Adaptive learning platforms', icon: 'FiBook' },
  ],
  fr: [
    { label: 'Finance', path: '/secteurs/finance', description: 'Banque et technologie financière', icon: 'FiDollarSign' },
    { label: 'Santé', path: '/secteurs/sante', description: 'Hôpitaux et télémédecine', icon: 'FiHeart' },
    { label: 'Éducation', path: '/secteurs/education', description: "Plateformes d'apprentissage adaptatif", icon: 'FiBook' },
  ],
};

export const t = {
  services: { es: 'Servicios', en: 'Services', fr: 'Services' },
  sectors: { es: 'Sectores', en: 'Sectors', fr: 'Secteurs' },
  university: { es: 'Universidad Datheón', en: 'Datheón University', fr: 'Université Datheón' },
  viewAllSvc: { es: 'Ver todos los servicios', en: 'View all services', fr: 'Voir tous les services' },
  viewAllSec: { es: 'Ver todos los sectores', en: 'See all sectors', fr: 'Voir tous les secteurs' },
  schedule: { es: 'Agendar reunión', en: 'Schedule meeting', fr: 'Planifier une réunion' },
  darkMode: { es: 'Modo Oscuro / Claro', en: 'Dark / Light Mode', fr: 'Mode Sombre / Clair' },
};

export const tx = (key: keyof typeof t, lang: string): string => {
  const langKey = lang as Lang;
  const translation = t[key];
  return translation[langKey] || translation['es'];
};