'use client';

import { Box, Stack, Typography, Collapse } from '@mui/material';
import { MONO, ONLINE_COLOR, TERMINAL_SYSTEMS } from '../lib';
import { useFooterTerminal } from '../model';

interface Tokens {
  text: string;
  textMid: string;
  textMute: string;
  accent: string;
  surface: string;
  border: string;
}

interface FooterTerminalProps {
  initLabel: string;
  readyLabel: string;
  T: Tokens;
}

export function FooterTerminal({ initLabel, readyLabel, T }: FooterTerminalProps) {
  const { expandedId, toggle } = useFooterTerminal();

  return (
    <Box
      sx={{
        maxWidth: 520,
        mx: 'auto',
        bgcolor: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: '12px',
        p: 2.5,
        fontFamily: MONO,
      }}
    >
      <Typography sx={{ fontFamily: MONO, fontSize: '0.7rem', color: T.textMute, mb: 0.5 }}>datheon://</Typography>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.75rem', color: T.accent, fontWeight: 700, mb: 1.5 }}>{initLabel}</Typography>

      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: T.textMute, mb: 0.75, letterSpacing: '0.05em' }}>SYSTEM</Typography>

      <Stack spacing={0.25}>
        {TERMINAL_SYSTEMS.map((system) => {
          const open = expandedId === system.id;
          return (
            <Box key={system.id}>
              <Box
                component="button"
                type="button"
                onClick={() => toggle(system.id)}
                aria-expanded={open}
                className="ft-focus"
                sx={{
                  width: '100%',
                  appearance: 'none',
                  bgcolor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  py: 0.5,
                  textAlign: 'left',
                }}
              >
                <Typography sx={{ fontFamily: MONO, fontSize: '0.75rem', color: open ? T.accent : T.text }}>
                  {open ? '└──' : '├──'} {system.label}
                </Typography>
                <Stack direction="row" sx={{ alignItems: 'center', gap: 0.6 }}>
                  <Box sx={{ width: 5, height: 5, borderRadius: '50%', bgcolor: ONLINE_COLOR }} />
                  <Typography sx={{ fontFamily: MONO, fontSize: '0.65rem', color: ONLINE_COLOR, fontWeight: 700 }}>[ONLINE]</Typography>
                </Stack>
              </Box>
              <Collapse in={open} timeout={180} unmountOnExit>
                <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.6, pl: 2.5, pb: 1, pt: 0.5 }}>
                  {system.subTechs.map((tech) => (
                    <Box key={tech} sx={{ px: 1, py: 0.35, borderRadius: '10px', bgcolor: `${T.accent}14`, border: `1px solid ${T.accent}40` }}>
                      <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', color: T.accent, fontWeight: 600 }}>{tech}</Typography>
                    </Box>
                  ))}
                </Stack>
              </Collapse>
            </Box>
          );
        })}
      </Stack>

      <Typography sx={{ fontFamily: MONO, fontSize: '0.75rem', color: T.accent, fontWeight: 700, mt: 1.5 }}>{readyLabel}</Typography>
      <Box
        sx={{
          width: 8,
          height: 14,
          bgcolor: T.accent,
          mt: 0.5,
          animation: 'ft-blink 1.1s steps(1) infinite',
          '@keyframes ft-blink': { '0%,50%': { opacity: 1 }, '50.01%,100%': { opacity: 0 } },
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }}
      />
    </Box>
  );
}
