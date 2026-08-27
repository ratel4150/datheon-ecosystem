'use client';

import { Box, Typography, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { MONO, analyzeTree } from '../lib';
import type { ArchitectureNode, PathDefinition, SolutionsContent } from '../lib';
import { SolutionsBreadcrumb } from './SolutionsBreadcrumb';
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
  path: PathDefinition;
  subOptionLabel: string;
  diagram: ArchitectureNode;
  t: SolutionsContent;
  T: Tokens;
}

export function SolutionsDiagramPanel({ path, subOptionLabel, diagram, t, T }: SolutionsDiagramPanelProps) {
  const stats = analyzeTree(diagram);

  return (
    <Box component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <SolutionsBreadcrumb pathLabel={path.label} pathColor={path.color} subOptionLabel={subOptionLabel} T={T} />

      <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.9rem', color: T.text, mb: 0.75, textAlign: 'center' }}>
        {t.resultTitle}
      </Typography>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: T.textMute, textAlign: 'center', mb: 2.5, maxWidth: 480, mx: 'auto', lineHeight: 1.6 }}>
        {t.liveNote}
      </Typography>

      <SolutionsStats stats={stats} blocksWord={t.statsBlocksWord} levelsWord={t.statsLevelsWord} categoriesWord={t.statsCategoriesWord} T={T} />

      <Box sx={{ borderTop: `1px solid ${alpha(T.border, 0.7)}`, pt: 2.5, mb: 2.5 }}>
        <SolutionsLegend title={t.legendTitle} commandLabel={t.legendCommand} containerLabel={t.legendContainer} valueLabel={t.legendValue} T={T} />
      </Box>

      <BlocklyDiagram tree={diagram} T={T} />
    </Box>
  );
}
