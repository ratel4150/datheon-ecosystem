'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@/_shared/lib/theme';
import { ENTER_TOP, ENTER_BOTTOM } from '../lib/data';
import { C, DARK, MONO, DISPLAY } from '../lib/constants';

interface EnterWhereYouAreProps {
  animate: boolean;
  t: {
    enterTagline: string;
  };
}

export function EnterWhereYouAre({ animate, t }: EnterWhereYouAreProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const accent = isDark ? DARK.accent : C.accent;
  const accentLine = isDark ? DARK.accentLine : C.accentLine;
  const accentBg = isDark ? DARK.accentBg : C.accentBg;
  const border = isDark ? DARK.border : C.border;
  const text = isDark ? DARK.text : C.text;
  const textMid = isDark ? DARK.textMid : C.textMid;

  const topX = [50, 176, 304, 430];
  const botX = [110, 240, 370];

  return (
    <Box sx={{ maxWidth: 560, mx: 'auto' }}>
      <Box component="svg" viewBox="0 0 480 240" sx={{ width: '100%', height: 'auto', display: 'block' }}>
        {topX.map((x, i) => (
          <line key={`tl-${i}`} x1={x} y1={44} x2={240} y2={110} stroke={accent} strokeWidth={1.3} strokeDasharray="3 8" opacity={0.35} className="sa-hub-pulse" />
        ))}
        {botX.map((x, i) => (
          <line key={`bl-${i}`} x1={x} y1={196} x2={240} y2={150} stroke={accent} strokeWidth={1.3} strokeDasharray="3 8" opacity={0.35} className="sa-hub-pulse" />
        ))}

        <circle cx={240} cy={130} r={30} fill={accentBg} stroke={accentLine} strokeWidth={1.5} />
        <text x={240} y={134} textAnchor="middle" fontFamily={MONO} fontWeight={700} fontSize={9.5} fill={text}>DATHEON</text>

        {topX.map((x, i) => (
          <g key={`t-${i}`} style={{ opacity: animate ? 1 : 0, transition: `opacity .4s ease ${0.1 + i * 0.07}s` }}>
            <circle cx={x} cy={34} r={17} fill={isDark ? DARK.bg : '#FFFFFF'} stroke={border} strokeWidth={1.3} />
            <text x={x} y={38} textAnchor="middle" fontFamily={MONO} fontWeight={600} fontSize={6.4} fill={textMid}>{ENTER_TOP[i]}</text>
          </g>
        ))}
        {botX.map((x, i) => (
          <g key={`b-${i}`} style={{ opacity: animate ? 1 : 0, transition: `opacity .4s ease ${0.35 + i * 0.07}s` }}>
            <circle cx={x} cy={206} r={17} fill={isDark ? DARK.bg : '#FFFFFF'} stroke={border} strokeWidth={1.3} />
            <text x={x} y={210} textAnchor="middle" fontFamily={MONO} fontWeight={600} fontSize={6.4} fill={textMid}>{ENTER_BOTTOM[i]}</text>
          </g>
        ))}
      </Box>
      <Typography sx={{ textAlign: 'center', fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.05rem', color: text, mt: 1 }}>
        {t.enterTagline}
      </Typography>
    </Box>
  );
}
