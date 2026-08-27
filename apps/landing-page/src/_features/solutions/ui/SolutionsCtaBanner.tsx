'use client';

import { Box, Typography, Button, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { DISPLAY, MONO } from '../lib';

interface Tokens {
  text: string;
  textMid: string;
  accent: string;
  accentDk: string;
  border: string;
}

interface SolutionsCtaBannerProps {
  headline: string;
  body: string;
  buttonLabel: string;
  T: Tokens;
}

export function SolutionsCtaBanner({ headline, body, buttonLabel, T }: SolutionsCtaBannerProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.4 }}
      sx={{ textAlign: 'center', maxWidth: 560, mx: 'auto', mt: { xs: 6, md: 7 }, pt: { xs: 5, md: 6 }, borderTop: `1px solid ${alpha(T.border, 0.7)}` }}
    >
      <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.7rem' }, color: T.text, mb: 1.5 }}>
        {headline}
      </Typography>
      <Typography sx={{ fontSize: '0.95rem', color: T.textMid, lineHeight: 1.75, mb: 3 }}>{body}</Typography>

      <Button
        variant="contained"
        size="large"
        href="https://calendly.com/team_datheon/consulta-gratuita"
        target="_blank"
        rel="noopener noreferrer"
        className="sol-focus"
        endIcon={<FiArrowRight size={15} />}
        sx={{
          bgcolor: T.accent,
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.93rem',
          px: 3.5,
          py: 1.4,
          borderRadius: '12px',
          textTransform: 'none',
          fontFamily: MONO,
          boxShadow: `0 4px 20px ${alpha(T.accent, 0.35)}`,
          '&:hover': { bgcolor: T.accentDk, boxShadow: `0 8px 28px ${alpha(T.accent, 0.45)}` },
        }}
      >
        {buttonLabel}
      </Button>
    </Box>
  );
}
