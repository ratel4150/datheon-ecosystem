'use client';

import { Box, Stack, Typography } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { MONO, DISPLAY, STACK } from '../lib';
import { StackNode } from './StackNode';
import { itemVariants } from './animation/stackVariants';
import type { StackLayerDefinition } from '../lib';

interface StackLayerProps {
  layer: StackLayerDefinition;
  isDisplayed: boolean;
  isDimmed: boolean;
  traceOrder: number | null;
  selectedTechId: string | null;
  enableHover: boolean;
  onSelect: (id: StackLayerDefinition['id']) => void;
  onHover: (id: StackLayerDefinition['id'] | null) => void;
  onSelectTech: (layerId: StackLayerDefinition['id'], techId: string) => void;
}

export function StackLayer({ layer, isDisplayed, isDimmed, traceOrder, selectedTechId, enableHover, onSelect, onHover, onSelectTech }: StackLayerProps) {
  return (
    <Box
      component={motion.div}
      variants={itemVariants}
      onMouseEnter={enableHover ? () => onHover(layer.id) : undefined}
      onMouseLeave={enableHover ? () => onHover(null) : undefined}
      sx={{
        borderRadius: '14px',
        border: `1px solid ${traceOrder !== null ? STACK.accent : isDisplayed ? STACK.accentLine : STACK.border}`,
        bgcolor: isDisplayed ? STACK.surfaceActive : STACK.surface,
        px: { xs: 2, md: 3 },
        py: { xs: 1.75, md: 2.25 },
        opacity: isDimmed ? 0.45 : 1,
        boxShadow: traceOrder !== null ? `0 0 24px ${STACK.glow}` : 'none',
        transition: 'border-color 0.3s ease, background-color 0.3s ease, opacity 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
      }}
      onClick={() => onSelect(layer.id)}
    >
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 1.5 }}>
        <Stack direction="row" sx={{ alignItems: 'center', gap: 1.5 }}>
          {traceOrder !== null && (
            <Box
              sx={{
                width: 20,
                height: 20,
                borderRadius: '50%',
                bgcolor: STACK.accent,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Typography sx={{ fontFamily: MONO, fontWeight: 800, fontSize: '0.62rem', color: '#031018' }}>{traceOrder}</Typography>
            </Box>
          )}
          <Typography sx={{ fontFamily: MONO, fontSize: '0.66rem', fontWeight: 700, letterSpacing: '0.06em', color: isDisplayed ? STACK.accent : STACK.textMute, minWidth: 24 }}>
            {layer.number}
          </Typography>
          <Box>
            <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: { xs: '0.95rem', md: '1.05rem' }, color: STACK.text, letterSpacing: '0.01em' }}>
              {layer.label}
            </Typography>
            {isDisplayed && (
              <Typography sx={{ fontSize: '0.76rem', color: STACK.textMute, mt: 0.25 }}>{layer.description}</Typography>
            )}
          </Box>
        </Stack>
        <Typography sx={{ fontFamily: MONO, fontSize: '0.62rem', color: STACK.textMute }}>{layer.techs.length}</Typography>
      </Stack>

      <AnimatePresence>
        {isDisplayed && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            sx={{ overflow: 'hidden' }}
          >
            <Stack direction="row" sx={{ flexWrap: 'wrap', gap: 0.75, mt: 2 }} onClick={(e) => e.stopPropagation()}>
              {layer.techs.map((tech, i) => (
                <StackNode key={tech.id} tech={tech} selected={selectedTechId === tech.id} onSelect={(id) => onSelectTech(layer.id, id)} delay={i * 0.03} />
              ))}
            </Stack>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
}
