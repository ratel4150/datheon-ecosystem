// packages/ui/src/theme/useTheme.ts
// Migrado verbatim desde apps/landing-page/src/_shared/lib/theme/useTheme.ts
'use client';

import { useStore } from '@nanostores/react';
import { useEffect } from 'react';
import { $theme, initTheme, toggleTheme, setTheme } from './themeStore';

export function useTheme() {
  const theme = useStore($theme);

  useEffect(() => {
    initTheme();
  }, []);

  return { theme, toggleTheme, setTheme };
}
