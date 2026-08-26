'use client';

import { Button, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { trackCtaClicked } from '../model';

interface EcosystemCtaProps {
  label: string;
  accentColor: string;
  accentDkColor: string;
  delay?: number;
}

const ctaVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (delay: number) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.5, ease: 'easeOut' } }),
};

export function EcosystemCta({ label, accentColor, accentDkColor, delay = 0.4 }: EcosystemCtaProps) {
  return (
    <Button
      variant="contained"
      size="large"
      onClick={trackCtaClicked}
      component={motion.button}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      custom={delay}
      variants={ctaVariants}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      endIcon={<FiArrowRight size={15} />}
      sx={{
        bgcolor: accentColor,
        color: '#fff',
        fontWeight: 700,
        fontSize: '0.93rem',
        px: 3.5,
        py: 1.4,
        borderRadius: '12px',
        textTransform: 'none',
        boxShadow: `0 4px 20px ${alpha(accentColor, 0.35)}`,
        transition: 'background-color 0.2s ease, box-shadow 0.2s ease',
        '&:hover': { bgcolor: accentDkColor, boxShadow: `0 8px 28px ${alpha(accentColor, 0.45)}` },
      }}
    >
      {label}
    </Button>
  );
}
