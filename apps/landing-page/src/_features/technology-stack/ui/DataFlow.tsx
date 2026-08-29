'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';

interface Tokens {
  accent: string;
  glow: string;
}

interface DataFlowProps {
  height: number;
  active: boolean;
  reducedMotion: boolean;
  T: Tokens;
}

export function DataFlow({ height, active, reducedMotion, T }: DataFlowProps) {
  if (reducedMotion) return null;

  return (
    <Box
      component={motion.div}
      animate={{ y: [0, height] }}
      transition={{ duration: active ? 1.1 : 1.9, repeat: Infinity, ease: 'linear' }}
      sx={{
        position: 'absolute',
        top: 0,
        left: '50%',
        width: 4,
        height: 4,
        borderRadius: '50%',
        bgcolor: T.accent,
        boxShadow: `0 0 6px ${T.glow}`,
        transform: 'translateX(-50%)',
        opacity: active ? 0.9 : 0.35,
      }}
    />
  );
}
