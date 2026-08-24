// _widgets/language-switcher/consts/language-switcher.constants.ts
import type { Locale } from '@/_shared/types/i18n';

export const C = {
  bg: '#ffffff',
  border: '#ebebeb',
  text: '#0B0F2B',
  textMid: '#4A5068',
  textMute: '#8891AA',
  accent: '#00AEEF',
  accentBg: 'rgba(0,174,239,0.07)',
  accentLine: 'rgba(0,174,239,0.18)',
} as const;

export const locales = [
  { code: 'es' as Locale, label: 'Español', native: 'ES', flag: '🇲🇽', country: 'México' },
  { code: 'en' as Locale, label: 'English', native: 'EN', flag: '🇺🇸', country: 'USA' },
  { code: 'fr' as Locale, label: 'Français', native: 'FR', flag: '🇫🇷', country: 'France' },
] as const;
