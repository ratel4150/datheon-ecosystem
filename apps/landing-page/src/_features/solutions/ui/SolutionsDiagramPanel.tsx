'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { analyzeTree } from '../lib';
import { containerVariants, itemVariants } from './motionVariants';
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
    <Box component={motion.div} initial="hidden" animate="show" variants={containerVariants}>
      <Box component={motion.div} variants={itemVariants}>
        <SolutionsStats stats={stats} blocksWord={t.statsBlocksWord} levelsWord={t.statsLevelsWord} categoriesWord={t.statsCategoriesWord} T={T} />
      </Box>
      <Box component={motion.div} variants={itemVariants}>
        <SolutionsLegend title={t.legendTitle} commandLabel={t.legendCommand} containerLabel={t.legendContainer} valueLabel={t.legendValue} T={T} />
      </Box>
      <Box component={motion.div} variants={itemVariants}>
        <BlocklyDiagram tree={diagram} T={T} />
      </Box>
    </Box>
  );
}
