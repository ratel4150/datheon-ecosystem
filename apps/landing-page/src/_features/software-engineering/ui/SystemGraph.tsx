'use client';

import { motion, type MotionValue } from 'framer-motion';
import { MONO, GRAPH_NODES, GRAPH_EDGES, getNode } from '../lib';

interface Tokens {
  text: string;
  accent: string;
  surface: string;
  border: string;
}

interface SystemGraphProps {
  visibleNodeIds: string[];
  visibleEdgeIds: string[];
  showLabels: boolean;
  T: Tokens;
  scale?: MotionValue<number> | number;
}

export function SystemGraph({ visibleNodeIds, visibleEdgeIds, showLabels, T, scale = 1 }: SystemGraphProps) {
  const visibleEdges = GRAPH_EDGES.filter((e) => visibleEdgeIds.includes(e.id));
  const visibleNodes = GRAPH_NODES.filter((n) => visibleNodeIds.includes(n.id));

  return (
    <svg viewBox="0 0 300 280" width={300} height={280} style={{ overflow: 'visible' }}>
      <motion.g style={{ scale, transformOrigin: '150px 150px' }}>
        {visibleEdges.map((edge) => {
          const from = getNode(edge.from);
          const to = getNode(edge.to);
          if (!from || !to) return null;
          return (
            <motion.line
              key={edge.id}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={T.accent}
              strokeWidth={1.5}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            />
          );
        })}

        {visibleNodes.map((node) => (
          <motion.g key={node.id} initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: 'backOut' }}>
            <circle cx={node.x} cy={node.y} r={showLabels ? 16 : 6} fill={T.surface} stroke={T.accent} strokeWidth={1.5} style={{ transition: 'r 0.4s ease' }} />
            {showLabels && (
              <motion.text
                x={node.x}
                y={node.y + 30}
                textAnchor="middle"
                initial={{ opacity: 0, y: node.y + 26 }}
                animate={{ opacity: 1, y: node.y + 30 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                style={{ fontFamily: MONO, fontSize: 8, fontWeight: 700, letterSpacing: '0.04em', fill: T.text }}
              >
                {node.label}
              </motion.text>
            )}
          </motion.g>
        ))}
      </motion.g>
    </svg>
  );
}
