// apps/landing-page/src/_features/navigation/model/navigation.data.ts
import type { NavigationData, Lang } from '@/_shared/types/navigation.types';

export const navigationData: Record<Lang, NavigationData> = {
  es: {
    services: [
      {
        label: 'AI SaaS & Agentes Autónomos',
        path: '/servicios/ai-saas-agentes-autonomos',
        description: 'Construimos productos SaaS potenciados por IA y agentes que ejecutan tareas completas sin intervención humana.',
        icon: 'FiCpu',
      },
      {
        label: 'Automatización & Lead Systems',
        path: '/servicios/automatizacion-lead-systems',
        description: 'Sistemas que capturan, califican y convierten leads de forma automática.',
        icon: 'FiZap',
      },
      {
        label: 'SaaS / Web Apps & E-commerce',
        path: '/servicios/saas-web-apps-e-commerce',
        description: 'Aplicaciones web fullstack de alto rendimiento.',
        icon: 'FiLayers',
      },
      {
        label: 'Mobile Apps & Backend',
        path: '/servicios/mobile-apps-backend',
        description: 'Apps móviles nativas y multiplataforma conectadas a backends robustos.',
        icon: 'FiSmartphone',
      },
      {
        label: 'Cloud, DevOps & Infraestructura',
        path: '/servicios/cloud-devops',
        description: 'Infraestructura cloud escalable, segura y gestionada como código.',
        icon: 'FiCloud',
      },
      {
        label: 'Data, Analytics & AI Systems',
        path: '/servicios/data-analytics-ai-systems',
        description: 'Arquitecturas de datos que convierten información cruda en decisiones.',
        icon: 'FiDatabase',
      },
      {
        label: 'IoT: Hardware + Software + SaaS',
        path: '/servicios/iot-hardware-software-saas',
        description: 'Conectamos dispositivos físicos al mundo digital.',
        icon: 'FiWifi',
      },
      {
        label: 'Odoo ERP & Transformación Digital',
        path: '/servicios/odoo-erp-transformacion-digital',
        description: 'Implementamos, personalizamos y conectamos Odoo.',
        icon: 'FiBox',
      },
    ],
    sectors: [
      {
        label: 'Finanzas',
        path: '/sectores/finanzas',
        description: 'Banca digital e inversión',
        icon: 'FiDollarSign',
      },
      {
        label: 'Salud',
        path: '/sectores/salud',
        description: 'Hospitales y telemedicina',
        icon: 'FiHeart',
      },
      {
        label: 'Educación',
        path: '/sectores/educacion',
        description: 'Plataformas de aprendizaje adaptativo',
        icon: 'FiBook',
      },
    ],
  },
  en: {
    services: [
      {
        label: 'AI SaaS & Autonomous Agents',
        path: '/services/ai-saas-autonomous-agents',
        description: 'We build AI-powered SaaS products and autonomous agents.',
        icon: 'FiCpu',
      },
      {
        label: 'Automation & Lead Systems',
        path: '/services/automation-lead-systems',
        description: 'Systems that automatically capture, qualify and convert leads.',
        icon: 'FiZap',
      },
      {
        label: 'SaaS / Web Apps & E-commerce',
        path: '/services/saas-web-apps-e-commerce',
        description: 'High-performance fullstack web applications.',
        icon: 'FiLayers',
      },
      {
        label: 'Mobile Apps & Backend',
        path: '/services/mobile-apps-backend',
        description: 'Native and cross-platform mobile apps.',
        icon: 'FiSmartphone',
      },
      {
        label: 'Cloud, DevOps & Infrastructure',
        path: '/services/cloud-devops-infrastructure',
        description: 'Scalable, secure cloud infrastructure.',
        icon: 'FiCloud',
      },
      {
        label: 'Data, Analytics & AI Systems',
        path: '/services/data-analytics-ai-systems',
        description: 'Data architectures for real-time business decisions.',
        icon: 'FiDatabase',
      },
      {
        label: 'IoT: Hardware + Software + SaaS',
        path: '/services/iot-hardware-software-saas',
        description: 'Connect physical devices to the digital world.',
        icon: 'FiWifi',
      },
      {
        label: 'Odoo ERP & Digital Transformation',
        path: '/services/odoo-erp-digital-transformation',
        description: 'Implement, customize and connect Odoo.',
        icon: 'FiBox',
      },
    ],
    sectors: [
      {
        label: 'Finance',
        path: '/sectors/finance',
        description: 'Banking and investment tech',
        icon: 'FiDollarSign',
      },
      {
        label: 'Health',
        path: '/sectors/health',
        description: 'Hospitals and telemedicine',
        icon: 'FiHeart',
      },
      {
        label: 'Education',
        path: '/sectors/education',
        description: 'Adaptive learning platforms',
        icon: 'FiBook',
      },
    ],
  },
  fr: {
    services: [
      {
        label: 'IA SaaS & Agents Autonomes',
        path: '/services/ia-saas-agents-autonomes',
        description: 'Produits SaaS alimentés par IA et agents autonomes.',
        icon: 'FiCpu',
      },
      {
        label: 'Automatisation & Systèmes de Leads',
        path: '/services/automatisation-systemes-de-leads',
        description: 'Systèmes qui capturent et convertissent les leads automatiquement.',
        icon: 'FiZap',
      },
      {
        label: 'SaaS / Web Apps & E-commerce',
        path: '/services/saas-web-apps-e-commerce',
        description: 'Applications web fullstack haute performance.',
        icon: 'FiLayers',
      },
      {
        label: 'Applications Mobiles & Backend',
        path: '/services/applications-mobiles-backend',
        description: 'Applications mobiles natives et multiplateformes.',
        icon: 'FiSmartphone',
      },
      {
        label: 'Cloud, DevOps & Infrastructure',
        path: '/services/cloud-devops-infrastructure',
        description: 'Infrastructure cloud évolutive et sécurisée.',
        icon: 'FiCloud',
      },
      {
        label: 'Data, Analytics & Systèmes IA',
        path: '/services/data-analytics-systemes-ia',
        description: 'Architectures de données en temps réel.',
        icon: 'FiDatabase',
      },
      {
        label: 'IoT : Hardware + Software + SaaS',
        path: '/services/iot-hardware-software-saas',
        description: 'Connectez des appareils physiques au monde numérique.',
        icon: 'FiWifi',
      },
      {
        label: 'Odoo ERP & Transformation Digitale',
        path: '/services/odoo-erp-transformation-digitale',
        description: 'Implémentons, personnalisons et connectons Odoo.',
        icon: 'FiBox',
      },
    ],
    sectors: [
      {
        label: 'Finance',
        path: '/secteurs/finance',
        description: 'Banque et technologie financière',
        icon: 'FiDollarSign',
      },
      {
        label: 'Santé',
        path: '/secteurs/sante',
        description: 'Hôpitaux et télémédecine',
        icon: 'FiHeart',
      },
      {
        label: 'Éducation',
        path: '/secteurs/education',
        description: "Plateformes d'apprentissage adaptatif",
        icon: 'FiBook',
      },
    ],
  },
};

export const translations: Record<Lang, any> = {
  es: {
    services: 'Servicios',
    sectors: 'Sectores',
    university: 'Universidad Datheón',
    viewAllSvc: 'Ver todos los servicios',
    viewAllSec: 'Ver todos los sectores',
    schedule: 'Agendar reunión',
    darkMode: 'Modo Oscuro / Claro',
  },
  en: {
    services: 'Services',
    sectors: 'Sectors',
    university: 'Datheón University',
    viewAllSvc: 'View all services',
    viewAllSec: 'See all sectors',
    schedule: 'Schedule meeting',
    darkMode: 'Dark / Light Mode',
  },
  fr: {
    services: 'Services',
    sectors: 'Secteurs',
    university: 'Université Datheón',
    viewAllSvc: 'Voir tous les services',
    viewAllSec: 'Voir tous les secteurs',
    schedule: 'Planifier une réunion',
    darkMode: 'Mode Sombre / Clair',
  },
};
