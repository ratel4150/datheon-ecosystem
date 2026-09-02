// File: apps/landing-page/src/_features/solutions/ui/SolutionsDiagramPanel.tsx
'use client';

import { useState } from 'react';
import { Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { motion } from 'framer-motion';
import { FiShare2, FiList } from 'react-icons/fi';
import { MONO, analyzeTree, narrativeToPlainText } from '../lib';
import { containerVariants, itemVariants } from './motionVariants';
import type { ArchitectureNode, Narrative, SolutionsContent } from '../lib';
import { SolutionsStats } from './SolutionsStats';
import { SolutionsLegend } from './SolutionsLegend';
import { SolutionsColorLegend } from './SolutionsColorLegend';
import { SolutionsDiagramActions } from './SolutionsDiagramActions';
import { BlocklyDiagram } from './BlocklyDiagram';
import { SolutionsTreeView } from './SolutionsTreeView';

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
  narrative: Narrative;
  pathLabel: string;
  subOptionLabel: string;
  t: SolutionsContent;
  T: Tokens;
}

export function SolutionsDiagramPanel({ diagram, narrative, pathLabel, subOptionLabel, t, T }: SolutionsDiagramPanelProps) {
  const [view, setView] = useState<'diagram' | 'tree'>('diagram');
  const stats = analyzeTree(diagram);
  const summaryText = narrativeToPlainText(narrative, pathLabel, subOptionLabel);

  return (
    <Box component={motion.div} initial="hidden" animate="show" variants={containerVariants}>
      <Box component={motion.div} variants={itemVariants}>
        <SolutionsStats stats={stats} blocksWord={t.statsBlocksWord} levelsWord={t.statsLevelsWord} categoriesWord={t.statsCategoriesWord} T={T} />
      </Box>

      <Box component={motion.div} variants={itemVariants} sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <ToggleButtonGroup
          value={view}
          exclusive
          onChange={(_, v) => v && setView(v)}
          size="small"
          sx={{
            '& .MuiToggleButton-root': {
              fontFamily: MONO,
              fontSize: '0.68rem',
              textTransform: 'none',
              color: T.textMid,
              borderColor: T.border,
              px: 1.5,
              '&.Mui-selected': { color: T.accent, bgcolor: `${T.accent}14`, borderColor: T.accent },
            },
          }}
        >
          <ToggleButton value="diagram" className="sol-focus">
            <FiShare2 size={12} style={{ marginRight: 6 }} />
            {t.viewDiagramLabel}
          </ToggleButton>
          <ToggleButton value="tree" className="sol-focus">
            <FiList size={12} style={{ marginRight: 6 }} />
            {t.viewTreeLabel}
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>

      <Box component={motion.div} variants={itemVariants}>
        <SolutionsLegend title={t.legendTitle} commandLabel={t.legendCommand} containerLabel={t.legendContainer} valueLabel={t.legendValue} T={T} />
      </Box>

      <Box component={motion.div} variants={itemVariants}>
        {view === 'diagram' ? <BlocklyDiagram tree={diagram} T={T} /> : <SolutionsTreeView tree={diagram} T={T} />}
      </Box>

      <Box component={motion.div} variants={itemVariants}>
        <SolutionsColorLegend title={t.colorLegendTitle} groupIds={stats.groupIds} T={T} />
      </Box>

      <Box component={motion.div} variants={itemVariants}>
        <SolutionsDiagramActions summaryText={summaryText} copyLabel={t.copySummaryLabel} copiedLabel={t.copiedLabel} dragHint={t.dragHint} T={T} />
      </Box>
    </Box>
  );
}
