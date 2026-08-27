'use client';

import { Box, Grid, Card, CardActionArea, CardContent, Typography, Button } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { MONO } from '../lib';
import type { PathDefinition } from '../lib';

interface Tokens {
  surface: string;
  text: string;
  textMid: string;
  accent: string;
  accentDk: string;
  border: string;
}

interface SubOptionGridProps {
  path: PathDefinition;
  selectedSubOptionId: string | null;
  prompt: string;
  backLabel: string;
  generateLabel: string;
  T: Tokens;
  onSelectSubOption: (id: string) => void;
  onBack: () => void;
  onGenerate: () => void;
}

export function SubOptionGrid({ path, selectedSubOptionId, prompt, backLabel, generateLabel, T, onSelectSubOption, onBack, onGenerate }: SubOptionGridProps) {
  return (
    <Box component={motion.div} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
      <Button
        onClick={onBack}
        startIcon={<FiArrowLeft size={13} />}
        sx={{ fontFamily: MONO, fontSize: '0.72rem', color: T.textMid, textTransform: 'none', mb: 2, '&:hover': { color: T.accent, bgcolor: 'transparent' } }}
      >
        {backLabel}
      </Button>

      <Typography sx={{ fontFamily: MONO, fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.06em', color: path.color, mb: 0.5 }}>
        {path.label}
      </Typography>
      <Typography sx={{ fontSize: { xs: '1.1rem', md: '1.3rem' }, fontWeight: 700, color: T.text, mb: 3 }}>{prompt}</Typography>

      <Grid container spacing={1.5} sx={{ mb: 3 }}>
        {path.subOptions.map((opt) => {
          const selected = selectedSubOptionId === opt.id;
          return (
            <Grid item xs={12} sm={6} key={opt.id}>
              <Card
                elevation={0}
                sx={{
                  bgcolor: selected ? `${path.color}14` : T.surface,
                  border: `1.5px solid ${selected ? path.color : T.border}`,
                  borderRadius: '12px',
                  transition: 'border-color 0.2s ease, background-color 0.2s ease',
                }}
              >
                <CardActionArea onClick={() => onSelectSubOption(opt.id)} sx={{ px: 2, py: 1.75 }}>
                  <CardContent sx={{ p: 0 }}>
                    <Typography sx={{ fontSize: '0.88rem', fontWeight: 600, color: selected ? path.color : T.text }}>{opt.label}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      <Box sx={{ textAlign: 'center' }}>
        <Button
          variant="contained"
          size="large"
          disabled={!selectedSubOptionId}
          onClick={onGenerate}
          endIcon={<FiArrowRight size={15} />}
          sx={{
            bgcolor: path.color,
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.9rem',
            px: 3.5,
            py: 1.3,
            borderRadius: '12px',
            textTransform: 'none',
            '&:hover': { bgcolor: path.color, opacity: 0.9 },
            '&.Mui-disabled': { bgcolor: T.border, color: T.textMid },
          }}
        >
          {generateLabel}
        </Button>
      </Box>
    </Box>
  );
}
