// _features/legal/lib/content.ts
import type { Lang } from '@/_shared/types/i18n';

export type LegalChromeContent = {
  lastUpdatedLabel: string;
  backLabel: string;
};

export const chrome: Record<Lang, LegalChromeContent> = {
  es: { lastUpdatedLabel: 'Última actualización', backLabel: '← Volver al inicio' },
  en: { lastUpdatedLabel: 'Last updated', backLabel: '← Back to home' },
  fr: { lastUpdatedLabel: 'Dernière mise à jour', backLabel: "← Retour à l'accueil" },
};
