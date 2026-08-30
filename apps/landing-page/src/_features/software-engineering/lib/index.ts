// _features/software-engineering/lib/index.ts — Public API
export { C, DARK, MONO, DISPLAY } from './constants';
export { content } from './content';
export type { SoftwareEngineeringContent } from './content';
export { resolveLang } from './resolveLang';
export { BUILD_STAGES } from './buildStages';
export type { BuildStageDefinition } from './buildStages';
export { GRAPH_NODES, GRAPH_EDGES, getNode } from './systemGraph';
export type { GraphNode, GraphEdge } from './systemGraph';
