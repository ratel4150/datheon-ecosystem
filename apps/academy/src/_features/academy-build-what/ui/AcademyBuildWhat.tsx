'use client';

import { Box, Container, Typography, Button, GlobalStyles } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useTheme, C, DARK, DISPLAY, MONO } from '@datheon/ui';
import { content, resolveLang, BUILD_OPTIONS } from '../lib';
import { useBuildWhat } from '../model';
import { BuildOptionCard } from './BuildOptionCard';
import { containerVariants, itemVariants } from './motionVariants';
import type { Lang } from '@datheon/i18n';

interface Props { lang: Lang; onContinue?: (selectedId: string) => void; }

export function AcademyBuildWhat({ lang, onContinue }: Props) {
  const l = resolveLang(lang, content);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;
  const { selectedId, select } = useBuildWhat();
  const selectedOption = BUILD_OPTIONS.find((o) => o.id === selectedId);

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: T.bg, py: { xs: 8, md: 10 }, minHeight: '100vh', display: 'flex', alignItems: 'center', transition: 'background-color 0.3s ease' }}>
      <GlobalStyles styles={{ '.bw-focus:focus-visible': { outline: `2px solid ${T.accent}`, outlineOffset: 2 } }} />
      <Container maxWidth="md">
        <Box component={motion.div} initial="hidden" animate="show" variants={containerVariants} sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
          <Box component={motion.div} variants={itemVariants} sx={{ mb: 1.5 }}>
            <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.16em', color: T.accent }}>{t.kicker}</Typography>
          </Box>
          <Box component={motion.div} variants={itemVariants} sx={{ mb: 2 }}>
            <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: { xs: '1.9rem', md: '2.6rem' }, color: T.text, letterSpacing: '-0.02em', lineHeight: 1.2 }}>{t.title}</Typography>
          </Box>
          <Box component={motion.div} variants={itemVariants}>
            <Typography sx={{ fontSize: '0.95rem', color: T.textMute, lineHeight: 1.7, maxWidth: 480, mx: 'auto' }}>{t.subtitle}</Typography>
          </Box>
        </Box>

        <Box component={motion.div} initial="hidden" animate="show" variants={containerVariants} sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 1.5 }}>
          {BUILD_OPTIONS.map((option) => (
            <BuildOptionCard key={option.id} option={option} selected={selectedId === option.id} T={T} onSelect={select} />
          ))}
        </Box>

        <AnimatePresence>
          {selectedOption && (
            <Box component={motion.div} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} sx={{ overflow: 'hidden', textAlign: 'center' }}>
              <Typography sx={{ fontFamily: MONO, fontSize: '0.82rem', color: selectedOption.color, fontWeight: 600, mt: 4, mb: onContinue ? 2.5 : 0 }}>{t.selectedNote}</Typography>
              {onContinue && (
                <Button
                  variant="contained" size="large" onClick={() => onContinue(selectedOption.id)} className="bw-focus" endIcon={<FiArrowRight size={15} />}
                  sx={{ bgcolor: selectedOption.color, color: '#fff', fontWeight: 700, fontSize: '0.9rem', px: 3.5, py: 1.3, borderRadius: '12px', textTransform: 'none', fontFamily: MONO, '&:hover': { bgcolor: selectedOption.color, opacity: 0.9 } }}
                >
                  {t.continueLabel}
                </Button>
              )}
            </Box>
          )}
        </AnimatePresence>
      </Container>
    </Box>
  );
}
