// _features/technology-ecosystem/lib/content.ts
import type { Lang } from '@/_shared/types/i18n';

export const content: Record<Lang, {
  kicker: string;
  title: string;
  subheadline: string;
  allLabel: string;
  trustLine: string;
  enterpriseKicker: string;
  enterpriseCopy: string;
  tagline: string;
  cta: string;
  spotlightKicker: string;
  spotlightTitle: string;
  spotlightPanelLabel: string;
  spotlightStatus: string;
}> = {
  es: {
    kicker: 'TECHNOLOGY ECOSYSTEM',
    title: 'Construimos sobre el ecosistema tecnológico que tu empresa ya utiliza.',
    subheadline: 'Integramos plataformas, infraestructura y tecnologías líderes para construir soluciones que se adaptan a tu operación, no al revés.',
    allLabel: 'TODAS',
    trustLine: 'Tecnología abierta. Arquitecturas flexibles. Sin vendor lock-in innecesario.',
    enterpriseKicker: 'TU STACK + NUESTRAS CAPACIDADES',
    enterpriseCopy: 'No importa si tu infraestructura es moderna, híbrida o legacy. Diseñamos integraciones que permiten evolucionar tu ecosistema sin reconstruirlo desde cero.',
    tagline: 'Conectamos lo que ya tienes. Construimos lo que necesitas.',
    cta: 'Explorar capacidades',
    spotlightKicker: 'INTEGRATIONS',
    spotlightTitle: 'Conecta lo que tu negocio ya usa.',
    spotlightPanelLabel: 'Mapa de integración',
    spotlightStatus: 'operativo',
  },
  en: {
    kicker: 'TECHNOLOGY ECOSYSTEM',
    title: 'We build on the technology ecosystem your company already uses.',
    subheadline: 'We integrate leading platforms, infrastructure, and technologies to build solutions that adapt to your operation — not the other way around.',
    allLabel: 'ALL',
    trustLine: 'Open technology. Flexible architectures. No unnecessary vendor lock-in.',
    enterpriseKicker: 'YOUR STACK + OUR CAPABILITIES',
    enterpriseCopy: "It doesn't matter if your infrastructure is modern, hybrid, or legacy. We design integrations that let your ecosystem evolve without rebuilding it from scratch.",
    tagline: 'We connect what you already have. We build what you need.',
    cta: 'Explore our capabilities',
    spotlightKicker: 'INTEGRATIONS',
    spotlightTitle: 'Connect what your business already uses.',
    spotlightPanelLabel: 'Integration map',
    spotlightStatus: 'operational',
  },
  fr: {
    kicker: 'TECHNOLOGY ECOSYSTEM',
    title: "Nous construisons sur l'écosystème technologique que votre entreprise utilise déjà.",
    subheadline: "Nous intégrons des plateformes, une infrastructure et des technologies de pointe pour construire des solutions qui s'adaptent à votre activité, pas l'inverse.",
    allLabel: 'TOUTES',
    trustLine: 'Technologie ouverte. Architectures flexibles. Sans dépendance excessive à un fournisseur.',
    enterpriseKicker: 'VOTRE STACK + NOS CAPACITÉS',
    enterpriseCopy: "Peu importe que votre infrastructure soit moderne, hybride ou existante. Nous concevons des intégrations qui permettent à votre écosystème d'évoluer sans tout reconstruire.",
    tagline: 'Nous connectons ce que vous avez déjà. Nous construisons ce dont vous avez besoin.',
    cta: 'Explorer nos capacités',
    spotlightKicker: 'INTEGRATIONS',
    spotlightTitle: 'Connectez ce que votre entreprise utilise déjà.',
    spotlightPanelLabel: "Carte d'intégration",
    spotlightStatus: 'opérationnel',
  },
};
