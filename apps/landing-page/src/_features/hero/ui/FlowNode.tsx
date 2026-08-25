'use client';

import { Box, Typography, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { Handle, Position } from 'reactflow';
import { useState } from 'react';
import { C, MONO } from '../lib/constants';

export type Variant = 'core' | 'branch' | 'merge' | 'result';

interface FlowNodeData {
  label: string;
  sublabel?: string;
  variant: Variant;
  delay: number;
  animate: boolean;
  chips?: string[];
}

export function FlowNode({ data }: { data: FlowNodeData }) {
  const { label, sublabel, variant, delay, animate, chips } = data;
  const [hovered, setHovered] = useState(false);

  const styles: Record<Variant, { bg: string; border: string; color: string; weight: number; size: string; shadow?: string }> = {
    core:   { bg: C.accentBg,  border: C.accentLine, color: C.text,    weight: 700, size: '0.78rem' },
    branch: { bg: '#FFFFFF',   border: C.border,     color: C.textMid, weight: 600, size: '0.64rem' },
    merge:  { bg: '#FFFFFF',   border: C.border,     color: C.textMid, weight: 500, size: '0.6rem' },
    result: { bg: C.accent,    border: C.accent,     color: '#FFFFFF', weight: 700, size: '0.7rem', shadow: `0 10px 26px ${alpha(C.accent, 0.4)}` },
  };
  const s = styles[variant];

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, scale: 0.85, y: 8 }}
      animate={animate ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => variant === 'branch' && setHovered(true)}
      onMouseLeave={() => variant === 'branch' && setHovered(false)}
      className={variant === 'result' ? 'df-glow-node df-glow-result' : 'df-glow-node'}
      sx={{
        position: 'relative',
        width: '100%', height: '100%',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        px: 1, py: 0.75,
        borderRadius: '7px',
        bgcolor: s.bg,
        border: `1px solid ${variant === 'branch' && hovered ? C.accent : s.border}`,
        boxShadow: s.shadow ?? `0 2px 8px ${alpha(C.text, 0.04)}`,
        cursor: variant === 'branch' ? 'pointer' : 'default',
        transition: 'border-color 0.2s ease',
      }}
    >
      {variant === 'core' && (
        <>
          <Box sx={{ position: 'absolute', top: 4, left: 5, color: alpha(C.accent, 0.55), fontFamily: MONO, fontSize: '0.56rem', lineHeight: 1 }}>+</Box>
          <Box sx={{ position: 'absolute', bottom: 4, right: 5, color: alpha(C.accent, 0.55), fontFamily: MONO, fontSize: '0.56rem', lineHeight: 1 }}>+</Box>
        </>
      )}

      <Handle type="target" position={Position.Top} style={{ opacity: 0, pointerEvents: 'none' }} />

      <Typography sx={{
        fontFamily: MONO, fontWeight: s.weight, fontSize: s.size,
        letterSpacing: '0.04em', textTransform: 'uppercase',
        color: s.color, textAlign: 'center', whiteSpace: 'nowrap',
      }}>
        {label}
      </Typography>
      {sublabel && (
        <Typography sx={{
          fontFamily: MONO, fontWeight: 500, fontSize: '0.53rem',
          letterSpacing: '0.07em', textTransform: 'uppercase',
          color: C.textMute, textAlign: 'center', mt: 0.3, whiteSpace: 'nowrap',
        }}>
          {sublabel}
        </Typography>
      )}

      <Handle type="source" position={Position.Bottom} style={{ opacity: 0, pointerEvents: 'none' }} />

      {chips && (
        <AnimatePresence>
          {hovered && (
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18 }}
              sx={{
                position: 'absolute', top: 'calc(100% + 6px)', left: '50%',
                transform: 'translateX(-50%)', zIndex: 30,
                display: 'flex', flexWrap: 'wrap', justifyContent: 'center',
                gap: 0.4, width: 'max-content', maxWidth: 150,
              }}
            >
              {chips.map((chip) => (
                <Box
                  key={chip}
                  sx={{
                    px: 0.7, py: 0.25, borderRadius: '20px',
                    bgcolor: C.accentBg, border: `1px solid ${C.accentLine}`,
                    fontFamily: MONO, fontSize: '0.54rem', color: C.accentDk,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {chip}
                </Box>
              ))}
            </Box>
          )}
        </AnimatePresence>
      )}
    </Box>
  );
}
