// File: apps/landing-page/src/_widgets/theme-toggle/ui/ThemeToggle.tsx
// File: apps/landing-page/src/_widgets/theme-toggle/ui/ThemeToggle.tsx
'use client';

import { IconButton } from '@mui/material';
import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '@/_shared/lib/theme';

interface ThemeToggleProps {
  title?: string;
}

export function ThemeToggle({ title = 'Cambiar tema' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <IconButton
      size="small"
      title={title}
      onClick={toggleTheme}
      sx={{
        color: theme === 'dark' ? '#F5F5F5' : '#4A5068',
        width: { xs: 32, md: 36 },
        height: { xs: 32, md: 36 },
        '&:hover': {
          color: '#00AEEF',
          bgcolor: 'rgba(0,174,239,0.07)',
        },
      }}
    >
      {theme === 'dark' ? <FaSun size={14} /> : <FaMoon size={14} />}
    </IconButton>
  );
}