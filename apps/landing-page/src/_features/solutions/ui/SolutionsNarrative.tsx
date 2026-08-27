'use client';

import { Box, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { DISPLAY, MONO } from '../lib';
import { containerVariants, itemVariants } from './motionVariants';
import type { Narrative } from '../lib';

interface Tokens {
  text: string;
  textMid: string;
  textMute: string;
}

interface SolutionsNarrativeProps {
  title: string;
  narrative: Narrative;
  T: Tokens;
}

export function SolutionsNarrative({ title, narrative, T }: SolutionsNarrativeProps) {
  return (
    <Box component={motion.div} initial="hidden" animate="show" variants={containerVariants}>
      <Box component={motion.div} variants={itemVariants}>
        <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: { xs: '1.2rem', md: '1.35rem' }, color: T.text, mb: 1.5 }}>
          {title}
        </Typography>
      </Box>

      <Box component={motion.div} variants={itemVariants}>
        <Typography sx={{ fontSize: '0.95rem', color: T.textMid, lineHeight: 1.75, mb: 3 }}>{narrative.intro}</Typography>
      </Box>

      <Stack spacing={3}>
        {narrative.sections.map((section) => (
          <Box key={section.groupId} component={motion.div} variants={itemVariants} sx={{ borderLeft: `2px solid ${section.groupColor}`, pl: 2 }}>
            <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.05em', color: section.groupColor, mb: 0.5 }}>
              {section.groupLabel.toUpperCase()}
            </Typography>
            <Typography sx={{ fontSize: '0.88rem', color: T.textMute, lineHeight: 1.6, mb: 1.25 }}>{section.intro}</Typography>

            <Stack spacing={1.25}>
              {section.items.map((item) => (
                <Box key={item.blockLabel}>
                  <Typography component="span" sx={{ fontSize: '0.92rem', fontWeight: 700, color: T.text }}>
                    {item.label}
                  </Typography>
                  <Typography component="span" sx={{ fontSize: '0.85rem', color: T.textMid }}>
                    {' '}
                    — {item.description}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>
        ))}
      </Stack>
    </Box>
  );
}
