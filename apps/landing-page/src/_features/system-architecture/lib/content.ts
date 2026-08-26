// _features/system-architecture/lib/content.ts
import type { Lang } from '@/_shared/types/i18n';

export const content: Record<Lang, {
  kicker: string;
  title: string;
  subheadline: string;
  microcopy: string;
  imagePanelLabel: string;
  imagePanelStatus: string;
  signalKicker: string;
  enterKicker: string;
  enterTagline: string;
  closingLine1: string;
  closingLine2: string;
  closingLine3: string;
  cta1: string;
  cta2: string;
}> = {
  es: {
    kicker: 'TECHNOLOGY WITHOUT BOUNDARIES',
    title: 'La tecnología moderna no termina en una pantalla.',
    subheadline: 'Conectamos el mundo físico, el software, la inteligencia artificial y la infraestructura para convertir tecnología dispersa en sistemas que trabajan como uno solo.',
    microcopy: 'Desde un sensor hasta una decisión de negocio.',
    imagePanelLabel: 'Arquitectura del sistema',
    imagePanelStatus: 'operativo',
    signalKicker: 'FROM SIGNAL TO ACTION',
    enterKicker: 'ENTER WHERE YOU ARE',
    enterTagline: 'Empieza donde estás. Evoluciona desde ahí.',
    closingLine1: 'Una señal puede convertirse en una decisión.',
    closingLine2: 'Y una decisión, en una acción automática.',
    closingLine3: 'Ahí es donde comienza Datheón.',
    cta1: 'Diseñar mi solución',
    cta2: 'Ver capacidades',
  },
  en: {
    kicker: 'TECHNOLOGY WITHOUT BOUNDARIES',
    title: "Modern technology doesn't end at a screen.",
    subheadline: 'We connect the physical world, software, artificial intelligence, and infrastructure to turn scattered technology into systems that work as one.',
    microcopy: 'From a sensor to a business decision.',
    imagePanelLabel: 'System architecture',
    imagePanelStatus: 'operational',
    signalKicker: 'FROM SIGNAL TO ACTION',
    enterKicker: 'ENTER WHERE YOU ARE',
    enterTagline: 'Start where you are. Evolve from there.',
    closingLine1: 'A signal can become a decision.',
    closingLine2: 'And a decision, an automatic action.',
    closingLine3: "That's where Datheón begins.",
    cta1: 'Design my solution',
    cta2: 'See capabilities',
  },
  fr: {
    kicker: 'TECHNOLOGY WITHOUT BOUNDARIES',
    title: "La technologie moderne ne s'arrête pas à un écran.",
    subheadline: "Nous connectons le monde physique, le logiciel, l'intelligence artificielle et l'infrastructure pour transformer une technologie dispersée en systèmes qui fonctionnent comme un seul.",
    microcopy: "D'un capteur à une décision d'affaires.",
    imagePanelLabel: 'Architecture du système',
    imagePanelStatus: 'opérationnel',
    signalKicker: 'FROM SIGNAL TO ACTION',
    enterKicker: 'ENTER WHERE YOU ARE',
    enterTagline: "Commencez là où vous êtes. Évoluez à partir de là.",
    closingLine1: 'Un signal peut devenir une décision.',
    closingLine2: 'Et une décision, une action automatique.',
    closingLine3: "C'est là que Datheón commence.",
    cta1: 'Concevoir ma solution',
    cta2: 'Voir les capacités',
  },
};
