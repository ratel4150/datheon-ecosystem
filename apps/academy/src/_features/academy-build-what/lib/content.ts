import type { Lang } from '@datheon/i18n';

export type BuildWhatContent = {
  kicker: string; title: string; subtitle: string; selectedNote: string; continueLabel: string;
};

export const content: Record<Lang, BuildWhatContent> = {
  es: {
    kicker: '¡BIENVENIDO A DATHEÓN ACADEMY!', title: '¿QUÉ QUIERES CONSTRUIR?',
    subtitle: 'No necesitas saber cómo — solo qué. Nosotros te llevamos de ahí a un proyecto real.',
    selectedNote: 'Buena elección — vas a construir uno de verdad, no un ejercicio.', continueLabel: 'Continuar →',
  },
  en: {
    kicker: 'WELCOME TO DATHEÓN ACADEMY!', title: 'WHAT DO YOU WANT TO BUILD?',
    subtitle: "You don't need to know how yet — just what. We'll take you from there to a real project.",
    selectedNote: "Good choice — you'll build a real one, not an exercise.", continueLabel: 'Continue →',
  },
  fr: {
    kicker: 'BIENVENUE CHEZ DATHEÓN ACADEMY !', title: 'QUE VOULEZ-VOUS CONSTRUIRE ?',
    subtitle: "Vous n'avez pas besoin de savoir comment — juste quoi. Nous vous emmenons vers un vrai projet.",
    selectedNote: 'Bon choix — vous allez construire un vrai projet, pas un exercice.', continueLabel: 'Continuer →',
  },
};
