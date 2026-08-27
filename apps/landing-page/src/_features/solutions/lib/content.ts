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
  loadingSubLabel: string;
  errorLabel: string;
  retryLabel: string;
  resultTitle: string;
  resetLabel: string;
  liveNote: string;
  statsBlocksWord: string;
  statsLevelsWord: string;
  statsCategoriesWord: string;
  legendTitle: string;
  legendCommand: string;
  legendContainer: string;
  legendValue: string;
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
    loadingSubLabel: 'Un modelo de IA está eligiendo los bloques ahora mismo',
    errorLabel: 'No pudimos generar la arquitectura. Intenta de nuevo.',
    retryLabel: 'Reintentar',
    resultTitle: 'Así podría verse tu solución',
    resetLabel: 'Empezar de nuevo',
    liveNote: 'Generado en vivo por IA a partir de tu elección — cambia de opción para ver otra arquitectura distinta.',
    statsBlocksWord: 'bloques',
    statsLevelsWord: 'niveles',
    statsCategoriesWord: 'categorías',
    legendTitle: 'Cómo leer el diagrama',
    legendCommand: 'Comando — un paso en el flujo',
    legendContainer: 'Contenedor — agrupa otros bloques',
    legendValue: 'Dato — se conecta como recurso',
  },
  en: {
    kicker: 'YOUR SOLUTION',
    title: 'WHAT DO YOU WANT TO MAKE POSSIBLE?',
    subtitle: 'Tell us what you want to transform. We find the technology to make it real.',
    backLabel: '← Back',
    subOptionsPrompt: 'What do you want to achieve?',
    generateLabel: 'Explore solutions →',
    loadingLabel: 'Designing your architecture…',
    loadingSubLabel: 'An AI model is picking the blocks right now',
    errorLabel: "We couldn't generate the architecture. Try again.",
    retryLabel: 'Retry',
    resultTitle: 'This is what your solution could look like',
    resetLabel: 'Start over',
    liveNote: 'Generated live by AI from your choice — pick a different option to see another architecture.',
    statsBlocksWord: 'blocks',
    statsLevelsWord: 'levels',
    statsCategoriesWord: 'categories',
    legendTitle: 'How to read the diagram',
    legendCommand: 'Command — a step in the flow',
    legendContainer: 'Container — groups other blocks',
    legendValue: 'Data — connects as a resource',
  },
  fr: {
    kicker: 'VOTRE SOLUTION',
    title: 'QUE VOULEZ-VOUS RENDRE POSSIBLE ?',
    subtitle: 'Dites-nous ce que vous voulez transformer. Nous trouvons la technologie pour le concrétiser.',
    backLabel: '← Retour',
    subOptionsPrompt: 'Que voulez-vous accomplir ?',
    generateLabel: 'Explorer les solutions →',
    loadingLabel: 'Conception de votre architecture…',
    loadingSubLabel: "Un modèle d'IA choisit les blocs en ce moment",
    errorLabel: "Impossible de générer l'architecture. Réessayez.",
    retryLabel: 'Réessayer',
    resultTitle: 'Voici à quoi pourrait ressembler votre solution',
    resetLabel: 'Recommencer',
    liveNote: "Généré en direct par l'IA à partir de votre choix — changez d'option pour voir une autre architecture.",
    statsBlocksWord: 'blocs',
    statsLevelsWord: 'niveaux',
    statsCategoriesWord: 'catégories',
    legendTitle: 'Comment lire le diagramme',
    legendCommand: 'Commande — une étape du flux',
    legendContainer: 'Conteneur — regroupe d\'autres blocs',
    legendValue: 'Donnée — se connecte comme ressource',
  },
};
