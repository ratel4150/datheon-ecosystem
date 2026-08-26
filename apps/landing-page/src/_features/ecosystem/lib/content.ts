// _features/ecosystem/lib/content.ts
import type { Lang } from '@/_shared/types/i18n';

export const content: Record<Lang, { kicker: string; title: string; subtitle: string; cta: string; connectsWith: string }> = {
  es: {
    kicker: 'TECHNOLOGY ECOSYSTEM',
    title: 'ONE ECOSYSTEM.',
    subtitle: 'Software, inteligencia, infraestructura y el mundo físico — conectados.',
    cta: 'Explorar el ecosistema',
    connectsWith: 'conecta con',
  },
  en: {
    kicker: 'TECHNOLOGY ECOSYSTEM',
    title: 'ONE ECOSYSTEM.',
    subtitle: 'Software, intelligence, infrastructure and the physical world — connected.',
    cta: 'Explore the ecosystem',
    connectsWith: 'connects with',
  },
  fr: {
    kicker: 'TECHNOLOGY ECOSYSTEM',
    title: 'ONE ECOSYSTEM.',
    subtitle: 'Logiciel, intelligence, infrastructure et le monde physique — connectés.',
    cta: "Explorer l'écosystème",
    connectsWith: 'connecté à',
  },
};
