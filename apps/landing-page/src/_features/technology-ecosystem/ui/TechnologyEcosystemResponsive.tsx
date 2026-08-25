// File: apps/landing-page/src/_features/technology-ecosystem/ui/TechnologyEcosystemResponsive.tsx
'use client';

import { useMediaQuery, useTheme } from '@mui/material';
import { TechnologyEcosystem } from './TechnologyEcosystem';
import type { Lang } from '@/_shared/types/i18n';

interface TechnologyEcosystemResponsiveProps {
  lang: Lang;
}

export function TechnologyEcosystemResponsive({ lang }: TechnologyEcosystemResponsiveProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  // La sección es inherentemente responsive con sus propios breakpoints.
  // Simplemente pasamos el lang, y el componente interno maneja todo.
  return <TechnologyEcosystem lang={lang} />;
}
