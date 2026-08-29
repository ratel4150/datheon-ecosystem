// _features/technology-stack/model/tracking.ts
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

function emit(event: string, params?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', event, params);
  }
}

export const trackLayerHover = (layerId: string) => emit('stack_layer_hover', { layerId });
export const trackLayerSelect = (layerId: string) => emit('stack_layer_select', { layerId });
export const trackTechSelect = (techId: string) => emit('stack_tech_select', { techId });
export const trackCtaClicked = () => emit('stack_cta_clicked');
