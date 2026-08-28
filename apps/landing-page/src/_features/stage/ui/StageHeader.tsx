'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { DISPLAY, MONO } from '../lib';
import { containerVariants, itemVariants } from './motionVariants';

interface StageHeaderProps {
  kicker: string;
  title: string;
  subtitle: string;
  textColor: string;
  textMuteColor: string;
  accentColor: string;
}

export function StageHeader({ kicker, title, subtitle, textColor, textMuteColor, accentColor }: StageHeaderProps) {
  return (
    <Box
      component={motion.div}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.5 }}
      variants={containerVariants}
      sx={{ textAlign: 'center', maxWidth: 680, mx: 'auto', mb: { xs: 5, md: 6 } }}
    >
      <Box component={motion.div} variants={itemVariants} sx={{ mb: 1.5 }}>
        <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.16em', color: accentColor, transition: 'color 0.3s ease' }}>
          {kicker}
        </Typography>
      </Box>
      <Box component={motion.div} variants={itemVariants} sx={{ mb: 2 }}>
        <Typography
          variant="h2"
          sx={{
            fontFamily: DISPLAY,
            fontWeight: 800,
            fontSize: { xs: '1.9rem', md: '2.6rem' },
            lineHeight: 1.2,
            letterSpacing: '-0.02em',
            color: textColor,
            transition: 'color 0.3s ease',
          }}
        >
          {title}
        </Typography>
      </Box>
      <Box component={motion.div} variants={itemVariants}>
        <Typography sx={{ fontSize: '0.95rem', color: textMuteColor, lineHeight: 1.7, mx: 'auto', maxWidth: 480, transition: 'color 0.3s ease' }}>
          {subtitle}
        </Typography>
      </Box>
    </Box>
  );
}
