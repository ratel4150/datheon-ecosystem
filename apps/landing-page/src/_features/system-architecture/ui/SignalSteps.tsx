'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@/_shared/lib/theme';
import { SIGNAL_STEPS } from '../lib/data';
import { C, DARK, DISPLAY, MONO } from '../lib/constants';

export function SignalSteps() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const accentDk = isDark ? DARK.accentDk : C.accentDk;
  const text = isDark ? DARK.text : C.text;
  const textMute = isDark ? DARK.textMute : C.textMute;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        alignItems: { xs: 'stretch', md: 'flex-start' },
        justifyContent: 'center',
        gap: { xs: 3, md: 0 },
      }}
    >
      {SIGNAL_STEPS.map((step, i) => (
        <Box key={step.name} sx={{ display: 'flex', alignItems: { xs: 'stretch', md: 'flex-start' }, flex: 1 }}>
          <Box sx={{ flex: 1, textAlign: 'center', px: 1 }}>
            <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1rem', color: text, mb: 1 }}>
              {step.name}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.3 }}>
              {step.items.map((it) => (
                <Typography key={it} sx={{ fontSize: '0.74rem', color: textMute }}>{it}</Typography>
              ))}
            </Box>
          </Box>
          {i < SIGNAL_STEPS.length - 1 && (
            <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'flex-start', justifyContent: 'center', color: accentDk, fontSize: '1.1rem', px: 1, pt: 0.3 }}>
              →
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
