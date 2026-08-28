'use client';

import { Box, Collapse, Stack, Typography, alpha } from '@mui/material';
import { FiChevronDown } from 'react-icons/fi';
import { MONO, STAGES } from '../lib';

interface Tokens {
  text: string;
  textMid: string;
  textMute: string;
  surface: string;
  border: string;
}

interface StageMobileListProps {
  activeStageId: string;
  techLabel: string;
  T: Tokens;
  onSelect: (id: string) => void;
}

export function StageMobileList({ activeStageId, techLabel, T, onSelect }: StageMobileListProps) {
  return (
    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
      <Stack spacing={1.5}>
        {STAGES.map((stage) => {
          const open = stage.id === activeStageId;
          return (
            <Box
              key={stage.id}
              sx={{
                border: `1.5px solid ${open ? stage.color : T.border}`,
                borderRadius: '14px',
                bgcolor: open ? alpha(stage.color, 0.06) : T.surface,
                overflow: 'hidden',
                transition: 'border-color 0.2s ease, background-color 0.2s ease',
              }}
            >
              <Box
                component="button"
                type="button"
                onClick={() => onSelect(open ? '' : stage.id)}
                className="stg-focus"
                sx={{
                  width: '100%',
                  appearance: 'none',
                  bgcolor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  px: 2,
                  py: 1.75,
                  textAlign: 'left',
                }}
              >
                <Box>
                  <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', fontWeight: 700, color: stage.color, mb: 0.25 }}>{stage.number}</Typography>
                  <Typography sx={{ fontFamily: MONO, fontSize: '0.78rem', fontWeight: 700, color: T.text }}>{stage.label}</Typography>
                </Box>
                <Box
                  sx={{
                    transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 0.2s ease',
                    color: T.textMute,
                    display: 'flex',
                  }}
                >
                  <FiChevronDown size={16} />
                </Box>
              </Box>

              <Collapse in={open} timeout={220} unmountOnExit>
                <Box sx={{ px: 2, pb: 2.25 }}>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: T.text, mb: 0.5 }}>{stage.tagline}</Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: T.textMute, mb: 1.5 }}>{stage.forWhom}</Typography>
                  <Typography sx={{ fontFamily: MONO, fontSize: '0.58rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: T.textMute, mb: 1 }}>
                    {techLabel}
                  </Typography>
                  <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75 }}>
                    {stage.techs.map((tech) => (
                      <Box
                        key={tech}
                        sx={{
                          px: 1.25,
                          py: 0.5,
                          borderRadius: '16px',
                          bgcolor: alpha(stage.color, 0.1),
                          border: `1px solid ${alpha(stage.color, 0.3)}`,
                        }}
                      >
                        <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', fontWeight: 600, color: stage.color }}>{tech}</Typography>
                      </Box>
                    ))}
                  </Stack>
                </Box>
              </Collapse>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
