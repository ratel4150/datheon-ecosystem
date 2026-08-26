'use client';

import { Card, CardActionArea, CardContent, Stack, Typography, Chip, Collapse, alpha } from '@mui/material';
import { motion, useReducedMotion } from 'framer-motion';
import { FiLink } from 'react-icons/fi';
import { MONO } from '../lib';
import type { NodeData, NodeId } from '../lib';

interface Tokens {
  surface: string;
  text: string;
  textMid: string;
  textMute: string;
  accent: string;
  accentDk: string;
  accentBg: string;
  accentLine: string;
  border: string;
}

interface EcosystemNodeCardProps {
  node: NodeData;
  connections: string[];
  connectsWithLabel: string;
  isSelected: boolean;
  isDimmed: boolean;
  T: Tokens;
  onHover: (id: NodeId | null) => void;
  onToggle: (id: NodeId) => void;
  delay: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: (delay: number) => ({ opacity: 1, y: 0, transition: { delay, duration: 0.4, ease: 'easeOut' } }),
};

export function EcosystemNodeCard({ node, connections, connectsWithLabel, isSelected, isDimmed, T, onHover, onToggle, delay }: EcosystemNodeCardProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <Card
      component={motion.div}
      custom={prefersReducedMotion ? 0 : delay}
      variants={cardVariants}
      elevation={0}
      sx={{
        bgcolor: T.surface,
        border: `1px solid ${isSelected ? T.accent : T.border}`,
        borderRadius: '14px',
        opacity: isDimmed ? 0.45 : 1,
        boxShadow: isSelected ? `0 0 0 1px ${T.accent}, 0 12px 28px ${alpha(T.accent, 0.18)}` : 'none',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease, opacity 0.25s ease, background-color 0.3s ease',
      }}
    >
      <CardActionArea
        className="eco-focus"
        aria-pressed={isSelected}
        onClick={() => onToggle(node.id)}
        onMouseEnter={() => onHover(node.id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(node.id)}
        onBlur={() => onHover(null)}
        sx={{ borderRadius: '14px' }}
      >
        <CardContent sx={{ p: 2 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography sx={{ fontFamily: MONO, fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.06em', color: T.text, transition: 'color 0.3s ease' }}>
              {node.label}
            </Typography>
            {node.metadata.length > 0 && (
              <Chip
                label={node.metadata.length}
                size="small"
                sx={{ height: 20, minWidth: 20, fontFamily: MONO, fontSize: '0.62rem', bgcolor: T.accentBg, color: T.accentDk }}
              />
            )}
          </Stack>

          <Collapse in={isSelected} timeout={220} unmountOnExit>
            <Stack spacing={1} sx={{ mt: 1.5 }}>
              <Stack direction="row" flexWrap="wrap" gap={0.6}>
                {node.metadata.map((item) => (
                  <Chip
                    key={item}
                    label={item}
                    size="small"
                    variant="outlined"
                    sx={{ borderColor: T.accentLine, color: T.textMid, fontFamily: MONO, fontSize: '0.62rem' }}
                  />
                ))}
              </Stack>

              {connections.length > 0 && (
                <Stack direction="row" alignItems="center" flexWrap="wrap" gap={0.6}>
                  <FiLink size={11} color={T.textMute} />
                  <Typography sx={{ fontFamily: MONO, fontSize: '0.6rem', color: T.textMute }}>{connectsWithLabel}</Typography>
                  {connections.map((c) => (
                    <Chip key={c} label={c} size="small" sx={{ height: 20, bgcolor: T.accentBg, color: T.accentDk, fontFamily: MONO, fontSize: '0.6rem' }} />
                  ))}
                </Stack>
              )}
            </Stack>
          </Collapse>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
