// _features/stage/lib/content.ts
import type { Lang } from '@/_shared/types/i18n';

export type StageContent = {
  kicker: string;
  title: string;
  subtitle: string;
  forWhomLabel: string;
  techLabel: string;
  goalsPrompt: string;
  ctaLabel: string;
  ctaContextPrefix: string;
  selectHint: string;
};

export const content: Record<Lang, StageContent> = {
  es: {
    kicker: 'TU ETAPA',
    title: '¿EN QUÉ ETAPA ESTÁ TU EMPRESA?',
    subtitle: 'La tecnología correcta depende de dónde estás y hacia dónde quieres llegar.',
    forWhomLabel: 'Es para ti si',
    techLabel: 'Lo que normalmente construimos aquí',
    goalsPrompt: '¿Qué quieres lograr?',
    ctaLabel: 'Hablar con alguien que entiende mi etapa →',
    ctaContextPrefix: 'Quiero:',
    selectHint: 'Elige una etapa para ver qué tecnología emerge de ahí.',
  },
  en: {
    kicker: 'YOUR STAGE',
    title: 'WHAT STAGE IS YOUR COMPANY AT?',
    subtitle: 'The right technology depends on where you are and where you want to go.',
    forWhomLabel: "It's for you if",
    techLabel: 'What we typically build here',
    goalsPrompt: 'What do you want to achieve?',
    ctaLabel: 'Talk to someone who understands my stage →',
    ctaContextPrefix: 'I want to:',
    selectHint: 'Pick a stage to see what technology emerges from it.',
  },
  fr: {
    kicker: 'VOTRE ÉTAPE',
    title: 'À QUELLE ÉTAPE EST VOTRE ENTREPRISE ?',
    subtitle: 'La bonne technologie dépend d\'où vous êtes et où vous voulez aller.',
    forWhomLabel: "C'est pour vous si",
    techLabel: 'Ce que nous construisons généralement ici',
    goalsPrompt: 'Que voulez-vous accomplir ?',
    ctaLabel: 'Parler à quelqu\'un qui comprend mon étape →',
    ctaContextPrefix: 'Je veux :',
    selectHint: 'Choisissez une étape pour voir quelle technologie en émerge.',
  },
};
