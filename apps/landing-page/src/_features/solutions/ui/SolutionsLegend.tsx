'use client';

import { Stack, Box, Typography } from '@mui/material';
import { FiChevronRight, FiLayers, FiZap } from 'react-icons/fi';
import { MONO } from '../lib';

interface Tokens {
  textMute: string;
  border: string;
}

interface SolutionsLegendProps {
  title: string;
  commandLabel: string;
  containerLabel: string;
  valueLabel: string;
  T: Tokens;
}

export function SolutionsLegend({ title, commandLabel, containerLabel, valueLabel, T }: SolutionsLegendProps) {
  const items = [
    { icon: FiChevronRight, label: commandLabel },
    { icon: FiLayers, label: containerLabel },
    { icon: FiZap, label: valueLabel },
  ];

  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: T.textMute, mb: 1 }}>
        {title}
      </Typography>
      <Stack direction="row" flexWrap="wrap" gap={2}>
        {items.map(({ icon: Icon, label }) => (
          <Stack key={label} direction="row" alignItems="center" gap={0.6}>
            <Box sx={{ width: 18, height: 18, borderRadius: '5px', border: `1px solid ${T.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={10} color={T.textMute} />
            </Box>
            <Typography sx={{ fontSize: '0.72rem', color: T.textMute }}>{label}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
