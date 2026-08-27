'use client';

import { Grid } from '@mui/material';
import { PATHS } from '../lib';
import { PathCard } from './PathCard';

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
    <Grid container spacing={2}>
      {PATHS.map((path, i) => (
        <Grid item xs={12} sm={6} md={4} key={path.id}>
          <PathCard path={path} T={T} onSelect={onSelect} delay={i * 0.06} />
        </Grid>
      ))}
    </Grid>
  );
}
