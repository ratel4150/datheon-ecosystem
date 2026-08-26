// File: apps/landing-page/src/_features/technology-ecosystem/ui/IntegrationSpotlight.tsx
'use client';

import { Box, Typography } from '@mui/material';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { useTheme } from '@/_shared/lib/theme';
import { CATEGORIES, SPOTLIGHT_NODES } from '../lib/data';
import { IntegrationImage } from './IntegrationImage';
import { C, DARK, MONO, DISPLAY } from '../lib/constants';

interface IntegrationSpotlightProps {
  t: any;
}

export function IntegrationSpotlight({ t }: IntegrationSpotlightProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const shopify = CATEGORIES.find((c) => c.id === 'integrations')!.items.find((i) => i.name === 'Shopify')!;
  const rest = CATEGORIES.find((c) => c.id === 'integrations')!.items.filter((i) => i.name !== 'Shopify');

  const borderColor = isDark ? DARK.border : C.border;
  const textColor = isDark ? DARK.text : C.text;
  const textMid = isDark ? DARK.textMid : C.textMid;
  const textMute = isDark ? DARK.textMute : C.textMute;
  const accentDk = isDark ? DARK.accentDk : C.accentDk;
  const accent = isDark ? DARK.accent : C.accent;
  const panelBg = isDark ? DARK.panelBg : '#FFFFFF';
  const statsBg = isDark ? DARK.statsB : '#F4FAFE';

  return (
    <Box
      ref={ref}
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: '0.9fr 1.1fr' },
        gap: { xs: 4, md: 6 },
        alignItems: 'center',
        mb: { xs: 6, md: 7 },
      }}
    >
      <Box
        component={motion.div}
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        sx={{
          bgcolor: panelBg,
          borderRadius: '16px',
          border: `1px solid ${borderColor}`,
          boxShadow: `0 20px 50px ${isDark ? 'rgba(0,0,0,0.4)' : 'rgba(11,15,43,0.06)'}`,
          overflow: 'hidden',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <Box sx={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          px: 2.5, py: 1.5, borderBottom: `1px solid ${borderColor}`,
          bgcolor: statsBg,
          transition: 'background-color 0.3s ease',
        }}>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.64rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: textMid }}>
            {t.spotlightPanelLabel}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.7 }}>
            <Box sx={{
              width: 6, height: 6, borderRadius: '50%', bgcolor: accent,
              animation: 'ecoPulseDot 2s ease-in-out infinite',
            }} />
            <Typography sx={{ fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: accentDk, fontWeight: 600 }}>
              {t.spotlightStatus}
            </Typography>
          </Box>
        </Box>
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          <IntegrationImage animate={inView} />
        </Box>
      </Box>

      <Box
        component={motion.div}
        initial={{ opacity: 0, x: 16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      >
        <Typography sx={{
          fontFamily: MONO, fontWeight: 700, fontSize: '0.7rem',
          letterSpacing: '0.14em', color: accentDk, mb: 1.25,
        }}>
          {t.spotlightKicker}
        </Typography>
        <Typography sx={{
          fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '1.4rem', md: '1.65rem' },
          color: textColor, lineHeight: 1.3, mb: 3,
          transition: 'color 0.3s ease',
        }}>
          {t.spotlightTitle}
        </Typography>

        <Box sx={{ pl: 2, borderLeft: `2px solid ${accent}`, mb: 3 }}>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.05rem', color: textColor }}>
            {shopify.name}
          </Typography>
          <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.62rem', letterSpacing: '0.06em', color: accentDk, mt: 0.4 }}>
            {shopify.tag}
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: textMid, mt: 0.4 }}>
            {shopify.blurb}
          </Typography>
        </Box>

        <Typography sx={{ fontFamily: MONO, fontSize: '0.74rem', letterSpacing: '0.03em', color: textMute }}>
          {rest.map((i) => i.name).join('  ·  ')}
        </Typography>
      </Box>
    </Box>
  );
}
