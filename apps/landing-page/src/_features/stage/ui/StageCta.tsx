'use client';

import { Box, Button, Typography, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { MONO } from '../lib';
import type { StageDefinition } from '../lib';

interface Tokens {
  text: string;
  textMute: string;
  accent: string;
  accentDk: string;
}

interface StageCtaProps {
  stage: StageDefinition;
  selectedGoals: string[];
  ctaLabel: string;
  ctaContextPrefix: string;
  T: Tokens;
}

export function StageCta({ stage, selectedGoals, ctaLabel, ctaContextPrefix, T }: StageCtaProps) {
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      {selectedGoals.length > 0 && (
        <Typography sx={{ fontFamily: MONO, fontSize: '0.7rem', color: T.textMute, mb: 2 }}>
          {ctaContextPrefix} <Box component="span" sx={{ color: stage.color, fontWeight: 700 }}>{selectedGoals.join(', ')}</Box>
        </Typography>
      )}
      <Button
        variant="contained"
        size="large"
        component={motion.a}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.98 }}
        href="https://calendly.com/team_datheon/consulta-gratuita"
        target="_blank"
        rel="noopener noreferrer"
        className="stg-focus"
        endIcon={<FiArrowRight size={15} />}
        sx={{
          bgcolor: T.accent,
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.93rem',
          px: 3.5,
          py: 1.4,
          borderRadius: '12px',
          textTransform: 'none',
          fontFamily: MONO,
          boxShadow: `0 4px 20px ${alpha(T.accent, 0.35)}`,
          '&:hover': { bgcolor: T.accentDk, boxShadow: `0 8px 28px ${alpha(T.accent, 0.45)}` },
        }}
      >
        {ctaLabel}
      </Button>
    </Box>
  );
}
