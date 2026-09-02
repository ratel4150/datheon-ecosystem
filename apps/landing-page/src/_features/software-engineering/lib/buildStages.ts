// _features/software-engineering/lib/buildStages.ts
import { GRAPH_NODES, GRAPH_EDGES, type GraphNode } from './systemGraph';

export interface BuildStageDefinition {
  id: string;
  title: string;
  narrative: string;
  nodeIds: string[];
  edgeIds: string[];
  nodeCount: number;
  edgeCount: number;
}

interface StageFilter {
  id: string;
  title: string;
  narrative: string;
  predicate: (node: GraphNode) => boolean;
}

const STAGE_FILTERS: StageFilter[] = [
  {
    id: 'idea',
    title: 'Un punto',
    narrative: 'Todo sistema real empieza en un solo lugar.',
    predicate: (n) => n.depth === 0,
  },
  {
    id: 'branches',
    title: 'Se abre en 4 direcciones',
    narrative: 'Frontend, backend, datos e infraestructura — las cuatro áreas de todo sistema real.',
    predicate: (n) => n.depth <= 1,
  },
  {
    id: 'specialize',
    title: 'Cada área se especializa',
    narrative: 'Dentro de cada área, aparecen las piezas concretas que hacen el trabajo.',
    predicate: (n) => n.depth <= 2,
  },
  {
    id: 'frontend-backend',
    title: 'Frontend y Backend toman forma',
    narrative: 'Cada pieza se vuelve una tecnología real — no una casilla en un diagrama.',
    predicate: (n) => n.depth <= 2 || n.branch === 'frontend' || n.branch === 'backend',
  },
  {
    id: 'data-infra',
    title: 'Datos e infraestructura se completan',
    narrative: 'El sistema ya sostiene, persiste y se despliega solo.',
    predicate: () => true,
  },
  {
    id: 'complete',
    title: 'Arquitectura completa',
    narrative: 'Más de 50 piezas trabajando juntas — un sistema real, no solo código.',
    predicate: () => true,
  },
];

function computeStage(filter: StageFilter): BuildStageDefinition {
  const visibleNodes = GRAPH_NODES.filter(filter.predicate);
  const visibleIds = new Set(visibleNodes.map((n) => n.id));
  const visibleEdges = GRAPH_EDGES.filter((e) => visibleIds.has(e.from) && visibleIds.has(e.to));
  return {
    id: filter.id,
    title: filter.title,
    narrative: filter.narrative,
    nodeIds: visibleNodes.map((n) => n.id),
    edgeIds: visibleEdges.map((e) => e.id),
    nodeCount: visibleNodes.length,
    edgeCount: visibleEdges.length,
  };
}

export const BUILD_STAGES: BuildStageDefinition[] = STAGE_FILTERS.map(computeStage);
