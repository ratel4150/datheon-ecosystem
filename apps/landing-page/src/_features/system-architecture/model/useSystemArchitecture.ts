// _features/system-architecture/model/useSystemArchitecture.ts
import { useEffect, useRef } from 'react';
import { useInView, useScroll, useTransform } from 'framer-motion';

export function useSystemArchitecture() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const enterRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-40px' });
  const imageInView = useInView(imageRef, { once: true, margin: '-60px' });
  const enterInView = useInView(enterRef, { once: true, margin: '-60px' });

  // Efecto parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -40]);

  useEffect(() => {
    if (isInView && typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'system_architecture_view', { section: 'SystemArchitecture' });
    }
  }, [isInView]);

  return {
    sectionRef,
    imageRef,
    enterRef,
    isInView,
    imageInView,
    enterInView,
    yParallax,
  };
}
