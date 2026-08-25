// File: apps/landing-page/src/_features/technology-ecosystem/ui/TechnologyEcosystem.tsx
'use client';

import { Box, Typography, Container, alpha, GlobalStyles } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { useTheme } from '@/_shared/lib/theme';
import { content } from '../lib/content';
import { C, DARK, MONO, DISPLAY } from '../lib/constants';
import { useTechnologyEcosystem } from '../model/useTechnologyEcosystem';
import { EcosystemBackdrop } from './EcosystemBackdrop';
import { Tech } from './Tech';
import { IntegrationSpotlight } from './IntegrationSpotlight';

interface TechnologyEcosystemProps {
  lang: string;
}

export function TechnologyEcosystem({ lang }: TechnologyEcosystemProps) {
  const l = (lang as keyof typeof content) in content ? (lang as keyof typeof content) : 'es';
  const t = content[l];
  const { activeFilter, mounted, filteredCategories, handleFilter } = useTechnologyEcosystem();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const bgColor = isDark ? DARK.bg : C.bg;
  const textColor = isDark ? DARK.text : C.text;
  const textMidColor = isDark ? DARK.textMid : C.textMid;
  const textMuteColor = isDark ? DARK.textMute : C.textMute;
  const accentColor = isDark ? DARK.accent : C.accent;
  const accentDkColor = isDark ? DARK.accentDk : C.accentDk;
  const borderColor = isDark ? DARK.border : C.border;

  if (!mounted) return null;

  return (
    <Box
      component="section"
      sx={{
        position: 'relative',
        bgcolor: bgColor,
        py: { xs: 8, md: 11 },
        transition: 'background-color 0.3s ease',
      }}
    >
      <GlobalStyles
        styles={{
          '.eco-pulse-line': { animation: 'ecoDash 2.6s linear infinite' },
          '@keyframes ecoDash': { to: { strokeDashoffset: -140 } },
          '@keyframes ecoPulseDot': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
          '@media (prefers-reduced-motion: reduce)': {
            '.eco-pulse-line': { animation: 'none' },
          },
        }}
      />
      <EcosystemBackdrop />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', maxWidth: 680, mx: 'auto', mb: { xs: 6, md: 7 } }}>
          <Typography sx={{
            fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem',
            letterSpacing: '0.16em', color: accentDkColor, mb: 1.5,
            transition: 'color 0.3s ease',
          }}>
            {t.kicker}
          </Typography>
          <Typography variant="h2" sx={{
            fontFamily: DISPLAY, fontWeight: 700,
            fontSize: { xs: '1.7rem', md: '2.1rem' }, lineHeight: 1.3,
            letterSpacing: '-0.015em', color: textColor, mb: 2,
            transition: 'color 0.3s ease',
          }}>
            {t.title}
          </Typography>
          <Typography sx={{ fontSize: '1rem', color: textMidColor, lineHeight: 1.75, transition: 'color 0.3s ease' }}>
            {t.subheadline}
          </Typography>
        </Box>

        <Box sx={{ borderTop: `1px solid ${borderColor}`, mb: { xs: 5, md: 6 }, transition: 'border-color 0.3s ease' }} />

        {/* Filtros */}
        <Box sx={{
          display: 'flex', gap: { xs: 2, md: 3 }, mb: { xs: 5, md: 6 },
          overflowX: 'auto', justifyContent: { xs: 'flex-start', md: 'center' },
          '&::-webkit-scrollbar': { display: 'none' }, scrollbarWidth: 'none',
        }}>
          {['all', ...CATEGORIES.map((c) => c.id)].map((id) => {
            const label = id === 'all' ? t.allLabel : CATEGORIES.find((c) => c.id === id)!.label.split(' ')[0];
            const active = activeFilter === id;
            return (
              <Box
                key={id}
                component="button"
                type="button"
                onClick={() => handleFilter(id)}
                sx={{
                  position: 'relative', appearance: 'none', bgcolor: 'transparent', border: 'none',
                  cursor: 'pointer', pb: 1, flexShrink: 0,
                  fontFamily: MONO, fontSize: '0.72rem', letterSpacing: '0.06em',
                  color: active ? textColor : textMuteColor,
                  fontWeight: active ? 700 : 500,
                  transition: 'color 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
                {active && (
                  <Box
                    component={motion.div}
                    layoutId="ecosystemTabIndicator"
                    sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, bgcolor: accentColor }}
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </Box>
            );
          })}
        </Box>

        {/* Grid de categorías */}
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' },
          rowGap: { xs: 4, md: 5 }, columnGap: 3,
          mb: { xs: 6, md: 7 },
        }}>
          {filteredCategories.map((cat) => (
            <Box
              key={cat.id}
              component={motion.div}
              animate={{ opacity: cat.dimmed ? 0.35 : 1 }}
              transition={{ duration: 0.25 }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75, mb: 1.25 }}>
                <Box sx={{ width: 8, height: 2, bgcolor: cat.dimmed ? borderColor : accentColor, transition: 'background-color 0.25s ease' }} />
                <Typography sx={{
                  fontFamily: MONO, fontSize: '0.62rem', fontWeight: 700,
                  letterSpacing: '0.05em', color: cat.dimmed ? textMuteColor : textColor,
                  transition: 'color 0.3s ease',
                }}>
                  {cat.label}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {cat.items.map((it) => (
                  <Tech key={it.name} item={it} dimmed={cat.dimmed} />
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <IntegrationSpotlight t={t} />

        <Box sx={{ borderTop: `1px solid ${borderColor}`, mb: { xs: 5, md: 6 }, transition: 'border-color 0.3s ease' }} />

        {/* Trust line */}
        <Typography sx={{
          textAlign: 'center', fontSize: '0.85rem', color: textMidColor,
          fontWeight: 500, mb: { xs: 5, md: 6 },
          transition: 'color 0.3s ease',
        }}>
          {t.trustLine}
        </Typography>

        <Box sx={{ borderTop: `1px solid ${borderColor}`, mb: { xs: 5, md: 6 }, transition: 'border-color 0.3s ease' }} />

        {/* Enterprise + CTA */}
        <Box sx={{ textAlign: 'center', maxWidth: 560, mx: 'auto' }}>
          <Typography sx={{
            fontFamily: MONO, fontWeight: 700, fontSize: '0.68rem',
            letterSpacing: '0.12em', color: accentDkColor, mb: 1.5,
            transition: 'color 0.3s ease',
          }}>
            {t.enterpriseKicker}
          </Typography>
          <Typography sx={{ fontSize: '0.92rem', color: textMidColor, lineHeight: 1.75, mb: 3, transition: 'color 0.3s ease' }}>
            {t.enterpriseCopy}
          </Typography>
          <Typography sx={{
            fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.15rem', md: '1.3rem' },
            color: textColor, mb: 2.5,
            transition: 'color 0.3s ease',
          }}>
            {t.tagline}
          </Typography>

          <Box
            component={motion.button}
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            type="button"
            sx={{
              appearance: 'none', bgcolor: 'transparent', border: 'none', cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 0.6, mx: 'auto',
              fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: 600,
              color: accentColor,
              pb: 0.3, borderBottom: `1px solid ${isDark ? DARK.accentLine : C.accentLine}`,
              transition: 'border-color 0.2s ease, color 0.3s ease',
              '&:hover': { borderColor: accentColor },
            }}
          >
            {t.cta}
            <FiArrowRight size={13} />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
