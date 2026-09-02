'use client';

import React from 'react';
import { ThemeProvider } from '@/_shared/lib/theme';

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export function ThemeContextProvider({ children }: ThemeContextProviderProps) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
