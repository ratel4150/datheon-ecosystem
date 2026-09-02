'use client';

import { Box, Stack, Typography, Button } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowRight, FiArrowUpRight, FiCheckCircle } from 'react-icons/fi';
import { DISPLAY, MONO, ONLINE_COLOR, PROOF_STATS, CONTACT_WHATSAPP } from '../lib';
import { FooterConverge } from './FooterConverge';

interface Tokens {
  text: string;
  textMute: string;
  accent: string;
  accentDk: string;
  surface: string;
  border: string;
  footerBannerBg: string;
}

interface FooterTopBannerProps {
  headline: string;
  buttonLabel: string;
  trustNote: string;
  availabilityLabel: string;
  personalizedNote: string | null;
  T: Tokens;
}

export function FooterTopBanner({ headline, buttonLabel, trustNote, availabilityLabel, personalizedNote, T }: FooterTopBannerProps) {
  return (
    <Box sx={{ bgcolor: T.footerBannerBg, borderBottom: `1px solid ${T.border}`, py: { xs: 4, md: 5 }, transition: 'background-color 0.3s ease' }}>
      <Box sx={{ maxWidth: 960, mx: 'auto', px: { xs: 3, md: 4 } }}>
        <FooterConverge T={T} />

        <AnimatePresence initial={false}>
          {personalizedNote && (
            <Box
              key="badge"
              component={motion.div}
              initial={{ opacity: 0, height: 0, marginBottom: 0 }}
              animate={{ opacity: 1, height: 'auto', marginBottom: 10 }}
              exit={{ opacity: 0, height: 0, marginBottom: 0 }}
              transition={{ duration: 0.25 }}
              sx={{ overflow: 'hidden', display: 'flex', justifyContent: 'center' }}
            >
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 0.5, px: 1.25, py: 0.4, borderRadius: '14px', bgcolor: `${T.accent}1F` }}>
                <FiCheckCircle size={11} color={T.accent} />
                <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', color: T.accent, fontWeight: 600 }}>{personalizedNote}</Typography>
              </Box>
            </Box>
          )}
        </AnimatePresence>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          sx={{ alignItems: 'center', justifyContent: 'space-between', gap: { xs: 2.5, md: 3 }, mt: -0.5 }}
        >
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.3rem', md: '1.5rem' }, color: T.text, textAlign: { xs: 'center', md: 'left' }, letterSpacing: '-0.01em' }}>
            {headline}
          </Typography>

          <Stack direction="row" sx={{ alignItems: 'center', gap: 2, flexShrink: 0 }}>
            <Stack
              component="a"
              href={CONTACT_WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              direction="row"
              className="ft-focus"
              sx={{
                alignItems: 'center',
                gap: 0.6,
                px: 1.25,
                py: 0.45,
                borderRadius: '16px',
                border: `1px solid ${T.border}`,
                bgcolor: T.surface,
                textDecoration: 'none',
                transition: 'border-color 0.2s ease',
                '&:hover': { borderColor: T.accent },
              }}
            >
              <Box
                sx={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  bgcolor: ONLINE_COLOR,
                  animation: 'ft-pulse 2s ease-in-out infinite',
                  '@keyframes ft-pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.35 } },
                  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
                }}
              />
              <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', fontWeight: 600, color: T.text }}>{availabilityLabel}</Typography>
              <FiArrowUpRight size={10} color={T.textMute} />
            </Stack>

            <Button
              variant="contained"
              component={motion.a}
              whileHover={{ y: -1 }}
              href="https://calendly.com/team_datheon/consulta-gratuita"
              target="_blank"
              rel="noopener noreferrer"
              className="ft-focus"
              endIcon={<FiArrowRight size={13} />}
              sx={{
                bgcolor: T.accent,
                color: '#fff',
                fontWeight: 700,
                fontSize: '0.82rem',
                px: 2.25,
                py: 0.9,
                borderRadius: '9px',
                textTransform: 'none',
                fontFamily: MONO,
                whiteSpace: 'nowrap',
                '&:hover': { bgcolor: T.accentDk },
              }}
            >
              {buttonLabel}
            </Button>
          </Stack>
        </Stack>

        <Stack direction="row" sx={{ justifyContent: { xs: 'center', md: 'flex-start' }, alignItems: 'center', gap: 1.5, mt: 1.5, flexWrap: 'wrap' }}>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.66rem', color: T.textMute }}>{trustNote}</Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.66rem', color: T.border }}>·</Typography>
          {PROOF_STATS.map((stat) => (
            <Typography key={stat.id} sx={{ fontFamily: MONO, fontSize: '0.66rem', color: T.textMute }}>
              <Box component="span" sx={{ color: T.accent, fontWeight: 700 }}>{stat.value}</Box>
            </Typography>
          ))}
        </Stack>
      </Box>
    </Box>
  );
}
