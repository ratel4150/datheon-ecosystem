// _features/ecosystem/model/tracking.ts
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

export const trackNodeHover = (nodeId: string) => emit('ecosystem_node_hover', { nodeId });
export const trackNodeSelect = (nodeId: string) => emit('ecosystem_node_selected', { nodeId });
export const trackCtaClicked = () => emit('ecosystem_cta_clicked');
