// File: apps/landing-page/src/_features/hero/ui/HeroResponsive.tsx
'use client';

import { useMediaQuery, useTheme } from '@mui/material';
import { HeroDesktop, HeroTablet, HeroMobile } from './variants';
import type { Lang } from '@/_shared/types/i18n';

interface HeroResponsiveProps {
  lang: Lang;
}

export function HeroResponsive({ lang }: HeroResponsiveProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));

  if (isMobile) {
    return <HeroMobile lang={lang} />;
  }
  if (isTablet) {
    return <HeroTablet lang={lang} />;
  }
  return <HeroDesktop lang={lang} />;
}
