import type { Locale } from '../types/i18n';

export const routeMap: Record<string, Record<Locale, string>> = {
  nosotros:    { es: 'nosotros',    en: 'about',           fr: 'a-propos'        },
  contact:     { es: 'contacto',    en: 'contact',         fr: 'contact'         },
  privacy:     { es: 'privacidad',  en: 'privacy',         fr: 'confidentialite' },
  servicios:   { es: 'servicios',   en: 'services',        fr: 'services'        },
  sectores:    { es: 'sectores',    en: 'sectors',         fr: 'secteurs'        },
  universidad: { es: 'universidad', en: 'university',      fr: 'universite'      },
  landing:     { es: 'landing',     en: 'landing',         fr: 'landing'         },
};

export const defaultRoute = 'landing';
