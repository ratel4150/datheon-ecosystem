'use client';

import { Grid } from '@mui/material';
import { motion } from 'framer-motion';
import { PATHS } from '../lib';
import { PathCard } from './PathCard';
import { containerVariants } from './motionVariants';

interface Tokens {
  surface: string;
  text: string;
  textMid: string;
  border: string;
}

interface PathGridProps {
  T: Tokens;
  onSelect: (id: string) => void;
}

export function PathGrid({ T, onSelect }: PathGridProps) {
  return (
    <Grid component={motion.div} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.2 }} variants={containerVariants} container spacing={2}>
      {PATHS.map((path) => (
        <Grid item xs={12} sm={6} md={4} key={path.id}>
          <PathCard path={path} T={T} onSelect={onSelect} />
        </Grid>
      ))}
    </Grid>
  );
}
