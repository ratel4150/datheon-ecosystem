// _features/software-engineering/lib/content.ts
import type { Lang } from '@/_shared/types/i18n';

export type SoftwareEngineeringContent = {
  kicker: string;
  titleLine1: string;
  titleLine2Lead: string;
  titleLine2Accent: string;
  subtitle: string;
  scrollHint: string;
  closingHeadline: string;
  closingCta: string;
};

export const content: Record<Lang, SoftwareEngineeringContent> = {
  es: {
    kicker: 'INGENIERÍA DE SOFTWARE',
    titleLine1: 'CONSTRUIMOS SISTEMAS,',
    titleLine2Lead: 'NO SOLO ',
    titleLine2Accent: 'CÓDIGO',
    subtitle: 'Desplázate y mira cómo un punto se convierte en un sistema real.',
    scrollHint: 'Sigue bajando ↓',
    closingHeadline: 'ASÍ CONSTRUIMOS EN DATHEÓN.',
    closingCta: 'HABLEMOS DE TU SISTEMA →',
  },
  en: {
    kicker: 'SOFTWARE ENGINEERING',
    titleLine1: 'WE BUILD SYSTEMS,',
    titleLine2Lead: 'NOT JUST ',
    titleLine2Accent: 'CODE',
    subtitle: 'Scroll and watch a single point become a real system.',
    scrollHint: 'Keep scrolling ↓',
    closingHeadline: 'THIS IS HOW WE BUILD AT DATHEÓN.',
    closingCta: "LET'S TALK ABOUT YOUR SYSTEM →",
  },
  fr: {
    kicker: 'INGÉNIERIE LOGICIELLE',
    titleLine1: 'NOUS CONSTRUISONS DES SYSTÈMES,',
    titleLine2Lead: 'PAS SEULEMENT DU ',
    titleLine2Accent: 'CODE',
    subtitle: "Faites défiler et regardez un point devenir un vrai système.",
    scrollHint: 'Continuez à défiler ↓',
    closingHeadline: 'VOICI COMMENT NOUS CONSTRUISONS CHEZ DATHEÓN.',
    closingCta: 'PARLONS DE VOTRE SYSTÈME →',
  },
};
