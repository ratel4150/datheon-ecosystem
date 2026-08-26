'use client';

import { Box, Typography, Stack, GlobalStyles, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { MONO } from '../lib';

interface EcosystemPanelProps {
  label: string;
  statusText: string;
  accent: string;
  accentDk: string;
  surface: string;
  border: string;
  textMid: string;
  isDark: boolean;
  children: React.ReactNode;
}

export function EcosystemPanel({ label, statusText, accent, accentDk, surface, border, textMid, isDark, children }: EcosystemPanelProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      sx={{
        position: 'relative',
        bgcolor: surface,
        borderRadius: '16px',
        border: `1px solid ${border}`,
        boxShadow: `0 24px 60px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(11,15,43,0.08)'}`,
        overflow: 'hidden',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <GlobalStyles
        styles={{
          '@keyframes ecoPulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
          '.eco-pulse-dot': { animation: 'ecoPulse 2s ease-in-out infinite' },
          '@media (prefers-reduced-motion: reduce)': { '.eco-pulse-dot': { animation: 'none' } },
        }}
      />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 1.5,
          borderBottom: `1px solid ${border}`,
          bgcolor: alpha(accent, isDark ? 0.05 : 0.03),
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <Typography sx={{ fontFamily: MONO, fontSize: '0.64rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: textMid }}>
          {label}
        </Typography>
        <Stack direction="row" alignItems="center" gap={0.7}>
          <Box className="eco-pulse-dot" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: accent }} />
          <Typography
            component={motion.span}
            key={statusText}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            sx={{ fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: accentDk, fontWeight: 600 }}
          >
            {statusText}
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>
    </Box>
  );
}
