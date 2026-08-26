'use client';

import { Card, Avatar, Typography, Chip } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { FiCpu } from 'react-icons/fi';
import { MONO } from '../lib';

interface EcosystemCoreCardProps {
  accent: string;
  accentDk: string;
  accentBg: string;
  glow: string;
  surface: string;
  text: string;
  delay?: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: (delay: number) => ({ opacity: 1, y: 0, scale: 1, transition: { delay, duration: 0.5, ease: 'easeOut' } }),
};

export function EcosystemCoreCard({ accent, accentDk, accentBg, glow, surface, text, delay = 0.1 }: EcosystemCoreCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Card
      component={motion.div}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      custom={prefersReducedMotion ? 0 : delay}
      variants={cardVariants}
      elevation={0}
      sx={{
        bgcolor: surface,
        border: `2px solid ${accent}`,
        borderRadius: '18px',
        boxShadow: `0 0 50px ${glow}`,
        textAlign: 'center',
        py: { xs: 3, md: 3.5 },
        px: 2,
        mb: { xs: 3, md: 4 },
        transition: 'background-color 0.3s ease, border-color 0.3s ease',
      }}
    >
      <Avatar sx={{ bgcolor: accentDk, width: 56, height: 56, mx: 'auto', mb: 1.5 }}>
        <FiCpu size={26} color="#FFFFFF" />
      </Avatar>
      <Typography sx={{ fontFamily: MONO, fontWeight: 800, fontSize: '1.15rem', letterSpacing: '0.1em', color: text, transition: 'color 0.3s ease' }}>
        DATHEÓN
      </Typography>
      <Chip
        label="AI ENGINEERING"
        size="small"
        sx={{ mt: 1, fontFamily: MONO, fontSize: '0.6rem', fontWeight: 600, bgcolor: accentBg, color: accentDk, letterSpacing: '0.06em' }}
      />
    </Card>
  );
}
