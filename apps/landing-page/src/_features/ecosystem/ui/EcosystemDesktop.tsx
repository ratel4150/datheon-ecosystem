'use client';
import { Box, Container, Typography, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { C, MONO, DISPLAY } from '../lib/constants';
import { NODES, EDGES } from '../lib/graph';
import { content } from '../lib/content';
import { useEcosystem } from '../model/useEcosystem';
import { EcosystemBackdrop } from './EcosystemBackdrop';
import type { Lang } from '@/_shared/types/i18n';
interface Props { lang: Lang; }
export function EcosystemDesktop({ lang }: Props) {
  const l = (lang as keyof typeof content) in content ? (lang as keyof typeof content) : 'es';
  const t = content[l];
  const { hoveredNode, selectedNode, hoverNode, selectNode } = useEcosystem();
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => { const timer = setTimeout(() => setIsVisible(true), 300); return () => clearTimeout(timer); }, []);
  const isActive = (id: string) => hoveredNode === id || selectedNode === id;
  const isDimmed = (id: string) => !!hoveredNode && hoveredNode !== id && selectedNode !== id;
  return (
    <Box component="section" sx={{ position: 'relative', minHeight: '100vh', bgcolor: C.bg, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', py: { xs: 4, md: 6 } }}>
      <EcosystemBackdrop />
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, height: '80vh', maxHeight: 700 }}>
        <Box sx={{ width: '100%', height: '100%', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none' }}>
            {EDGES.map((edge) => {
              const source = NODES.find(n => n.id === edge.source);
              const target = NODES.find(n => n.id === edge.target);
              if (!source || !target) return null;
              const active = isActive(source.id) || isActive(target.id);
              const dimmed = isDimmed(source.id) || isDimmed(target.id);
              const opacity = active ? 0.7 : dimmed ? 0.1 : 0.2;
              const stroke = active ? C.accent : C.border;
              const dx = target.x - source.x, dy = target.y - source.y;
              const mx = (source.x + target.x) / 2 + dy * 0.04, my = (source.y + target.y) / 2 - dx * 0.04;
              const d = `M ${source.x} ${source.y} Q ${mx} ${my} ${target.x} ${target.y}`;
              return (
                <motion.path
                  key={`${edge.source}-${edge.target}`}
                  d={d}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity }}
                  transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
                  stroke={stroke}
                  strokeWidth={active ? 1.8 : 0.8}
                  fill="none"
                  strokeLinecap="round"
                />
              );
            })}
          </svg>
          {NODES.map((node, i) => {
            const active = isActive(node.id);
            const dimmed = isDimmed(node.id);
            const isCore = node.id === 'core';
            const scale = active ? 1.15 : dimmed ? 0.8 : 1;
            const opacity = active ? 1 : dimmed ? 0.2 : 0.6;
            return (
              <Box
                key={node.id}
                component={motion.div}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale, opacity }}
                transition={{ delay: i * 0.08, type: 'spring', stiffness: 200, damping: 20 }}
                onMouseEnter={() => hoverNode(node.id)}
                onMouseLeave={() => hoverNode(null)}
                onClick={() => selectNode(selectedNode === node.id ? null : node.id)}
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
                  bgcolor: isCore ? `radial-gradient(circle at 30% 30%, ${C.accent}, ${C.accentDk})` : active ? C.accent : `rgba(74,158,255,0.06)`,
                  border: isCore ? `2px solid ${C.accent}` : active ? `1.5px solid ${C.accentLine}` : `1px solid ${C.border}`,
                  boxShadow: isCore ? `0 0 40px ${C.glow}, inset 0 0 40px rgba(74,158,255,0.05)` : active ? `0 0 20px ${C.glow}` : 'none',
                  backdropFilter: isCore ? 'none' : 'blur(4px)',
                  transition: 'all 0.3s ease',
                }}
              >
                <Typography sx={{ fontFamily: MONO, fontWeight: isCore ? 800 : 700, fontSize: isCore ? '0.85rem' : '0.6rem', color: isCore || active ? '#FFFFFF' : C.text, letterSpacing: '0.08em', textAlign: 'center', lineHeight: 1.2, px: 1, userSelect: 'none' }}>
                  {node.label}
                </Typography>
                {isCore && <Typography sx={{ fontFamily: MONO, fontWeight: 400, fontSize: '0.45rem', color: alpha(C.text, 0.5), letterSpacing: '0.12em', mt: 0.2 }}>AI ENGINEERING</Typography>}
                {active && !isCore && node.metadata.length > 0 && (
                  <Box sx={{ position: 'absolute', top: 'calc(100% + 12px)', left: '50%', transform: 'translateX(-50%)', width: 'max-content', maxWidth: 200, bgcolor: 'rgba(11,15,43,0.95)', backdropFilter: 'blur(12px)', border: `1px solid ${C.accentLine}`, borderRadius: '8px', px: 1.5, py: 1, zIndex: 30, textAlign: 'center' }}>
                    <Typography sx={{ fontFamily: MONO, fontSize: '0.55rem', color: C.textMute, letterSpacing: '0.04em', lineHeight: 1.6 }}>{node.metadata.join(' · ')}</Typography>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
        <Box sx={{ position: 'absolute', bottom: { xs: '10%', md: '12%' }, left: '50%', transform: 'translateX(-50%)', textAlign: 'center', width: '100%', maxWidth: 800, zIndex: 5 }}>
          <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.16em', color: C.accent, mb: 1.5 }}>{t.kicker}</Typography>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: { xs: '2rem', md: '3.5rem' }, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: `0 0 60px ${C.glow}` }}>{t.title}</Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: { xs: '0.8rem', md: '1rem' }, color: C.textMute, mt: 2, letterSpacing: '0.04em', maxWidth: 600, mx: 'auto' }}>{t.subtitle}</Typography>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => { if (window.gtag) window.gtag('event', 'ecosystem_cta_clicked'); }}
            style={{ appearance: 'none', border: 'none', background: 'transparent', color: C.accent, fontFamily: MONO, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 0.8, margin: '16px auto 0', padding: '8px 16px', borderRadius: '8px', transition: 'all 0.2s ease' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(74,158,255,0.08)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
          >
            {t.cta} <span style={{ fontSize: '1.1rem' }}>→</span>
          </motion.button>
        </Box>
      </Container>
    </Box>
  );
}
