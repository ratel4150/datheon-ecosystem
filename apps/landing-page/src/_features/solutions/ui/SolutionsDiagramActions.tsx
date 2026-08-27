'use client';

import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { FiCopy, FiCheck, FiMove } from 'react-icons/fi';
import { MONO } from '../lib';

interface Tokens {
  textMute: string;
  accent: string;
  border: string;
}

interface SolutionsDiagramActionsProps {
  summaryText: string;
  copyLabel: string;
  copiedLabel: string;
  dragHint: string;
  T: Tokens;
}

export function SolutionsDiagramActions({ summaryText, copyLabel, copiedLabel, dragHint, T }: SolutionsDiagramActionsProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // portapapeles no disponible — no rompe la UI
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button
        onClick={handleCopy}
        startIcon={copied ? <FiCheck size={13} /> : <FiCopy size={13} />}
        className="sol-focus"
        sx={{
          fontFamily: MONO,
          fontSize: '0.72rem',
          color: copied ? '#28c840' : T.accent,
          textTransform: 'none',
          border: `1px solid ${T.border}`,
          borderRadius: '8px',
          px: 1.5,
          py: 0.6,
          '&:hover': { bgcolor: 'transparent', borderColor: T.accent },
        }}
      >
        {copied ? copiedLabel : copyLabel}
      </Button>

      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6, mt: 1.5 }}>
        <FiMove size={11} color={T.textMute} />
        <Typography sx={{ fontSize: '0.72rem', color: T.textMute }}>{dragHint}</Typography>
      </Box>
    </Box>
  );
}
