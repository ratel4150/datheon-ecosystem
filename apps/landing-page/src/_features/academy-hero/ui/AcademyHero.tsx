'use client';

import { Box, Typography, Container, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, DISPLAY, MONO, content, resolveLang } from '../lib';
import { useAcademyHero } from '../model';
import { LearningPathPanel } from './LearningPathPanel';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function AcademyHero({ lang }: Props) {
  const l = resolveLang(lang, content);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;
  const { sectionRef, isInView, handleCTA } = useAcademyHero();

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{ position: 'relative', bgcolor: T.bg, pt: { xs: 9, md: 10 }, pb: { xs: 8, md: 9 }, transition: 'background-color 0.3s ease' }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' }, gap: { xs: 7, md: 6 }, alignItems: 'center' }}>
          <Box component={motion.div} variants={containerVariants} initial="hidden" animate="show">
            <Box component={motion.div} variants={itemVariants} sx={{ mb: 3 }}>
              <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.76rem', letterSpacing: '0.16em', color: T.text, mb: 0.5 }}>
                {t.kicker}
              </Typography>
              <Typography sx={{ fontFamily: MONO, fontWeight: 500, fontSize: '0.64rem', letterSpacing: '0.13em', color: T.textMute }}>
                {t.kickerSub}
              </Typography>
            </Box>

            <Box component={motion.div} variants={itemVariants}>
              <Typography
                variant="h1"
                sx={{
                  fontFamily: DISPLAY,
                  fontWeight: 800,
                  fontSize: { xs: '2.1rem', sm: '2.5rem', md: '2.9rem', lg: '3.2rem' },
                  lineHeight: 1.2,
                  letterSpacing: '-0.02em',
                  color: T.text,
                }}
              >
                {t.titleLine1}
                <Box component="span" sx={{ display: 'block' }}>
                  {t.titleLine2Lead}
                  <Box component="span" sx={{ color: T.accent }}>
                    {t.titleLine2Accent}
                  </Box>
                </Box>
              </Typography>
            </Box>

            <Box component={motion.div} variants={itemVariants}>
              <Typography sx={{ fontSize: { xs: '1rem', md: '1.05rem' }, color: T.textMid, maxWidth: 480, lineHeight: 1.75, fontWeight: 400, mt: 2.5, mb: 3 }}>
                {t.subtitle}
              </Typography>
            </Box>

            <Box
              component={motion.div}
              variants={itemVariants}
              sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'flex-start', sm: 'center' }, gap: { xs: 1.5, sm: 3 }, mb: 1.5 }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleCTA('build-what')}
                component={motion.button}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                endIcon={<FiArrowRight size={15} />}
                sx={{
                  bgcolor: T.accent,
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '0.93rem',
                  px: 3.5,
                  py: 1.4,
                  borderRadius: '12px',
                  textTransform: 'none',
                  boxShadow: `0 4px 20px ${T.glow}`,
                  '&:hover': { bgcolor: T.accentDk },
                }}
              >
                {t.cta1}
              </Button>

              <Box
                component={motion.button}
                onClick={handleCTA('tech-map')}
                whileHover={{ y: -1 }}
                type="button"
                sx={{
                  appearance: 'none',
                  bgcolor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.6,
                  fontFamily: 'inherit',
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  color: T.textMid,
                  pb: 0.3,
                  borderBottom: '1px solid transparent',
                  transition: 'color 0.2s ease, border-color 0.2s ease',
                  '&:hover': { color: T.accent, borderColor: T.accent },
                }}
              >
                {t.cta2}
              </Box>
            </Box>

            <Box component={motion.div} variants={itemVariants}>
              <Typography sx={{ fontSize: '0.78rem', color: T.textMute }}>{t.microcopy}</Typography>
            </Box>
          </Box>

          <LearningPathPanel isInView={isInView} panelLabel={t.panelLabel} panelStatus={t.panelStatus} T={T} />
        </Box>
      </Container>
    </Box>
  );
}
