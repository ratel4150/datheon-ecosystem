// _widgets/language-switcher/model/language-switcher.model.ts
import type { Locale } from '@/_shared/types/i18n';
import { internalToSlug, slugToInternal } from '../lib/language-switcher.utils';

export function translatePath(pathname: string, targetLang: Locale): string {
  const parts = pathname.split('/').filter(Boolean);
  const visibleSlug = parts[1] || 'landing';
  const rest = parts.slice(2);

  // Buscar slug interno desde el slug visible actual
  const internal = visibleSlug ? (slugToInternal[visibleSlug] ?? visibleSlug) : undefined;

  // Traducir al slug del idioma destino
  const targetSlug = internal && internalToSlug[internal]
    ? internalToSlug[internal][targetLang]
    : internal ?? 'landing';

  return ['', targetLang, targetSlug, ...rest].join('/');
}
