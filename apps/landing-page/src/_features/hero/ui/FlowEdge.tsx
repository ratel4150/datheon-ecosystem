// File: apps/landing-page/src/_features/hero/ui/FlowEdge.tsx
'use client';

import { getSmoothStepPath, BaseEdge, type EdgeProps } from 'reactflow';
import { C } from '../lib/constants';

export function FlowEdge(props: EdgeProps) {
  const { sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition } = props;
  const [path] = getSmoothStepPath({
    sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition, borderRadius: 12,
  });
  return (
    <>
      <BaseEdge path={path} style={{ stroke: C.border, strokeWidth: 1.3 }} />
      <path
        d={path} fill="none" stroke={C.accent} strokeWidth={1.5}
        strokeLinecap="round" strokeDasharray="4 11" className="datheon-flow-pulse"
      />
    </>
  );
}
