'use client';

import { useState } from 'react';
import { Box, Typography, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, MONO } from '../lib/constants';

type TechItem = { name: string; tag?: string; blurb?: string };

interface TechProps {
  item: TechItem;
  dimmed: boolean;
}

export function Tech({ item, dimmed }: TechProps) {
  const [hovered, setHovered] = useState(false);
  const interactive = Boolean(item.tag && item.blurb);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const textColor = isDark ? DARK.text : C.text;
  const textMid = isDark ? DARK.textMid : C.textMid;
  const textMute = isDark ? DARK.textMute : C.textMute;
  const accent = isDark ? DARK.accent : C.accent;
  const accentLine = isDark ? DARK.accentLine : C.accentLine;
  const border = isDark ? DARK.border : C.border;
  const accentDk = isDark ? DARK.accentDk : C.accentDk;
  const accentBg = isDark ? DARK.accentBg : C.accentBg;

  return (
    <Box
      onMouseEnter={() => interactive && setHovered(true)}
      onMouseLeave={() => interactive && setHovered(false)}
      sx={{ position: 'relative', py: 0.4 }}
    >
      <Typography
        sx={{
          fontSize: '0.82rem',
          fontWeight: interactive ? 600 : 400,
          color: dimmed ? alpha(textMute, 0.55) : (interactive ? textColor : textMid),
          cursor: interactive ? 'pointer' : 'default',
          borderBottom: interactive ? `1px dashed ${hovered ? accent : border}` : 'none',
          display: 'inline-block',
          transition: 'color 0.2s ease, border-color 0.2s ease',
        }}
      >
        {item.name}
      </Typography>

      <AnimatePresence>
        {hovered && item.tag && item.blurb && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.16 }}
            sx={{
              position: 'absolute', bottom: 'calc(100% + 8px)', left: 0, zIndex: 40,
              width: 'max-content', maxWidth: 220,
              bgcolor: isDark ? DARK.panelBg : '#FFFFFF',
              border: `1px solid ${accentLine}`,
              borderRadius: '8px',
              px: 1.5, py: 1,
              boxShadow: `0 12px 28px ${alpha(isDark ? '#000' : C.text, 0.12)}`,
            }}
          >
            <Typography sx={{
              fontFamily: MONO, fontSize: '0.6rem', fontWeight: 700,
              letterSpacing: '0.06em', color: accentDk, mb: 0.3,
            }}>
              {item.tag}
            </Typography>
            <Typography sx={{ fontSize: '0.72rem', color: textMid, lineHeight: 1.5 }}>
              {item.blurb}
            </Typography>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
}
