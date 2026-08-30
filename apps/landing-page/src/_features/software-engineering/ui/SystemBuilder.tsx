'use client';

import { Box, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { BUILD_STAGES, MONO } from '../lib';
import { useScrollBuild } from '../model';
import { SystemGraph } from './SystemGraph';

interface Tokens {
  text: string;
  textMute: string;
  accent: string;
  surface: string;
  border: string;
}

interface SystemBuilderProps {
  T: Tokens;
  scrollHint: string;
}

export function SystemBuilder({ T, scrollHint }: SystemBuilderProps) {
  const { containerRef, scale, activeIndex } = useScrollBuild();
  const activeStage = BUILD_STAGES[activeIndex];
  const isFinal = activeIndex === BUILD_STAGES.length - 1;

  return (
    <Box ref={containerRef} sx={{ position: 'relative', height: { xs: `${BUILD_STAGES.length * 55}vh`, md: `${BUILD_STAGES.length * 62}vh` } }}>
      <Box sx={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', px: 2 }}>
        <Box
          aria-hidden
          sx={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `radial-gradient(${T.border} 1px, transparent 1px)`,
            backgroundSize: '28px 28px',
            opacity: 0.6,
            pointerEvents: 'none',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', mb: 2, maxWidth: 420 }}>
          <Typography
            key={activeStage.id}
            component={motion.p}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            sx={{ fontFamily: MONO, fontSize: '0.62rem', letterSpacing: '0.05em', textTransform: 'uppercase', color: T.accent, fontWeight: 700, mb: 0.75 }}
          >
            {String(activeIndex + 1).padStart(2, '0')}/{String(BUILD_STAGES.length).padStart(2, '0')} · {activeStage.title}
          </Typography>
          <Typography sx={{ fontSize: '0.85rem', color: T.textMute }}>{activeStage.narrative}</Typography>
        </Box>

        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <SystemGraph visibleNodeIds={activeStage.nodeIds} visibleEdgeIds={activeStage.edgeIds} showLabels={isFinal} T={T} scale={scale} />
        </Box>

        <Typography
          sx={{
            position: 'absolute',
            bottom: 24,
            fontFamily: MONO,
            fontSize: '0.62rem',
            color: T.textMute,
            opacity: activeIndex < BUILD_STAGES.length - 1 ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        >
          {scrollHint}
        </Typography>
      </Box>
    </Box>
  );
}
