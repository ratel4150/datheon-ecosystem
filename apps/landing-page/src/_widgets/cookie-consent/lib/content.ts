// _widgets/cookie-consent/lib/content.ts
import type { Lang } from '@/_shared/types/i18n';

export type CookieConsentContent = {
  message: string;
  acceptAll: string;
  rejectAll: string;
  customize: string;
  save: string;
  necessaryLabel: string;
  necessaryDesc: string;
  analyticsLabel: string;
  analyticsDesc: string;
  marketingLabel: string;
  marketingDesc: string;
  privacyLink: string;
};

export const content: Record<Lang, CookieConsentContent> = {
  es: {
    message: 'Usamos cookies para mejorar tu experiencia y entender cómo se usa el sitio. Puedes aceptarlas todas, rechazarlas, o elegir cuáles.',
    acceptAll: 'Aceptar todo',
    rejectAll: 'Rechazar todo',
    customize: 'Personalizar',
    save: 'Guardar preferencias',
    necessaryLabel: 'Necesarias',
    necessaryDesc: 'Siempre activas — hacen que el sitio funcione (tema, idioma).',
    analyticsLabel: 'Analítica',
    analyticsDesc: 'Nos ayuda a entender cómo se usa el sitio (Google Analytics, Microsoft Clarity).',
    marketingLabel: 'Marketing',
    marketingDesc: 'Mide la efectividad de nuestros anuncios (Meta, Google Ads).',
    privacyLink: 'Política de privacidad',
  },
  en: {
    message: 'We use cookies to improve your experience and understand how the site is used. You can accept all, reject all, or choose which ones.',
    acceptAll: 'Accept all',
    rejectAll: 'Reject all',
    customize: 'Customize',
    save: 'Save preferences',
    necessaryLabel: 'Necessary',
    necessaryDesc: 'Always active — make the site work (theme, language).',
    analyticsLabel: 'Analytics',
    analyticsDesc: 'Helps us understand how the site is used (Google Analytics, Microsoft Clarity).',
    marketingLabel: 'Marketing',
    marketingDesc: 'Measures the effectiveness of our ads (Meta, Google Ads).',
    privacyLink: 'Privacy policy',
  },
  fr: {
    message: "Nous utilisons des cookies pour améliorer votre expérience et comprendre l'utilisation du site. Vous pouvez tout accepter, tout refuser, ou choisir.",
    acceptAll: 'Tout accepter',
    rejectAll: 'Tout refuser',
    customize: 'Personnaliser',
    save: 'Enregistrer les préférences',
    necessaryLabel: 'Nécessaires',
    necessaryDesc: 'Toujours actives — font fonctionner le site (thème, langue).',
    analyticsLabel: 'Analytique',
    analyticsDesc: "Nous aide à comprendre l'utilisation du site (Google Analytics, Microsoft Clarity).",
    marketingLabel: 'Marketing',
    marketingDesc: 'Mesure l\'efficacité de nos publicités (Meta, Google Ads).',
    privacyLink: 'Politique de confidentialité',
  },
};
