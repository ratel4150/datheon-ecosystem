'use client';

import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { MONO, getLayer, getLayerIndex, findTech, STACK_LAYERS } from '../lib';
import type { LayerId } from '../lib';

interface Tokens {
  text: string;
  textMute: string;
  accent: string;
  glow: string;
}

interface StackHUDProps {
  displayedLayerId: LayerId;
  selectedTechId: string | null;
  techCountWord: string;
  traceLabel: string;
  T: Tokens;
}

export function StackHUD({ displayedLayerId, selectedTechId, techCountWord, traceLabel, T }: StackHUDProps) {
  const layer = getLayer(displayedLayerId);
  if (!layer) return null;
  const tech = selectedTechId ? findTech(selectedTechId) : undefined;

  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', gap: 1, mb: 4, flexWrap: 'wrap' }}>
      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: T.accent, boxShadow: `0 0 6px ${T.glow}` }} />
      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', letterSpacing: '0.05em', color: T.accent, fontWeight: 700 }}>
        LAYER {layer.number}/{String(STACK_LAYERS.length).padStart(2, '0')}
      </Typography>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: T.textMute }}>·</Typography>
      <Box component={motion.span} key={layer.id} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
        <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', letterSpacing: '0.05em', color: T.text, fontWeight: 700 }}>{layer.label}</Typography>
      </Box>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: T.textMute }}>·</Typography>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: T.textMute }}>
        {layer.techs.length} {techCountWord}
      </Typography>
      {tech && (
        <>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: T.textMute }}>·</Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.64rem', color: T.accent, fontWeight: 700, letterSpacing: '0.04em' }}>
            {traceLabel}: {tech.label}
          </Typography>
        </>
      )}
    </Stack>
  );
}
