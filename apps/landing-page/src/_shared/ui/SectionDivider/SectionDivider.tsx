// File: apps/landing-page/src/_shared/ui/SectionDivider/SectionDivider.tsx
'use client';

import { Box, Typography, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { useTheme } from '@/_shared/lib/theme';

interface SectionDividerProps {
  /** Muestra el valor actual del theme en pantalla, útil para depurar el toggle */
  debug?: boolean;
}

export function SectionDivider({ debug = false }: SectionDividerProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const accentColor = isDark ? '#4A9EFF' : '#0077B6';
  const glowColor = isDark ? 'rgba(74, 158, 255, 0.3)' : 'rgba(0, 119, 182, 0.2)';
  const lineColor = isDark ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)';
  const bgCircle = isDark ? '#0B0F2B' : '#FFFFFF';
  const sectionBg = isDark ? '#0B0F2B' : '#FFFFFF';
  const textColor = isDark ? '#F5F5F5' : '#0B0F2B';

  return (
    <Box
      key={`section-${theme}`}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        py: { xs: 6, md: 10 },
        px: 2,
        position: 'relative',
        width: '100%',
        overflow: 'hidden',
        bgcolor: sectionBg,
        transition: 'background-color 0.3s ease',
      }}
    >
      {debug && (
        <Typography
          variant="caption"
          sx={{ color: textColor, fontFamily: 'monospace', mb: 1 }}
        >
          theme actual: {theme}
        </Typography>
      )}

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: { xs: 2, md: 4 },
          width: '100%',
        }}
      >
        {/* Línea izquierda con gradiente animado */}
        <Box
          key={`left-${theme}`}
          component={motion.div}
          animate={{
            background: [
              `linear-gradient(to right, transparent, ${lineColor})`,
              `linear-gradient(to right, transparent, ${alpha(accentColor, 0.25)}, ${lineColor})`,
              `linear-gradient(to right, transparent, ${lineColor})`,
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          sx={{
            flex: 1,
            height: '1px',
            maxWidth: { xs: 80, sm: 150, md: 250 },
            background: `linear-gradient(to right, transparent, ${lineColor})`,
          }}
        />

        {/* Círculo central con glow */}
        <Box
          sx={{
            position: 'relative',
            width: { xs: 56, sm: 72, md: 88 },
            height: { xs: 56, sm: 72, md: 88 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {/* Glow exterior pulsante */}
          <Box
            key={`glow-${theme}`}
            component={motion.div}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            sx={{
              position: 'absolute',
              inset: -20,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
              filter: 'blur(20px)',
            }}
          />

          {/* Borde giratorio (conic-gradient) */}
          <Box
            key={`border-${theme}`}
            component={motion.div}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            sx={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              padding: '2px',
              background: `conic-gradient(from 0deg, ${accentColor}, ${isDark ? '#7FBBFF' : '#33A9E0'}, ${accentColor})`,
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          >
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                background: bgCircle,
                transition: 'background 0.3s ease',
              }}
            />
          </Box>

          {/* Icono central */}
          <Box
            sx={{
              position: 'relative',
              zIndex: 1,
              color: accentColor,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'color 0.3s ease',
            }}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 2L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path
                d="M8 6L12 2L16 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 18L12 22L16 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Box>
        </Box>

        {/* Línea derecha con gradiente animado */}
        <Box
          key={`right-${theme}`}
          component={motion.div}
          animate={{
            background: [
              `linear-gradient(to left, transparent, ${lineColor})`,
              `linear-gradient(to left, transparent, ${alpha(accentColor, 0.25)}, ${lineColor})`,
              `linear-gradient(to left, transparent, ${lineColor})`,
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          sx={{
            flex: 1,
            height: '1px',
            maxWidth: { xs: 80, sm: 150, md: 250 },
            background: `linear-gradient(to left, transparent, ${lineColor})`,
          }}
        />
      </Box>
    </Box>
  );
}