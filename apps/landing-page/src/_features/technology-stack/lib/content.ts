// _features/technology-stack/lib/content.ts
import type { Lang } from '@/_shared/types/i18n';

export type TechnologyStackContent = {
  kicker: string;
  title: string;
  subtitle: string;
  body: string;
  exploreLabel: string;
  traceLabel: string;
  traceHint: string;
  closingHeadline: string;
  closingCta: string;
  hudTechCountWord: string;
};

export const content: Record<Lang, TechnologyStackContent> = {
  es: {
    kicker: 'STACK TECNOLÓGICO',
    title: 'STACK TECNOLÓGICO DATHEÓN',
    subtitle: 'De la interfaz a la infraestructura.',
    body: 'Un solo socio de ingeniería a través de todo el stack tecnológico.',
    exploreLabel: 'EXPLORAR EL STACK →',
    traceLabel: 'RASTREAR EN EL STACK',
    traceHint: 'Selecciona una tecnología para ver con qué otras capas se relaciona.',
    closingHeadline: 'UN STACK. MUCHAS POSIBILIDADES.',
    closingCta: 'EXPLORA LO QUE CONSTRUIMOS →',
    hudTechCountWord: 'TECNOLOGÍAS',
  },
  en: {
    kicker: 'TECHNOLOGY STACK',
    title: 'DATHEÓN TECHNOLOGY STACK',
    subtitle: 'From interface to infrastructure.',
    body: 'One engineering partner across the entire technology stack.',
    exploreLabel: 'EXPLORE THE STACK →',
    traceLabel: 'TRACE THE STACK',
    traceHint: 'Select a technology to see which other layers it relates to.',
    closingHeadline: 'ONE STACK. MANY POSSIBILITIES.',
    closingCta: 'EXPLORE WHAT WE BUILD →',
    hudTechCountWord: 'TECHNOLOGIES',
  },
  fr: {
    kicker: 'STACK TECHNOLOGIQUE',
    title: 'STACK TECHNOLOGIQUE DATHEÓN',
    subtitle: "De l'interface à l'infrastructure.",
    body: "Un seul partenaire d'ingénierie à travers toute la stack technologique.",
    exploreLabel: 'EXPLORER LA STACK →',
    traceLabel: 'TRACER DANS LA STACK',
    traceHint: 'Sélectionnez une technologie pour voir à quelles autres couches elle se rapporte.',
    closingHeadline: 'UNE STACK. UNE MULTITUDE DE POSSIBILITÉS.',
    closingCta: 'DÉCOUVREZ CE QUE NOUS CONSTRUISONS →',
    hudTechCountWord: 'TECHNOLOGIES',
  },
};
