'use client';

import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { MONO, STACK, getLayer, getLayerIndex, findTech, STACK_LAYERS } from '../lib';
import type { LayerId } from '../lib';

interface StackHUDProps {
  displayedLayerId: LayerId;
  selectedTechId: string | null;
  techCountWord: string;
  traceLabel: string;
}

export function StackHUD({ displayedLayerId, selectedTechId, techCountWord, traceLabel }: StackHUDProps) {
  const layer = getLayer(displayedLayerId);
  if (!layer) return null;
  const index = getLayerIndex(displayedLayerId) + 1;
  const tech = selectedTechId ? findTech(selectedTechId) : undefined;

  return (
    <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'center', gap: 1, mb: 4, flexWrap: 'wrap' }}>
      <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: STACK.accent, boxShadow: `0 0 6px ${STACK.glow}` }} />
      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', letterSpacing: '0.05em', color: STACK.accent, fontWeight: 700 }}>
        LAYER {layer.number}/{String(STACK_LAYERS.length).padStart(2, '0')}
      </Typography>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: STACK.textMute }}>·</Typography>
      <Box
        component={motion.span}
        key={layer.id}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', letterSpacing: '0.05em', color: STACK.text, fontWeight: 700 }}>
          {layer.label}
        </Typography>
      </Box>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: STACK.textMute }}>·</Typography>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: STACK.textMute }}>
        {layer.techs.length} {techCountWord}
      </Typography>
      {tech && (
        <>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: STACK.textMute }}>·</Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.64rem', color: STACK.accent, fontWeight: 700, letterSpacing: '0.04em' }}>
            {traceLabel}: {tech.label}
          </Typography>
        </>
      )}
    </Stack>
  );
}
