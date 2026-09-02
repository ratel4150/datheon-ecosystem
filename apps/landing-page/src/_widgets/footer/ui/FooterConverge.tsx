'use client';

import { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { CONVERGING_LABELS, CONVERGE_VIEWBOX, CONVERGE_POINT } from '../lib';

interface Tokens {
  accent: string;
}

interface FooterConvergeProps {
  T: Tokens;
}

export function FooterConverge({ T }: FooterConvergeProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: 220, mx: 'auto', opacity: 0.7 }}>
      <svg viewBox={`0 ${CONVERGE_POINT.y - 30} ${CONVERGE_VIEWBOX.width} 40`} width="100%" height={28} style={{ display: 'block', overflow: 'visible' }}>
        {CONVERGING_LABELS.map((item, i) => (
          <motion.line
            key={item.id}
            x1={item.x}
            y1={CONVERGE_POINT.y - 90}
            x2={CONVERGE_POINT.x}
            y2={CONVERGE_POINT.y}
            stroke={T.accent}
            strokeWidth={1}
            strokeOpacity={0.4}
            initial={reducedMotion ? { pathLength: 1, opacity: 0.4 } : { pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.4 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.03, ease: 'easeOut' }}
          />
        ))}
        <circle cx={CONVERGE_POINT.x} cy={CONVERGE_POINT.y} r={3} fill={T.accent} />
      </svg>
    </Box>
  );
}
