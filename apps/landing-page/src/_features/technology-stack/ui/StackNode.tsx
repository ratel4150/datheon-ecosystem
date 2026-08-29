'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { MONO, STACK } from '../lib';
import type { StackTech } from '../lib';

interface StackNodeProps {
  tech: StackTech;
  selected: boolean;
  onSelect: (techId: string) => void;
  delay?: number;
}

export function StackNode({ tech, selected, onSelect, delay = 0 }: StackNodeProps) {
  return (
    <Box
      component={motion.button}
      type="button"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3, ease: 'easeOut' }}
      onClick={() => onSelect(tech.id)}
      className="ts-focus"
      sx={{
        appearance: 'none',
        cursor: 'pointer',
        px: 1.4,
        py: 0.55,
        borderRadius: '16px',
        fontFamily: MONO,
        fontSize: '0.72rem',
        fontWeight: 600,
        bgcolor: selected ? STACK.accent : 'transparent',
        color: selected ? '#031018' : STACK.textMid,
        border: `1px solid ${selected ? STACK.accent : STACK.border}`,
        transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
        '&:hover': { borderColor: STACK.accent, color: selected ? '#031018' : STACK.text },
      }}
    >
      {tech.label}
    </Box>
  );
}
