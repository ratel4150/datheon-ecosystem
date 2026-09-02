'use client';

import { useEffect } from 'react';
import { getStoredConsent, CONSENT_UPDATED_EVENT, type ConsentChoices, ANALYTICS_IDS, loadGA4, loadGoogleAds, loadMetaPixel, loadClarity } from '../lib';

let analyticsLoaded = false;
let marketingLoaded = false;

function applyConsent(choices: ConsentChoices) {
  if (choices.analytics && !analyticsLoaded) {
    if (ANALYTICS_IDS.ga4) loadGA4(ANALYTICS_IDS.ga4);
    if (ANALYTICS_IDS.clarity) loadClarity(ANALYTICS_IDS.clarity);
    analyticsLoaded = true;
  }
  if (choices.marketing && !marketingLoaded) {
    if (ANALYTICS_IDS.metaPixel) loadMetaPixel(ANALYTICS_IDS.metaPixel);
    if (ANALYTICS_IDS.googleAds) loadGoogleAds(ANALYTICS_IDS.googleAds);
    marketingLoaded = true;
  }
}

export function AnalyticsLoader() {
  useEffect(() => {
    const stored = getStoredConsent();
    if (stored) applyConsent(stored);
    const onUpdate = (e: Event) => {
      const detail = (e as CustomEvent<ConsentChoices>).detail;
      if (detail) applyConsent(detail);
    };
    window.addEventListener(CONSENT_UPDATED_EVENT, onUpdate);
    return () => window.removeEventListener(CONSENT_UPDATED_EVENT, onUpdate);
  }, []);

  return null;
}
