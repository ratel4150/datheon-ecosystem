// File: apps/landing-page/src/_features/hero/ui/WaveBackdrop.tsx
'use client';

import { Box } from '@mui/material';
import { useTheme } from '@/_shared/lib/theme';
import { C } from '../lib/constants';

export function WaveBackdrop() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Colores de las olas según el tema
  const waveColor = isDark ? '#4A9EFF' : C.accent; // En dark usamos un tono más brillante
  const opacity1 = isDark ? 0.12 : 0.05;
  const opacity2 = isDark ? 0.18 : 0.08;
  const opacity3 = isDark ? 0.25 : 0.13;

  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: { xs: 280, md: 420 },
        overflow: 'hidden', zIndex: 0, pointerEvents: 'none',
        maskImage: 'linear-gradient(to bottom, black 0%, black 45%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 45%, transparent 100%)',
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        sx={{ width: '100%', height: '100%', display: 'block' }}
      >
        <path
          className="wave-layer wave-layer-1"
          d="M0,0 L1440,0 L1440,190 C1290,240 1170,140 1020,170 C870,200 780,260 630,230 C480,200 390,120 240,150 C160,168 80,190 0,180 Z"
          fill={waveColor} opacity={opacity1}
        />
        <path
          className="wave-layer wave-layer-2"
          d="M0,0 L1440,0 L1440,130 C1300,90 1150,180 1000,150 C850,120 760,60 610,90 C460,120 380,180 230,140 C150,120 70,100 0,120 Z"
          fill={waveColor} opacity={opacity2}
        />
        <path
          className="wave-layer wave-layer-3"
          d="M0,0 L1440,0 L1440,70 C1310,100 1180,40 1030,60 C880,80 800,110 650,90 C500,70 420,30 270,50 C170,63 90,75 0,60 Z"
          fill={waveColor} opacity={opacity3}
        />
      </Box>
    </Box>
  );
}