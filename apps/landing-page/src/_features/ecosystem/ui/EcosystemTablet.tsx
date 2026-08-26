'use client';

import { Box, Container, Typography, Grid, GlobalStyles, alpha } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, MONO, content, resolveLang, NODES, type NodeId } from '../lib';
import { useEcosystem } from '../model';
import { EcosystemBackdrop } from './EcosystemBackdrop';
import { EcosystemHeader } from './EcosystemHeader';
import { EcosystemCta } from './EcosystemCta';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function EcosystemTablet({ lang }: Props) {
  const l = resolveLang(lang, content);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;
  const prefersReducedMotion = useReducedMotion();

  const { hoveredNode, selectedNode, hoverNode, selectNode } = useEcosystem<NodeId>();
  const toggleSelect = (id: NodeId) => selectNode(selectedNode === id ? null : id);

  return (
    <Box
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
      <GlobalStyles styles={{ '.eco-focus:focus-visible, .eco-node-focus:focus-visible': { outline: `2px solid ${T.accent}`, outlineOffset: 3 } }} />
      <EcosystemBackdrop accent={T.accent} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <EcosystemHeader
          kicker={t.kicker}
          title={t.title}
          subtitle={t.subtitle}
          textColor={T.text}
          textMuteColor={T.textMute}
          accentColor={T.accent}
          glow={T.glow}
        />

        <Grid container spacing={3} justifyContent="center">
          {NODES.filter((n) => n.id !== 'core').map((node) => {
            const isHovered = hoveredNode === node.id;
            const isSelected = selectedNode === node.id;
            const isDimmed = !!hoveredNode && !isHovered && !isSelected;
            return (
              <Grid item xs={6} sm={4} key={node.id}>
                <Box
                  component={motion.div}
                  role="button"
                  tabIndex={0}
                  aria-label={node.label}
                  aria-pressed={isSelected}
                  className="eco-node-focus"
                  whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
                  whileTap={prefersReducedMotion ? undefined : { scale: 0.95 }}
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
                    p: 2,
                    borderRadius: '16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    bgcolor: isSelected ? T.accent : isHovered ? alpha(T.accent, 0.15) : 'transparent',
                    border: `1px solid ${isSelected ? T.accent : isHovered ? T.accentLine : T.border}`,
                    transition: 'background-color 0.2s ease, border-color 0.2s ease',
                    opacity: isDimmed ? 0.3 : 1,
                  }}
                >
                  <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.8rem', color: isSelected ? '#FFFFFF' : T.text, letterSpacing: '0.04em' }}>
                    {node.label}
                  </Typography>
                  {isSelected && (
                    <Box mt={1}>
                      {node.metadata.map((item) => (
                        <Typography key={item} sx={{ fontFamily: MONO, fontSize: '0.6rem', color: alpha('#FFFFFF', 0.75), letterSpacing: '0.02em' }}>
                          {item}
                        </Typography>
                      ))}
                    </Box>
                  )}
                </Box>
              </Grid>
            );
          })}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <EcosystemCta label={t.cta} accentColor={T.accent} accentBg={T.accentBg} delay={0.3} />
        </Box>
      </Container>
    </Box>
  );
}
