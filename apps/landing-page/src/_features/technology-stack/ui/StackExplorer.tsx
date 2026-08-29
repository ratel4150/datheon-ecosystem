'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, GlobalStyles } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { DISPLAY, MONO, STACK, STACK_LAYERS, content, resolveLang } from '../lib';
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
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  const { displayedLayerId, selectedTechId, traceSequence, selectLayer, hoverLayer, selectTech } = useTechnologyStack(STACK_LAYERS[3].id);

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: STACK.bg, overflow: 'hidden', py: { xs: 8, md: 10 } }}>
      <GlobalStyles styles={{ '.ts-focus:focus-visible': { outline: `2px solid ${STACK.accent}`, outlineOffset: 2 } }} />

      <Container maxWidth={compact ? 'sm' : 'md'} sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          component={motion.div}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={containerVariants}
          sx={{ textAlign: 'center', mb: { xs: 5, md: 6 } }}
        >
          <Box component={motion.div} variants={itemVariants} sx={{ mb: 1.5 }}>
            <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.16em', color: STACK.accent }}>{t.kicker}</Typography>
          </Box>
          <Box component={motion.div} variants={itemVariants} sx={{ mb: 1.5 }}>
            <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.4rem' }, color: STACK.text, letterSpacing: '-0.02em', lineHeight: 1.15 }}>
              {t.title}
            </Typography>
          </Box>
          <Box component={motion.div} variants={itemVariants} sx={{ mb: 1 }}>
            <Typography sx={{ fontFamily: MONO, fontSize: '0.85rem', color: STACK.textMid }}>{t.subtitle}</Typography>
          </Box>
          <Box component={motion.div} variants={itemVariants}>
            <Typography sx={{ fontSize: '0.9rem', color: STACK.textMute, maxWidth: 440, mx: 'auto', lineHeight: 1.7 }}>{t.body}</Typography>
          </Box>
        </Box>

        <StackHUD displayedLayerId={displayedLayerId} selectedTechId={selectedTechId} techCountWord={t.hudTechCountWord} traceLabel={t.traceLabel} />

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
                  onSelect={selectLayer}
                  onHover={hoverLayer}
                  onSelectTech={selectTech}
                />
                {i < STACK_LAYERS.length - 1 && (
                  <StackConnection active={displayedLayerId === layer.id || displayedLayerId === STACK_LAYERS[i + 1].id} reducedMotion={reducedMotion} delay={i * 0.08} />
                )}
              </Box>
            );
          })}
        </Box>

        {selectedTechId && (
          <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: STACK.textMute, textAlign: 'center', mt: 2 }}>{t.traceHint}</Typography>
        )}

        <Box sx={{ textAlign: 'center', mt: { xs: 6, md: 7 }, pt: { xs: 5, md: 6 }, borderTop: `1px solid ${STACK.border}` }}>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.5rem' }, color: STACK.text, mb: 2.5, letterSpacing: '-0.01em' }}>
            {t.closingHeadline}
          </Typography>
          <Button
            variant="contained"
            size="large"
            endIcon={<FiArrowRight size={15} />}
            className="ts-focus"
            sx={{
              bgcolor: STACK.accent,
              color: '#031018',
              fontWeight: 700,
              fontSize: '0.85rem',
              px: 3,
              py: 1.2,
              borderRadius: '10px',
              textTransform: 'none',
              fontFamily: MONO,
              '&:hover': { bgcolor: STACK.accent, opacity: 0.85 },
            }}
          >
            {t.closingCta}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
