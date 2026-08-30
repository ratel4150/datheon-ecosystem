'use client';

import { Stack } from '@mui/material';
import { BuildNode } from './BuildNode';
import type { BuildStageDefinition } from '../lib';

interface Tokens {
  text: string;
  accent: string;
  surface: string;
  border: string;
}

interface BuildStageRowProps {
  stage: BuildStageDefinition;
  T: Tokens;
}

export function BuildStageRow({ stage, T }: BuildStageRowProps) {
  return (
    <Stack direction="row" sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 1, my: 0.5 }}>
      {stage.nodes.map((node) => (
        <BuildNode key={node} label={node} T={T} />
      ))}
    </Stack>
  );
}
