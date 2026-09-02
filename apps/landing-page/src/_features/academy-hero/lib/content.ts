// _features/academy-hero/lib/content.ts
import type { Lang } from '@/_shared/types/i18n';

export type AcademyHeroContent = {
  kicker: string;
  kickerSub: string;
  titleLine1: string;
  titleLine2Lead: string;
  titleLine2Accent: string;
  subtitle: string;
  cta1: string;
  cta2: string;
  microcopy: string;
  panelLabel: string;
  panelStatus: string;
};

export const content: Record<Lang, AcademyHeroContent> = {
  es: {
    kicker: 'DATHEÓN ACADEMY',
    kickerSub: 'ACADEMIA SIN FINES DE LUCRO',
    titleLine1: 'DONDE APRENDER',
    titleLine2Lead: 'ES ',
    titleLine2Accent: 'CONSTRUIR',
    subtitle: 'Aprende tecnología real construyendo proyectos de verdad — guiado por IA y mentores, no viendo videos.',
    cta1: 'Empieza a construir →',
    cta2: 'Ver el mapa tecnológico →',
    microcopy: 'Gratis para empezar · Algunos cursos avanzados podrán tener costo',
    panelLabel: 'TU RUTA DE APRENDIZAJE',
    panelStatus: 'EN VIVO',
  },
  en: {
    kicker: 'DATHEÓN ACADEMY',
    kickerSub: 'NONPROFIT ACADEMY',
    titleLine1: 'WHERE LEARNING',
    titleLine2Lead: 'IS ',
    titleLine2Accent: 'BUILDING',
    subtitle: 'Learn real technology by building real projects — guided by AI and mentors, not watching videos.',
    cta1: 'Start building →',
    cta2: 'View the technology map →',
    microcopy: 'Free to start · Some advanced courses may have a cost',
    panelLabel: 'YOUR LEARNING PATH',
    panelStatus: 'LIVE',
  },
  fr: {
    kicker: 'DATHEÓN ACADEMY',
    kickerSub: 'ACADÉMIE À BUT NON LUCRATIF',
    titleLine1: 'APPRENDRE, C\'EST',
    titleLine2Lead: '',
    titleLine2Accent: 'CONSTRUIRE',
    subtitle: 'Apprenez de vraies technologies en construisant de vrais projets — guidé par l\'IA et des mentors, pas des vidéos.',
    cta1: 'Commencer à construire →',
    cta2: 'Voir la carte technologique →',
    microcopy: 'Gratuit pour commencer · Certains cours avancés pourraient avoir un coût',
    panelLabel: "VOTRE PARCOURS D'APPRENTISSAGE",
    panelStatus: 'EN DIRECT',
  },
};
