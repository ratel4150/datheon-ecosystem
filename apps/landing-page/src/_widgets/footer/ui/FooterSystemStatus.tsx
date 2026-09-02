'use client';

import { useState } from 'react';
import { Box, Stack, Typography, Collapse } from '@mui/material';
import { FiTerminal, FiChevronDown } from 'react-icons/fi';
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

interface FooterSystemStatusProps {
  toggleLabel: string;
  initLabel: string;
  readyLabel: string;
  T: Tokens;
}

export function FooterSystemStatus({ toggleLabel, initLabel, readyLabel, T }: FooterSystemStatusProps) {
  const [open, setOpen] = useState(false);
  const { expandedId, toggle } = useFooterTerminal();

  return (
    <Box>
      <Box
        component="button"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="ft-focus"
        sx={{
          appearance: 'none',
          bgcolor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          p: 0,
          color: T.textMute,
          transition: 'color 0.2s ease',
          '&:hover': { color: T.accent },
        }}
      >
        <FiTerminal size={12} />
        <Typography sx={{ fontFamily: MONO, fontSize: '0.72rem' }}>{toggleLabel}</Typography>
        <Box sx={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s ease', display: 'flex' }}>
          <FiChevronDown size={12} />
        </Box>
      </Box>

      <Collapse in={open} timeout={200} unmountOnExit>
        <Box sx={{ mt: 1.5, p: 1.75, borderRadius: '10px', border: `1px solid ${T.border}`, bgcolor: T.surface, fontFamily: MONO }}>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.65rem', color: T.textMute, mb: 0.25 }}>datheon://</Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: T.accent, fontWeight: 700, mb: 1 }}>{initLabel}</Typography>

          <Stack spacing={0.15}>
            {TERMINAL_SYSTEMS.map((system) => {
              const expanded = expandedId === system.id;
              return (
                <Box key={system.id}>
                  <Box
                    component="button"
                    type="button"
                    onClick={() => toggle(system.id)}
                    aria-expanded={expanded}
                    className="ft-focus"
                    sx={{ width: '100%', appearance: 'none', bgcolor: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', py: 0.35, textAlign: 'left' }}
                  >
                    <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: expanded ? T.accent : T.textMid }}>
                      {expanded ? '└──' : '├──'} {system.label}
                    </Typography>
                    <Stack direction="row" sx={{ alignItems: 'center', gap: 0.5 }}>
                      <Box sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: ONLINE_COLOR }} />
                      <Typography sx={{ fontFamily: MONO, fontSize: '0.58rem', color: ONLINE_COLOR, fontWeight: 700 }}>ONLINE</Typography>
                    </Stack>
                  </Box>
                  <Collapse in={expanded} timeout={150} unmountOnExit>
                    <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.5, pl: 2.5, pb: 0.75, pt: 0.35 }}>
                      {system.subTechs.map((tech) => (
                        <Box key={tech} sx={{ px: 0.9, py: 0.3, borderRadius: '8px', bgcolor: `${T.accent}14`, border: `1px solid ${T.accent}40` }}>
                          <Typography sx={{ fontFamily: MONO, fontSize: '0.58rem', color: T.accent, fontWeight: 600 }}>{tech}</Typography>
                        </Box>
                      ))}
                    </Stack>
                  </Collapse>
                </Box>
              );
            })}
          </Stack>

          <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: T.accent, fontWeight: 700, mt: 1 }}>{readyLabel}</Typography>
        </Box>
      </Collapse>
    </Box>
  );
}
