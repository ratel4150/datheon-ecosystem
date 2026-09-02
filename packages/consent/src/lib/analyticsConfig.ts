// packages/consent/src/lib/analyticsConfig.ts

/** Cada app consumidora expone estas mismas variables PUBLIC_* en su
 *  propio .env — si no las configuras, ese script simplemente no carga. */
export const ANALYTICS_IDS = {
  ga4: import.meta.env.PUBLIC_GA4_ID as string | undefined,
  googleAds: import.meta.env.PUBLIC_GOOGLE_ADS_ID as string | undefined,
  metaPixel: import.meta.env.PUBLIC_META_PIXEL_ID as string | undefined,
  clarity: import.meta.env.PUBLIC_CLARITY_ID as string | undefined,
};
