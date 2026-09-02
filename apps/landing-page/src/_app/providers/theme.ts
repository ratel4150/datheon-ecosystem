// File: apps/landing-page/src/_app/providers/theme.ts
import { createTheme } from '@mui/material/styles';
import { fontFamily } from './fonts';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#00AEEF',
    },
    secondary: {
      main: '#7FFF00',
    },
    background: {
      default: '#0B0F2B',
      paper: '#121735',
    },
    text: {
      primary: '#F5F5F5',
    },
  },
  typography: {
    fontFamily: fontFamily,
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
          background: '#121735',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(11, 15, 43, 0.8)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3)',
        },
      },
    },
  },
});