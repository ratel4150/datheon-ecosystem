import type { Locale } from '@/_shared/types/i18n';
import { routeMap, defaultRoute } from '@/_shared/config/routes';
import { getInternalSlug, setLanguagePreference } from '../lib/language-switcher.utils';

export function translatePath(pathname: string, targetLang: Locale): string {
  const parts = pathname.split('/').filter(Boolean);
  const currentLang = parts[0] as Locale || 'es';
  const rest = parts.slice(2);

  const internalSlug = getInternalSlug(pathname);
  const targetSlug = routeMap[internalSlug]?.[targetLang] || defaultRoute;

  return ['', targetLang, targetSlug, ...rest].join('/');
}

export function changeLanguage(
  lang: Locale,
  currentPath: string,
  navigate?: (path: string) => void
): void {
  const newPath = translatePath(currentPath, lang);
  setLanguagePreference(lang);
  if (navigate) {
    navigate(newPath);
  } else {
    window.location.href = newPath;
  }
}
