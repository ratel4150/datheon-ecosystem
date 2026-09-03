// packages/i18n/src/types.ts
export type Locale = 'es' | 'en' | 'fr';

/** Alias de Locale — el resto del código construido en esta sesión
 *  (Solutions, Stage, Technology Stack, Academy Hero...) importa `Lang`,
 *  no `Locale`. Mismo tipo, dos nombres en uso real en el proyecto. */
export type Lang = Locale;

export interface Translations {
  nav: {
    platform: string;
    academy: string;
    casebook: string;
    pricing: string;
    blog: string;
    contact: string;
  };
  hero: {
    title: string;
    titleHighlight: string;
    description: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: {
      students: string;
      courses: string;
      satisfaction: string;
    };
  };
  auth: {
    login: string;
    register: string;
  };
  language: {
    es: string;
    en: string;
  };
}
