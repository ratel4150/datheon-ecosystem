// _features/ecosystem/lib/physics.ts
import type { EdgeData, NodeData, NodeId } from './graph';

export interface PhysicsNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export type PhysicsPositions = Record<NodeId, PhysicsNode>;

export interface PhysicsConfig {
  repulsion: number;
  springLength: number;
  springStrength: number;
  damping: number;
  centerStrength: number;
  width: number;
  height: number;
}

export function seedPositions(nodes: NodeData[], width: number, height: number): PhysicsPositions {
  const cx = width / 2;
  const cy = height / 2;
  const radius = Math.min(width, height) * 0.32;
  const satellites = nodes.filter((n) => n.id !== 'core');

  const positions = {} as PhysicsPositions;
  positions.core = { x: cx, y: cy, vx: 0, vy: 0 };

  satellites.forEach((n, i) => {
    const angle = (i / satellites.length) * Math.PI * 2 - Math.PI / 2;
    positions[n.id] = { x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle), vx: 0, vy: 0 };
  });

  return positions;
}

export function stepSimulation(
  positions: PhysicsPositions,
  edges: EdgeData[],
  radii: Record<NodeId, number>,
  config: PhysicsConfig,
  pinnedId: NodeId | null,
): { positions: PhysicsPositions; kineticEnergy: number } {
  const ids = Object.keys(positions) as NodeId[];
  const forces: Record<string, { fx: number; fy: number }> = {};
  ids.forEach((id) => {
    forces[id] = { fx: 0, fy: 0 };
  });

  for (let i = 0; i < ids.length; i++) {
    for (let j = i + 1; j < ids.length; j++) {
      const a = positions[ids[i]];
      const b = positions[ids[j]];
      const dx = b.x - a.x;
      const dy = b.y - a.y;
      let distSq = dx * dx + dy * dy;
      if (distSq < 1) distSq = 1;
      const dist = Math.sqrt(distSq);
      const force = config.repulsion / distSq;
      const fx = (force * dx) / dist;
      const fy = (force * dy) / dist;
      forces[ids[i]].fx -= fx;
      forces[ids[i]].fy -= fy;
      forces[ids[j]].fx += fx;
      forces[ids[j]].fy += fy;
    }
  }

  edges.forEach((edge) => {
    const s = positions[edge.source];
    const t = positions[edge.target];
    if (!s || !t) return;
    const dx = t.x - s.x;
    const dy = t.y - s.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 0.01;
    const diff = dist - config.springLength;
    const force = config.springStrength * diff;
    const fx = (force * dx) / dist;
    const fy = (force * dy) / dist;
    forces[edge.source].fx += fx;
    forces[edge.source].fy += fy;
    forces[edge.target].fx -= fx;
    forces[edge.target].fy -= fy;
  });

  const cx = config.width / 2;
  const cy = config.height / 2;
  ids.forEach((id) => {
    const p = positions[id];
    forces[id].fx += (cx - p.x) * config.centerStrength;
    forces[id].fy += (cy - p.y) * config.centerStrength;
  });

  const next = {} as PhysicsPositions;
  let kineticEnergy = 0;

  ids.forEach((id) => {
    const p = positions[id];

    if (id === pinnedId) {
      next[id] = { ...p, vx: 0, vy: 0 };
      return;
    }

    let vx = (p.vx + forces[id].fx) * config.damping;
    let vy = (p.vy + forces[id].fy) * config.damping;
    let x = p.x + vx;
    let y = p.y + vy;

    const r = radii[id] ?? 18;
    if (x < r) {
      x = r;
      vx = 0;
    }
    if (x > config.width - r) {
      x = config.width - r;
      vx = 0;
    }
    if (y < r) {
      y = r;
      vy = 0;
    }
    if (y > config.height - r) {
      y = config.height - r;
      vy = 0;
    }

    next[id] = { x, y, vx, vy };
    kineticEnergy += vx * vx + vy * vy;
  });

  return { positions: next, kineticEnergy };
}
