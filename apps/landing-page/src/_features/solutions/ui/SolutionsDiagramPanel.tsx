'use client';

import { Box } from '@mui/material';
import { analyzeTree } from '../lib';
import type { ArchitectureNode, SolutionsContent } from '../lib';
import { SolutionsStats } from './SolutionsStats';
import { SolutionsLegend } from './SolutionsLegend';
import { BlocklyDiagram } from './BlocklyDiagram';

interface Tokens {
  bg: string;
  surface: string;
  text: string;
  textMid: string;
  textMute: string;
  accent: string;
  accentDk: string;
  border: string;
}

interface SolutionsDiagramPanelProps {
  diagram: ArchitectureNode;
  t: SolutionsContent;
  T: Tokens;
}

export function SolutionsDiagramPanel({ diagram, t, T }: SolutionsDiagramPanelProps) {
  const stats = analyzeTree(diagram);

  return (
    <Box>
      <SolutionsStats stats={stats} blocksWord={t.statsBlocksWord} levelsWord={t.statsLevelsWord} categoriesWord={t.statsCategoriesWord} T={T} />
      <SolutionsLegend title={t.legendTitle} commandLabel={t.legendCommand} containerLabel={t.legendContainer} valueLabel={t.legendValue} T={T} />
      <BlocklyDiagram tree={diagram} T={T} />
    </Box>
  );
}
