// File: apps/landing-page/src/_features/stage/ui/stageGeometries.ts
'use client';

import type { StageId } from '../lib';

export type GeometryKind = 'tetrahedron' | 'box' | 'octahedron' | 'dodecahedron' | 'icosahedron' | 'torusKnot';

export interface StageGeometrySpec {
  kind: GeometryKind;
  args: number[];
}

export const STAGE_GEOMETRY: Record<StageId, StageGeometrySpec> = {
  idea: { kind: 'tetrahedron', args: [0.36, 0] },
  startup: { kind: 'box', args: [0.5, 0.5, 0.5] },
  pyme: { kind: 'octahedron', args: [0.38, 0] },
  mid: { kind: 'dodecahedron', args: [0.34, 0] },
  enterprise: { kind: 'icosahedron', args: [0.36, 0] },
  innovation: { kind: 'torusKnot', args: [0.22, 0.08, 128, 32] },
};