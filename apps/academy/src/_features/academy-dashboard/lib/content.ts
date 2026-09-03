import type { Lang } from '@datheon/i18n';

export type DashboardContent = {
  welcomePrefix: string;
  buildChoiceLabel: string;
  buildingNote: string;
  breadcrumbHome: string;
  breadcrumbBuildStep: string;
  breadcrumbDashboard: string;
  navDashboard: string;
  navProject: string;
  navProfile: string;
  comingSoon: string;
  appBarTitle: string;
};

export const content: Record<Lang, DashboardContent> = {
  es: {
    welcomePrefix: 'Hola',
    buildChoiceLabel: 'Elegiste construir:',
    buildingNote: 'Aquí es donde vas a construir de verdad — lo estamos armando contigo, pieza por pieza.',
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
    welcomePrefix: 'Hi',
    buildChoiceLabel: 'You chose to build:',
    buildingNote: "This is where you'll really build — we're putting it together with you, piece by piece.",
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
    welcomePrefix: 'Bonjour',
    buildChoiceLabel: 'Vous avez choisi de construire :',
    buildingNote: "C'est ici que vous allez vraiment construire — nous le mettons en place avec vous, pièce par pièce.",
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
