// _features/technology-stack/model/useTechnologyStack.ts
import { useCallback, useMemo, useState } from 'react';
import { STACK_LAYERS, type LayerId } from '../lib';
import { trackLayerHover, trackLayerSelect, trackTechSelect } from './tracking';

export function useTechnologyStack(defaultLayerId: LayerId) {
  const [activeLayerId, setActiveLayerId] = useState<LayerId>(defaultLayerId);
  const [hoveredLayerId, setHoveredLayerId] = useState<LayerId | null>(null);
  const [selectedTechId, setSelectedTechId] = useState<string | null>(null);

  const selectLayer = useCallback((id: LayerId) => {
    setActiveLayerId(id);
    setSelectedTechId(null);
    trackLayerSelect(id);
  }, []);

  const hoverLayer = useCallback((id: LayerId | null) => {
    setHoveredLayerId(id);
    if (id) trackLayerHover(id);
  }, []);

  const selectTech = useCallback((layerId: LayerId, techId: string) => {
    setActiveLayerId(layerId);
    setSelectedTechId((prev) => (prev === techId ? null : techId));
    trackTechSelect(techId);
  }, []);

  const displayedLayerId = hoveredLayerId ?? activeLayerId;

  const traceSequence = useMemo<LayerId[]>(() => {
    if (!selectedTechId) return [];
    for (const layer of STACK_LAYERS) {
      const tech = layer.techs.find((t) => t.id === selectedTechId);
      if (tech) {
        const seq = [layer.id, ...(tech.relatedLayers ?? [])];
        return Array.from(new Set(seq));
      }
    }
    return [];
  }, [selectedTechId]);

  return { activeLayerId, hoveredLayerId, displayedLayerId, selectedTechId, traceSequence, selectLayer, hoverLayer, selectTech };
}
