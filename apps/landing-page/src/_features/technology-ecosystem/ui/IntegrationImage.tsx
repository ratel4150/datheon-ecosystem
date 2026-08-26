// File: apps/landing-page/src/_features/technology-ecosystem/ui/IntegrationImage.tsx
'use client';

import { Box, Typography } from '@mui/material';
import { useTheme } from '@/_shared/lib/theme';
import { SPOTLIGHT_NODES } from '../lib/data';
import { C, DARK, MONO } from '../lib/constants';

export function IntegrationImage({ animate }: { animate: boolean }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const accentColor = isDark ? DARK.accent : C.accent;
  const accentLine = isDark ? DARK.accentLine : C.accentLine;
  const borderColor = isDark ? DARK.border : C.border;
  const textColor = isDark ? DARK.text : C.text;
  const textMid = isDark ? DARK.textMid : C.textMid;
  const accentBg = isDark ? DARK.accentBg : C.accentBg;
  const textMute = isDark ? DARK.textMute : C.textMute;

  return (
    <Box component="svg" viewBox="0 0 320 320" sx={{ width: '100%', height: 'auto', display: 'block' }}>
      {SPOTLIGHT_NODES.map((n) => (
        <line
          key={`base-${n.name}`}
          x1={160} y1={160} x2={n.x} y2={n.y}
          stroke={borderColor} strokeWidth={1.3}
        />
      ))}
      {SPOTLIGHT_NODES.map((n) => (
        <line
          key={`pulse-${n.name}`}
          x1={160} y1={160} x2={n.x} y2={n.y}
          stroke={accentColor} strokeWidth={1.5} strokeLinecap="round"
          strokeDasharray="3 9" className="eco-pulse-line"
        />
      ))}

      <circle cx={160} cy={160} r={30} fill={accentBg} stroke={accentLine} strokeWidth={1.5} />
      <text x={160} y={158} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={9.5} letterSpacing="0.4" fill={textColor}>
        DATHEÓN
      </text>
      <text x={160} y={170} textAnchor="middle" fontFamily={MONO} fontWeight={500} fontSize={6.5} letterSpacing="0.5" fill={textMute}>
        INTEGRATIONS
      </text>

      {SPOTLIGHT_NODES.map((n, i) => (
        <g
          key={n.name}
          style={{
            opacity: animate ? 1 : 0,
            transform: animate ? 'scale(1)' : 'scale(0.7)',
            transformOrigin: `${n.x}px ${n.y}px`,
            transition: `opacity 0.4s ease ${0.15 + i * 0.08}s, transform 0.4s ease ${0.15 + i * 0.08}s`,
          }}
        >
          <circle
            cx={n.x} cy={n.y} r={('highlight' in n && n.highlight) ? 22 : 18}
            fill={('highlight' in n && n.highlight) ? accentColor : (isDark ? DARK.panelBg : '#FFFFFF')}
            stroke={('highlight' in n && n.highlight) ? accentColor : borderColor}
            strokeWidth={1.4}
          />
          <text
            x={n.x} y={n.y + 3} textAnchor="middle" fontFamily={MONO} fontWeight={600}
            fontSize={6.2} fill={('highlight' in n && n.highlight) ? '#FFFFFF' : textMid}
          >
            {n.name.length > 9 ? n.name.slice(0, 8) + '…' : n.name}
          </text>
        </g>
      ))}
    </Box>
  );
}
