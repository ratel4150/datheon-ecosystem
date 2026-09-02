// File: apps/landing-page/src/_widgets/header/consts/header.constants.ts
import type { Lang } from '../model/header.types';

export const C = {
  bg: 'var(--header-bg)',
  bgSub: 'var(--header-bg-sub)',
  border: 'var(--header-border)',
  text: 'var(--header-text)',
  textMid: 'var(--header-text-mid)',
  textMute: 'var(--header-text-mute)',
  // 👇 estos se quedan como color fijo a propósito, ver nota abajo
  accent: '#00AEEF',
  accentDk: '#0095cc',
  accentBg: 'rgba(0,174,239,0.07)',
  accentLine: 'rgba(0,174,239,0.18)',
} as const;

export const t = {
  services: { es: 'Servicios', en: 'Services', fr: 'Services' },
  sectors: { es: 'Sectores', en: 'Sectors', fr: 'Secteurs' },
  university: { es: 'Universidad Datheón', en: 'Datheón University', fr: 'Université Datheón' },
  viewAllSvc: { es: 'Ver todos los servicios', en: 'View all services', fr: 'Voir tous les services' },
  viewAllSec: { es: 'Ver todos los sectores', en: 'See all sectors', fr: 'Voir tous les secteurs' },
  schedule: { es: 'Agendar reunión', en: 'Schedule meeting', fr: 'Planifier une réunion' },
  darkMode: { es: 'Modo Oscuro / Claro', en: 'Dark / Light Mode', fr: 'Mode Sombre / Clair' },
} as const;

export const tx = (key: keyof typeof t, lang: string): string => {
  const langKey = lang as Lang;
  const translation = t[key];
  return translation[langKey] || translation['es'];
};