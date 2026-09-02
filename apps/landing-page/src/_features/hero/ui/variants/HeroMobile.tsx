// File: apps/landing-page/src/_features/hero/ui/variants/HeroMobile.tsx

'use client';

import { Box, Typography, Container, Button, alpha, useTheme as useMuiTheme, GlobalStyles } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useMemo, useRef } from 'react';
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

interface HeroMobileProps {
  lang: Lang;
}

export function HeroMobile({ lang }: HeroMobileProps) {
  const t = content[lang];
  const { sectionRef, handleCTA } = useHero(lang);
  const panelRef = useRef(null);
  const panelInView = useInView(panelRef, { once: true, margin: '-40px' });
  const { nodes, edges } = useMemo(() => buildGraph(panelInView), [panelInView]);
  const muiTheme = useMuiTheme();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Colores dinámicos para dark mode (mismos que HeroDesktop)
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

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
  };
  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: 'relative',
        bgcolor: bgColor,
        overflow: 'hidden',
        pt: { xs: 7, sm: 8 },
        pb: { xs: 6, sm: 7 },
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
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
            '50%': { boxShadow: `0 10px 32px ${isDark ? 'rgba(74, 158, 255, 0.6)' : 'rgba(0,174,239,0.65)'}` },
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

      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3 } }}>
        <Box component={motion.div} variants={container} initial="hidden" animate="show">
          {/* Kicker */}
          <Box component={motion.div} variants={container} sx={{ mb: 2, textAlign: 'center' }}>
            <Typography
              sx={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.16em',
                color: accentColor,
                mb: 0.3,
                textTransform: 'uppercase',
              }}
            >
              {t.kicker}
            </Typography>
            <Typography
              sx={{
                fontFamily: MONO,
                fontWeight: 500,
                fontSize: '0.6rem',
                letterSpacing: '0.13em',
                color: textMuteColor,
                textTransform: 'uppercase',
              }}
            >
              {t.kickerSub}
            </Typography>
          </Box>

          {/* Título */}
          <Box component={motion.div} variants={container} sx={{ textAlign: 'center', mb: 2 }}>
            <Typography
              variant="h1"
              sx={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: '2rem',
                lineHeight: 1.2,
                color: textColor,
                letterSpacing: '-0.02em',
              }}
            >
              {t.titleLine1}
              <Box component="span" sx={{ display: 'block' }}>
                {t.titleLine2Lead}
                <Box component="span" sx={{ color: accentColor }}>
                  {t.titleLine2Accent}
                </Box>
              </Box>
            </Typography>
          </Box>

          {/* Descripción */}
          <Box component={motion.div} variants={container} sx={{ textAlign: 'center', mb: 3 }}>
            <Typography
              sx={{
                fontSize: '0.95rem',
                color: textMidColor,
                lineHeight: 1.7,
                mx: 'auto',
                maxWidth: 420,
              }}
            >
              {t.subheadline}
            </Typography>
          </Box>

          {/* Segmentos */}
          <Box component={motion.div} variants={container} sx={{ textAlign: 'center', mb: 3 }}>
            <Typography
              sx={{
                fontFamily: MONO,
                fontSize: '0.65rem',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
                color: textMuteColor,
              }}
            >
              {t.segments.join('  ·  ')}
            </Typography>
          </Box>

          {/* Botones */}
          <Box
            component={motion.div}
            variants={container}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1.5,
              mb: 3,
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={handleCTA('construir')}
              component={motion.button}
              whileTap={{ scale: 0.97 }}
              endIcon={<FiArrowRight size={16} />}
              fullWidth
              sx={{
                bgcolor: accentColor,
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.9rem',
                py: 1.3,
                borderRadius: '14px',
                textTransform: 'none',
                boxShadow: `0 4px 16px ${alpha(accentColor, 0.35)}`,
                '&:hover': {
                  bgcolor: accentDkColor,
                  boxShadow: `0 8px 24px ${alpha(accentColor, 0.45)}`,
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              {t.cta1}
            </Button>

            <Box
              component={motion.button}
              onClick={handleCTA('capacidades')}
              whileTap={{ scale: 0.97 }}
              type="button"
              sx={{
                appearance: 'none',
                bgcolor: 'transparent',
                border: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.6,
                fontFamily: 'inherit',
                fontSize: '0.85rem',
                fontWeight: 600,
                color: textMidColor,
                pb: 0.2,
                borderBottom: `1px solid transparent`,
                transition: 'color 0.2s ease, border-color 0.2s ease',
                '&:hover': {
                  color: accentColor,
                  borderColor: accentColor,
                },
              }}
            >
              {t.cta2}
              <FiArrowRight size={13} />
            </Box>
          </Box>

          {/* Microcopy */}
          <Box component={motion.div} variants={container} sx={{ textAlign: 'center', mb: 4 }}>
            <Typography sx={{ fontSize: '0.75rem', color: textMuteColor }}>
              {t.microcopy}
            </Typography>
          </Box>

          {/* Mini React Flow Diagram */}
          <Box
            ref={panelRef}
            component={motion.div}
            variants={container}
            initial={{ opacity: 0, y: 20 }}
            animate={panelInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            sx={{
              position: 'relative',
              bgcolor: panelBg,
              borderRadius: '16px',
              border: `1px solid ${panelBorder}`,
              boxShadow: `0 12px 40px ${shadowColor}`,
              overflow: 'hidden',
              mb: 4,
              transition: 'background-color 0.3s ease, border-color 0.3s ease',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                px: 2,
                py: 1.2,
                borderBottom: `1px solid ${panelBorder}`,
                bgcolor: statsBg,
                transition: 'background-color 0.3s ease',
              }}
            >
              <Typography
                sx={{
                  fontFamily: MONO,
                  fontSize: '0.6rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  color: textMidColor,
                }}
              >
                {t.panelLabel}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: accentColor,
                    animation: 'pulse 2s ease-in-out infinite',
                    '@keyframes pulse': {
                      '0%,100%': { opacity: 1 },
                      '50%': { opacity: 0.3 },
                    },
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: MONO,
                    fontSize: '0.55rem',
                    letterSpacing: '0.04em',
                    textTransform: 'uppercase',
                    color: accentDkColor,
                    fontWeight: 600,
                  }}
                >
                  {t.panelStatus}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ height: 280, position: 'relative' }}>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                edgeTypes={edgeTypes}
                fitView
                fitViewOptions={{ padding: 0.2 }}
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
                <Background
                  variant={BackgroundVariant.Dots}
                  gap={16}
                  size={1}
                  color={isDark ? 'rgba(74, 158, 255, 0.08)' : 'rgba(0,174,239,0.06)'}
                />
              </ReactFlow>
            </Box>
          </Box>

          {/* Tagline */}
          <Box
            component={motion.div}
            variants={item}
            sx={{ textAlign: 'center' }}
          >
            <Typography
              sx={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                fontSize: '1rem',
                color: textColor,
                mb: 0.5,
                transition: 'color 0.3s ease',
              }}
            >
              {t.tagline}
            </Typography>
            <Typography
              sx={{
                fontFamily: MONO,
                fontSize: '0.65rem',
                letterSpacing: '0.03em',
                color: textMuteColor,
                transition: 'color 0.3s ease',
              }}
            >
              {t.stackLine}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
