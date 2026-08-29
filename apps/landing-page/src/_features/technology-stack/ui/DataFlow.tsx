'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { STACK } from '../lib';

interface DataFlowProps {
  height: number;
  active: boolean;
  reducedMotion: boolean;
}

export function DataFlow({ height, active, reducedMotion }: DataFlowProps) {
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
        bgcolor: STACK.accent,
        boxShadow: `0 0 6px ${STACK.glow}`,
        transform: 'translateX(-50%)',
        opacity: active ? 0.9 : 0.35,
      }}
    />
  );
}
