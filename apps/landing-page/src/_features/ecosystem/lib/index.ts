// _features/ecosystem/lib/index.ts — Public API
export { C, DARK, MONO, DISPLAY } from './constants';
export { content } from './content';
export type { EcosystemContent } from './content';
export { resolveLang } from './resolveLang';
export { NODES, EDGES, NODE_RADIUS, NODE_COLOR, connectedLabels } from './graph';
export type { NodeData, EdgeData, NodeId } from './graph';
export { seedPositions, stepSimulation } from './physics';
export type { PhysicsNode, PhysicsPositions, PhysicsConfig } from './physics';
