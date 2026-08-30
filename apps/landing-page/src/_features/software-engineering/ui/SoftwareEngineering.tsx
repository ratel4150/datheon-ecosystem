'use client';

import { useEffect, useState } from 'react';
import { Box, Container, Typography, Button, GlobalStyles } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, DISPLAY, MONO, content, resolveLang } from '../lib';
import { SystemBuilder } from './SystemBuilder';
import { SystemBuilderReduced } from './SystemBuilderReduced';
import { containerVariants, itemVariants } from './motionVariants';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function SoftwareEngineering({ lang }: Props) {
  const l = resolveLang(lang, content);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <Box component="section" sx={{ position: 'relative', bgcolor: T.bg, overflow: 'hidden', transition: 'background-color 0.3s ease' }}>
      <GlobalStyles styles={{ '.se-focus:focus-visible': { outline: `2px solid ${T.accent}`, outlineOffset: 2 } }} />

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, pt: { xs: 8, md: 10 } }}>
        <Box component={motion.div} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.5 }} variants={containerVariants} sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
          <Box component={motion.div} variants={itemVariants} sx={{ mb: 0.5 }}>
            <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.76rem', letterSpacing: '0.16em', color: T.text, transition: 'color 0.3s ease' }}>{t.kicker}</Typography>
          </Box>
          <Box component={motion.div} variants={itemVariants} sx={{ mt: 2.5, mb: 2 }}>
            <Typography
              variant="h2"
              sx={{
                fontFamily: DISPLAY,
                fontWeight: 800,
                fontSize: { xs: '2.1rem', sm: '2.5rem', md: '2.9rem', lg: '3.2rem' },
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                color: T.text,
                transition: 'color 0.3s ease',
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
            <Typography sx={{ fontSize: { xs: '1rem', md: '1.05rem' }, color: T.textMute, maxWidth: 480, mx: 'auto', lineHeight: 1.75, transition: 'color 0.3s ease' }}>
              {t.subtitle}
            </Typography>
          </Box>
        </Box>
      </Container>

      {reducedMotion ? (
        <Container maxWidth="md">
          <SystemBuilderReduced T={T} />
        </Container>
      ) : (
        <SystemBuilder T={T} scrollHint={t.scrollHint} />
      )}

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1, pb: { xs: 8, md: 10 } }}>
        <Box sx={{ textAlign: 'center', mt: { xs: 4, md: 5 }, pt: { xs: 5, md: 6 }, borderTop: `1px solid ${T.border}` }}>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.5rem' }, color: T.text, mb: 2.5, letterSpacing: '-0.01em' }}>
            {t.closingHeadline}
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="https://calendly.com/team_datheon/consulta-gratuita"
            target="_blank"
            rel="noopener noreferrer"
            className="se-focus"
            endIcon={<FiArrowRight size={15} />}
            sx={{
              bgcolor: T.accent,
              color: '#fff',
              fontWeight: 700,
              fontSize: '0.85rem',
              px: 3,
              py: 1.2,
              borderRadius: '10px',
              textTransform: 'none',
              fontFamily: MONO,
              '&:hover': { bgcolor: T.accentDk },
            }}
          >
            {t.closingCta}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
