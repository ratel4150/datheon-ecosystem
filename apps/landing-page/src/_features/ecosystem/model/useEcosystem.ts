// _features/ecosystem/model/useEcosystem.ts
import { useState, useCallback } from 'react';
export function useEcosystem() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const hoverNode = useCallback((id: string | null) => setHoveredNode(id), []);
  const selectNode = useCallback((id: string | null) => setSelectedNode(id), []);
  return { hoveredNode, selectedNode, hoverNode, selectNode };
}
