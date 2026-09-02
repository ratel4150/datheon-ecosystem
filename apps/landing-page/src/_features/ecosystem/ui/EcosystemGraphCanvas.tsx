// File: apps/landing-page/src/_features/ecosystem/ui/EcosystemGraphCanvas.tsx
'use client';

import { useRef } from 'react';
import { Box, GlobalStyles } from '@mui/material';
import { useReducedMotion } from 'framer-motion';
import { MONO, NODES, EDGES, NODE_RADIUS, NODE_COLOR, NODE_LEVEL, type NodeId } from '../lib';
import { getIcon } from './nodeIcons';
import { useGraphPhysics } from '../model';

interface Tokens {
  bg: string;
  surface: string;
  text: string;
  textMute: string;
  accent: string;
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

const CANVAS_HEIGHT = 720;

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

  const edgeColorFor = (edge: (typeof EDGES)[number]) => {
    const touched = edge.source === 'core' ? edge.target : edge.target === 'core' ? edge.source : activeId === edge.source ? edge.source : edge.target;
    return NODE_COLOR[touched];
  };

  const childCount = (nodeId: NodeId) => EDGES.filter((e) => e.source === nodeId).length;

  return (
    <Box
      ref={containerRef}
      sx={{ position: 'relative', width: '100%', height, bgcolor: T.bg, borderRadius: '12px', overflow: 'hidden', transition: 'background-color 0.3s ease' }}
    >
      <GlobalStyles
        styles={{
          '.eco-node-glow': { animation: 'ecoNodeGlow 2.4s ease-in-out infinite' },
          '@keyframes ecoNodeGlow': { '0%, 100%': { filter: 'drop-shadow(0 0 4px currentColor)' }, '50%': { filter: 'drop-shadow(0 0 10px currentColor)' } },
          '@media (prefers-reduced-motion: reduce)': { '.eco-node-glow': { animation: 'none', filter: 'drop-shadow(0 0 6px currentColor)' } },
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
              stroke={active ? edgeColorFor(edge) : T.border}
              strokeWidth={active ? 1.8 : 0.75}
              opacity={active ? 0.85 : dimmed ? 0.08 : 0.3}
              style={{ transition: 'stroke 0.2s ease, opacity 0.2s ease' }}
            />
          );
        })}

        {NODES.map((node) => {
          const p = positions[node.id];
          if (!p) return null;
          const r = NODE_RADIUS[node.id];
          const level = NODE_LEVEL[node.id];
          const isCore = level === 'core';
          const isCategory = level === 'category';
          const active = hoveredNode === node.id || selectedNode === node.id;
          const dimmed = !!activeId && activeId !== node.id;
          const color = NODE_COLOR[node.id];
          const Icon = getIcon(node);
          const iconSize = isCore ? 22 : isCategory ? 16 : level === 'sub' ? 13 : 9;
          const badgeCount = level === 'category' || level === 'sub' ? childCount(node.id) : 0;
          const showLabelAlways = isCore || isCategory;

          return (
            <g
              key={node.id}
              transform={`translate(${p.x}, ${p.y})`}
              tabIndex={0}
              role="button"
              aria-label={node.label}
              aria-pressed={selectedNode === node.id}
              style={{ cursor: 'grab', outline: 'none', color }}
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
              <g
                style={{
                  transform: `scale(${active ? 1.25 : 1})`,
                  transformOrigin: '0px 0px',
                  transition: 'transform 0.28s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                <circle
                  r={r}
                  fill={color}
                  stroke={active ? '#FFFFFF' : T.surface}
                  strokeWidth={active ? 2 : 1.25}
                  opacity={dimmed ? 0.3 : 1}
                  className={isCore || active ? 'eco-node-glow' : undefined}
                  style={{ transition: 'opacity 0.2s ease, stroke 0.2s ease' }}
                />

                {node.image ? (
                  <>
                    <clipPath id={`eco-clip-${node.id}`}>
                      <circle r={Math.max(r - 2, 1)} />
                    </clipPath>
                    <image
                      href={node.image}
                      x={-(r - 2)}
                      y={-(r - 2)}
                      width={(r - 2) * 2}
                      height={(r - 2) * 2}
                      clipPath={`url(#eco-clip-${node.id})`}
                      preserveAspectRatio="xMidYMid slice"
                      style={{ pointerEvents: 'none', opacity: dimmed ? 0.35 : 1 }}
                    />
                  </>
                ) : (
                  <foreignObject x={-iconSize / 2} y={-iconSize / 2} width={iconSize} height={iconSize} style={{ pointerEvents: 'none', overflow: 'visible' }}>
                    <Icon size={iconSize} color="#FFFFFF" style={{ opacity: dimmed ? 0.5 : 1 }} />
                  </foreignObject>
                )}

                {badgeCount > 0 && (
                  <g transform={`translate(${r * 0.75}, ${-r * 0.75})`} opacity={dimmed ? 0.4 : 1}>
                    <circle r={6} fill={T.surface} stroke={color} strokeWidth={1.25} />
                    <text textAnchor="middle" dominantBaseline="central" fontFamily={MONO} fontSize={7} fontWeight={700} fill={color}>
                      {badgeCount}
                    </text>
                  </g>
                )}
              </g>

              {(showLabelAlways || active) && (
                <text
                  y={r + 12}
                  textAnchor="middle"
                  fontFamily={MONO}
                  fontSize={isCore ? 11 : isCategory ? 9 : 7.5}
                  fontWeight={isCore ? 700 : isCategory ? 600 : 500}
                  fill={dimmed ? T.textMute : active ? color : T.text}
                  style={{ transition: 'fill 0.2s ease', userSelect: 'none' }}
                >
                  {node.label}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </Box>
  );
}