'use client';

import { Box, Typography } from '@mui/material';
import { MONO } from '../lib';
import type { StageDefinition } from '../lib';

interface Tokens {
  surface: string;
  border: string;
  textMute: string;
}

interface StageStepIconProps {
  stage: StageDefinition;
  active: boolean;
  T: Tokens;
}

export function StageStepIcon({ stage, active, T }: StageStepIconProps) {
  return (
    <Box
      sx={{
        width: 32,
        height: 32,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: active ? stage.color : T.surface,
        border: `2px solid ${active ? stage.color : T.border}`,
        transition: 'background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
        transform: active ? 'scale(1.15)' : 'scale(1)',
      }}
    >
      <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.68rem', color: active ? '#FFFFFF' : T.textMute }}>{stage.number}</Typography>
    </Box>
  );
}
