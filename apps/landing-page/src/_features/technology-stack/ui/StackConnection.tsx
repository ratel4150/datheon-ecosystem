'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { DataFlow } from './DataFlow';
import { drawTransition } from './animation/stackTransitions';

interface Tokens {
  accent: string;
  border: string;
  glow: string;
}

interface StackConnectionProps {
  active: boolean;
  reducedMotion: boolean;
  T: Tokens;
  delay?: number;
  height?: number;
}

export function StackConnection({ active, reducedMotion, T, delay = 0, height = 40 }: StackConnectionProps) {
  return (
    <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', height, width: '100%' }}>
      <Box
        component={motion.div}
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ ...drawTransition, delay }}
        sx={{ width: '2px', bgcolor: active ? T.accent : T.border, transition: 'background-color 0.3s ease' }}
      />
      <DataFlow height={height} active={active} reducedMotion={reducedMotion} T={T} />
    </Box>
  );
}
