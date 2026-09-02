'use client';

import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { DISPLAY, MONO, LEARNING_STEPS } from '../lib';
import { STEP_ICON } from './pathStepIcons';

interface Tokens {
  text: string;
  textMid: string;
  textMute: string;
  accent: string;
  accentDk: string;
  surface: string;
  statsBg: string;
  border: string;
  shadow: string;
}

interface LearningPathPanelProps {
  isInView: boolean;
  panelLabel: string;
  panelStatus: string;
  T: Tokens;
}

export function LearningPathPanel({ isInView, panelLabel, panelStatus, T }: LearningPathPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % LEARNING_STEPS.length);
    }, 2400);
    return () => window.clearInterval(interval);
  }, [reducedMotion]);

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, x: 24 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      sx={{
        position: 'relative',
        bgcolor: T.surface,
        borderRadius: '16px',
        border: `1px solid ${T.border}`,
        boxShadow: `0 24px 60px ${T.shadow}`,
        overflow: 'hidden',
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 2.5,
          py: 1.5,
          borderBottom: `1px solid ${T.border}`,
          bgcolor: T.statsBg,
          transition: 'background-color 0.3s ease',
        }}
      >
        <Typography sx={{ fontFamily: MONO, fontSize: '0.64rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: T.textMid }}>
          {panelLabel}
        </Typography>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 0.7 }}>
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: T.accent,
              animation: reducedMotion ? 'none' : 'ah-pulse 2s ease-in-out infinite',
              '@keyframes ah-pulse': { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
            }}
          />
          <Typography sx={{ fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: T.accentDk, fontWeight: 600 }}>
            {panelStatus}
          </Typography>
        </Stack>
      </Box>

      <Box sx={{ px: { xs: 3, md: 4 }, py: { xs: 4, md: 5 } }}>
        <Stack spacing={0}>
          {LEARNING_STEPS.map((step, i) => {
            const Icon = STEP_ICON[step.id];
            const active = i === activeIndex;
            return (
              <Box key={step.id}>
                <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      bgcolor: active ? T.accent : 'transparent',
                      border: `1.5px solid ${active ? T.accent : T.border}`,
                      transition: 'background-color 0.4s ease, border-color 0.4s ease',
                    }}
                  >
                    <Icon size={18} color={active ? '#fff' : T.textMute} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', fontWeight: 700, color: active ? T.accent : T.textMute, transition: 'color 0.4s ease' }}>
                      {step.number}
                    </Typography>
                    <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '0.95rem', color: active ? T.text : T.textMid, transition: 'color 0.4s ease' }}>
                      {step.label}
                    </Typography>
                  </Box>
                </Stack>
                {i < LEARNING_STEPS.length - 1 && (
                  <Box sx={{ width: '1px', height: 24, bgcolor: active ? T.accent : T.border, ml: '21px', my: 0.5, transition: 'background-color 0.4s ease' }} />
                )}
              </Box>
            );
          })}
        </Stack>
      </Box>
    </Box>
  );
}
