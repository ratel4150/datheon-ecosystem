// File: apps/landing-page/src/_features/system-architecture/ui/SystemArchitectureBase.tsx
'use client';

import { Box, Typography, Container, GlobalStyles, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowRight, FiZap } from 'react-icons/fi';
import { useTheme } from '@/_shared/lib/theme';
import { content } from '../lib/content';
import { C, DARK, MONO, DISPLAY } from '../lib/constants';
import { useSystemArchitecture } from '../model/useSystemArchitecture';
import { ArchitectureImage } from './ArchitectureImage';
import { ChainAccordion } from './ChainAccordion';
import { SignalSteps } from './SignalSteps';
import { EnterWhereYouAre } from './EnterWhereYouAre';
import DashboardPreview from './DashboardPreview';

type Variant = 'desktop' | 'mobile';

interface SystemArchitectureBaseProps {
  lang: string;
  variant: Variant;
}

export function SystemArchitectureBase({ lang, variant }: SystemArchitectureBaseProps) {
  const l = (lang as keyof typeof content) in content ? (lang as keyof typeof content) : 'es';
  const t = content[l];
  const { sectionRef, imageRef, enterRef, isInView, imageInView, enterInView, yParallax } = useSystemArchitecture();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const isMobile = variant === 'mobile';

  const bgColor = isDark ? DARK.bg : C.bg;
  const textColor = isDark ? DARK.text : C.text;
  const textMidColor = isDark ? DARK.textMid : C.textMid;
  const textMuteColor = isDark ? DARK.textMute : C.textMute;
  const accentColor = isDark ? DARK.accent : C.accent;
  const accentDkColor = isDark ? DARK.accentDk : C.accentDk;
  const accentLine = isDark ? DARK.accentLine : C.accentLine;
  const borderColor = isDark ? DARK.border : C.border;
  const panelBg = isDark ? DARK.bg : '#FFFFFF';

  return (
    <Box
      ref={sectionRef}
      component="section"
      sx={{
        position: 'relative',
        bgcolor: bgColor,
        py: { xs: 9, md: 12 },
        overflow: 'hidden',
        transition: 'background-color 0.3s ease',
      }}
    >
      <GlobalStyles
        styles={{
          '.sa-hub-pulse': { animation: 'saHubDash 3s linear infinite' },
          '@keyframes saHubDash': { to: { strokeDashoffset: -130 } },
          '@media (prefers-reduced-motion: reduce)': { '.sa-hub-pulse': { animation: 'none' } },
        }}
      />

      <Box
        component={motion.div}
        style={{ y: yParallax }}
        sx={{
          position: 'absolute',
          top: '10%',
          right: '-10%',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: accentColor,
          filter: 'blur(200px)',
          opacity: isDark ? 0.08 : 0.05,
          pointerEvents: 'none',
          transition: 'background 0.3s ease',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' },
            gap: { xs: 6, md: 7 },
            alignItems: 'center',
            mb: { xs: 9, md: 11 },
          }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Typography
              sx={{
                fontFamily: MONO,
                fontWeight: 700,
                fontSize: '0.72rem',
                letterSpacing: '0.16em',
                color: accentDkColor,
                mb: 1.5,
                transition: 'color 0.3s ease',
              }}
            >
              {t.kicker}
            </Typography>
            <Typography
              variant="h2"
              sx={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                fontSize: { xs: '1.8rem', md: '2.15rem' },
                lineHeight: 1.28,
                letterSpacing: '-0.015em',
                color: textColor,
                mb: 2,
                transition: 'color 0.3s ease',
              }}
            >
              {t.title}
            </Typography>
            <Typography
              sx={{
                fontSize: '1rem',
                color: textMidColor,
                lineHeight: 1.75,
                mb: 1.5,
                transition: 'color 0.3s ease',
              }}
            >
              {t.subheadline}
            </Typography>
            <Typography
              sx={{
                fontFamily: MONO,
                fontSize: '0.78rem',
                color: textMuteColor,
                transition: 'color 0.3s ease',
              }}
            >
              {t.microcopy}
            </Typography>
          </Box>

          {!isMobile ? (
            <Box
              ref={imageRef}
              component={motion.div}
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              sx={{
                bgcolor: panelBg,
                borderRadius: '18px',
                border: `1px solid ${borderColor}`,
                boxShadow: `0 30px 70px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(11,15,43,0.08)'}`,
                overflow: 'hidden',
                transition: 'background-color 0.3s ease, border-color 0.3s ease',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 3,
                  py: 1.75,
                  borderBottom: `1px solid ${borderColor}`,
                  bgcolor: isDark ? DARK.bg : '#F4FAFE',
                  transition: 'background-color 0.3s ease',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: MONO,
                    fontSize: '0.68rem',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: textMidColor,
                  }}
                >
                  {t.imagePanelLabel}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
                  <Box
                    sx={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      bgcolor: accentColor,
                      animation: 'saPulseDot 2s ease-in-out infinite',
                      '@keyframes saPulseDot': {
                        '0%,100%': { opacity: 1 },
                        '50%': { opacity: 0.3 },
                      },
                    }}
                  />
                  <Typography
                    sx={{
                      fontFamily: MONO,
                      fontSize: '0.63rem',
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      color: accentDkColor,
                      fontWeight: 600,
                    }}
                  >
                    {t.imagePanelStatus}
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ p: { xs: 3, md: 4 } }}>
                <ArchitectureImage animate={imageInView} />
              </Box>
            </Box>
          ) : (
            <ChainAccordion />
          )}
        </Box>

        <Box sx={{ mb: { xs: 9, md: 11 } }}>
          <Typography
            sx={{
              textAlign: 'center',
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.16em',
              color: accentDkColor,
              mb: { xs: 4, md: 5 },
              transition: 'color 0.3s ease',
            }}
          >
            {t.signalKicker}
          </Typography>
          <SignalSteps />
        </Box>

        <Box sx={{ borderTop: `1px solid ${borderColor}`, maxWidth: 680, mx: 'auto', mb: { xs: 9, md: 11 }, transition: 'border-color 0.3s ease' }} />

        <Box ref={enterRef} sx={{ mb: { xs: 9, md: 11 } }}>
          <Typography
            sx={{
              textAlign: 'center',
              fontFamily: MONO,
              fontWeight: 700,
              fontSize: '0.72rem',
              letterSpacing: '0.16em',
              color: accentDkColor,
              mb: { xs: 4, md: 5 },
              transition: 'color 0.3s ease',
            }}
          >
            {t.enterKicker}
          </Typography>
          <EnterWhereYouAre animate={enterInView} t={{ enterTagline: t.enterTagline }} />
        </Box>

        {/* Dashboard + Cierre en grid: 3/4 dashboard, 1/4 texto */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '3fr 1fr' },
            gap: { xs: 4, md: 6 },
            alignItems: 'center',
            my: 6,
          }}
        >
          {/* Columna izquierda: Dashboard Preview */}
          <Box>
            <DashboardPreview />
          </Box>

          {/* Columna derecha: Texto de cierre */}
                <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Box
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 1,
                mb: 2,
                px: 2,
                py: 0.5,
                borderRadius: '20px',
                bgcolor: alpha(accentColor, 0.1),
                border: `1px solid ${alpha(accentColor, 0.15)}`,
              }}
            >
              <FiZap size={14} color={accentColor} />
              <Typography
                sx={{
                  fontFamily: MONO,
                  fontSize: '0.6rem',
                  fontWeight: 600,
                  color: accentColor,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {l === 'es' ? 'EN ACCIÓN' : l === 'en' ? 'IN ACTION' : 'EN ACTION'}
              </Typography>
            </Box>

            <Typography
              sx={{
                fontFamily: DISPLAY,
                fontWeight: 700,
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                lineHeight: 1.2,
                color: textColor,
                mb: 1,
                transition: 'color 0.3s ease',
              }}
            >
              {t.closingLine1}
            </Typography>

            <Typography
              sx={{
                fontFamily: DISPLAY,
                fontWeight: 500,
                fontSize: { xs: '1.2rem', md: '1.4rem' },
                lineHeight: 1.4,
                color: textMidColor,
                mb: 3,
                transition: 'color 0.3s ease',
              }}
            >
              {t.closingLine2}
            </Typography>

            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: { xs: 'center', md: 'flex-start' },
                justifyContent: { xs: 'center', md: 'flex-start' },
                gap: { xs: 1.5, sm: 2 },
              }}
            >
              <Box
                component={motion.button}
                whileHover={{ y: -2, scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                type="button"
                sx={{
                  appearance: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.8,
                  bgcolor: accentColor,
                  color: '#fff',
                  fontFamily: 'inherit',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  px: 2.5,
                  py: 1.2,
                  borderRadius: '10px',
                  boxShadow: `0 4px 16px ${alpha(accentColor, 0.3)}`,
                  transition: 'all 0.25s ease',
                  '&:hover': {
                    bgcolor: accentDkColor,
                    boxShadow: `0 8px 24px ${alpha(accentColor, 0.4)}`,
                  },
                }}
              >
                {t.cta1}
                <FiArrowRight size={14} />
              </Box>

              <Box
                component={motion.button}
                whileHover={{ y: -1 }}
                type="button"
                sx={{
                  appearance: 'none',
                  bgcolor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  fontFamily: 'inherit',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: textMidColor,
                  pb: 0.2,
                  borderBottom: `2px solid transparent`,
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    color: accentColor,
                    borderBottomColor: accentColor,
                  },
                }}
              >
                {t.cta2}
                <FiArrowRight size={13} />
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,
                pt: 2,
                borderTop: `1px solid ${alpha(accentColor, 0.15)}`,
              }}
            >
              <Typography
                sx={{
                  fontFamily: MONO,
                  fontSize: '0.7rem',
                  color: textMuteColor,
                  letterSpacing: '0.02em',
                  transition: 'color 0.3s ease',
                }}
              >
                {t.closingLine3}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}