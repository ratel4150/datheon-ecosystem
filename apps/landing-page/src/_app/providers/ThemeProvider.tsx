// File: apps/landing-page/src/_app/providers/ThemeProvider.tsx
'use client';

import React from 'react';
import { ThemeProvider as MUIThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useTheme } from '@/_shared/lib/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme: currentTheme } = useTheme(); // ✅ misma fuente que ThemeToggle (nanostores)

  const muiTheme = createTheme({
    palette: {
      mode: currentTheme,
      primary: {
        main: '#00AEEF',
      },
      secondary: {
        main: '#7FFF00',
      },
      background: {
        default: currentTheme === 'dark' ? '#0B0F2B' : '#ffffff',
        paper: currentTheme === 'dark' ? '#121735' : '#f5f5f5',
      },
      text: {
        primary: currentTheme === 'dark' ? '#F5F5F5' : '#0B0F2B',
      },
    },
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
            fontWeight: 600,
            padding: '10px 24px',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            background: currentTheme === 'dark' ? '#121735' : '#ffffff',
            boxShadow: currentTheme === 'dark'
              ? '0 4px 20px rgba(0, 0, 0, 0.4)'
              : '0 4px 20px rgba(0, 0, 0, 0.08)',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: currentTheme === 'dark'
              ? 'rgba(11, 15, 43, 0.8)'
              : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  return (
    <MUIThemeProvider theme={muiTheme}>
      <CssBaseline />
      {children }
    </MUIThemeProvider>
  );
}