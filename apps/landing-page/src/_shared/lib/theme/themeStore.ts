// File: apps/landing-page/src/_shared/lib/theme/themeStore.ts
import { atom } from 'nanostores';

export type Theme = 'light' | 'dark';

export const $theme = atom<Theme>('dark');

export function initTheme() {
  if (typeof window === 'undefined') return;

  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored === 'light' || stored === 'dark') {
    $theme.set(stored);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches === false) {
    $theme.set('light');
  }

  applyThemeToDom($theme.get());

  $theme.subscribe((theme) => {
    applyThemeToDom(theme);
    localStorage.setItem('theme', theme);
  });
}

function applyThemeToDom(theme: Theme) {
  const root = document.documentElement;
  // 👇 clave del fix: togglear AMBAS clases explícitamente
  root.classList.toggle('dark', theme === 'dark');
  root.classList.toggle('light', theme === 'light');
}

export function toggleTheme() {
  $theme.set($theme.get() === 'light' ? 'dark' : 'light');
}

export function setTheme(theme: Theme) {
  $theme.set(theme);
}