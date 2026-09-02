// File: apps/landing-page/src/_features/software-engineering/ui/SystemGraph.tsx
'use client';

import { Box } from '@mui/material';
import { motion, type MotionValue } from 'framer-motion';
import { MONO, GRAPH_NODES, GRAPH_EDGES, BRANCH_COLORS, getNode } from '../lib';

interface Tokens {
  text: string;
  accent: string;
  surface: string;
  border: string;
}

interface SystemGraphProps {
  visibleNodeIds: string[];
  visibleEdgeIds: string[];
  T: Tokens;
  scale?: MotionValue<number> | number;
  maxWidth?: { xs: number; sm: number; md: number };
}

const VIEWBOX = 560;
const CENTER = VIEWBOX / 2;
const SAFE_BRANCH_COLORS: Record<string, string> = BRANCH_COLORS && typeof BRANCH_COLORS === 'object' ? BRANCH_COLORS : {};

function nodeColor(node: { depth?: number; branch?: string } | undefined, T: Tokens): string {
  if (!node) return T.accent;
  if (node.depth === 0) return T.accent;
  const key = node.branch;
  const c = key ? SAFE_BRANCH_COLORS[key] : undefined;
  return c || T.accent;
}

function nodeRadius(depth: number): number {
  if (depth === 0) return 19;
  if (depth === 1) return 13;
  if (depth === 2) return 7.5;
  return 4.5;
}

export function SystemGraph({ visibleNodeIds, visibleEdgeIds, T, scale = 1, maxWidth = { xs: 320, sm: 440, md: 600 } }: SystemGraphProps) {
  const nodesSource = Array.isArray(GRAPH_NODES) ? GRAPH_NODES : [];
  const edgesSource = Array.isArray(GRAPH_EDGES) ? GRAPH_EDGES : [];
  const visibleEdges = edgesSource.filter((e) => visibleEdgeIds.includes(e.id));
  const visibleNodes = nodesSource.filter((n) => visibleNodeIds.includes(n.id));

  if (nodesSource.length === 0) {
    return (
      <Box sx={{ width: '100%', maxWidth, aspectRatio: '1 / 1', mx: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Box component="span" sx={{ fontFamily: MONO, fontSize: '0.7rem', color: T.text, opacity: 0.5 }}>—</Box>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', maxWidth, aspectRatio: '1 / 1', mx: 'auto' }}>
      <svg viewBox={`${-CENTER} ${-CENTER} ${VIEWBOX} ${VIEWBOX}`} width="100%" height="100%" style={{ overflow: 'visible', display: 'block' }}>
        <motion.g style={{ scale, transformOrigin: '0px 0px' }}>
          {visibleEdges.map((edge) => {
            const from = getNode(edge.from);
            const to = getNode(edge.to);
            if (!from || !to) return null;
            const color = nodeColor(to, T);
            return (
              <motion.line
                key={edge.id}
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke={color}
                strokeWidth={to.depth <= 1 ? 2.2 : 1.3}
                strokeOpacity={to.depth <= 1 ? 0.9 : 0.55}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              />
            );
          })}

          {visibleNodes.map((node) => {
            const color = nodeColor(node, T);
            const r = nodeRadius(node.depth);
            const showLabel = node.depth <= 1;
            return (
              <motion.g key={node.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, ease: 'backOut' }}>
                <circle cx={node.x} cy={node.y} r={r} fill={node.depth <= 1 ? T.surface : color} stroke={color} strokeWidth={node.depth <= 1 ? 2.2 : 0} />
                {showLabel && (
                  <text
                    x={node.x}
                    y={node.y + r + (node.depth === 0 ? 22 : 18)}
                    textAnchor="middle"
                    style={{ fontFamily: MONO, fontSize: node.depth === 0 ? 14 : 11.5, fontWeight: 700, letterSpacing: '0.03em', fill: node.depth === 0 ? T.text : color }}
                  >
                    {node.label}
                  </text>
                )}
              </motion.g>
            );
          })}
        </motion.g>
      </svg>
    </Box>
  );
}