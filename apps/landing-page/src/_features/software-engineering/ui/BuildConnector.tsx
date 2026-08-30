'use client';

import { Box } from '@mui/material';

interface Tokens {
  accent: string;
  border: string;
}

interface BuildConnectorProps {
  revealed: boolean;
  T: Tokens;
  length?: number;
}

export function BuildConnector({ revealed, T, length = 28 }: BuildConnectorProps) {
  return (
    <Box
      sx={{
        width: '2px',
        height: length,
        bgcolor: revealed ? T.accent : T.border,
        transform: `scaleY(${revealed ? 1 : 0})`,
        transformOrigin: 'top',
        transition: 'transform 0.5s ease, background-color 0.3s ease',
        mx: 'auto',
      }}
    />
  );
}
