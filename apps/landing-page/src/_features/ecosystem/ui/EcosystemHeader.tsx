// File: apps/landing-page/src/_features/ecosystem/ui/EcosystemHeader.tsx
'use client';

import { Box, Typography } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { DISPLAY, MONO } from '../lib';

interface EcosystemHeaderProps {
  kicker: string;
  kickerSub?: string;
  title: string;
  subtitle: string;
  textColor: string;
  textMuteColor: string;
  accentColor: string;
  glow: string;
  entranceDelay?: number;
}

const lineVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay } }),
};

export function EcosystemHeader({
  kicker,
  kickerSub,
  title,
  subtitle,
  textColor,
  textMuteColor,
  accentColor,
  glow,
  entranceDelay = 0,
}: EcosystemHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const step = prefersReducedMotion ? 0 : 0.15;
  const baseDelay = prefersReducedMotion ? 0 : entranceDelay;

  return (
    <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
      <Box component={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} custom={baseDelay} variants={lineVariants}>
        <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.76rem', letterSpacing: '0.16em', color: accentColor, mb: kickerSub ? 0.5 : 1.5, transition: 'color 0.3s ease' }}>
          {kicker}
        </Typography>
        {kickerSub && (
          <Typography sx={{ fontFamily: MONO, fontWeight: 500, fontSize: '0.64rem', letterSpacing: '0.13em', color: textMuteColor, mb: 1.5, transition: 'color 0.3s ease' }}>
            {kickerSub}
          </Typography>
        )}
      </Box>
      <Box component={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} custom={baseDelay + step} variants={lineVariants}>
        <Typography
          sx={{
            fontFamily: DISPLAY,
            fontWeight: 800,
            fontSize: { xs: '1.9rem', md: '2.8rem' },
            color: textColor,
            letterSpacing: '-0.02em',
            lineHeight: 1.15,
            textShadow: `0 0 60px ${glow}`,
            transition: 'color 0.3s ease',
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box component={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} custom={baseDelay + step * 2} variants={lineVariants}>
        <Typography
          sx={{
            fontFamily: MONO,
            fontSize: { xs: '0.8rem', md: '0.92rem' },
            color: textMuteColor,
            mt: 2,
            letterSpacing: '0.04em',
            maxWidth: 560,
            mx: 'auto',
            transition: 'color 0.3s ease',
          }}
        >
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}
