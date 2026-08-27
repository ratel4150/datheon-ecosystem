'use client';

import { Box, Container, Typography, Button, Alert, GlobalStyles, alpha } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, MONO, content, resolveLang, findPath, buildNarrative } from '../lib';
import { useSolutionBuilder } from '../model';
import { SolutionsHeader } from './SolutionsHeader';
import { PathGrid } from './PathGrid';
import { SubOptionGrid } from './SubOptionGrid';
import { SolutionsBreadcrumb } from './SolutionsBreadcrumb';
import { SolutionsNarrative } from './SolutionsNarrative';
import { SolutionsDiagramPanel } from './SolutionsDiagramPanel';
import { SolutionsCtaBanner } from './SolutionsCtaBanner';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function Solutions({ lang }: Props) {
  const l = resolveLang(lang, content);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;

  const { selectedPathId, selectedSubOptionId, status, diagram, errorMessage, selectPath, selectSubOption, reset, generate } = useSolutionBuilder();

  const activePath = selectedPathId ? findPath(selectedPathId) : undefined;
  const activeSubOption = activePath?.subOptions.find((o) => o.id === selectedSubOptionId);

  const handleGenerate = () => {
    if (!activePath || !activeSubOption) return;
    generate({ pathId: activePath.id, pathLabel: activePath.label, subOptionId: activeSubOption.id, subOptionLabel: activeSubOption.label });
  };

  const narrative = diagram && activePath && activeSubOption ? buildNarrative(diagram, activePath.label, activeSubOption.label) : null;

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: T.bg, overflow: 'hidden', py: { xs: 8, md: 10 }, transition: 'background-color 0.3s ease' }}>
      <GlobalStyles styles={{ '.sol-focus:focus-visible': { outline: `2px solid ${T.accent}`, outlineOffset: 2 } }} />

      <Container maxWidth={diagram && status === 'success' ? 'lg' : 'md'} sx={{ position: 'relative', zIndex: 1, transition: 'max-width 0.2s ease' }}>
        <SolutionsHeader
          kicker={t.kicker}
          titleLine1={t.titleLine1}
          titleLine2Lead={t.titleLine2Lead}
          titleLine2Accent={t.titleLine2Accent}
          subtitle={t.subtitle}
          textColor={T.text}
          textMuteColor={T.textMute}
          accentColor={T.accent}
        />

        <AnimatePresence mode="wait">
          {!activePath && (
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <PathGrid T={T} onSelect={selectPath} />
            </motion.div>
          )}

          {activePath && status !== 'success' && (
            <motion.div key="sub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
              <SubOptionGrid
                path={activePath}
                selectedSubOptionId={selectedSubOptionId}
                prompt={t.subOptionsPrompt}
                backLabel={t.backLabel}
                generateLabel={status === 'loading' ? t.loadingLabel : t.generateLabel}
                isLoading={status === 'loading'}
                T={T}
                onSelectSubOption={selectSubOption}
                onBack={reset}
                onGenerate={handleGenerate}
              />
              {status === 'loading' && (
                <Box sx={{ textAlign: 'center', mt: 1.5 }}>
                  <Box component="span" sx={{ fontFamily: MONO, fontSize: '0.7rem', color: T.textMute }}>{t.loadingSubLabel}</Box>
                </Box>
              )}
              {status === 'error' && (
                <Alert severity="error" sx={{ mt: 2, fontFamily: MONO, fontSize: '0.78rem' }}>
                  {errorMessage ?? t.errorLabel}
                </Alert>
              )}
            </motion.div>
          )}

          {activePath && activeSubOption && status === 'success' && diagram && narrative && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <SolutionsBreadcrumb pathLabel={activePath.label} pathColor={activePath.color} subOptionLabel={activeSubOption.label} T={T} />

              <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.9rem', color: T.text, mb: 0.75, textAlign: { xs: 'center', md: 'left' } }}>
                {t.resultTitle}
              </Typography>
              <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: T.textMute, mb: 4, maxWidth: 520, lineHeight: 1.6, textAlign: { xs: 'center', md: 'left' }, mx: { xs: 'auto', md: 0 } }}>
                {t.liveNote}
              </Typography>

              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '5fr 7fr' }, gap: { xs: 6, md: 0 } }}>
                <Box component="section" aria-label={t.narrativeTitle} sx={{ pr: { xs: 0, md: 5 }, borderRight: { xs: 'none', md: `1px solid ${alpha(T.border, 0.7)}` } }}>
                  <SolutionsNarrative title={t.narrativeTitle} narrative={narrative} T={T} />
                </Box>
                <Box component="section" aria-label={t.resultTitle} sx={{ pl: { xs: 0, md: 5 } }}>
                  <SolutionsDiagramPanel
                    diagram={diagram}
                    narrative={narrative}
                    pathLabel={activePath.label}
                    subOptionLabel={activeSubOption.label}
                    t={t}
                    T={T}
                  />
                </Box>
              </Box>

              <SolutionsCtaBanner headline={t.ctaHeadline} body={t.ctaBody} buttonLabel={t.ctaButtonLabel} T={T} />

              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                  onClick={reset}
                  className="sol-focus"
                  sx={{ fontFamily: MONO, fontSize: '0.78rem', color: T.textMid, textTransform: 'none', '&:hover': { color: T.accent, bgcolor: 'transparent' } }}
                >
                  {t.resetLabel}
                </Button>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
