'use client';

import { useEffect, useState } from 'react';
import { TechnologyStackDesktop, TechnologyStackTablet, TechnologyStackMobile } from './variants';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function TechnologyStackResponsive({ lang }: Props) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1100);
    };
    update();
    setMounted(true);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  if (!mounted) return null;
  if (isMobile) return <TechnologyStackMobile lang={lang} />;
  if (isTablet) return <TechnologyStackTablet lang={lang} />;
  return <TechnologyStackDesktop lang={lang} />;
}
