'use client';

import { useMediaQuery, useTheme } from '@mui/material';
import { SystemArchitectureDesktop, SystemArchitectureMobile } from './variants';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function SystemArchitectureResponsive({ lang }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  if (isMobile) {
    return <SystemArchitectureMobile lang={lang} />;
  }
  return <SystemArchitectureDesktop lang={lang} />;
}
