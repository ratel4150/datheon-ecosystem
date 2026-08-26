'use client';

import { useMediaQuery, useTheme } from '@mui/material';
import { EcosystemDesktop } from './EcosystemDesktop';
import { EcosystemTablet } from './EcosystemTablet';
import { EcosystemMobile } from './EcosystemMobile';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function EcosystemResponsive({ lang }: Props) {
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between('sm', 'md'));

  if (isMobile) return <EcosystemMobile lang={lang} />;
  if (isTablet) return <EcosystemTablet lang={lang} />;
  return <EcosystemDesktop lang={lang} />;
}
