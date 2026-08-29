'use client';

import { Box, Stack, Typography, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { MONO } from '../lib';
import type { StageDefinition } from '../lib';

interface Tokens {
  text: string;
  textMid: string;
  textMute: string;
  surface: string;
  border: string;
}

interface StageTechBranchProps {
  stage: StageDefinition;
  techLabel: string;
  T: Tokens;
}

export function StageTechBranch({ stage, techLabel, T }: StageTechBranchProps) {
  return (
    <AnimatePresence mode="wait">
      <Box
        key={stage.id}
        component={motion.div}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        sx={{ textAlign: 'center', maxWidth: 640, mx: 'auto' }}
      >
        <Typography sx={{ fontFamily: MONO, fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.06em', color: stage.color, mb: 0.75 }}>
          {stage.label}
        </Typography>
        <Typography sx={{ fontSize: { xs: '1.15rem', md: '1.35rem' }, fontWeight: 700, color: T.text, mb: 1 }}>{stage.tagline}</Typography>
        <Typography sx={{ fontSize: '0.85rem', color: T.textMute, mb: 3 }}>{stage.forWhom}</Typography>

        <Box sx={{ width: '1px', height: 20, bgcolor: alpha(stage.color, 0.4), mx: 'auto', mb: 0.5 }} />
        <Typography sx={{ fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: T.textMute, mb: 1.5 }}>
          {techLabel}
        </Typography>

        <Stack direction="row" sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
          {stage.techs.map((tech, i) => (
            <Box
              key={tech}
              component={motion.div}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.3, ease: 'easeOut' }}
              sx={{
                px: 1.5,
                py: 0.6,
                borderRadius: '20px',
                bgcolor: alpha(stage.color, 0.1),
                border: `1px solid ${alpha(stage.color, 0.3)}`,
              }}
            >
              <Typography sx={{ fontFamily: MONO, fontSize: '0.72rem', fontWeight: 600, color: stage.color }}>{tech}</Typography>
            </Box>
          ))}
        </Stack>
      </Box>
    </AnimatePresence>
  );
}
