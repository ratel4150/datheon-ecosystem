'use client';

import { Stack, Typography } from '@mui/material';
import { MONO, TECH_CHIPS } from '../lib';

interface Tokens {
  textMute: string;
}

interface FooterTechChipsProps {
  T: Tokens;
}

export function FooterTechChips({ T }: FooterTechChipsProps) {
  return (
    <Stack direction="row" sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
      {TECH_CHIPS.map((chip, i) => (
        <Typography key={chip} sx={{ fontFamily: MONO, fontSize: '0.72rem', color: T.textMute, letterSpacing: '0.03em' }}>
          {chip}
          {i < TECH_CHIPS.length - 1 ? '  •' : ''}
        </Typography>
      ))}
    </Stack>
  );
}
