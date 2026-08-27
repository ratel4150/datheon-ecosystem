'use client';

import { Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { MONO } from '../lib';
import type { TreeStats } from '../lib';

interface Tokens {
  text: string;
  textMute: string;
  accent: string;
}

interface SolutionsStatsProps {
  stats: TreeStats;
  blocksWord: string;
  levelsWord: string;
  categoriesWord: string;
  T: Tokens;
}

const numberVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: (delay: number) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.35, ease: 'easeOut' } }),
};

export function SolutionsStats({ stats, blocksWord, levelsWord, categoriesWord, T }: SolutionsStatsProps) {
  const items = [
    { value: stats.totalBlocks, label: blocksWord },
    { value: stats.maxDepth, label: levelsWord },
    { value: stats.groupIds.length, label: categoriesWord },
  ];

  return (
    <Stack direction="row" spacing={3} justifyContent="center" sx={{ mb: 2.5 }}>
      {items.map((item, i) => (
        <Stack key={item.label} component={motion.div} initial="hidden" animate="visible" custom={i * 0.08} variants={numberVariants} direction="row" alignItems="baseline" spacing={0.6}>
          <Typography sx={{ fontFamily: MONO, fontWeight: 800, fontSize: '1.1rem', color: T.accent }}>{item.value}</Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: T.textMute, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{item.label}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}
