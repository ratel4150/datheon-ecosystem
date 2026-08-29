// _features/technology-stack/ui/animation/stackScenes.ts
export const LAYER_REVEAL_STEP = 0.12;

export function layerRevealDelay(index: number): number {
  return index * LAYER_REVEAL_STEP;
}
