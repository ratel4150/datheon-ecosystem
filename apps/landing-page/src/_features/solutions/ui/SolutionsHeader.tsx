'use client';

import { Box, Typography } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { DISPLAY, MONO } from '../lib';

interface SolutionsHeaderProps {
  kicker: string;
  title: string;
  subtitle: string;
  textColor: string;
  textMuteColor: string;
  accentColor: string;
  glow: string;
}

const lineVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay: number) => ({ opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut', delay } }),
};

export function SolutionsHeader({ kicker, title, subtitle, textColor, textMuteColor, accentColor, glow }: SolutionsHeaderProps) {
  const prefersReducedMotion = useReducedMotion();
  const step = prefersReducedMotion ? 0 : 0.15;

  return (
    <Box sx={{ textAlign: 'center', maxWidth: 680, mx: 'auto', mb: { xs: 5, md: 6 } }}>
      <Box component={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} custom={0} variants={lineVariants}>
        <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.16em', color: accentColor, mb: 1.5, transition: 'color 0.3s ease' }}>
          {kicker}
        </Typography>
      </Box>
      <Box component={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} custom={step} variants={lineVariants}>
        <Typography
          sx={{
            fontFamily: DISPLAY,
            fontWeight: 800,
            fontSize: { xs: '1.9rem', md: '2.6rem' },
            color: textColor,
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
            textShadow: `0 0 60px ${glow}`,
            transition: 'color 0.3s ease',
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box component={motion.div} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.6 }} custom={step * 2} variants={lineVariants}>
        <Typography sx={{ fontFamily: MONO, fontSize: { xs: '0.85rem', md: '0.95rem' }, color: textMuteColor, mt: 2, lineHeight: 1.7, transition: 'color 0.3s ease' }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}
