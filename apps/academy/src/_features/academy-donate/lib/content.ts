import type { Lang } from '@datheon/i18n';

export type DonateContent = {
  label: string;
  mailSubject: string;
};

export const content: Record<Lang, DonateContent> = {
  es: { label: '¿Quieres ayudarnos a mantener esto gratis? →', mailSubject: 'Quiero apoyar a Datheón Academy' },
  en: { label: 'Want to help keep this free? →', mailSubject: 'I want to support Datheón Academy' },
  fr: { label: 'Envie de nous aider à garder ça gratuit ? →', mailSubject: 'Je veux soutenir Datheón Academy' },
};
