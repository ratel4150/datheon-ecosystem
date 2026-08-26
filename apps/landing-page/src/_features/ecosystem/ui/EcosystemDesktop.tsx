'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Box, Container, Typography, GlobalStyles, alpha } from '@mui/material';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, MONO, content, resolveLang, NODES, EDGES, computeNarrative, edgeDepth, type NodeId, type EdgeData } from '../lib';
import { useEcosystem } from '../model';
import { EcosystemBackdrop } from './EcosystemBackdrop';
import { EcosystemHeader } from './EcosystemHeader';
import { EcosystemCta } from './EcosystemCta';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

const CORE_DELAY = 0.15;
const DEPTH_STEP = 0.45;

export function EcosystemDesktop({ lang }: Props) {
  const l = resolveLang(lang, content);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;
  const prefersReducedMotion = useReducedMotion();

  const { hoveredNode, selectedNode, hoverNode, selectNode } = useEcosystem<NodeId>();
  const toggleSelect = (id: NodeId) => selectNode(selectedNode === id ? null : id);
  const isActive = (id: NodeId) => hoveredNode === id || selectedNode === id;
  const isDimmed = (id: NodeId) => !!hoveredNode && hoveredNode !== id && selectedNode !== id;

  const depthMap = useMemo(() => computeNarrative(NODES, EDGES, 'core'), []);
  const maxDepth = useMemo(() => Math.max(0, ...Array.from(depthMap.values())), [depthMap]);
  const nodeDelay = (id: NodeId) => CORE_DELAY + (depthMap.get(id) ?? 0) * DEPTH_STEP;
  const edgeDelayFor = (edge: EdgeData) => Math.max(0, CORE_DELAY + edgeDepth(edge, depthMap) * DEPTH_STEP - 0.18);
  const totalNarrativeDuration = CORE_DELAY + (maxDepth + 1) * DEPTH_STEP + 0.25;

  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  const [graphRevealed, setGraphRevealed] = useState(false);

  useEffect(() => {
    if (!isInView) return;
    const ms = prefersReducedMotion ? 0 : totalNarrativeDuration * 1000;
    const timer = setTimeout(() => setGraphRevealed(true), ms);
    return () => clearTimeout(timer);
  }, [isInView, totalNarrativeDuration, prefersReducedMotion]);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: 'relative',
        minHeight: '100vh',
        bgcolor: T.bg,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, md: 6 },
        transition: 'background-color 0.3s ease',
      }}
    >
      <GlobalStyles
        styles={{
          '.eco-focus:focus-visible': { outline: `2px solid ${T.accent}`, outlineOffset: 3, borderRadius: 4 },
          '.eco-node-focus:focus-visible': { outline: `2px solid ${T.accent}`, outlineOffset: 4 },
        }}
      />
      <EcosystemBackdrop accent={T.accent} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, height: '80vh', maxHeight: 700 }}>
        <Box sx={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}
          >
            {EDGES.map((edge) => {
              const source = NODES.find((n) => n.id === edge.source);
              const target = NODES.find((n) => n.id === edge.target);
              if (!source || !target) return null;
              const active = isActive(source.id) || isActive(target.id);
              const dimmed = isDimmed(source.id) || isDimmed(target.id);
              const opacityTarget = active ? 0.7 : dimmed ? 0.1 : 0.2;
              const stroke = active ? T.accent : T.border;
              const dx = target.x - source.x;
              const dy = target.y - source.y;
              const mx = (source.x + target.x) / 2 + dy * 0.04;
              const my = (source.y + target.y) / 2 - dx * 0.04;
              const d = `M ${source.x} ${source.y} Q ${mx} ${my} ${target.x} ${target.y}`;
              const delay = prefersReducedMotion ? 0 : edgeDelayFor(edge);

              return (
                <motion.path
                  key={`${edge.source}-${edge.target}`}
                  d={d}
                  animate={{ pathLength: isInView ? 1 : 0, opacity: isInView ? opacityTarget : 0 }}
                  transition={
                    !graphRevealed
                      ? {
                          pathLength: { delay, duration: prefersReducedMotion ? 0 : 0.7, ease: 'easeOut' },
                          opacity: { delay, duration: prefersReducedMotion ? 0 : 0.4 },
                        }
                      : { pathLength: { duration: 0 }, opacity: { duration: 0.3 } }
                  }
                  stroke={stroke}
                  strokeWidth={active ? 1.8 : 0.8}
                  fill="none"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>

          {NODES.map((node) => {
            const active = isActive(node.id);
            const dimmed = isDimmed(node.id);
            const isCore = node.id === 'core';
            const scaleTarget = active ? 1.15 : dimmed ? 0.8 : 1;
            const opacityTarget = active ? 1 : dimmed ? 0.2 : 0.6;
            const delay = prefersReducedMotion ? 0 : nodeDelay(node.id);

            return (
              <Box
                key={node.id}
                component={motion.div}
                role="button"
                tabIndex={0}
                aria-label={node.label}
                aria-pressed={selectedNode === node.id}
                className="eco-node-focus"
                animate={{ scale: isInView ? scaleTarget : 0, opacity: isInView ? opacityTarget : 0 }}
                transition={
                  !graphRevealed
                    ? { delay, type: 'spring', stiffness: 200, damping: 20 }
                    : { duration: 0.25, ease: 'easeOut' }
                }
                onMouseEnter={() => hoverNode(node.id)}
                onMouseLeave={() => hoverNode(null)}
                onFocus={() => hoverNode(node.id)}
                onBlur={() => hoverNode(null)}
                onClick={() => toggleSelect(node.id)}
                onKeyDown={(e: React.KeyboardEvent) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    toggleSelect(node.id);
                  }
                }}
                sx={{
                  position: 'absolute',
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: node.radius,
                  height: node.radius,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  zIndex: active ? 20 : isCore ? 10 : 5,
                  bgcolor: isCore ? T.accentDk : active ? T.accent : alpha(T.accent, 0.06),
                  border: isCore ? `2px solid ${T.accent}` : active ? `1.5px solid ${T.accentLine}` : `1px solid ${T.border}`,
                  boxShadow: isCore ? `0 0 40px ${T.glow}` : active ? `0 0 20px ${T.glow}` : 'none',
                  backdropFilter: isCore ? 'none' : 'blur(4px)',
                  transition: 'background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: MONO,
                    fontWeight: isCore ? 800 : 700,
                    fontSize: isCore ? '0.85rem' : '0.6rem',
                    color: isCore || active ? '#FFFFFF' : T.text,
                    letterSpacing: '0.08em',
                    textAlign: 'center',
                    lineHeight: 1.2,
                    px: 1,
                    userSelect: 'none',
                  }}
                >
                  {node.label}
                </Typography>
                {isCore && (
                  <Typography sx={{ fontFamily: MONO, fontWeight: 400, fontSize: '0.45rem', color: alpha('#FFFFFF', 0.6), letterSpacing: '0.12em', mt: 0.2 }}>
                    AI ENGINEERING
                  </Typography>
                )}
                {active && !isCore && node.metadata.length > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 'calc(100% + 12px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 'max-content',
                      maxWidth: 200,
                      bgcolor: isDark ? 'rgba(11,15,43,0.95)' : 'rgba(255,255,255,0.97)',
                      backdropFilter: 'blur(12px)',
                      border: `1px solid ${T.accentLine}`,
                      borderRadius: '8px',
                      px: 1.5,
                      py: 1,
                      zIndex: 30,
                      textAlign: 'center',
                      boxShadow: `0 8px 24px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.08)'}`,
                    }}
                  >
                    <Typography sx={{ fontFamily: MONO, fontSize: '0.55rem', color: T.textMute, letterSpacing: '0.04em', lineHeight: 1.6 }}>
                      {node.metadata.join(' · ')}
                    </Typography>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>

        <Box sx={{ position: 'absolute', bottom: { xs: '10%', md: '12%' }, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 800, zIndex: 5 }}>
          <EcosystemHeader
            kicker={t.kicker}
            title={t.title}
            subtitle={t.subtitle}
            textColor={T.text}
            textMuteColor={T.textMute}
            accentColor={T.accent}
            glow={T.glow}
            titleSize={{ xs: '2rem', md: '3.5rem' }}
            maxWidth={600}
            mb={{ xs: 0, md: 0 }}
            entranceDelay={totalNarrativeDuration}
          />
          <Box sx={{ textAlign: 'center' }}>
            <EcosystemCta label={t.cta} accentColor={T.accent} accentBg={T.accentBg} delay={totalNarrativeDuration + 0.5} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
