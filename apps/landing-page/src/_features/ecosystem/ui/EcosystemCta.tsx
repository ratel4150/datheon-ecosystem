'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { MONO } from '../lib';
import { trackCtaClicked } from '../model';

interface EcosystemCtaProps {
  label: string;
  accentColor: string;
  accentBg: string;
  delay?: number;
}

export function EcosystemCta({ label, accentColor, accentBg, delay = 0.4 }: EcosystemCtaProps) {
  return (
    <Box
      component={motion.button}
      type="button"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      onClick={trackCtaClicked}
      className="eco-focus"
      sx={{
        appearance: 'none',
        border: 'none',
        bgcolor: 'transparent',
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.8,
        mx: 'auto',
        mt: 2,
        px: 2,
        py: 1,
        borderRadius: '8px',
        fontFamily: MONO,
        fontSize: '0.85rem',
        fontWeight: 600,
        color: accentColor,
        transition: 'background-color 0.2s ease, color 0.3s ease',
        '&:hover': { bgcolor: accentBg },
      }}
    >
      {label}
      <Box component="span" sx={{ fontSize: '1.1rem' }}>
        →
      </Box>
    </Box>
  );
}
