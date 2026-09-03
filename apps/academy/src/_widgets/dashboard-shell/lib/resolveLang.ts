import type { Lang } from '@datheon/i18n';

export function resolveLangShell(lang: string): Lang {
  return (['es', 'en', 'fr'].includes(lang) ? lang : 'es') as Lang;
}
