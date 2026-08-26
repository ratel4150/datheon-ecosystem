'use client';

import { Box, Stack, Typography, Chip } from '@mui/material';
import { FiLink } from 'react-icons/fi';
import { MONO, type NodeData } from '../lib';

interface Tokens {
  text: string;
  textMid: string;
  textMute: string;
  accentDk: string;
  accentBg: string;
  accentLine: string;
}

interface EcosystemNodeDetailProps {
  node: NodeData | null;
  connections: string[];
  connectsWithLabel: string;
  emptyHint: string;
  T: Tokens;
}

export function EcosystemNodeDetail({ node, connections, connectsWithLabel, emptyHint, T }: EcosystemNodeDetailProps) {
  if (!node) {
    return (
      <Typography sx={{ fontFamily: MONO, fontSize: '0.7rem', color: T.textMute, textAlign: 'center', mt: 2 }}>
        {emptyHint}
      </Typography>
    );
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.06em', color: T.text, mb: 1 }}>
        {node.label}
      </Typography>
      {node.metadata.length > 0 && (
        <Stack direction="row" flexWrap="wrap" gap={0.6} sx={{ mb: connections.length ? 1 : 0 }}>
          {node.metadata.map((item) => (
            <Chip key={item} label={item} size="small" variant="outlined" sx={{ borderColor: T.accentLine, color: T.textMid, fontFamily: MONO, fontSize: '0.62rem' }} />
          ))}
        </Stack>
      )}
      {connections.length > 0 && (
        <Stack direction="row" alignItems="center" flexWrap="wrap" gap={0.6}>
          <FiLink size={11} color={T.textMute} />
          <Typography sx={{ fontFamily: MONO, fontSize: '0.6rem', color: T.textMute }}>{connectsWithLabel}</Typography>
          {connections.map((c) => (
            <Chip key={c} label={c} size="small" sx={{ height: 20, bgcolor: T.accentBg, color: T.accentDk, fontFamily: MONO, fontSize: '0.6rem' }} />
          ))}
        </Stack>
      )}
    </Box>
  );
}
