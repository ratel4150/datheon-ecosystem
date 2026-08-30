'use client';

import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { BUILD_STAGES, MONO } from '../lib';
import { BuildStageRow } from './BuildStageRow';
import { BuildConnector } from './BuildConnector';
import { containerVariants, itemVariants } from './motionVariants';

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
  return (
    <Box component={motion.div} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={containerVariants} sx={{ py: 4 }}>
      <Stack spacing={0} sx={{ alignItems: 'center' }}>
        {BUILD_STAGES.map((stage, i) => (
          <Box key={stage.id} component={motion.div} variants={itemVariants} sx={{ textAlign: 'center' }}>
            {i > 0 && <BuildConnector revealed T={T} length={26} />}
            <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', color: T.accent, fontWeight: 700, mb: 0.5 }}>
              {String(i + 1).padStart(2, '0')} · {stage.title}
            </Typography>
            <BuildStageRow stage={stage} T={T} />
            <Typography sx={{ fontSize: '0.78rem', color: T.textMute, maxWidth: 360, mx: 'auto', mt: 1, mb: 2.5 }}>{stage.narrative}</Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
