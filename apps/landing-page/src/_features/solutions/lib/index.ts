// _features/solutions/lib/index.ts — Public API
export { C, DARK, MONO, DISPLAY } from './constants';
export { content } from './content';
export type { SolutionsContent } from './content';
export { resolveLang } from './resolveLang';
export { PATHS, findPath } from './paths';
export type { PathId, PathDefinition, SubOption } from './paths';
export { BLOCKS, GROUPS, blockGroupColor, blockGroupOf, blockDefinitionOf, isValidBlockType, analyzeTree } from './blocks';
export type { BlockDefinition, BlockGroup, GroupId, ArchitectureNode, TreeStats } from './blocks';
export { buildArchitecturePrompt } from './prompt';
export { buildNarrative, narrativeToPlainText } from './narrative';
export type { Narrative, NarrativeSection, NarrativeItem } from './narrative';
