// _features/ecosystem/model/tracking.ts
export const trackNodeHover = (nodeId: string) => { if (window.gtag) window.gtag('event', 'ecosystem_node_hover', { nodeId }); };
export const trackNodeSelect = (nodeId: string) => { if (window.gtag) window.gtag('event', 'ecosystem_node_selected', { nodeId }); };
export const trackCtaClicked = () => { if (window.gtag) window.gtag('event', 'ecosystem_cta_clicked'); };
