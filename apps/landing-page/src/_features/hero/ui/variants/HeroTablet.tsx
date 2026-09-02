'use client';

import { Box, Typography, Container, Button, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { content } from '../../lib/content';
import { C, DISPLAY, MONO } from '../../lib/constants';
import { useHero } from '../../model/useHero';
import { WaveBackdrop } from '../WaveBackdrop';
import type { Lang } from '@/_shared/types/i18n';

interface HeroTabletProps {
  lang: Lang;
}

export function HeroTablet({ lang }: HeroTabletProps) {
  const t = content[lang];
  const { sectionRef, handleCTA } = useHero(lang);

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: 'relative',
        bgcolor: C.bg,
        overflow: 'hidden',
        pt: { xs: 9, md: 10 },
        pb: { xs: 8, md: 9 },
      }}
    >
      <WaveBackdrop />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', maxWidth: 700, mx: 'auto' }}>
          <Box sx={{ mb: 3 }}>
            <Typography sx={{
              fontFamily: MONO, fontWeight: 700, fontSize: '0.76rem',
              letterSpacing: '0.16em', color: C.text, mb: 0.5,
            }}>
              {t.kicker}
            </Typography>
            <Typography sx={{
              fontFamily: MONO, fontWeight: 500, fontSize: '0.64rem',
              letterSpacing: '0.13em', color: C.textMute,
            }}>
              {t.kickerSub}
            </Typography>
          </Box>

          <Typography variant="h1" sx={{
            fontFamily: DISPLAY, fontWeight: 800,
            fontSize: { xs: '2.5rem', md: '3rem' },
            lineHeight: 1.2, color: C.text,
          }}>
            {t.titleLine1}
            <Box component="span" sx={{ display: 'block' }}>
              {t.titleLine2Lead}<Box component="span" sx={{ color: C.accent }}>{t.titleLine2Accent}</Box>
            </Box>
          </Typography>

          <Typography sx={{
            fontSize: '1.05rem', color: C.textMid,
            maxWidth: 500, lineHeight: 1.75, mx: 'auto', mt: 2.5, mb: 3,
          }}>
            {t.subheadline}
          </Typography>

          <Box sx={{ mb: 4 }}>
            <Typography sx={{
              fontFamily: MONO, fontSize: '0.7rem', letterSpacing: '0.07em',
              textTransform: 'uppercase', color: C.textMute,
            }}>
              {t.segments.join('  ·  ')}
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, mb: 1.5 }}>
            <Button
              variant="contained"
              size="large"
              onClick={handleCTA('construir')}
              component={motion.button}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              endIcon={<FiArrowRight size={15} />}
              sx={{
                bgcolor: C.accent, color: '#fff', fontWeight: 700, fontSize: '0.93rem',
                px: 3.5, py: 1.4, borderRadius: '12px', textTransform: 'none',
                boxShadow: `0 4px 20px ${alpha(C.accent, 0.35)}`,
                '&:hover': { bgcolor: C.accentDk, boxShadow: `0 8px 28px ${alpha(C.accent, 0.45)}` },
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
                fontFamily: 'inherit', fontSize: '0.88rem', fontWeight: 600, color: C.textMid,
                pb: 0.3, borderBottom: '1px solid transparent',
                '&:hover': { color: C.accent, borderColor: C.accentLine },
              }}
            >
              {t.cta2}
              <FiArrowRight size={13} />
            </Box>
          </Box>

          <Typography sx={{ fontSize: '0.78rem', color: C.textMute }}>
            {t.microcopy}
          </Typography>
        </Box>

        <Box sx={{ textAlign: 'center', mt: { xs: 6, md: 7 } }}>
          <Typography sx={{
            fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.05rem', md: '1.2rem' },
            color: C.text, mb: 1,
          }}>
            {t.tagline}
          </Typography>
          <Typography sx={{
            fontFamily: MONO, fontSize: '0.72rem', letterSpacing: '0.03em', color: C.textMute,
          }}>
            {t.stackLine}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
