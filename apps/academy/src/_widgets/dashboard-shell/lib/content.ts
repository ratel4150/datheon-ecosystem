import type { Lang } from '@datheon/i18n';

export type DashboardShellContent = {
  breadcrumbHome: string;
  breadcrumbBuildStep: string;
  breadcrumbDashboard: string;
  navDashboard: string;
  navProject: string;
  navProfile: string;
  comingSoon: string;
  appBarTitle: string;
};

export const content: Record<Lang, DashboardShellContent> = {
  es: {
    breadcrumbHome: 'Datheón Academy',
    breadcrumbBuildStep: 'Qué quieres construir',
    breadcrumbDashboard: 'Dashboard',
    navDashboard: 'Dashboard',
    navProject: 'Mi proyecto',
    navProfile: 'Perfil',
    comingSoon: 'Próximamente',
    appBarTitle: 'Datheón Academy',
  },
  en: {
    breadcrumbHome: 'Datheón Academy',
    breadcrumbBuildStep: 'What you want to build',
    breadcrumbDashboard: 'Dashboard',
    navDashboard: 'Dashboard',
    navProject: 'My project',
    navProfile: 'Profile',
    comingSoon: 'Coming soon',
    appBarTitle: 'Datheón Academy',
  },
  fr: {
    breadcrumbHome: 'Datheón Academy',
    breadcrumbBuildStep: 'Ce que vous voulez construire',
    breadcrumbDashboard: 'Tableau de bord',
    navDashboard: 'Tableau de bord',
    navProject: 'Mon projet',
    navProfile: 'Profil',
    comingSoon: 'Bientôt disponible',
    appBarTitle: 'Datheón Academy',
  },
};
