// File: apps/landing-page/src/_features/technology-ecosystem/ui/EcosystemBackdrop.tsx
'use client';

import { Box, alpha } from '@mui/material';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK } from '../lib/constants';

export function EcosystemBackdrop() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const accentColor = isDark ? DARK.accent : C.accent;
  const accentLine = isDark ? DARK.accentLine : C.accentLine;

  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute', inset: 0, zIndex: 0, overflow: 'hidden', pointerEvents: 'none',
        maskImage: 'radial-gradient(ellipse 85% 65% at 50% 35%, black 30%, transparent 92%)',
        WebkitMaskImage: 'radial-gradient(ellipse 85% 65% at 50% 35%, black 30%, transparent 92%)',
      }}
    >
      <Box component="svg" width="100%" height="100%" sx={{ position: 'absolute', inset: 0, display: 'block' }}>
        <defs>
          <pattern id="ecoDotPatternDark" width="72" height="72" patternUnits="userSpaceOnUse">
            <line x1="8" y1="8" x2="44" y2="30" stroke={accentColor} strokeWidth="0.6" opacity={isDark ? 0.15 : 0.09} />
            <line x1="44" y1="30" x2="20" y2="54" stroke={accentColor} strokeWidth="0.6" opacity={isDark ? 0.15 : 0.09} />
            <line x1="20" y1="54" x2="8" y2="72" stroke={accentColor} strokeWidth="0.6" opacity={isDark ? 0.1 : 0.07} />
            <circle cx="8" cy="8" r="1.7" fill={accentColor} opacity={isDark ? 0.3 : 0.2} />
            <circle cx="44" cy="30" r="1.3" fill={accentColor} opacity={isDark ? 0.25 : 0.16} />
            <circle cx="20" cy="54" r="1.5" fill={accentColor} opacity={isDark ? 0.25 : 0.18} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ecoDotPatternDark)" />
      </Box>

      <Box sx={{
        position: 'absolute', top: '4%', left: '50%', transform: 'translateX(-50%)',
        width: 620, height: 380, borderRadius: '50%',
        background: accentColor,
        filter: 'blur(190px)',
        opacity: isDark ? 0.08 : 0.05,
      }} />
    </Box>
  );
}
