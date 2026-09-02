// _shared/lib/analytics/analyticsConfig.ts

/** Configura estas variables en tu .env (con el mismo formato que
 *  GROQ_API_KEY, prefijadas con PUBLIC_ para que Astro las exponga al
 *  navegador). Si no están configuradas, ese script no se carga —
 *  ninguna aquí es un ID inventado. */
export const ANALYTICS_IDS = {
  ga4: import.meta.env.PUBLIC_GA4_ID as string | undefined,
  googleAds: import.meta.env.PUBLIC_GOOGLE_ADS_ID as string | undefined,
  metaPixel: import.meta.env.PUBLIC_META_PIXEL_ID as string | undefined,
  clarity: import.meta.env.PUBLIC_CLARITY_ID as string | undefined,
};
