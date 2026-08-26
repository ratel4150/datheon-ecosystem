// _features/ecosystem/lib/content.ts
import type { Lang } from '@/_shared/types/i18n';

export const content: Record
  Lang,
  {
    kicker: string;
    kickerSub: string;
    title: string;
    subtitle: string;
    cta: string;
    connectsWith: string;
    panelLabel: string;
    nodesWord: string;
    connectionsWord: string;
  }
> = {
  es: {
    kicker: 'TECHNOLOGY ECOSYSTEM',
    kickerSub: 'AI ENGINEERING PLATFORM',
    title: 'ONE ECOSYSTEM.',
    subtitle: 'Software, inteligencia, infraestructura y el mundo físico — conectados.',
    cta: 'Explorar el ecosistema',
    connectsWith: 'conecta con',
    panelLabel: 'MAPA DEL ECOSISTEMA',
    nodesWord: 'nodos',
    connectionsWord: 'conexiones',
  },
  en: {
    kicker: 'TECHNOLOGY ECOSYSTEM',
    kickerSub: 'AI ENGINEERING PLATFORM',
    title: 'ONE ECOSYSTEM.',
    subtitle: 'Software, intelligence, infrastructure and the physical world — connected.',
    cta: 'Explore the ecosystem',
    connectsWith: 'connects with',
    panelLabel: 'ECOSYSTEM MAP',
    nodesWord: 'nodes',
    connectionsWord: 'connections',
  },
  fr: {
    kicker: 'TECHNOLOGY ECOSYSTEM',
    kickerSub: 'AI ENGINEERING PLATFORM',
    title: 'ONE ECOSYSTEM.',
    subtitle: 'Logiciel, intelligence, infrastructure et le monde physique — connectés.',
    cta: "Explorer l'écosystème",
    connectsWith: 'connecté à',
    panelLabel: "CARTE DE L'ÉCOSYSTÈME",
    nodesWord: 'nœuds',
    connectionsWord: 'connexions',
  },
};
