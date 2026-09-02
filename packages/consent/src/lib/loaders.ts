// packages/consent/src/lib/loaders.ts
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: any;
    _fbq?: any;
    clarity?: any;
  }
}

export function loadGA4(measurementId: string): void {
  if (document.querySelector(`script[data-ga4="${measurementId}"]`)) return;
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.dataset.ga4 = measurementId;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  window.gtag = window.gtag || gtag;
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
}

export function loadGoogleAds(conversionId: string): void {
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }
  window.gtag = window.gtag || gtag;

  if (!document.querySelector('script[data-gtag-loader]')) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${conversionId}`;
    script.dataset.gtagLoader = 'true';
    document.head.appendChild(script);
  }
  window.gtag('config', conversionId);
}

export function loadMetaPixel(pixelId: string): void {
  if (window.fbq) {
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
    return;
  }
  const f = window as any;
  f.fbq = function (...args: unknown[]) {
    f.fbq.callMethod ? f.fbq.callMethod(...args) : f.fbq.queue.push(args);
  };
  if (!f._fbq) f._fbq = f.fbq;
  f.fbq.push = f.fbq;
  f.fbq.loaded = true;
  f.fbq.version = '2.0';
  f.fbq.queue = [];
  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);
  f.fbq('init', pixelId);
  f.fbq('track', 'PageView');
}

export function loadClarity(projectId: string): void {
  if (window.clarity) return;
  const c = window as any;
  c.clarity =
    c.clarity ||
    function (...args: unknown[]) {
      (c.clarity.q = c.clarity.q || []).push(args);
    };
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.clarity.ms/tag/${projectId}`;
  document.head.appendChild(script);
}
