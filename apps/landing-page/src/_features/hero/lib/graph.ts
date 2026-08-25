// File: apps/landing-page/src/_features/hero/lib/graph.ts
// _features/hero/lib/graph.ts
import type { Node, Edge } from 'reactflow';
import { BRANCHES } from './constants';
import type { Variant } from '../ui/FlowNode';

export function buildGraph(animate: boolean): { nodes: Node[]; edges: Edge[] } {
  const nodes: Node[] = [
    {
      id: 'core',
      type: 'flowNode',
      position: { x: 130, y: 0 },
      style: { width: 156, height: 46 },
      data: {
        label: 'DATHEÓN',
        sublabel: 'AI ENGINEERING',
        variant: 'core' as Variant,
        delay: 0,
        animate,
      },
      draggable: false,
    },
    {
      id: 'software',
      type: 'flowNode',
      position: { x: 24, y: 118 },
      style: { width: 100, height: 34 },
      data: {
        label: BRANCHES[0].label,
        variant: 'branch' as Variant,
        delay: 0.2,
        animate,
        chips: [...BRANCHES[0].chips],
      },
      draggable: false,
    },
    {
      id: 'ai',
      type: 'flowNode',
      position: { x: 173, y: 118 },
      style: { width: 70, height: 34 },
      data: {
        label: BRANCHES[1].label,
        variant: 'branch' as Variant,
        delay: 0.28,
        animate,
        chips: [...BRANCHES[1].chips],
      },
      draggable: false,
    },
    {
      id: 'hardware',
      type: 'flowNode',
      position: { x: 298, y: 118 },
      style: { width: 100, height: 34 },
      data: {
        label: BRANCHES[2].label,
        variant: 'branch' as Variant,
        delay: 0.36,
        animate,
        chips: [...BRANCHES[2].chips],
      },
      draggable: false,
    },
    {
      id: 'merge',
      type: 'flowNode',
      position: { x: 122, y: 236 },
      style: { width: 172, height: 36 },
      data: {
        label: 'DATA · CLOUD · APIs',
        variant: 'merge' as Variant,
        delay: 0.55,
        animate,
      },
      draggable: false,
    },
    {
      id: 'integrations',
      type: 'flowNode',
      position: { x: 145, y: 322 },
      style: { width: 126, height: 34 },
      data: {
        label: 'INTEGRATIONS',
        variant: 'merge' as Variant,
        delay: 0.68,
        animate,
      },
      draggable: false,
    },
    {
      id: 'automation',
      type: 'flowNode',
      position: { x: 145, y: 400 },
      style: { width: 126, height: 34 },
      data: {
        label: 'AUTOMATION',
        variant: 'merge' as Variant,
        delay: 0.8,
        animate,
      },
      draggable: false,
    },
    {
      id: 'results',
      type: 'flowNode',
      position: { x: 145, y: 478 },
      style: { width: 126, height: 38 },
      data: {
        label: 'RESULTS',
        variant: 'result' as Variant,
        delay: 0.94,
        animate,
      },
      draggable: false,
    },
  ];

  const edges: Edge[] = [
    { id: 'e1', source: 'core', target: 'software', type: 'flowEdge' },
    { id: 'e2', source: 'core', target: 'ai', type: 'flowEdge' },
    { id: 'e3', source: 'core', target: 'hardware', type: 'flowEdge' },
    { id: 'e4', source: 'software', target: 'merge', type: 'flowEdge' },
    { id: 'e5', source: 'ai', target: 'merge', type: 'flowEdge' },
    { id: 'e6', source: 'hardware', target: 'merge', type: 'flowEdge' },
    { id: 'e7', source: 'merge', target: 'integrations', type: 'flowEdge' },
    { id: 'e8', source: 'integrations', target: 'automation', type: 'flowEdge' },
    { id: 'e9', source: 'automation', target: 'results', type: 'flowEdge' },
  ];

  return { nodes, edges };
}
