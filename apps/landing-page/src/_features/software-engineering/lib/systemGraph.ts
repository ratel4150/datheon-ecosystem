// _features/software-engineering/lib/systemGraph.ts
export interface GraphNode {
  id: string;
  x: number;
  y: number;
  label: string;
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
}

/** Coordenadas en un viewBox de 300×280. Frontend arriba, API al centro,
 *  tres servicios repartidos, todos convergen en Data abajo — el mismo
 *  diagrama del brief. */
export const GRAPH_NODES: GraphNode[] = [
  { id: 'frontend', x: 150, y: 36, label: 'FRONTEND' },
  { id: 'api', x: 150, y: 108, label: 'API' },
  { id: 'serviceA', x: 68, y: 180, label: 'SERVICE' },
  { id: 'serviceB', x: 150, y: 180, label: 'SERVICE' },
  { id: 'serviceC', x: 232, y: 180, label: 'SERVICE' },
  { id: 'data', x: 150, y: 252, label: 'DATA' },
];

export const GRAPH_EDGES: GraphEdge[] = [
  { id: 'e1', from: 'frontend', to: 'api' },
  { id: 'e2', from: 'api', to: 'serviceA' },
  { id: 'e3', from: 'api', to: 'serviceB' },
  { id: 'e4', from: 'api', to: 'serviceC' },
  { id: 'e5', from: 'serviceA', to: 'data' },
  { id: 'e6', from: 'serviceB', to: 'data' },
  { id: 'e7', from: 'serviceC', to: 'data' },
];

export function getNode(id: string): GraphNode | undefined {
  return GRAPH_NODES.find((n) => n.id === id);
}
