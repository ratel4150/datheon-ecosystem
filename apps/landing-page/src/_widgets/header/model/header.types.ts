// _widgets/header/model/header.types.ts
export type Lang = 'es' | 'en' | 'fr';

export interface SubItem {
  label: string;
  path: string;
  description: string;
  icon: string; // nombre del icono (ej: 'FiCpu')
}

export interface HeaderConstants {
  bg: string;
  bgSub: string;
  border: string;
  text: string;
  textMid: string;
  textMute: string;
  accent: string;
  accentDk: string;
  accentBg: string;
  accentLine: string;
}

export interface HeaderProps {
  lang?: Lang;
}

export interface Translations {
  services: Record<Lang, string>;
  sectors: Record<Lang, string>;
  university: Record<Lang, string>;
  viewAllSvc: Record<Lang, string>;
  viewAllSec: Record<Lang, string>;
  schedule: Record<Lang, string>;
  darkMode: Record<Lang, string>;
}
