// _features/software-engineering/lib/buildStages.ts
export interface BuildStageDefinition {
  id: string;
  title: string;
  narrative: string;
  nodeIds: string[];
  edgeIds: string[];
}

export const BUILD_STAGES: BuildStageDefinition[] = [
  {
    id: 'idea',
    title: 'Un punto',
    narrative: 'Todo sistema real empieza en un solo lugar.',
    nodeIds: ['frontend'],
    edgeIds: [],
  },
  {
    id: 'connect',
    title: 'Primera conexión',
    narrative: 'La idea se conecta con lo que la sostiene.',
    nodeIds: ['frontend', 'api'],
    edgeIds: ['e1'],
  },
  {
    id: 'branch',
    title: 'Se ramifica',
    narrative: 'Una sola pieza no basta — el trabajo se reparte.',
    nodeIds: ['frontend', 'api', 'serviceA', 'serviceB'],
    edgeIds: ['e1', 'e2', 'e3'],
  },
  {
    id: 'expand',
    title: 'Se expande',
    narrative: 'Cuando crece la demanda, el sistema crece con ella.',
    nodeIds: ['frontend', 'api', 'serviceA', 'serviceB', 'serviceC'],
    edgeIds: ['e1', 'e2', 'e3', 'e4'],
  },
  {
    id: 'converge',
    title: 'Converge',
    narrative: 'Lo que se separó vuelve a encontrarse donde vive la información.',
    nodeIds: ['frontend', 'api', 'serviceA', 'serviceB', 'serviceC', 'data'],
    edgeIds: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6'],
  },
  {
    id: 'complete',
    title: 'Arquitectura completa',
    narrative: 'Frontend, API, servicios y datos — un sistema real, no solo código.',
    nodeIds: ['frontend', 'api', 'serviceA', 'serviceB', 'serviceC', 'data'],
    edgeIds: ['e1', 'e2', 'e3', 'e4', 'e5', 'e6', 'e7'],
  },
];
