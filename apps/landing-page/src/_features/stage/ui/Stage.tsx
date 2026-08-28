'use client';

import { Box, Container, GlobalStyles } from '@mui/material';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, content, resolveLang, STAGES, findStage } from '../lib';
import { useStageSelector } from '../model';
import { StageHeader } from './StageHeader';
import { JourneyLine } from './JourneyLine';
import { StageTechBranch } from './StageTechBranch';
import { StageMobileList } from './StageMobileList';
import { StageGoalsChips } from './StageGoalsChips';
import { StageCta } from './StageCta';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function Stage({ lang }: Props) {
  const l = resolveLang(lang, content);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;

  const { activeStageId, selectedGoals, selectStage, toggleGoal } = useStageSelector(STAGES[2].id);
  const activeStage = findStage(activeStageId) ?? STAGES[2];

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: T.bg, overflow: 'hidden', py: { xs: 8, md: 10 }, transition: 'background-color 0.3s ease' }}>
      <GlobalStyles styles={{ '.stg-focus:focus-visible': { outline: `2px solid ${T.accent}`, outlineOffset: 2 } }} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <StageHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} textColor={T.text} textMuteColor={T.textMute} accentColor={T.accent} />

        <JourneyLine activeStageId={activeStageId} T={T} onSelect={selectStage} onHover={(id) => id && selectStage(id)} />

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <StageTechBranch stage={activeStage} techLabel={t.techLabel} T={T} />
        </Box>

        <StageMobileList activeStageId={activeStageId} techLabel={t.techLabel} T={T} onSelect={selectStage} />

        <StageGoalsChips prompt={t.goalsPrompt} selectedGoals={selectedGoals} T={T} onToggle={toggleGoal} />

        <StageCta stage={activeStage} selectedGoals={selectedGoals} ctaLabel={t.ctaLabel} ctaContextPrefix={t.ctaContextPrefix} T={T} />
      </Container>
    </Box>
  );
}
