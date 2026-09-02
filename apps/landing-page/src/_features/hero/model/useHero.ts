// _features/hero/model/useHero.ts
import { useEffect, useRef } from 'react';
import { useInView } from 'framer-motion';
import { trackHeroView, trackHeroCTA } from './tracking';
import type { Lang } from '@/_shared/types/i18n';

export function useHero(lang: Lang) {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  useEffect(() => {
    trackHeroView(isInView);
  }, [isInView]);

  const handleCTA = (cta: 'construir' | 'capacidades') => () => {
    trackHeroCTA(cta);
  };

  return {
    sectionRef,
    isInView,
    handleCTA,
  };
}
