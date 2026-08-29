'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, GlobalStyles } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, DISPLAY, MONO, STACK_LAYERS, content, resolveLang } from '../lib';
import { useTechnologyStack } from '../model';
import { StackHUD } from './StackHUD';
import { StackLayer } from './StackLayer';
import { StackConnection } from './StackConnection';
import { containerVariants, itemVariants } from './animation/stackVariants';
import type { Lang } from '@/_shared/types/i18n';

interface StackExplorerProps {
  lang: Lang;
  compact?: boolean;
  enableHover?: boolean;
}

export function StackExplorer({ lang, compact = false, enableHover = true }: StackExplorerProps) {
  const l = resolveLang(lang, content);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const { displayedLayerId, selectedTechId, traceSequence, selectLayer, hoverLayer, selectTech } = useTechnologyStack(STACK_LAYERS[3].id);

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: T.bg, overflow: 'hidden', py: { xs: 8, md: 10 }, transition: 'background-color 0.3s ease' }}>
      <GlobalStyles styles={{ '.ts-focus:focus-visible': { outline: `2px solid ${T.accent}`, outlineOffset: 2 } }} />

      <Container maxWidth={compact ? 'sm' : 'md'} sx={{ position: 'relative', zIndex: 1 }}>
        <Box component={motion.div} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.4 }} variants={containerVariants} sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}>
          <Box component={motion.div} variants={itemVariants} sx={{ mb: 0.5 }}>
            <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.76rem', letterSpacing: '0.16em', color: T.text, transition: 'color 0.3s ease' }}>{t.kicker}</Typography>
          </Box>
          <Box component={motion.div} variants={itemVariants} sx={{ mt: 2.5, mb: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: { xs: '2.1rem', sm: '2.5rem', md: '2.9rem', lg: '3.2rem' },
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: T.text,
                transition: 'color 0.3s ease',
              }}
            >
              {t.title}
            </Typography>
          </Box>
          <Box component={motion.div} variants={itemVariants} sx={{ mb: 1 }}>
            <Typography sx={{ fontFamily: MONO, fontSize: '0.85rem', color: T.accent, fontWeight: 600 }}>{t.subtitle}</Typography>
          </Box>
          <Box component={motion.div} variants={itemVariants}>
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.05rem' }, color: T.textMute, maxWidth: 480, mx: 'auto', lineHeight: 1.75, fontWeight: 400, transition: 'color 0.3s ease' }}>
              {t.body}
            </Typography>
          </Box>
        </Box>

        <StackHUD displayedLayerId={displayedLayerId} selectedTechId={selectedTechId} techCountWord={t.hudTechCountWord} traceLabel={t.traceLabel} T={T} />

        <Box component={motion.div} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.1 }} variants={containerVariants}>
          {STACK_LAYERS.map((layer, i) => {
            const traceIndex = traceSequence.indexOf(layer.id);
            return (
              <Box key={layer.id}>
                <StackLayer
                  layer={layer}
                  isDisplayed={displayedLayerId === layer.id}
                  isDimmed={displayedLayerId !== layer.id && (!!selectedTechId ? traceIndex === -1 : false)}
                  traceOrder={traceIndex >= 0 ? traceIndex + 1 : null}
                  selectedTechId={selectedTechId}
                  enableHover={enableHover}
                  T={T}
                  onSelect={selectLayer}
                  onHover={hoverLayer}
                  onSelectTech={selectTech}
                />
                {i < STACK_LAYERS.length - 1 && (
                  <StackConnection active={displayedLayerId === layer.id || displayedLayerId === STACK_LAYERS[i + 1].id} reducedMotion={reducedMotion} T={T} delay={i * 0.08} />
                )}
              </Box>
            );
          })}
        </Box>

        {selectedTechId && <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: T.textMute, textAlign: 'center', mt: 2 }}>{t.traceHint}</Typography>}

        <Box sx={{ textAlign: 'center', mt: { xs: 6, md: 7 }, pt: { xs: 5, md: 6 }, borderTop: `1px solid ${T.border}` }}>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.5rem' }, color: T.text, mb: 2.5, letterSpacing: '-0.01em' }}>
            {t.closingHeadline}
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<FiArrowRight size={15} />}
            className="ts-focus"
            sx={{
              bgcolor: T.accent,
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.85rem',
              px: 3,
              py: 1.2,
              borderRadius: '10px',
              textTransform: 'none',
              fontFamily: MONO,
              '&:hover': { bgcolor: T.accentDk },
            }}
          >
            {t.closingCta}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
