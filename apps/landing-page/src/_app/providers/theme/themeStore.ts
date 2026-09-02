// File: apps/landing-page/src/_app/providers/theme/themeStore.ts
// File: apps/landing-page/src/_shared/lib/theme/themeStore.ts
import { atom } from 'nanostores';

export type Theme = 'light' | 'dark';

export const $theme = atom<Theme>('dark');

export function initTheme() {
  if (typeof window === 'undefined') return;

  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored === 'light' || stored === 'dark') {
    $theme.set(stored);
  } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    $theme.set('dark');
  }

  applyThemeToDom($theme.get());

  $theme.subscribe((theme) => {
    applyThemeToDom(theme);
    localStorage.setItem('theme', theme);
  });
}

function applyThemeToDom(theme: Theme) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    document.documentElement.style.backgroundColor = '#0B0F2B';
    document.documentElement.style.color = '#F5F5F5';
  } else {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.backgroundColor = '#ffffff';
    document.documentElement.style.color = '#0B0F2B';
  }
}

export function toggleTheme() {
  $theme.set($theme.get() === 'light' ? 'dark' : 'light');
}

export function setTheme(theme: Theme) {
  $theme.set(theme);
}