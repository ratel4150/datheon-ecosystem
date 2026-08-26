// _features/ecosystem/lib/graph.ts
export type NodeId = 'core' | 'software' | 'ai' | 'data' | 'cloud' | 'edge' | 'iot' | 'agents';

export interface NodeData {
  id: NodeId;
  label: string;
  metadata: string[];
}

export interface EdgeData {
  source: NodeId;
  target: NodeId;
}

export const NODES: NodeData[] = [
  { id: 'core', label: 'DATHEÓN', metadata: [] },
  { id: 'software', label: 'SOFTWARE', metadata: ['SaaS', 'Web Apps', 'Mobile', 'APIs'] },
  { id: 'ai', label: 'AI', metadata: ['Generative AI', 'Multimodal', 'Vision', 'Reasoning'] },
  { id: 'data', label: 'DATA', metadata: ['RAG', 'Knowledge', 'BI', 'Analytics'] },
  { id: 'cloud', label: 'CLOUD', metadata: ['Cloud Native', 'GPU', 'On-Premise'] },
  { id: 'edge', label: 'EDGE', metadata: ['Edge Compute', 'Local AI', 'Real-Time'] },
  { id: 'iot', label: 'IOT', metadata: ['Sensors', 'PLCs', 'Machines'] },
  { id: 'agents', label: 'AGENTS', metadata: ['Multi-Agent', 'MCP', 'A2A', 'Memory'] },
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

/** Nombres de los nodos conectados a nodeId (excluyendo 'core'). Esto
 *  reemplaza a las líneas del grafo: la conexión se lee, no se dibuja. */
export function connectedLabels(nodeId: NodeId, edges: EdgeData[], nodes: NodeData[]): string[] {
  const ids = new Set<NodeId>();
  edges.forEach((e) => {
    if (e.source === nodeId) ids.add(e.target);
    if (e.target === nodeId) ids.add(e.source);
  });
  ids.delete('core');
  return nodes.filter((n) => ids.has(n.id)).map((n) => n.label);
}
