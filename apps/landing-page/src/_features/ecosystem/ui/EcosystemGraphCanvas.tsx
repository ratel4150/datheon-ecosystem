'use client';

import { useRef } from 'react';
import { Box, GlobalStyles } from '@mui/material';
import { useReducedMotion } from 'framer-motion';
import { MONO, NODES, EDGES, NODE_RADIUS, type NodeId } from '../lib';
import { useGraphPhysics } from '../model';

interface Tokens {
  bg: string;
  surface: string;
  text: string;
  textMute: string;
  accent: string;
  accentDk: string;
  border: string;
}

interface EcosystemGraphCanvasProps {
  hoveredNode: NodeId | null;
  selectedNode: NodeId | null;
  onHover: (id: NodeId | null) => void;
  onToggle: (id: NodeId) => void;
  T: Tokens;
  height?: number;
}

const CANVAS_HEIGHT = 420;

export function EcosystemGraphCanvas({ hoveredNode, selectedNode, onHover, onToggle, T, height = CANVAS_HEIGHT }: EcosystemGraphCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = !!useReducedMotion();

  const { positions, width, beginDrag, updateDrag, endDrag } = useGraphPhysics(NODES, EDGES, containerRef, prefersReducedMotion, height);

  const activeId = hoveredNode ?? selectedNode;

  const toLocalPoint = (clientX: number, clientY: number) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    return { x: ((clientX - rect.left) / rect.width) * width, y: ((clientY - rect.top) / rect.height) * height };
  };

  return (
    <Box
      ref={containerRef}
      sx={{ position: 'relative', width: '100%', height, bgcolor: T.bg, borderRadius: '12px', overflow: 'hidden', transition: 'background-color 0.3s ease' }}
    >
      <GlobalStyles
        styles={{
          '.eco-node-glow': { animation: 'ecoNodeGlow 2.4s ease-in-out infinite' },
          '@keyframes ecoNodeGlow': {
            '0%, 100%': { filter: `drop-shadow(0 0 4px ${T.accent})` },
            '50%': { filter: `drop-shadow(0 0 10px ${T.accent})` },
          },
          '@media (prefers-reduced-motion: reduce)': { '.eco-node-glow': { animation: 'none', filter: `drop-shadow(0 0 6px ${T.accent})` } },
        }}
      />

      <svg ref={svgRef} width="100%" height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: 'block', touchAction: 'none' }}>
        {EDGES.map((edge) => {
          const s = positions[edge.source];
          const t = positions[edge.target];
          if (!s || !t) return null;
          const active = activeId === edge.source || activeId === edge.target;
          const dimmed = !!activeId && !active;
          return (
            <line
              key={`${edge.source}-${edge.target}`}
              x1={s.x}
              y1={s.y}
              x2={t.x}
              y2={t.y}
              stroke={active ? T.accent : T.border}
              strokeWidth={active ? 1.6 : 1}
              opacity={active ? 0.9 : dimmed ? 0.15 : 0.4}
              style={{ transition: 'stroke 0.2s ease, opacity 0.2s ease' }}
            />
          );
        })}

        {NODES.map((node) => {
          const p = positions[node.id];
          if (!p) return null;
          const r = NODE_RADIUS[node.id];
          const isCore = node.id === 'core';
          const active = hoveredNode === node.id || selectedNode === node.id;
          const dimmed = !!activeId && activeId !== node.id;

          return (
            <g
              key={node.id}
              transform={`translate(${p.x}, ${p.y})`}
              tabIndex={0}
              role="button"
              aria-label={node.label}
              aria-pressed={selectedNode === node.id}
              style={{ cursor: 'grab', outline: 'none' }}
              onPointerDown={(e: React.PointerEvent<SVGGElement>) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                beginDrag(node.id);
              }}
              onPointerMove={(e: React.PointerEvent<SVGGElement>) => {
                const { x, y } = toLocalPoint(e.clientX, e.clientY);
                updateDrag(node.id, x, y);
              }}
              onPointerUp={() => endDrag(node.id)}
              onPointerCancel={() => endDrag(node.id)}
              onMouseEnter={() => onHover(node.id)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(node.id)}
              onBlur={() => onHover(null)}
              onClick={() => onToggle(node.id)}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onToggle(node.id);
                }
              }}
            >
              <circle
                r={r}
                fill={isCore ? T.accentDk : T.surface}
                stroke={active ? T.accent : T.border}
                strokeWidth={active ? 2 : 1}
                opacity={dimmed ? 0.35 : 1}
                className={isCore || active ? 'eco-node-glow' : undefined}
                style={{ transition: 'opacity 0.2s ease, stroke 0.2s ease' }}
              />
              <text
                y={r + 13}
                textAnchor="middle"
                fontFamily={MONO}
                fontSize={isCore ? 11 : 9}
                fontWeight={isCore ? 700 : 600}
                fill={dimmed ? T.textMute : active ? T.accent : T.text}
                style={{ transition: 'fill 0.2s ease', userSelect: 'none' }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </Box>
  );
}
