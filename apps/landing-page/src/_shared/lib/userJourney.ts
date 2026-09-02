// File: apps/landing-page/src/_shared/lib/userJourney.ts
// File: apps/landing-page/src/_shared/lib/userJourney.ts
const STORAGE_KEY = 'datheon_selected_stage';

export interface StoredStage {
  id: string;
  label: string;
}

export function getStoredStage(): StoredStage | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed.id === 'string' && typeof parsed.label === 'string') return parsed;
    return null;
  } catch {
    return null;
  }
}

export function setStoredStage(id: string, label: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ id, label }));
  } catch {
    // localStorage no disponible — no rompe la UI
  }
}