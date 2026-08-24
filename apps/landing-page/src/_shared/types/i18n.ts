// File: apps/landing-page/src/_shared/types/i18n.ts
export type Locale = 'es' | 'en';

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
    fr: string;
  };
}

export interface I18nProps {
  lang: Locale;
  t: Translations;
}