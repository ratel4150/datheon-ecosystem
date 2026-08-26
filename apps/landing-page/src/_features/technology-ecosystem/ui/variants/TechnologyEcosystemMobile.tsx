// File: apps/landing-page/src/_features/technology-ecosystem/ui/variants/TechnologyEcosystemMobile.tsx
'use client';

import { TechnologyEcosystemBase } from '../TechnologyEcosystemBase';
import type { Lang } from '@/_shared/types/i18n';

interface TechnologyEcosystemMobileProps {
  lang: Lang;
}

export function TechnologyEcosystemMobile({ lang }: TechnologyEcosystemMobileProps) {
  return <TechnologyEcosystemBase lang={lang} variant="mobile" />;
}
