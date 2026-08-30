'use client';

import { Box, Typography } from '@mui/material';
import { MONO } from '../lib';

interface Tokens {
  text: string;
  accent: string;
  surface: string;
  border: string;
}

interface BuildNodeProps {
  label: string;
  T: Tokens;
}

const CORNER_SIZE = 6;

function Corner({ position, color }: { position: 'tl' | 'tr' | 'bl' | 'br'; color: string }) {
  const base = { position: 'absolute' as const, width: CORNER_SIZE, height: CORNER_SIZE };
  const styles: Record<string, object> = {
    tl: { ...base, top: -1, left: -1, borderTop: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` },
    tr: { ...base, top: -1, right: -1, borderTop: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
    bl: { ...base, bottom: -1, left: -1, borderBottom: `1.5px solid ${color}`, borderLeft: `1.5px solid ${color}` },
    br: { ...base, bottom: -1, right: -1, borderBottom: `1.5px solid ${color}`, borderRight: `1.5px solid ${color}` },
  };
  return <Box sx={styles[position]} />;
}

export function BuildNode({ label, T }: BuildNodeProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        px: 1.5,
        py: 1,
        minWidth: 92,
        textAlign: 'center',
        bgcolor: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: '4px',
      }}
    >
      <Corner position="tl" color={T.accent} />
      <Corner position="tr" color={T.accent} />
      <Corner position="bl" color={T.accent} />
      <Corner position="br" color={T.accent} />
      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', fontWeight: 600, color: T.text }}>{label}</Typography>
    </Box>
  );
}
