// File: apps/landing-page/src/_features/solutions/ui/SolutionsHeader.tsx
'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { DISPLAY, MONO } from '../lib';
import { containerVariants, itemVariants } from './motionVariants';

interface SolutionsHeaderProps {
  kicker: string;
  titleLine1: string;
  titleLine2Lead: string;
  titleLine2Accent: string;
  subtitle: string;
  textColor: string;
  textMuteColor: string;
  accentColor: string;
}

export function SolutionsHeader({ kicker, titleLine1, titleLine2Lead, titleLine2Accent, subtitle, textColor, textMuteColor, accentColor }: SolutionsHeaderProps) {
  return (
    <Box
      component={motion.div}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
      sx={{ textAlign: 'center', maxWidth: 680, mx: 'auto', mb: { xs: 5, md: 6 } }}
    >
      <Box component={motion.div} variants={itemVariants} sx={{ mb: 0.5 }}>
        <Typography
          sx={{
            fontFamily: MONO,
            fontWeight: 700,
            fontSize: '0.76rem',
            letterSpacing: '0.16em',
            color: textColor,
            transition: 'color 0.3s ease',
          }}
        >
          {kicker}
        </Typography>
      </Box>

      <Box component={motion.div} variants={itemVariants} sx={{ mt: 2.5, mb: 2.5 }}>
        <Typography
          variant="h1"
          sx={{
            fontFamily: DISPLAY,
            fontWeight: 800,
            fontSize: { xs: '2.1rem', sm: '2.5rem', md: '2.9rem', lg: '3.2rem' },
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: textColor,
            transition: 'color 0.3s ease',
          }}
        >
          {titleLine1}
          <Box component="span" sx={{ display: 'block' }}>
            {titleLine2Lead}
            <Box component="span" sx={{ color: accentColor }}>
              {titleLine2Accent}
            </Box>
          </Box>
        </Typography>
      </Box>

      <Box component={motion.div} variants={itemVariants}>
        <Typography
          sx={{
            fontSize: { xs: '1rem', md: '1.05rem' },
            color: textMuteColor,
            maxWidth: 480,
            lineHeight: 1.75,
            fontWeight: 400,
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
