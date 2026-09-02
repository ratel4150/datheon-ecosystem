// _widgets/footer/lib/content.ts
import type { Lang } from '@/_shared/types/i18n';

export type FooterContent = {
  tagline: string;
  availabilityLabel: string;
  personalizedTemplate: string;
  ctaHeadline: string;
  ctaButton: string;
  ctaTrustNote: string;
  academyLink: string;
  exploreColumnLabel: string;
  technologyColumnLabel: string;
  connectColumnLabel: string;
  newsletterPlaceholder: string;
  newsletterButton: string;
  newsletterThanks: string;
  newsletterErrorLabel: string;
  systemStatusLabel: string;
  terminalInit: string;
  terminalReady: string;
  backToTopLabel: string;
  copyright: string;
  signature: string;
  privacy: string;
  terms: string;
  cookies: string;
};

export const content: Record<Lang, FooterContent> = {
  es: {
    tagline: 'La tecnología debe moverse contigo.',
    availabilityLabel: 'Disponibles ahora',
    personalizedTemplate: 'Vimos que estás en etapa {stage} — hablemos de eso.',
    ctaHeadline: '¿Construimos algo juntos?',
    ctaButton: 'Empezar →',
    ctaTrustNote: 'Sin costo · Sin compromiso',
    academyLink: 'Datheón Academy',
    exploreColumnLabel: 'Explorar',
    technologyColumnLabel: 'Tecnología',
    connectColumnLabel: 'Conecta',
    newsletterPlaceholder: 'tu@correo.com',
    newsletterButton: 'Suscribirme',
    newsletterThanks: '¡Listo!',
    newsletterErrorLabel: 'Correo inválido.',
    systemStatusLabel: 'Ver estado del sistema',
    terminalInit: '> inicializar futuro',
    terminalReady: '> listo',
    backToTopLabel: 'Volver arriba',
    copyright: '© 2026 Datheón',
    signature: 'Hecho con ingeniería real.',
    privacy: 'Privacidad',
    terms: 'Términos',
    cookies: 'Cookies',
  },
  en: {
    tagline: 'Technology should move with you.',
    availabilityLabel: 'Available now',
    personalizedTemplate: "We saw you're at the {stage} stage — let's talk about that.",
    ctaHeadline: 'Shall we build something together?',
    ctaButton: 'Get started →',
    ctaTrustNote: 'Free · No commitment',
    academyLink: 'Datheón Academy',
    exploreColumnLabel: 'Explore',
    technologyColumnLabel: 'Technology',
    connectColumnLabel: 'Connect',
    newsletterPlaceholder: 'you@email.com',
    newsletterButton: 'Subscribe',
    newsletterThanks: "You're in!",
    newsletterErrorLabel: 'Invalid email.',
    systemStatusLabel: 'View system status',
    terminalInit: '> initialize future',
    terminalReady: '> ready',
    backToTopLabel: 'Back to top',
    copyright: '© 2026 Datheón',
    signature: 'Made with real engineering.',
    privacy: 'Privacy',
    terms: 'Terms',
    cookies: 'Cookies',
  },
  fr: {
    tagline: 'La technologie doit évoluer avec vous.',
    availabilityLabel: 'Disponibles maintenant',
    personalizedTemplate: "Nous avons vu que vous êtes à l'étape {stage} — parlons-en.",
    ctaHeadline: 'On construit quelque chose ensemble ?',
    ctaButton: 'Commencer →',
    ctaTrustNote: 'Gratuit · Sans engagement',
    academyLink: 'Datheón Academy',
    exploreColumnLabel: 'Explorer',
    technologyColumnLabel: 'Technologie',
    connectColumnLabel: 'Connexion',
    newsletterPlaceholder: 'vous@email.com',
    newsletterButton: "S'abonner",
    newsletterThanks: "C'est fait !",
    newsletterErrorLabel: 'E-mail invalide.',
    systemStatusLabel: 'Voir le statut du système',
    terminalInit: '> initialiser le futur',
    terminalReady: '> prêt',
    backToTopLabel: 'Retour en haut',
    copyright: '© 2026 Datheón',
    signature: 'Fait avec une ingénierie réelle.',
    privacy: 'Confidentialité',
    terms: 'Conditions',
    cookies: 'Cookies',
  },
};
