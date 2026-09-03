// _features/academy-teaser/lib/content.ts
import type { Lang } from '@/_shared/types/i18n';

export type AcademyTeaserContent = {
  kicker: string;
  titleLine1: string;
  titleLine2Lead: string;
  titleLine2Accent: string;
  subtitle: string;
  highlights: string[];
  cta: string;
};

export const content: Record<Lang, AcademyTeaserContent> = {
  es: {
    kicker: 'DATHEÓN ACADEMY',
    titleLine1: 'TAMBIÉN FORMAMOS',
    titleLine2Lead: 'A QUIEN QUIERE ',
    titleLine2Accent: 'CONSTRUIR',
    subtitle: 'Una academia sin fines de lucro para aprender tecnología real, construyendo proyectos de verdad — guiado por IA y mentores.',
    highlights: ['Proyectos reales, no ejercicios', 'Mentoría de IA, no solo videos', 'Sin fines de lucro'],
    cta: 'Explora Datheón Academy →',
  },
  en: {
    kicker: 'DATHEÓN ACADEMY',
    titleLine1: 'WE ALSO TRAIN',
    titleLine2Lead: 'THOSE WHO WANT TO ',
    titleLine2Accent: 'BUILD',
    subtitle: 'A nonprofit academy to learn real technology, building real projects — guided by AI and mentors.',
    highlights: ['Real projects, not exercises', 'AI mentorship, not just videos', 'Nonprofit'],
    cta: 'Explore Datheón Academy →',
  },
  fr: {
    kicker: 'DATHEÓN ACADEMY',
    titleLine1: 'NOUS FORMONS AUSSI',
    titleLine2Lead: 'CEUX QUI VEULENT ',
    titleLine2Accent: 'CONSTRUIRE',
    subtitle: "Une académie à but non lucratif pour apprendre de vraies technologies, en construisant de vrais projets — guidé par l'IA et des mentors.",
    highlights: ['De vrais projets, pas des exercices', "Mentorat par l'IA, pas seulement des vidéos", 'À but non lucratif'],
    cta: 'Découvrez Datheón Academy →',
  },
};
