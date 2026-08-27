'use client';

import { Box, Container, Typography, Button, Alert } from '@mui/material';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, MONO, content, resolveLang, findPath } from '../lib';
import { useSolutionBuilder } from '../model';
import { SolutionsHeader } from './SolutionsHeader';
import { PathGrid } from './PathGrid';
import { SubOptionGrid } from './SubOptionGrid';
import { BlocklyDiagram } from './BlocklyDiagram';
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

  const handleGenerate = () => {
    if (!activePath || !selectedSubOptionId) return;
    const subOption = activePath.subOptions.find((o) => o.id === selectedSubOptionId);
    if (!subOption) return;
    generate({ pathId: activePath.id, pathLabel: activePath.label, subOptionId: subOption.id, subOptionLabel: subOption.label });
  };

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: T.bg, overflow: 'hidden', py: { xs: 8, md: 10 }, transition: 'background-color 0.3s ease' }}>
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <SolutionsHeader kicker={t.kicker} title={t.title} subtitle={t.subtitle} textColor={T.text} textMuteColor={T.textMute} accentColor={T.accent} glow={T.glow} />

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
                T={T}
                onSelectSubOption={selectSubOption}
                onBack={reset}
                onGenerate={handleGenerate}
              />
              {status === 'error' && (
                <Alert severity="error" sx={{ mt: 2, fontFamily: MONO, fontSize: '0.78rem' }}>
                  {errorMessage ?? t.errorLabel}
                </Alert>
              )}
            </motion.div>
          )}

          {activePath && status === 'success' && diagram && (
            <motion.div key="result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.9rem', color: T.text, mb: 2, textAlign: 'center' }}>{t.resultTitle}</Typography>
              <BlocklyDiagram tree={diagram} T={T} />
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                  onClick={reset}
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
