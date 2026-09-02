'use client';

import { Box, Stack, Typography } from '@mui/material';
import { FiArrowUpRight } from 'react-icons/fi';
import { DISPLAY, MONO } from '../lib';
import type { FooterPillar } from '../lib';

interface Tokens {
  text: string;
  textMute: string;
  accent: string;
  border: string;
}

interface FooterPillarsProps {
  pillars: FooterPillar[];
  T: Tokens;
}

export function FooterPillars({ pillars, T }: FooterPillarsProps) {
  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ gap: { xs: 1.5, sm: 2 }, justifyContent: 'center' }}>
      {pillars.map((pillar) => (
        <Box
          key={pillar.id}
          component="a"
          href={pillar.href}
          className="ft-focus"
          sx={{
            flex: 1,
            textDecoration: 'none',
            border: `1px solid ${T.border}`,
            borderRadius: '12px',
            px: 2.5,
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: 'border-color 0.2s ease',
            '&:hover': { borderColor: T.accent },
          }}
        >
          <Box>
            <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.06em', color: T.accent, mb: 0.25 }}>{pillar.label}</Typography>
            <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '0.95rem', color: T.text }}>{pillar.sub}</Typography>
          </Box>
          <FiArrowUpRight size={16} color={T.textMute} />
        </Box>
      ))}
    </Stack>
  );
}
