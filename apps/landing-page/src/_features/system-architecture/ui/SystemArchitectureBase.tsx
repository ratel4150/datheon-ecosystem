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

      {/* Efecto parallax: capa de fondo */}
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
        {/* Encabezado: grid */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '0.85fr 1.15fr' },
            gap: { xs: 6, md: 7 },
            alignItems: 'center',
            mb: { xs: 9, md: 11 },
          }}
        >
          {/* Columna izquierda */}
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

          {/* Columna derecha: imagen */}
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
                  bgcolor: isDark ? DARK.statsB : '#F4FAFE',
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

        {/* Signal Steps */}
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

        {/* Enter Where You Are */}
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

        {/* Cierre */}
        <Box sx={{ textAlign: 'center', maxWidth: 620, mx: 'auto' }}>
          <Box
            sx={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              mx: 'auto',
              mb: 3,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: isDark ? DARK.accentBg : C.accentBg,
              border: `1px solid ${accentLine}`,
            }}
          >
            <FiZap size={22} color={accentDkColor} />
          </Box>
          <Typography
            sx={{
              fontFamily: DISPLAY,
              fontWeight: 700,
              fontSize: { xs: '1.5rem', md: '1.9rem' },
              lineHeight: 1.35,
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
              fontWeight: 700,
              fontSize: { xs: '1.5rem', md: '1.9rem' },
              lineHeight: 1.35,
              color: textMidColor,
              mb: 3,
              transition: 'color 0.3s ease',
            }}
          >
            {t.closingLine2}
          </Typography>
          <Typography
            sx={{
              fontFamily: MONO,
              fontSize: '0.85rem',
              color: accentColor,
              letterSpacing: '0.02em',
              mb: 4.5,
              transition: 'color 0.3s ease',
            }}
          >
            {t.closingLine3}
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center', justifyContent: 'center', gap: { xs: 1.5, sm: 3 } }}>
            <Box
              component={motion.button}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
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
                fontWeight: 700,
                fontSize: '0.93rem',
                px: 3.5,
                py: 1.4,
                borderRadius: '12px',
                boxShadow: `0 4px 20px ${alpha(accentColor, 0.35)}`,
                '&:hover': { bgcolor: accentDkColor },
                transition: 'background-color 0.2s ease',
              }}
            >
              {t.cta1}
              <FiArrowRight size={15} />
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
                gap: 0.6,
                fontFamily: 'inherit',
                fontSize: '0.88rem',
                fontWeight: 600,
                color: textMidColor,
                pb: 0.3,
                borderBottom: `1px solid transparent`,
                transition: 'color 0.2s ease, border-color 0.2s ease',
                '&:hover': { color: accentColor, borderColor: accentLine },
              }}
            >
              {t.cta2}
              <FiArrowRight size={13} />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}