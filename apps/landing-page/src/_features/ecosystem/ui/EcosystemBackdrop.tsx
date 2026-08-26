'use client';

import { Box, alpha } from '@mui/material';

interface EcosystemBackdropProps {
  accent: string;
}

export function EcosystemBackdrop({ accent }: EcosystemBackdropProps) {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 50% at 30% 20%, ${alpha(accent, 0.05)} 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 70% 60%, ${alpha(accent, 0.025)} 0%, transparent 60%)`,
        transition: 'background 0.3s ease',
      }}
    />
  );
}
