// File: apps/landing-page/src/_features/technology-ecosystem/ui/variants/TechnologyEcosystemTablet.tsx
'use client';

import { TechnologyEcosystemBase } from '../TechnologyEcosystemBase';
import type { Lang } from '@/_shared/types/i18n';

interface TechnologyEcosystemTabletProps {
  lang: Lang;
}

export function TechnologyEcosystemTablet({ lang }: TechnologyEcosystemTabletProps) {
  return <TechnologyEcosystemBase lang={lang} variant="tablet" />;
}
