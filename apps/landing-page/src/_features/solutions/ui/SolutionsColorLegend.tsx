'use client';

import { Stack, Box, Typography } from '@mui/material';
import { GROUPS } from '../lib';
import type { GroupId } from '../lib';

interface Tokens {
  textMute: string;
}

interface SolutionsColorLegendProps {
  title: string;
  groupIds: GroupId[];
  T: Tokens;
}

export function SolutionsColorLegend({ title, groupIds, T }: SolutionsColorLegendProps) {
  const groups = GROUPS.filter((g) => groupIds.includes(g.id));

  return (
    <Box sx={{ mb: 2.5 }}>
      <Typography sx={{ fontSize: '0.6rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: T.textMute, mb: 1 }}>{title}</Typography>
      <Stack spacing={0.75}>
        {groups.map((group) => (
          <Stack key={group.id} direction="row" alignItems="center" gap={0.75}>
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: group.color, flexShrink: 0 }} />
            <Typography sx={{ fontSize: '0.75rem', color: T.textMute }}>{group.label}</Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}
