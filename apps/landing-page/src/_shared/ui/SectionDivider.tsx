// Versión React para usar dentro de componentes client
'use client';

import { Box, alpha, useTheme } from '@mui/material';

interface SectionDividerProps {
  icon?: React.ReactNode;
}

export function SectionDivider({ icon }: SectionDividerProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const accentColor = isDark ? '#4A9EFF' : '#00AEEF';
  const bgColor = isDark ? '#121735' : '#FFFFFF';
  const borderColor = isDark ? '#1a1a3a' : '#ebebeb';

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: { xs: 1.5, sm: 2 },
        py: { xs: 2.5, sm: 3, md: 4 },
        px: 1.5,
        width: '100%',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          flex: 1,
          height: '1px',
          maxWidth: { xs: 80, sm: 120, md: 200 },
          background: `linear-gradient(to right, transparent, ${accentColor} 20%, ${accentColor} 80%, transparent)`,
          opacity: 0.4,
          transition: 'all 0.4s ease',
        }}
      />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: { xs: 40, sm: 48 },
          height: { xs: 40, sm: 48 },
          borderRadius: '50%',
          bgcolor: bgColor,
          border: `1px solid ${borderColor}`,
          color: accentColor,
          transition: 'all 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
          '&:hover': {
            transform: 'scale(1.1) rotate(90deg)',
            borderColor: accentColor,
            boxShadow: `0 0 30px ${alpha(accentColor, 0.15)}`,
          },
        }}
      >
        {icon || (
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L12 22" />
            <path d="M8 6L12 2L16 6" />
            <path d="M8 18L12 22L16 18" />
          </svg>
        )}
      </Box>
      <Box
        sx={{
          flex: 1,
          height: '1px',
          maxWidth: { xs: 80, sm: 120, md: 200 },
          background: `linear-gradient(to left, transparent, ${accentColor} 20%, ${accentColor} 80%, transparent)`,
          opacity: 0.4,
          transition: 'all 0.4s ease',
        }}
      />
    </Box>
  );
}
