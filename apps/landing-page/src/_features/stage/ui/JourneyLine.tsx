'use client';

import { Box, Typography } from '@mui/material';
import { MONO, STAGES } from '../lib';

interface Tokens {
  text: string;
  textMute: string;
  border: string;
  surface: string;
}

interface JourneyLineProps {
  activeStageId: string;
  T: Tokens;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function JourneyLine({ activeStageId, T, onSelect, onHover }: JourneyLineProps) {
  return (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', justifyContent: 'space-between', position: 'relative', mb: 6, px: 2 }}>
      <Box sx={{ position: 'absolute', left: 24, right: 24, top: 15, height: '1px', bgcolor: T.border, zIndex: 0 }} />
      {STAGES.map((stage) => {
        const active = stage.id === activeStageId;
        return (
          <Box
            key={stage.id}
            component="button"
            type="button"
            onClick={() => onSelect(stage.id)}
            onMouseEnter={() => onHover(stage.id)}
            onMouseLeave={() => onHover(null)}
            className="stg-focus"
            sx={{
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 1,
              appearance: 'none',
              bgcolor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              px: 0.5,
            }}
          >
            <Box
              sx={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: active ? stage.color : T.surface,
                border: `2px solid ${active ? stage.color : T.border}`,
                transition: 'background-color 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
                transform: active ? 'scale(1.15)' : 'scale(1)',
              }}
            >
              <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.68rem', color: active ? '#FFFFFF' : T.textMute }}>
                {stage.number}
              </Typography>
            </Box>
            <Typography
              sx={{
                fontFamily: MONO,
                fontSize: '0.62rem',
                fontWeight: active ? 700 : 500,
                letterSpacing: '0.03em',
                color: active ? stage.color : T.textMute,
                whiteSpace: 'nowrap',
                transition: 'color 0.25s ease',
              }}
            >
              {stage.label}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
}
