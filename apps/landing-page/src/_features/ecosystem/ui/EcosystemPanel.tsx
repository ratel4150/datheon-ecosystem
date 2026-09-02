// File: apps/landing-page/src/_features/ecosystem/ui/EcosystemPanel.tsx
'use client';

import { Box, Typography, Stack, GlobalStyles, alpha } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { FiShare2 } from 'react-icons/fi';
import { MONO, NODES, NODE_LEVEL, NODE_COLOR } from '../lib';

interface EcosystemPanelProps {
  label: string;
  statusText: string;
  accent: string;
  accentDk: string;
  surface: string;
  border: string;
  textMid: string;
  isDark: boolean;
  children: React.ReactNode;
}

const CATEGORIES = NODES.filter((n) => NODE_LEVEL[n.id] === 'category');

export function EcosystemPanel({ label, statusText, accent, accentDk, textMid, children }: EcosystemPanelProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      sx={{ position: 'relative' }}
    >
      <GlobalStyles
        styles={{
          '@keyframes ecoStatusPop': {
            '0%': { transform: 'scale(0.85)', opacity: 0 },
            '60%': { transform: 'scale(1.06)' },
            '100%': { transform: 'scale(1)', opacity: 1 },
          },
          '.eco-status-pop': { animation: 'ecoStatusPop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)' },
          '@media (prefers-reduced-motion: reduce)': { '.eco-status-pop': { animation: 'none' } },
        }}
      />

      {/* Encabezado: label + status en pastilla con rebote — sin caja ni sombra */}
      <Stack direction={{ xs: 'column', sm: 'row' }} alignItems={{ xs: 'flex-start', sm: 'center' }} justifyContent="space-between" gap={1.5} sx={{ mb: 2 }}>
        <Stack direction="row" alignItems="center" gap={0.75}>
          <FiShare2 size={13} color={accent} />
          <Typography sx={{ fontFamily: MONO, fontSize: '0.64rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: textMid }}>
            {label}
          </Typography>
        </Stack>

        <Box
          key={statusText}
          className="eco-status-pop"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.6,
            px: 1.25,
            py: 0.5,
            borderRadius: '20px',
            bgcolor: alpha(accent, 0.12),
          }}
        >
          <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: accent }} />
          <Typography sx={{ fontFamily: MONO, fontSize: '0.6rem', letterSpacing: '0.04em', textTransform: 'uppercase', color: accentDk, fontWeight: 700 }}>
            {statusText}
          </Typography>
        </Box>
      </Stack>

      {/* Legend de categorías: pastillas de color que respiran — el mismo
          código de color que verás en el grafo, no decoración inventada */}
      <Stack direction="row" flexWrap="wrap" gap={0.75} justifyContent="center" sx={{ mb: 2.5 }}>
        {CATEGORIES.map((cat, i) => {
          const color = NODE_COLOR[cat.id];
          return (
            <Box
              key={cat.id}
              component={motion.div}
              animate={prefersReducedMotion ? undefined : { y: [0, -3, 0] }}
              transition={prefersReducedMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: i * 0.12 }}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
                px: 1.1,
                py: 0.4,
                borderRadius: '20px',
                bgcolor: alpha(color, 0.12),
                border: `1px solid ${alpha(color, 0.35)}`,
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: color }} />
              <Typography sx={{ fontFamily: MONO, fontSize: '0.58rem', fontWeight: 700, letterSpacing: '0.03em', color }}>{cat.label}</Typography>
            </Box>
          );
        })}
      </Stack>

      <Box>{children}</Box>
    </Box>
  );
}