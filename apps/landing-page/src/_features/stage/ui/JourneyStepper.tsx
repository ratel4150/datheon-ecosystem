'use client';

import { Stepper, Step, StepButton, Typography } from '@mui/material';
import { MONO, STAGES } from '../lib';
import { StageStepIcon } from './StageStepIcon';

interface Tokens {
  text: string;
  textMute: string;
  surface: string;
  border: string;
}

interface JourneyStepperProps {
  activeStageId: string;
  T: Tokens;
  onSelect: (id: string) => void;
  onHover: (id: string | null) => void;
}

export function JourneyStepper({ activeStageId, T, onSelect, onHover }: JourneyStepperProps) {
  const activeIndex = Math.max(0, STAGES.findIndex((s) => s.id === activeStageId));

  return (
    <Stepper
      nonLinear
      alternativeLabel
      activeStep={activeIndex}
      sx={{
        display: { xs: 'none', md: 'flex' },
        mb: 6,
        '& .MuiStepConnector-line': { borderColor: T.border },
      }}
    >
      {STAGES.map((stage) => {
        const active = stage.id === activeStageId;
        return (
          <Step key={stage.id}>
            <StepButton
              onClick={() => onSelect(stage.id)}
              onMouseEnter={() => onHover(stage.id)}
              onMouseLeave={() => onHover(null)}
              className="stg-focus"
              icon={<StageStepIcon stage={stage} active={active} T={T} />}
            >
              <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', fontWeight: active ? 700 : 500, letterSpacing: '0.03em', color: active ? stage.color : T.textMute, transition: 'color 0.25s ease' }}>
                {stage.label}
              </Typography>
            </StepButton>
          </Step>
        );
      })}
    </Stepper>
  );
}
