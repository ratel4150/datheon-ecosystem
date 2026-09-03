// File: apps/landing-page/src/_shared/lib/i18n/translations.ts
import type { Translations, Locale } from '../../types/i18n';

export const translations: Record<Locale, Translations> = {
  es: {
    nav: {
      platform: 'Plataforma',
      academy: 'Academy',
      casebook: 'Casebook',
      pricing: 'Precios',
      blog: 'Blog',
      contact: 'Contacto',
    },
    hero: {
      title: 'Aprende con',
      titleHighlight: 'Inteligencia Artificial',
      description: 'Datheon Academy te prepara para el futuro con cursos interactivos, mentoría personalizada y herramientas impulsadas por IA.',
      ctaPrimary: 'Comenzar Gratis',
      ctaSecondary: 'Ver Demo',
      stats: {
        students: 'Estudiantes',
        courses: 'Cursos',
        satisfaction: 'Satisfacción',
      },
    },
    auth: {
      login: 'Iniciar Sesión',
      register: 'Registrarse',
    },
    language: {
      es: 'Español',
      en: 'English',
    },
  },
  en: {
    nav: {
      platform: 'Platform',
      academy: 'Academy',
      casebook: 'Casebook',
      pricing: 'Pricing',
      blog: 'Blog',
      contact: 'Contact',
    },
    hero: {
      title: 'Learn with',
      titleHighlight: 'Artificial Intelligence',
      description: 'Datheon Academy prepares you for the future with interactive courses, personalized mentoring and AI-powered tools.',
      ctaPrimary: 'Get Started Free',
      ctaSecondary: 'View Demo',
      stats: {
        students: 'Students',
        courses: 'Courses',
        satisfaction: 'Satisfaction',
      },
    },
    auth: {
      login: 'Login',
      register: 'Sign Up',
    },
    language: {
      es: 'Spanish',
      en: 'English',
    },
  },
  fr: {
    nav: {
      platform: 'Plateforme',
      academy: 'Académie',
      casebook: 'Casebook',
      pricing: 'Tarifs',
      blog: 'Blog',
      contact: 'Contact',
    },
    hero: {
      title: 'Apprenez avec',
      titleHighlight: 'Intelligence Artificielle',
      description: "L'Académie Datheon vous prépare pour l'avenir avec des cours interactifs, un mentorat personnalisé et des outils alimentés par l'IA.",
      ctaPrimary: 'Commencer Gratuitement',
      ctaSecondary: 'Voir la Démo',
      stats: {
        students: 'Étudiants',
        courses: 'Cours',
        satisfaction: 'Satisfaction',
      },
    },
    auth: {
      login: 'Se connecter',
      register: "S'inscrire",
    },
    language: {
      es: 'Espagnol',
      en: 'Anglais',
    },
  },
};

export const defaultLocale: Locale = 'es';

export const getTranslation = (lang: string): Translations => {
  return translations[lang as Locale] || translations[defaultLocale];
};