// _features/hero/lib/content.ts
import type { Lang } from '@/_shared/types/i18n';

export const content: Record<Lang, {
  kicker: string;
  kickerSub: string;
  titleLine1: string;
  titleLine2Lead: string;
  titleLine2Accent: string;
  subheadline: string;
  segments: string[];
  cta1: string;
  cta2: string;
  microcopy: string;
  panelLabel: string;
  panelStatus: string;
  tagline: string;
  stackLine: string;
}> = {
  es: {
    kicker: 'DATHEÓN',
    kickerSub: 'TECHNOLOGY · AI · ENGINEERING',
    titleLine1: 'Construimos tecnología.',
    titleLine2Lead: 'Desde el código hasta ',
    titleLine2Accent: 'la inteligencia.',
    subheadline: 'Diseñamos software, IA, infraestructura e integraciones que conectan tu negocio, tus datos y el mundo físico.',
    segments: ['Startups', 'PyME', 'Mid-Market', 'Enterprise'],
    cta1: 'Cuéntanos qué quieres construir',
    cta2: 'Explorar capacidades',
    microcopy: 'Desde una aplicación hasta una infraestructura completa de IA.',
    panelLabel: 'Arquitectura de capacidades',
    panelStatus: 'operativo',
    tagline: 'Una empresa. Todo el stack tecnológico.',
    stackLine: 'Software · AI · Data · Cloud · IoT · Hardware · Integrations',
  },
  en: {
    kicker: 'DATHEÓN',
    kickerSub: 'TECHNOLOGY · AI · ENGINEERING',
    titleLine1: 'We build technology.',
    titleLine2Lead: 'From code to ',
    titleLine2Accent: 'intelligence.',
    subheadline: 'We design software, AI, infrastructure, and integrations that connect your business, your data, and the physical world.',
    segments: ['Startups', 'SMBs', 'Mid-Market', 'Enterprise'],
    cta1: 'Tell us what you want to build',
    cta2: 'Explore our capabilities',
    microcopy: 'From a single app to a complete AI infrastructure.',
    panelLabel: 'Capability architecture',
    panelStatus: 'operational',
    tagline: 'One company. The entire technology stack.',
    stackLine: 'Software · AI · Data · Cloud · IoT · Hardware · Integrations',
  },
  fr: {
    kicker: 'DATHEÓN',
    kickerSub: 'TECHNOLOGY · AI · ENGINEERING',
    titleLine1: 'Nous construisons la technologie.',
    titleLine2Lead: "Du code jusqu'à ",
    titleLine2Accent: "l'intelligence.",
    subheadline: 'Nous concevons logiciels, IA, infrastructure et intégrations qui connectent votre entreprise, vos données et le monde physique.',
    segments: ['Startups', 'PME', 'Mid-Market', 'Enterprise'],
    cta1: 'Dites-nous ce que vous voulez construire',
    cta2: 'Explorer nos capacités',
    microcopy: "D'une application unique à une infrastructure IA complète.",
    panelLabel: 'Architecture des capacités',
    panelStatus: 'opérationnel',
    tagline: 'Une entreprise. Toute la pile technologique.',
    stackLine: 'Software · AI · Data · Cloud · IoT · Hardware · Integrations',
  },
};
