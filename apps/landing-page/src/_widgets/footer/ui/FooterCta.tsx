'use client';

import { Box, Typography, Button, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { DISPLAY, MONO } from '../lib';

interface Tokens {
  text: string;
  textMute: string;
  accent: string;
  accentDk: string;
  surface: string;
}

interface FooterCtaProps {
  headline: string;
  body: string;
  lossFraming: string;
  buttonLabel: string;
  trustNote: string;
  academyLabel: string;
  T: Tokens;
}

export function FooterCta({ headline, body, lossFraming, buttonLabel, trustNote, academyLabel, T }: FooterCtaProps) {
  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.45 }}
      sx={{
        textAlign: 'center',
        maxWidth: 560,
        mx: 'auto',
        px: { xs: 3, sm: 5 },
        py: { xs: 4, sm: 5 },
        borderRadius: '20px',
        bgcolor: alpha(T.accent, 0.06),
        border: `1px solid ${alpha(T.accent, 0.22)}`,
      }}
    >
      <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: { xs: '1.6rem', md: '2rem' }, color: T.text, mb: 1.5, letterSpacing: '-0.01em' }}>
        {headline}
      </Typography>
      <Typography sx={{ fontSize: '0.95rem', color: T.textMute, mb: 1, lineHeight: 1.7 }}>{body}</Typography>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.76rem', color: T.text, fontStyle: 'italic', mb: 3, opacity: 0.85 }}>{lossFraming}</Typography>

      <Button
        variant="contained"
        size="large"
        component={motion.a}
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        href="https://calendly.com/team_datheon/consulta-gratuita"
        target="_blank"
        rel="noopener noreferrer"
        className="ft-focus"
        endIcon={<FiArrowRight size={15} />}
        sx={{
          bgcolor: T.accent,
          color: '#fff',
          fontWeight: 700,
          fontSize: '0.9rem',
          px: 3.5,
          py: 1.3,
          borderRadius: '10px',
          textTransform: 'none',
          fontFamily: MONO,
          mb: 1,
          boxShadow: `0 4px 18px ${alpha(T.accent, 0.35)}`,
          '&:hover': { bgcolor: T.accentDk, boxShadow: `0 8px 24px ${alpha(T.accent, 0.45)}` },
        }}
      >
        {buttonLabel}
      </Button>

      <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: T.textMute, mb: 2 }}>{trustNote}</Typography>

      <Box>
        <Typography
          component="a"
          href="/universidad"
          sx={{
            fontFamily: MONO,
            fontSize: '0.8rem',
            color: T.textMute,
            textDecoration: 'none',
            '&:hover': { color: T.accent },
          }}
        >
          {academyLabel}
        </Typography>
      </Box>
    </Box>
  );
}
