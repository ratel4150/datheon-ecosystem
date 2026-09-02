'use client';

import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { DISPLAY, MONO, PROOF_STATS } from '../lib';

interface Tokens {
  text: string;
  textMute: string;
  accent: string;
  border: string;
}

interface FooterProofStripProps {
  labels: string[];
  T: Tokens;
}

export function FooterProofStrip({ labels, T }: FooterProofStripProps) {
  return (
    <Stack
      component={motion.div}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.5 }}
      direction="row"
      divider={<Box sx={{ width: '1px', bgcolor: T.border, alignSelf: 'stretch', my: 0.5 }} />}
      sx={{ justifyContent: 'center', gap: { xs: 2.5, sm: 4 }, flexWrap: 'wrap' }}
    >
      {PROOF_STATS.map((stat, i) => (
        <Box key={stat.id} sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: '1.4rem', color: T.accent, lineHeight: 1 }}>{stat.value}</Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', letterSpacing: '0.04em', color: T.textMute, mt: 0.5 }}>{labels[i]}</Typography>
        </Box>
      ))}
    </Stack>
  );
}
