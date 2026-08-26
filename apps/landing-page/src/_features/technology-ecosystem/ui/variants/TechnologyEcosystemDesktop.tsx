// File: apps/landing-page/src/_features/technology-ecosystem/ui/variants/TechnologyEcosystemDesktop.tsx
'use client';


import type { Lang } from '@/_shared/types/i18n';

interface TechnologyEcosystemDesktopProps {
  lang: Lang;
}

export function TechnologyEcosystemDesktop({ lang }: TechnologyEcosystemDesktopProps) {
  return <TechnologyEcosystemBase lang={lang} variant="desktop" />;
}
