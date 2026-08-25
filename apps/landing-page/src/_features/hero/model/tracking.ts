// _features/hero/model/tracking.ts
import ReactGA from 'react-ga4';

export const getDeviceData = () => {
  if (typeof window === 'undefined') return { deviceType: 'unknown' };
  const ua = navigator.userAgent;
  const isMobile = /Mobi|Android|iPhone|iPad/i.test(ua);
  const isTablet = /Tablet|iPad/i.test(ua);
  return { deviceType: isTablet ? 'tablet' : isMobile ? 'mobile' : 'desktop' };
};

export const trackHeroView = (isInView: boolean) => {
  if (typeof window === 'undefined' || !isInView) return;
  const deviceData = getDeviceData();
  const now = new Date();
  const trackingData = {
    ...deviceData,
    section_name: 'HeroSection',
    timestamp: now.toISOString(),
    event_id: crypto.randomUUID?.() ?? Math.random().toString(36).substring(2, 9),
    viewport: { width: window.innerWidth, height: window.innerHeight },
  };
  if (window.fbq) window.fbq('track', 'ViewContent', { content_name: 'HeroSectionViewed' });
  if (window.gtag) window.gtag('event', 'hero_view', trackingData);
  if (typeof ReactGA !== 'undefined') {
    ReactGA.event({ category: 'Hero', action: 'HeroSectionViewed', label: deviceData.deviceType });
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'heroView', ...trackingData });
};

export const trackHeroCTA = (cta: 'construir' | 'capacidades') => {
  if (typeof window === 'undefined') return;
  const eventoId = crypto.randomUUID?.() ?? Math.random().toString(36);
  const payload = {
    cta,
    canal: 'LandingPage',
    ubicacion: 'HeroSection',
    idioma: navigator.language || 'es',
    referrer: document.referrer || 'direct',
    timestamp: new Date().toISOString(),
    conversion_intent: true,
    evento_unico_id: eventoId,
  };
  if (window.fbq) window.fbq('trackCustom', 'HeroCTAClick', payload);
  if (typeof ReactGA !== 'undefined') {
    ReactGA.event({ category: 'Conversiones', action: `click_${cta}`, label: 'HeroSection', value: 1 });
    ReactGA.gtag('event', `hero_cta_${cta}`, payload);
  }
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'HeroCTAClick', ...payload });
};
