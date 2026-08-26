'use client';
import { Box, Container, Typography, Grid, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { C, DISPLAY, MONO } from '../lib/constants';
import { content } from '../lib/content';
import { NODES } from '../lib/graph';
import { EcosystemBackdrop } from './EcosystemBackdrop';
import { useEcosystem } from '../model/useEcosystem';
import type { Lang } from '@/_shared/types/i18n';
interface Props { lang: Lang; }
export function EcosystemTablet({ lang }: Props) {
  const l = (lang as keyof typeof content) in content ? (lang as keyof typeof content) : 'es';
  const t = content[l];
  const { hoveredNode, selectedNode, hoverNode, selectNode } = useEcosystem();
  const handleHover = (id: string | null) => hoverNode(id);
  const handleSelect = (id: string | null) => selectNode(id);
  return (
    <Box component="section" sx={{ position: 'relative', minHeight: '100vh', bgcolor: C.bg, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', py: { xs: 4, md: 6 } }}>
      <EcosystemBackdrop />
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.16em', color: C.accent, mb: 1.5 }}>{t.kicker}</Typography>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: { xs: '2rem', md: '3rem' }, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: `0 0 60px ${C.glow}` }}>{t.title}</Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.9rem', color: C.textMute, mt: 2, letterSpacing: '0.04em', maxWidth: 500, mx: 'auto' }}>{t.subtitle}</Typography>
        </Box>
        <Grid container spacing={3} justifyContent="center">
          {NODES.filter(n => n.id !== 'core').map((node) => {
            const isHovered = hoveredNode === node.id;
            const isSelected = selectedNode === node.id;
            const isDimmed = !!hoveredNode && !isHovered && !isSelected;
            return (
              <Grid item xs={6} sm={4} key={node.id}>
                <Box
                  component={motion.div}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onMouseEnter={() => handleHover(node.id)}
                  onMouseLeave={() => handleHover(null)}
                  onClick={() => handleSelect(isSelected ? null : node.id)}
                  sx={{
                    p: 2, borderRadius: '16px', textAlign: 'center', cursor: 'pointer',
                    bgcolor: isSelected ? C.accent : isHovered ? alpha(C.accent, 0.15) : 'transparent',
                    border: `1px solid ${isSelected ? C.accent : isHovered ? C.accentLine : C.border}`,
                    transition: 'all 0.2s ease', opacity: isDimmed ? 0.3 : 1,
                  }}
                >
                  <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.8rem', color: isSelected ? '#FFFFFF' : C.text, letterSpacing: '0.04em' }}>{node.label}</Typography>
                  {isSelected && <Box mt={1}>{node.metadata.map((item) => <Typography key={item} sx={{ fontFamily: MONO, fontSize: '0.6rem', color: alpha('#FFFFFF', 0.7), letterSpacing: '0.02em' }}>{item}</Typography>)}</Box>}
                </Box>
              </Grid>
            );
          })}
        </Grid>
        <Box sx={{ textAlign: 'center', mt: 6 }}>
          <motion.button
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            onClick={() => { if (window.gtag) window.gtag('event', 'ecosystem_cta_clicked'); }}
            style={{ appearance: 'none', border: 'none', background: 'transparent', color: C.accent, fontFamily: MONO, fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 0.8, padding: '8px 16px', borderRadius: '8px', transition: 'all 0.2s ease' }}
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
