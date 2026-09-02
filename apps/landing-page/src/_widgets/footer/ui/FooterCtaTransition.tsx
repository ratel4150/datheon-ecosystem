'use client';

import { Box, Stack, Typography } from '@mui/material';
import { MONO } from '../lib';

interface Tokens {
  textMute: string;
  border: string;
}

interface FooterCtaTransitionProps {
  label: string;
  T: Tokens;
}

export function FooterCtaTransition({ label, T }: FooterCtaTransitionProps) {
  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', gap: 1.5, maxWidth: 420, mx: 'auto' }}>
      <Box sx={{ flex: 1, height: '1px', bgcolor: T.border }} />
      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: T.textMute, whiteSpace: 'nowrap' }}>{label}</Typography>
      <Box sx={{ flex: 1, height: '1px', bgcolor: T.border }} />
    </Stack>
  );
}
