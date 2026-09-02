import type { Locale } from '@/_shared/types/i18n';
import { routeMap, defaultRoute } from '@/_shared/config/routes';

// Construir mapa inverso (slug → internal)
export const slugToInternal: Record<string, string> = {};
Object.entries(routeMap).forEach(([internal, langs]) => {
  Object.values(langs).forEach(slug => { slugToInternal[slug] = internal; });
});

// Persistencia en localStorage
export const setLanguagePreference = (lang: Locale): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('preferred-language', lang);
  }
};

export const getLanguagePreference = (): Locale | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('preferred-language') as Locale | null;
  }
  return null;
};

// Obtener el slug interno desde la ruta actual
export const getInternalSlug = (pathname: string): string => {
  const parts = pathname.split('/').filter(Boolean);
  const visibleSlug = parts[1] || defaultRoute;
  return slugToInternal[visibleSlug] || visibleSlug;
};
