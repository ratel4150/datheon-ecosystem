'use client';

import { Box, Stack, Typography } from '@mui/material';
import { GOALS, MONO } from '../lib';

interface Tokens {
  text: string;
  textMute: string;
  accent: string;
  border: string;
}

interface StageGoalsChipsProps {
  prompt: string;
  selectedGoals: string[];
  T: Tokens;
  onToggle: (goal: string) => void;
}

export function StageGoalsChips({ prompt, selectedGoals, T, onToggle }: StageGoalsChipsProps) {
  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: T.textMute, mb: 1.5 }}>
        {prompt}
      </Typography>
      <Stack direction="row" sx={{ flexWrap: 'wrap', justifyContent: 'center', gap: 1 }}>
        {GOALS.map((goal) => {
          const selected = selectedGoals.includes(goal);
          return (
            <Box
              key={goal}
              component="button"
              type="button"
              onClick={() => onToggle(goal)}
              className="stg-focus"
              sx={{
                appearance: 'none',
                cursor: 'pointer',
                px: 1.75,
                py: 0.75,
                borderRadius: '20px',
                fontFamily: MONO,
                fontSize: '0.78rem',
                fontWeight: 600,
                bgcolor: selected ? T.accent : 'transparent',
                color: selected ? '#FFFFFF' : T.text,
                border: `1.5px solid ${selected ? T.accent : T.border}`,
                transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease',
                '&:hover': { borderColor: T.accent },
              }}
            >
              {goal}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
