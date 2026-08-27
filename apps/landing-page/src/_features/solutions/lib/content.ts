// _features/solutions/lib/content.ts
import type { Lang } from '@/_shared/types/i18n';

export type SolutionsContent = {
  kicker: string;
  title: string;
  subtitle: string;
  backLabel: string;
  subOptionsPrompt: string;
  generateLabel: string;
  loadingLabel: string;
  errorLabel: string;
  retryLabel: string;
  resultTitle: string;
  resetLabel: string;
};

export const content: Record<Lang, SolutionsContent> = {
  es: {
    kicker: 'TU SOLUCIÓN',
    title: '¿QUÉ QUIERES HACER POSIBLE?',
    subtitle: 'Cuéntanos qué quieres transformar. Nosotros encontramos la tecnología para hacerlo realidad.',
    backLabel: '← Volver',
    subOptionsPrompt: '¿Qué quieres conseguir?',
    generateLabel: 'Explorar soluciones →',
    loadingLabel: 'Diseñando tu arquitectura…',
    errorLabel: 'No pudimos generar la arquitectura. Intenta de nuevo.',
    retryLabel: 'Reintentar',
    resultTitle: 'Así podría verse tu solución',
    resetLabel: 'Empezar de nuevo',
  },
  en: {
    kicker: 'YOUR SOLUTION',
    title: 'WHAT DO YOU WANT TO MAKE POSSIBLE?',
    subtitle: 'Tell us what you want to transform. We find the technology to make it real.',
    backLabel: '← Back',
    subOptionsPrompt: 'What do you want to achieve?',
    generateLabel: 'Explore solutions →',
    loadingLabel: 'Designing your architecture…',
    errorLabel: "We couldn't generate the architecture. Try again.",
    retryLabel: 'Retry',
    resultTitle: 'This is what your solution could look like',
    resetLabel: 'Start over',
  },
  fr: {
    kicker: 'VOTRE SOLUTION',
    title: 'QUE VOULEZ-VOUS RENDRE POSSIBLE ?',
    subtitle: 'Dites-nous ce que vous voulez transformer. Nous trouvons la technologie pour le concrétiser.',
    backLabel: '← Retour',
    subOptionsPrompt: 'Que voulez-vous accomplir ?',
    generateLabel: 'Explorer les solutions →',
    loadingLabel: 'Conception de votre architecture…',
    errorLabel: "Impossible de générer l'architecture. Réessayez.",
    retryLabel: 'Réessayer',
    resultTitle: 'Voici à quoi pourrait ressembler votre solution',
    resetLabel: 'Recommencer',
  },
};
