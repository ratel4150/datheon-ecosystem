'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { BUILD_STAGES, GRAPH_NODES, GRAPH_EDGES, MONO } from '../lib';
import { SystemGraph } from './SystemGraph';

interface Tokens {
  text: string;
  textMute: string;
  accent: string;
  surface: string;
  border: string;
}

interface SystemBuilderReducedProps {
  T: Tokens;
}

export function SystemBuilderReduced({ T }: SystemBuilderReducedProps) {
  const finalStage = BUILD_STAGES[BUILD_STAGES.length - 1];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4 }}
      sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', py: 4 }}
    >
      <Typography sx={{ fontFamily: MONO, fontSize: '0.85rem', color: T.textMute, textAlign: 'center', maxWidth: 380, mb: 2 }}>{finalStage.narrative}</Typography>
      <SystemGraph visibleNodeIds={GRAPH_NODES.map((n) => n.id)} visibleEdgeIds={GRAPH_EDGES.map((e) => e.id)} showLabels T={T} scale={1} />
    </Box>
  );
}
