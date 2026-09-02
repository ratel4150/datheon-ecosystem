// apps/landing-page/src/_shared/types/navigation.types.ts
export type Lang = 'es' | 'en' | 'fr';

export interface NavItem {
  label: string;
  path: string;
  description: string;
  icon: string; // nombre del icono para referencia
}

export interface NavigationData {
  services: NavItem[];
  sectors: NavItem[];
}

export interface Translations {
  services: string;
  sectors: string;
  university: string;
  viewAllSvc: string;
  viewAllSec: string;
  schedule: string;
  darkMode: string;
}
