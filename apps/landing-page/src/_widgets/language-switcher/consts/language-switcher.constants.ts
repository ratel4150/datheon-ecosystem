import type { LocaleConfig } from '@/_shared/types/i18n';

export const C = {
  bg: '#ffffff',
  border: '#ebebeb',
  text: '#0B0F2B',
  textMid: '#4A5068',
  textMute: '#8891AA',
  accent: '#00AEEF',
  accentBg: 'rgba(0,174,239,0.07)',
  accentLine: 'rgba(0,174,239,0.18)',
  dropdownShadow: '0 8px 32px rgba(0,0,0,0.10), 0 1px 4px rgba(0,0,0,0.06)',
} as const;

export const locales: LocaleConfig[] = [
  { code: 'es', label: 'Español', display: 'Español (México)', native: 'ES', flag: '🇲🇽', country: 'México' },
  { code: 'en', label: 'English', display: 'English (USA)',    native: 'EN', flag: '🇺🇸', country: 'USA'    },
  { code: 'fr', label: 'Français', display: 'Français (France)', native: 'FR', flag: '🇫🇷', country: 'France' },
];
