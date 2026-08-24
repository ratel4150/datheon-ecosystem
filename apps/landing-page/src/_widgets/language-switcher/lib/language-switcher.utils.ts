// _widgets/language-switcher/lib/language-switcher.utils.ts
import type { Locale } from '@/_shared/types/i18n';

export const internalToSlug: Record<string, Record<Locale, string>> = {
  nosotros:    { es: 'nosotros',    en: 'about',           fr: 'a-propos'        },
  contact:     { es: 'contacto',    en: 'contact',         fr: 'contact'         },
  privacy:     { es: 'privacidad',  en: 'privacy',         fr: 'confidentialite' },
  servicios:   { es: 'servicios',   en: 'services',        fr: 'services'        },
  sectores:    { es: 'sectores',    en: 'sectors',         fr: 'secteurs'        },
  universidad: { es: 'universidad', en: 'university',      fr: 'universite'      },
  landing:     { es: 'landing',     en: 'landing',         fr: 'landing'         },
};

export const slugToInternal: Record<string, string> = {};
Object.entries(internalToSlug).forEach(([internal, langs]) => {
  Object.values(langs).forEach(slug => { slugToInternal[slug] = internal });
});
