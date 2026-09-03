'use client';

import { Box, Typography, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { MONO } from '@datheon/ui';
import { FiCheck } from 'react-icons/fi';
import { itemVariants } from './motionVariants';
import type { BuildOption } from '../lib';

interface Tokens { surface: string; text: string; textMid: string; border: string; }
interface Props { option: BuildOption; selected: boolean; T: Tokens; onSelect: (id: string) => void; }

export function BuildOptionCard({ option, selected, T, onSelect }: Props) {
  return (
    <Box
      component={motion.button} type="button" variants={itemVariants} whileHover={{ y: -3 }} onClick={() => onSelect(option.id)} className="bw-focus"
      sx={{ appearance: 'none', cursor: 'pointer', textAlign: 'left', width: '100%', height: '100%', p: 2.25, borderRadius: '14px', bgcolor: selected ? alpha(option.color, 0.08) : T.surface, border: `1.5px solid ${selected ? option.color : T.border}`, transition: 'border-color 0.2s ease, background-color 0.2s ease' }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.25 }}>
        <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: alpha(option.color, 0.14), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Box sx={{ width: 10, height: 10, borderRadius: '3px', bgcolor: option.color }} />
        </Box>
        {selected && <FiCheck size={16} color={option.color} />}
      </Box>
      <Typography sx={{ fontFamily: MONO, fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.04em', color: option.color, mb: 0.5 }}>{option.label}</Typography>
      <Typography sx={{ fontSize: '0.82rem', color: T.textMid, lineHeight: 1.5 }}>{option.description}</Typography>
    </Box>
  );
}
