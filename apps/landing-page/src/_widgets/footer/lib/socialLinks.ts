// _widgets/footer/lib/socialLinks.ts
export interface SocialLink {
  id: string;
  label: string;
  href: string;
}

// TODO: reemplazar por las URLs reales de Datheón antes de publicar.
export const SOCIAL_LINKS: SocialLink[] = [
  { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com/company/datheon' },
  { id: 'github', label: 'GitHub', href: 'https://github.com/datheon' },
  { id: 'twitter', label: 'X (Twitter)', href: 'https://x.com/datheon' },
];

// TODO: reemplazar por el email y número de WhatsApp reales de Datheón.
export const CONTACT_EMAIL = 'hola@datheon.com';
export const CONTACT_WHATSAPP = 'https://wa.me/521234567890';
