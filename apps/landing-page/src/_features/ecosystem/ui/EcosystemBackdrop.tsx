'use client';
import { Box } from '@mui/material';
export function EcosystemBackdrop() {
  return (
    <Box
      aria-hidden
      sx={{
        position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: `radial-gradient(ellipse 60% 50% at 30% 20%, rgba(74,158,255,0.04) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 70% 60%, rgba(74,158,255,0.02) 0%, transparent 60%)`,
      }}
    />
  );
}
