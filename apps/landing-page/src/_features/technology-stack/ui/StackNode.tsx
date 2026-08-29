'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { MONO } from '../lib';
import type { StackTech } from '../lib';

interface Tokens {
  text: string;
  textMid: string;
  accent: string;
  border: string;
}

interface StackNodeProps {
  tech: StackTech;
  selected: boolean;
  T: Tokens;
  onSelect: (techId: string) => void;
  delay?: number;
}

export function StackNode({ tech, selected, T, onSelect, delay = 0 }: StackNodeProps) {
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
        bgcolor: selected ? T.accent : 'transparent',
        color: selected ? '#FFFFFF' : T.textMid,
        border: `1px solid ${selected ? T.accent : T.border}`,
        transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
        '&:hover': { borderColor: T.accent, color: selected ? '#FFFFFF' : T.text },
      }}
    >
      {tech.label}
    </Box>
  );
}
