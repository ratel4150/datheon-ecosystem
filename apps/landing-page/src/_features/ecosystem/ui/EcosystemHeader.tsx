'use client';

import { Box, Typography } from '@mui/material';
import { DISPLAY, MONO } from '../lib';

interface EcosystemHeaderProps {
  kicker: string;
  title: string;
  subtitle: string;
  textColor: string;
  textMuteColor: string;
  accentColor: string;
  glow: string;
  titleSize?: { xs: string; md: string };
  maxWidth?: number;
  mb?: { xs: number; md: number };
}

export function EcosystemHeader({
  kicker,
  title,
  subtitle,
  textColor,
  textMuteColor,
  accentColor,
  glow,
  titleSize = { xs: '1.8rem', md: '3rem' },
  maxWidth = 600,
  mb = { xs: 4, md: 6 },
}: EcosystemHeaderProps) {
  return (
    <Box sx={{ textAlign: 'center', mb }}>
      <Typography
        sx={{
          fontFamily: MONO,
          fontWeight: 700,
          fontSize: '0.72rem',
          letterSpacing: '0.16em',
          color: accentColor,
          mb: 1.5,
          transition: 'color 0.3s ease',
        }}
      >
        {kicker}
      </Typography>
      <Typography
        sx={{
          fontFamily: DISPLAY,
          fontWeight: 800,
          fontSize: titleSize,
          color: textColor,
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          textShadow: `0 0 60px ${glow}`,
          transition: 'color 0.3s ease',
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          fontFamily: MONO,
          fontSize: { xs: '0.8rem', md: '0.95rem' },
          color: textMuteColor,
          mt: 2,
          letterSpacing: '0.04em',
          maxWidth,
          mx: 'auto',
          transition: 'color 0.3s ease',
        }}
      >
        {subtitle}
      </Typography>
    </Box>
  );
}
