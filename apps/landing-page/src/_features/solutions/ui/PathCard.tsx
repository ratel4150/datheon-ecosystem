'use client';

import { Card, CardActionArea, CardContent, Box, Typography, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { MONO } from '../lib';
import { PATH_ICON } from './pathIcons';
import { itemVariants } from './motionVariants';
import type { PathDefinition } from '../lib';

interface Tokens {
  surface: string;
  text: string;
  textMid: string;
  border: string;
}

interface PathCardProps {
  path: PathDefinition;
  T: Tokens;
  onSelect: (id: string) => void;
}

export function PathCard({ path, T, onSelect }: PathCardProps) {
  const Icon = PATH_ICON[path.id];

  return (
    <Card
      component={motion.div}
      variants={itemVariants}
      whileHover={{ y: -3 }}
      elevation={0}
      sx={{
        bgcolor: T.surface,
        border: `1px solid ${T.border}`,
        borderRadius: '14px',
        height: '100%',
        transition: 'border-color 0.25s ease, background-color 0.3s ease, box-shadow 0.25s ease',
        '&:hover': { borderColor: alpha(path.color, 0.45), boxShadow: `0 8px 24px ${alpha(path.color, 0.16)}` },
      }}
    >
      <CardActionArea onClick={() => onSelect(path.id)} className="sol-focus" sx={{ height: '100%', p: 0.5, borderRadius: '14px' }}>
        <CardContent sx={{ p: 2.25 }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '10px',
              bgcolor: alpha(path.color, 0.14),
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 1.5,
              transition: 'background-color 0.2s ease',
            }}
          >
            <Icon size={19} color={path.color} />
          </Box>
          <Typography sx={{ fontFamily: MONO, fontWeight: 800, fontSize: '0.82rem', letterSpacing: '0.05em', color: path.color, mb: 0.5 }}>
            {path.label}
          </Typography>
          <Typography sx={{ fontSize: '0.82rem', color: T.textMid, lineHeight: 1.5 }}>{path.description}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
