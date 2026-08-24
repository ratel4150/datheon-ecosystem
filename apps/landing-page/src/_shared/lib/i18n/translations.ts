// File: apps/landing-page/src/_shared/lib/i18n/translations.ts
import type { Translations } from '@/types/i18n';

export const translations: Record<string, Translations> = {
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
};

export const defaultLocale = 'es';

export function getTranslation(lang: string): Translations {
  return translations[lang] || translations[defaultLocale];
}