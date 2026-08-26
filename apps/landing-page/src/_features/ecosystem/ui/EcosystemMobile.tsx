'use client';
import { Box, Container, Typography, Accordion, AccordionSummary, AccordionDetails, alpha } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import { motion } from 'framer-motion';
import { C, DISPLAY, MONO } from '../lib/constants';
import { content } from '../lib/content';
import { NODES } from '../lib/graph';
import { EcosystemBackdrop } from './EcosystemBackdrop';
import type { Lang } from '@/_shared/types/i18n';
interface Props { lang: Lang; }
export function EcosystemMobile({ lang }: Props) {
  const l = (lang as keyof typeof content) in content ? (lang as keyof typeof content) : 'es';
  const t = content[l];
  return (
    <Box component="section" sx={{ position: 'relative', minHeight: '100vh', bgcolor: C.bg, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', py: { xs: 4, md: 6 } }}>
      <EcosystemBackdrop />
      <Container maxWidth="sm" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.16em', color: C.accent, mb: 1.5 }}>{t.kicker}</Typography>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: '1.8rem', color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1.1, textShadow: `0 0 60px ${C.glow}` }}>{t.title}</Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.8rem', color: C.textMute, mt: 2, letterSpacing: '0.04em' }}>{t.subtitle}</Typography>
        </Box>
        <Box>
          {NODES.filter(n => n.id !== 'core').map((node) => (
            <Accordion key={node.id} sx={{ bgcolor: 'transparent', color: C.text, boxShadow: 'none', borderBottom: `1px solid ${C.border}`, '&:before': { display: 'none' } }}>
              <AccordionSummary expandIcon={<ExpandMore sx={{ color: C.accent }} />} sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.8rem', letterSpacing: '0.04em' }}>{node.label}</AccordionSummary>
              <AccordionDetails>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {node.metadata.map((item) => (
                    <Box key={item} sx={{ px: 1.5, py: 0.5, borderRadius: '20px', bgcolor: alpha(C.accent, 0.1), border: `1px solid ${C.accentLine}`, fontFamily: MONO, fontSize: '0.65rem', color: C.textMute }}>{item}</Box>
                  ))}
                </Box>
              </AccordionDetails>
            </Accordion>
          ))}
        </Box>
        <Box sx={{ textAlign: 'center', mt: 4 }}>
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
