// File: apps/landing-page/src/_shared/lib/seo/seoConfig.ts
// _shared/lib/seo/seoConfig.ts

// TODO: reemplaza por el dominio real de producción antes de publicar.
export const SITE_URL = 'https://www.datheon.io';

export const SUPPORTED_LANGS = ['es', 'en', 'fr'] as const;
export const DEFAULT_LANG = 'es';

export interface PageMeta {
  title: string;
  description: string;
}

type PageId = 'landing' | 'universidad';
type Lang = (typeof SUPPORTED_LANGS)[number];

// File: apps/landing-page/src/_shared/lib/seo/seoConfig.ts
// reemplaza el objeto PAGE_META completo por este:

export const PAGE_META: Record<PageId, Record<Lang, PageMeta>> = {
  landing: {
    es: {
      title: 'Datheón — Ingeniería de software e IA reales', // 46 caracteres
      description: 'Datheón diseña y construye sistemas de software reales: software, IA, agentes, cloud e IoT. Un solo socio de ingeniería.', // 120 caracteres
    },
    en: {
      title: 'Datheón — Real Software Engineering & AI', // 42 caracteres
      description: 'Datheón designs and builds real software systems: software, AI, agents, cloud and IoT. One engineering partner.', // 114 caracteres
    },
    fr: {
      title: 'Datheón — Ingénierie logicielle et IA', // 38 caracteres
      description: 'Datheón conçoit et construit de vrais systèmes : logiciel, IA, agents, cloud et IoT. Un seul partenaire d\'ingénierie.', // 118 caracteres
    },
  },
  universidad: {
    es: {
      title: 'Datheón Academy — Aprende construyendo', // 40 caracteres
      description: 'Academia sin fines de lucro de Datheón: aprende software e IA construyendo proyectos reales, con mentoría de IA.', // 114 caracteres
    },
    en: {
      title: 'Datheón Academy — Learn by Building', // 37 caracteres
      description: "Datheón's nonprofit academy: learn real software, AI and systems, guided by mentors and AI, building real projects.", // 116 caracteres
    },
    fr: {
      title: 'Datheón Academy — Apprendre en construisant', // 45 caracteres
      description: 'Académie à but non lucratif de Datheón : apprenez le logiciel et l\'IA en construisant de vrais projets, avec des mentors.', // 123 caracteres
    },
  },
};