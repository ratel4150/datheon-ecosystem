// _features/ecosystem/model/useEcosystem.ts
import { useCallback, useState } from 'react';
import { trackNodeHover, trackNodeSelect } from './tracking';

export function useEcosystem<TId extends string = string>() {
  const [hoveredNode, setHoveredNode] = useState<TId | null>(null);
  const [selectedNode, setSelectedNode] = useState<TId | null>(null);

  const hoverNode = useCallback((id: TId | null) => {
    setHoveredNode(id);
    if (id) trackNodeHover(id);
  }, []);

  const selectNode = useCallback((id: TId | null) => {
    setSelectedNode(id);
    if (id) trackNodeSelect(id);
  }, []);

  return { hoveredNode, selectedNode, hoverNode, selectNode };
}
