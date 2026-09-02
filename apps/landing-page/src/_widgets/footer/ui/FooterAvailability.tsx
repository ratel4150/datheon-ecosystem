'use client';

import { Box, Stack, Typography } from '@mui/material';
import { MONO, ONLINE_COLOR } from '../lib';

interface Tokens {
  surface: string;
  border: string;
  text: string;
}

interface FooterAvailabilityProps {
  label: string;
  T: Tokens;
}

export function FooterAvailability({ label, T }: FooterAvailabilityProps) {
  return (
    <Stack
      direction="row"
      sx={{
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0.75,
        mx: 'auto',
        width: 'fit-content',
        px: 1.5,
        py: 0.5,
        borderRadius: '20px',
        border: `1px solid ${T.border}`,
        bgcolor: T.surface,
      }}
    >
      <Box
        sx={{
          width: 6,
          height: 6,
          borderRadius: '50%',
          bgcolor: ONLINE_COLOR,
          animation: 'ft-pulse 2s ease-in-out infinite',
          '@keyframes ft-pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.35 } },
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      />
      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', fontWeight: 600, color: T.text }}>{label}</Typography>
    </Stack>
  );
}
