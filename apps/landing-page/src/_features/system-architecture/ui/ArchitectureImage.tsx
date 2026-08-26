'use client';

import { Box, Typography, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTheme } from '@/_shared/lib/theme';
import { CHAIN } from '../lib/data';
import { C, DARK, MONO } from '../lib/constants';

const RADIUS = 178;
const CENTER = 250;

function nodePos(i: number, total: number) {
  const angle = (-90 + (360 / total) * i) * (Math.PI / 180);
  return { x: CENTER + RADIUS * Math.cos(angle), y: CENTER + RADIUS * Math.sin(angle) };
}

export function ArchitectureImage({ animate }: { animate: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const positions = CHAIN.map((_, i) => nodePos(i, CHAIN.length));
  const accent = isDark ? DARK.accent : C.accent;
  const accentLine = isDark ? DARK.accentLine : C.accentLine;
  const accentDk = isDark ? DARK.accentDk : C.accentDk;
  const accentBg = isDark ? DARK.accentBg : C.accentBg;
  const border = isDark ? DARK.border : C.border;
  const text = isDark ? DARK.text : C.text;
  const textMute = isDark ? DARK.textMute : C.textMute;
  const panelBg = isDark ? DARK.bg : '#FFFFFF';

  return (
    <Box sx={{ position: 'relative', width: '100%', aspectRatio: '1 / 1' }}>
      <Box component="svg" viewBox="0 0 500 500" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {positions.map((p, i) => (
          <line
            key={`base-${i}`} x1={CENTER} y1={CENTER} x2={p.x} y2={p.y}
            stroke={border} strokeWidth={1.2}
          />
        ))}
        {positions.map((p, i) => (
          <line
            key={`pulse-${i}`} x1={CENTER} y1={CENTER} x2={p.x} y2={p.y}
            stroke={accent} strokeWidth={1.4} strokeLinecap="round"
            strokeDasharray="3 10" opacity={hovered === i ? 0.75 : 0.3}
            className="sa-hub-pulse"
          />
        ))}

        <circle cx={CENTER} cy={CENTER} r={44} fill={accentBg} stroke={accentLine} strokeWidth={1.5} />
        <text x={CENTER} y={CENTER - 3} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={13} fill={text}>DATHEON</text>
        <text x={CENTER} y={CENTER + 13} textAnchor="middle" fontFamily={MONO} fontWeight={500} fontSize={7.5} letterSpacing="0.5" fill={textMute}>ENGINEERING</text>

        {positions.map((p, i) => {
          const isHovered = hovered === i;
          return (
            <g key={i} style={{ opacity: animate ? 1 : 0, transition: `opacity .45s ease ${0.1 + i * 0.06}s` }}>
              <circle
                cx={p.x} cy={p.y} r={isHovered ? 26 : 22}
                fill={isHovered ? accent : panelBg}
                stroke={isHovered ? accent : border}
                strokeWidth={1.4}
                style={{ transition: 'r 0.2s ease' }}
              />
            </g>
          );
        })}
        {positions.map((p, i) => {
          const below = p.y > CENTER + 40;
          const labelY = below ? p.y + 38 : (p.y < CENTER - 40 ? p.y - 30 : p.y + 4);
          const isHovered = hovered === i;
          return (
            <text
              key={`l-${i}`} x={p.x} y={labelY} textAnchor="middle"
              fontFamily={MONO} fontWeight={700} fontSize={9}
              letterSpacing="0.03em" fill={isHovered ? accentDk : text}
              style={{ opacity: animate ? 1 : 0, transition: `opacity .45s ease ${0.1 + i * 0.06}s` }}
            >
              {CHAIN[i].name}
            </text>
          );
        })}
      </Box>

      {/* overlay HTML — hover trigger */}
      {positions.map((p, i) => (
        <Box
          key={`hit-${i}`}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(null)}
          sx={{
            position: 'absolute', width: '13%', height: '13%',
            left: `${(p.x / 500) * 100}%`, top: `${(p.y / 500) * 100}%`,
            transform: 'translate(-50%, -50%)', cursor: 'pointer',
          }}
        >
          <AnimatePresence>
            {hovered === i && (
              <Box
                component={motion.div}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                sx={{
                  position: 'absolute', bottom: p.y > CENTER ? 'auto' : 'calc(100% + 32px)',
                  top: p.y > CENTER ? 'calc(100% + 32px)' : 'auto',
                  left: '50%', transform: 'translateX(-50%)', zIndex: 40,
                  width: 'max-content', maxWidth: 180,
                  bgcolor: panelBg, border: `1px solid ${accentLine}`, borderRadius: '10px',
                  p: 1.1, boxShadow: `0 14px 30px ${alpha(isDark ? '#000' : C.text, 0.14)}`,
                }}
              >
                <Typography sx={{ fontFamily: MONO, fontSize: '0.6rem', fontWeight: 700, color: accentDk, mb: 0.4 }}>
                  {CHAIN[i].desc}
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.35 }}>
                  {CHAIN[i].chips.map((c) => (
                    <Box key={c} sx={{
                      px: 0.8, py: 0.2, borderRadius: '20px', bgcolor: accentBg,
                      fontFamily: MONO, fontSize: '0.56rem', color: accentDk, whiteSpace: 'nowrap',
                    }}>
                      {c}
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </AnimatePresence>
        </Box>
      ))}
    </Box>
  );
}
