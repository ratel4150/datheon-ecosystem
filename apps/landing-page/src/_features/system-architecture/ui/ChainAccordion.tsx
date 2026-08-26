'use client';

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { useTheme } from '@/_shared/lib/theme';
import { CHAIN } from '../lib/data';
import { C, DARK, MONO } from '../lib/constants';

export function ChainAccordion() {
  const [open, setOpen] = useState<number | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const accentDk = isDark ? DARK.accentDk : C.accentDk;
  const accentLine = isDark ? DARK.accentLine : C.accentLine;
  const accentBg = isDark ? DARK.accentBg : C.accentBg;
  const border = isDark ? DARK.border : C.border;
  const text = isDark ? DARK.text : C.text;
  const textMute = isDark ? DARK.textMute : C.textMute;

  return (
    <Box
      sx={{
        bgcolor: isDark ? DARK.bg : '#FFFFFF',
        borderRadius: '14px',
        border: `1px solid ${border}`,
        boxShadow: `0 14px 34px ${isDark ? 'rgba(0,0,0,0.3)' : 'rgba(11,15,43,0.06)'}`,
        overflow: 'hidden',
        mb: 6,
      }}
    >
      {CHAIN.map((node, i) => {
        const isOpen = open === i;
        return (
          <Box key={node.name} sx={{ borderBottom: i === CHAIN.length - 1 ? 'none' : `1px solid ${border}` }}>
            <Box
              component="button"
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              sx={{
                appearance: 'none', width: '100%', bgcolor: 'transparent', border: 'none',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                px: 2, py: 1.5, minHeight: 56, cursor: 'pointer', textAlign: 'left',
              }}
            >
              <Box>
                <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.76rem', letterSpacing: '0.05em', color: isOpen ? accentDk : text }}>
                  {node.name}
                </Typography>
                <Typography sx={{ fontSize: '0.72rem', color: textMute, mt: 0.2 }}>{node.desc}</Typography>
              </Box>
              <Box
                component={motion.div}
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                sx={{ display: 'flex', color: isOpen ? accentDk : textMute, flexShrink: 0, ml: 1 }}
              >
                <FiChevronDown size={16} />
              </Box>
            </Box>
            <AnimatePresence initial={false}>
              {isOpen && (
                <Box
                  component={motion.div}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                  sx={{ overflow: 'hidden' }}
                >
                  <Box sx={{ px: 2, pb: 2, display: 'flex', flexWrap: 'wrap', gap: 0.6 }}>
                    {node.chips.map((c) => (
                      <Box key={c} sx={{ px: 1, py: 0.35, borderRadius: '20px', bgcolor: accentBg, border: `1px solid ${accentLine}`, fontFamily: MONO, fontSize: '0.65rem', color: accentDk }}>
                        {c}
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </AnimatePresence>
          </Box>
        );
      })}
    </Box>
  );
}
