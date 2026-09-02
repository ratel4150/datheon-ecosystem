// File: apps/landing-page/src/_features/ecosystem/ui/EcosystemFlowNode.tsx
// File: apps/landing-page/src/_features/ecosystem/ui/EcosystemFlowNode.tsx
'use client';

import { Handle, Position } from 'reactflow';
import { Box, Typography } from '@mui/material';
import type { IconType } from 'react-icons';
import { MONO } from '../lib';

export interface EcosystemFlowNodeData {
  label: string;
  color: string;
  Icon: IconType;
  surface: string;
  text: string;
  isRoot?: boolean;
}

export function EcosystemFlowNode({ data }: { data: EcosystemFlowNodeData }) {
  const { label, color, Icon, surface, text, isRoot } = data;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        px: 1.5,
        py: 1,
        minWidth: 150,
        bgcolor: surface,
        border: `1.5px solid ${color}`,
        borderRadius: '10px',
        boxShadow: isRoot ? `0 6px 18px ${color}40` : `0 2px 8px ${color}25`,
      }}
    >
      <Handle type="target" position={Position.Left} style={{ background: color, width: 6, height: 6, border: 'none' }} />
      <Box
        sx={{
          width: 26,
          height: 26,
          borderRadius: '8px',
          bgcolor: color,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <Icon size={14} color="#FFFFFF" />
      </Box>
      <Typography sx={{ fontFamily: MONO, fontSize: '0.7rem', fontWeight: isRoot ? 800 : 700, color: text, whiteSpace: 'nowrap' }}>
        {label}
      </Typography>
      <Handle type="source" position={Position.Right} style={{ background: color, width: 6, height: 6, border: 'none' }} />
    </Box>
  );
}