// _shared/lib/cookie-consent/consentStorage.ts
const STORAGE_KEY = 'datheon_cookie_consent';

/** El footer dispara este evento para reabrir el banner (botón
 *  "Configuración de cookies"). */
export const CONSENT_REOPEN_EVENT = 'datheon:reopen-cookie-banner';

/** El banner dispara este evento cada vez que el usuario decide — lo
 *  escucha AnalyticsLoader para activar/desactivar scripts sin recargar
 *  la página. */
export const CONSENT_UPDATED_EVENT = 'datheon:cookie-consent-updated';

export interface ConsentChoices {
  analytics: boolean;
  marketing: boolean;
}

export function getStoredConsent(): ConsentChoices | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.analytics === 'boolean' && typeof parsed.marketing === 'boolean') return parsed;
    return null;
  } catch {
    return null;
  }
}

export function setStoredConsent(choices: ConsentChoices): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(choices));
  } catch {
    // localStorage no disponible — no rompe la UI
  }
}
