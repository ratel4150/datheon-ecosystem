// _features/software-engineering/model/useScrollBuild.ts
'use client';

import { useRef, useState } from 'react';
import { useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { BUILD_STAGES } from '../lib';

export function useScrollBuild() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start start', 'end end'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.55]);
  const [activeIndex, setActiveIndex] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(BUILD_STAGES.length - 1, Math.floor(v * BUILD_STAGES.length));
    setActiveIndex(Math.max(0, idx));
  });

  return { containerRef, scale, activeIndex };
}
