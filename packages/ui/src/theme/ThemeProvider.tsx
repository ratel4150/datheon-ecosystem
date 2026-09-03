// packages/ui/src/theme/ThemeProvider.tsx
// RECONSTRUCCIÓN — no se vio el _app/providers/ThemeProvider.tsx real de
// landing-page. Llama initTheme() una sola vez al montar (para fijar la
// clase 'dark'/'light' en <html> lo antes posible) y renderiza children
// directamente — el estado real vive en el atom $theme, no aquí.
'use client';

import { useEffect, type ReactNode } from 'react';
import { initTheme } from './themeStore';

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  useEffect(() => {
    initTheme();
  }, []);

  return <>{children}</>;
}
