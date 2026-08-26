// _features/ecosystem/lib/graph.ts
export type NodeId = 'core' | 'software' | 'ai' | 'data' | 'cloud' | 'edge' | 'iot' | 'agents';

export interface NodeData {
  id: NodeId;
  label: string;
  x: number;
  y: number;
  radius: number;
  metadata: string[];
}

export interface EdgeData {
  source: NodeId;
  target: NodeId;
}

export const NODES: NodeData[] = [
  { id: 'core', label: 'DATHEÓN', x: 50, y: 50, radius: 80, metadata: [] },
  { id: 'software', label: 'SOFTWARE', x: 22, y: 28, radius: 48, metadata: ['SaaS', 'Web Apps', 'Mobile', 'APIs'] },
  { id: 'ai', label: 'AI', x: 50, y: 16, radius: 48, metadata: ['Generative AI', 'Multimodal', 'Vision', 'Reasoning'] },
  { id: 'data', label: 'DATA', x: 78, y: 28, radius: 48, metadata: ['RAG', 'Knowledge', 'BI', 'Analytics'] },
  { id: 'cloud', label: 'CLOUD', x: 78, y: 72, radius: 40, metadata: ['Cloud Native', 'GPU', 'On-Premise'] },
  { id: 'edge', label: 'EDGE', x: 50, y: 84, radius: 40, metadata: ['Edge Compute', 'Local AI', 'Real-Time'] },
  { id: 'iot', label: 'IOT', x: 22, y: 72, radius: 40, metadata: ['Sensors', 'PLCs', 'Machines'] },
  { id: 'agents', label: 'AGENTS', x: 50, y: 38, radius: 36, metadata: ['Multi-Agent', 'MCP', 'A2A', 'Memory'] },
];

export const EDGES: EdgeData[] = [
  { source: 'core', target: 'software' },
  { source: 'core', target: 'ai' },
  { source: 'core', target: 'data' },
  { source: 'core', target: 'cloud' },
  { source: 'core', target: 'edge' },
  { source: 'core', target: 'iot' },
  { source: 'ai', target: 'agents' },
  { source: 'ai', target: 'data' },
  { source: 'cloud', target: 'edge' },
  { source: 'edge', target: 'iot' },
  { source: 'software', target: 'agents' },
];
