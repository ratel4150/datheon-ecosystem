'use client';

import { Box, Stack, Typography } from '@mui/material';
import { FiChevronRight } from 'react-icons/fi';
import { MONO } from '../lib';

interface Tokens {
  textMute: string;
}

interface SolutionsBreadcrumbProps {
  pathLabel: string;
  pathColor: string;
  subOptionLabel?: string;
  T: Tokens;
}

export function SolutionsBreadcrumb({ pathLabel, pathColor, subOptionLabel, T }: SolutionsBreadcrumbProps) {
  return (
    <Stack direction="row" alignItems="center" flexWrap="wrap" gap={0.6} sx={{ mb: 2 }}>
      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: pathColor, flexShrink: 0 }} />
      <Typography sx={{ fontFamily: MONO, fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.04em', color: pathColor }}>
        {pathLabel}
      </Typography>
      {subOptionLabel && (
        <>
          <FiChevronRight size={11} color={T.textMute} />
          <Typography sx={{ fontFamily: MONO, fontSize: '0.7rem', color: T.textMute }}>{subOptionLabel}</Typography>
        </>
      )}
    </Stack>
  );
}
