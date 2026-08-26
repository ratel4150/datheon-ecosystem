// _features/ecosystem/lib/narrative.ts
import type { EdgeData, NodeData, NodeId } from './graph';

export function computeNarrative(nodes: NodeData[], edges: EdgeData[], rootId: NodeId): Map<NodeId, number> {
  const adjacency = new Map<NodeId, NodeId[]>();
  nodes.forEach((n) => adjacency.set(n.id, []));
  edges.forEach((e) => {
    adjacency.get(e.source)?.push(e.target);
    adjacency.get(e.target)?.push(e.source);
  });

  const depth = new Map<NodeId, number>();
  const queue: NodeId[] = [rootId];
  depth.set(rootId, 0);

  while (queue.length) {
    const current = queue.shift() as NodeId;
    for (const neighbor of adjacency.get(current) ?? []) {
      if (!depth.has(neighbor)) {
        depth.set(neighbor, (depth.get(current) ?? 0) + 1);
        queue.push(neighbor);
      }
    }
  }

  return depth;
}
