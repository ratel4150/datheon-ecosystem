'use client';

import { Stepper, Step, StepButton, StepContent, Box, Stack, Typography, alpha } from '@mui/material';
import { MONO, STAGES } from '../lib';
import { StageStepIcon } from './StageStepIcon';

interface Tokens {
  text: string;
  textMid: string;
  textMute: string;
  surface: string;
  border: string;
}

interface StageMobileStepperProps {
  activeStageId: string;
  techLabel: string;
  T: Tokens;
  onSelect: (id: string) => void;
}

export function StageMobileStepper({ activeStageId, techLabel, T, onSelect }: StageMobileStepperProps) {
  const activeIndex = Math.max(0, STAGES.findIndex((s) => s.id === activeStageId));

  return (
    <Stepper
      nonLinear
      orientation="vertical"
      activeStep={activeIndex}
      sx={{
        display: { xs: 'flex', md: 'none' },
        '& .MuiStepConnector-line': { borderColor: T.border },
      }}
    >
      {STAGES.map((stage) => {
        const active = stage.id === activeStageId;
        return (
          <Step key={stage.id}>
            <StepButton onClick={() => onSelect(stage.id)} className="stg-focus" icon={<StageStepIcon stage={stage} active={active} T={T} />}>
              <Typography sx={{ fontFamily: MONO, fontSize: '0.78rem', fontWeight: 700, color: T.text }}>{stage.label}</Typography>
            </StepButton>
            <StepContent>
              <Typography sx={{ fontSize: '0.85rem', fontWeight: 600, color: T.text, mb: 0.5 }}>{stage.tagline}</Typography>
              <Typography sx={{ fontSize: '0.78rem', color: T.textMute, mb: 1.5 }}>{stage.forWhom}</Typography>
              <Typography sx={{ fontFamily: MONO, fontSize: '0.58rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: T.textMute, mb: 1 }}>
                {techLabel}
              </Typography>
              <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75, mb: 1 }}>
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
            </StepContent>
          </Step>
        );
      })}
    </Stepper>
  );
}
