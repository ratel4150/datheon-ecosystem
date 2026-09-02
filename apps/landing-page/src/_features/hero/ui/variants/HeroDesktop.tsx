// File: apps/landing-page/src/_features/hero/ui/variants/HeroDesktop.tsx
'use client';

import { Box, Typography, Container, Button, GlobalStyles, alpha, useTheme as useMuiTheme } from '@mui/material';
import { motion } from 'framer-motion';
import { useMemo } from 'react';
import ReactFlow, { Background, BackgroundVariant } from 'reactflow';
import 'reactflow/dist/style.css';
import { FiArrowRight } from 'react-icons/fi';
import { content } from '../../lib/content';
import { C, DISPLAY, MONO } from '../../lib/constants';
import { buildGraph } from '../../lib/graph';
import { useHero } from '../../model/useHero';
import { WaveBackdrop } from '../WaveBackdrop';
import { FlowNode } from '../FlowNode';
import { FlowEdge } from '../FlowEdge';
import type { Lang } from '@/_shared/types/i18n';
import { useTheme } from '@/_shared/lib/theme';

const nodeTypes = { flowNode: FlowNode };
const edgeTypes = { flowEdge: FlowEdge };

interface HeroDesktopProps {
  lang: Lang;
}

export function HeroDesktop({ lang }: HeroDesktopProps) {
  const t = content[lang];
  const { sectionRef, isInView, handleCTA } = useHero(lang);
  const { nodes, edges } = useMemo(() => buildGraph(isInView), [isInView]);
  const { theme } = useTheme();
  const muiTheme = useMuiTheme();
  const isDark = theme === 'dark';
  

  // Colores según el tema
  const bgColor = isDark ? '#0B0F2B' : C.bg;
  const textColor = isDark ? '#F5F5F5' : C.text;
  const textMidColor = isDark ? '#A0A0B8' : C.textMid;
  const textMuteColor = isDark ? '#707090' : C.textMute;
  const accentColor = isDark ? '#4A9EFF' : C.accent;
  const accentDkColor = isDark ? '#3A8AFF' : C.accentDk;
  const borderColor = isDark ? '#1a1a3a' : C.border;
  const panelBg = isDark ? '#121735' : '#FFFFFF';
  const panelBorder = isDark ? '#1a1a3a' : C.border;
  const statsBg = isDark ? '#0F1330' : C.statsB;
  const shadowColor = isDark ? 'rgba(0,0,0,0.4)' : 'rgba(11,15,43,0.08)';
  const glowColor = isDark ? 'rgba(74, 158, 255, 0.3)' : 'rgba(0,174,239,0.14)';
  const glowResultColor = isDark ? 'rgba(74, 158, 255, 0.6)' : 'rgba(0,174,239,0.65)';

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: 'relative',
        bgcolor: bgColor,
        overflow: 'hidden',
        pt: { xs: 9, md: 10 },
        pb: { xs: 8, md: 9 },
        transition: 'background-color 0.3s ease',
      }}
    >
      <GlobalStyles
        styles={{
          '.datheon-flow-pulse': { animation: 'datheonDash 2.6s linear infinite' },
          '@keyframes datheonDash': { to: { strokeDashoffset: -150 } },
          '.df-glow-node': { animation: 'dfGlow 3.6s ease-in-out infinite' },
          '@keyframes dfGlow': {
            '0%, 100%': { boxShadow: `0 2px 8px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(11,15,43,0.04)'}` },
            '50%': { boxShadow: `0 0 0 4px ${glowColor}` },
          },
          '.df-glow-result': { animation: 'dfGlowResult 3.6s ease-in-out infinite' },
          '@keyframes dfGlowResult': {
            '0%, 100%': { boxShadow: `0 10px 26px ${isDark ? 'rgba(74, 158, 255, 0.3)' : 'rgba(0,174,239,0.4)'}` },
            '50%': { boxShadow: `0 10px 32px ${glowResultColor}` },
          },
          '.wave-layer-1': { animation: 'waveDrift1 22s ease-in-out infinite alternate' },
          '.wave-layer-2': { animation: 'waveDrift2 28s ease-in-out infinite alternate' },
          '.wave-layer-3': { animation: 'waveDrift3 17s ease-in-out infinite alternate' },
          '@keyframes waveDrift1': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-26px)' } },
          '@keyframes waveDrift2': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(22px)' } },
          '@keyframes waveDrift3': { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-16px)' } },
          '@media (prefers-reduced-motion: reduce)': {
            '.datheon-flow-pulse, .df-glow-node, .df-glow-result, .wave-layer': { animation: 'none' },
          },
        }}
      />

      <WaveBackdrop />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
          gap: { xs: 7, md: 6 },
          alignItems: 'center',
        }}>
          {/* Columna izquierda */}
          <Box component={motion.div} variants={container} initial="hidden" animate="show">
            <Box component={motion.div} variants={item} sx={{ mb: 3 }}>
              <Typography sx={{
                fontFamily: MONO, fontWeight: 700, fontSize: '0.76rem',
                letterSpacing: '0.16em', color: textColor, mb: 0.5,
              }}>
                {t.kicker}
              </Typography>
              <Typography sx={{
                fontFamily: MONO, fontWeight: 500, fontSize: '0.64rem',
                letterSpacing: '0.13em', color: textMuteColor,
              }}>
                {t.kickerSub}
              </Typography>
            </Box>

            <Box component={motion.div} variants={item}>
              <Typography variant="h1" sx={{
                fontFamily: DISPLAY, fontWeight: 800,
                fontSize: { xs: '2.1rem', sm: '2.5rem', md: '2.9rem', lg: '3.2rem' },
                lineHeight: 1.2, letterSpacing: '-0.02em', color: textColor,
              }}>
                {t.titleLine1}
                <Box component="span" sx={{ display: 'block' }}>
                  {t.titleLine2Lead}<Box component="span" sx={{ color: accentColor }}>{t.titleLine2Accent}</Box>
                </Box>
              </Typography>
            </Box>

            <Box component={motion.div} variants={item}>
              <Typography sx={{
                fontSize: { xs: '1rem', md: '1.05rem' }, color: textMidColor,
                maxWidth: 480, lineHeight: 1.75, fontWeight: 400, mt: 2.5, mb: 3,
              }}>
                {t.subheadline}
              </Typography>
            </Box>

            <Box component={motion.div} variants={item} sx={{ mb: 4 }}>
              <Typography sx={{
                fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.07em',
                textTransform: 'uppercase', color: textMuteColor,
              }}>
                {t.segments.join('  ·  ')}
              </Typography>
            </Box>

            <Box
              component={motion.div}
              variants={item}
              sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 1.5, sm: 3 }, mb: 1.5 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleCTA('construir')}
                component={motion.button}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                endIcon={<FiArrowRight size={15} />}
                sx={{
                  bgcolor: accentColor, color: '#fff', fontWeight: 700, fontSize: '0.93rem',
                  px: 3.5, py: 1.4, borderRadius: '12px', textTransform: 'none',
                  boxShadow: `0 4px 20px ${alpha(accentColor, 0.35)}`,
                  '&:hover': { bgcolor: accentDkColor, boxShadow: `0 8px 28px ${alpha(accentColor, 0.45)}` },
                }}
              >
                {t.cta1}
              </Button>

              <Box
                component={motion.button}
                onClick={handleCTA('capacidades')}
                whileHover={{ y: -1 }}
                type="button"
                sx={{
                  appearance: 'none', bgcolor: 'transparent', border: 'none', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: 0.6,
                  fontFamily: 'inherit', fontSize: '0.88rem', fontWeight: 600, color: textMidColor,
                  pb: 0.3, borderBottom: '1px solid transparent',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  '&:hover': { color: accentColor, borderColor: 'rgba(74, 158, 255, 0.3)' },
                }}
              >
                {t.cta2}
                <FiArrowRight size={13} />
              </Box>
            </Box>

            <Box component={motion.div} variants={item}>
              <Typography sx={{ fontSize: '0.78rem', color: textMuteColor }}>
                {t.microcopy}
              </Typography>
            </Box>
          </Box>

          {/* Columna derecha: diagrama */}
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            sx={{
              position: 'relative',
              bgcolor: panelBg,
              borderRadius: '16px',
              border: `1px solid ${panelBorder}`,
              boxShadow: `0 24px 60px ${shadowColor}`,
              overflow: 'hidden',
              transition: 'background-color 0.3s ease, border-color 0.3s ease',
            }}
          >
            <Box sx={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              px: 2.5, py: 1.5, borderBottom: `1px solid ${panelBorder}`,
              bgcolor: statsBg,
              transition: 'background-color 0.3s ease',
            }}>
              <Typography sx={{
                fontFamily: MONO, fontSize: '0.64rem', letterSpacing: '0.05em',
                textTransform: 'uppercase', color: textMidColor,
              }}>
                {t.panelLabel}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
                <Box sx={{
                  width: 6, height: 6, borderRadius: '50%', bgcolor: accentColor,
                  animation: 'pulse 2s ease-in-out infinite',
                  '@keyframes pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
                }} />
                <Typography sx={{
                  fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.04em',
                  textTransform: 'uppercase', color: accentDkColor, fontWeight: 600,
                }}>
                  {t.panelStatus}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ height: { xs: 460, md: 560 }, position: 'relative' }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                fitViewOptions={{ padding: 0.14 }}
                proOptions={{ hideAttribution: true }}
                nodesDraggable={false}
                nodesConnectable={false}
                elementsSelectable={false}
                panOnDrag={false}
                panOnScroll={false}
                zoomOnScroll={false}
                zoomOnPinch={false}
                zoomOnDoubleClick={false}
                preventScrolling={false}
                style={{ background: 'transparent' }}
              >
                <Background variant={BackgroundVariant.Dots} gap={20} size={1} color={isDark ? 'rgba(74, 158, 255, 0.08)' : 'rgba(0,174,239,0.06)'} />
              </ReactFlow>
            </Box>
          </Box>
        </Box>

        {/* Tagline de cierre */}
        <Box
          component={motion.div}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          sx={{ textAlign: 'center', mt: { xs: 6, md: 7 } }}
        >
          <Typography sx={{
            fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.05rem', md: '1.2rem' },
            color: textColor, mb: 1,
            transition: 'color 0.3s ease',
          }}>
            {t.tagline}
          </Typography>
          <Typography sx={{
            fontFamily: MONO, fontSize: '0.72rem', letterSpacing: '0.03em',
            color: textMuteColor,
            transition: 'color 0.3s ease',
          }}>
            {t.stackLine}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}