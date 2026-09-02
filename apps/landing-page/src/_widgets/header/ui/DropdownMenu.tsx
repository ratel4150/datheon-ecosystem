// File: apps/landing-page/src/_widgets/header/ui/DropdownMenu.tsx
'use client';

import { Box, Typography, Divider, alpha, Link } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';

import { FiChevronRight, FiArrowRight } from 'react-icons/fi';
import { IconMapper } from './IconMapper';
import { C } from '../consts/header.constants';
import type { SubItem } from '../model/header.types';

interface DropdownMenuProps {
  items: SubItem[];
  viewAllPath: string;
  viewAllLabel: string;
  open: boolean;
}

export function DropdownMenu({ items, viewAllPath, viewAllLabel, open }: DropdownMenuProps) {
  const isWide = items.length > 4;

  return (
    <AnimatePresence>
      {open && (
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: -8, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.97 }}
          transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
          sx={{
            position: 'absolute',
            top: 'calc(100% + 12px)',
            left: isWide ? '50%' : 0,
            transform: isWide ? 'translateX(-50%)' : 'none',
            width: isWide ? 560 : 320,
            bgcolor: C.bg,
            border: `1px solid ${C.border}`,
            borderRadius: '18px',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.04), 0 24px 48px -8px rgba(0,0,0,0.12)',
            overflow: 'hidden',
            zIndex: 1400,
          }}
        >
          <Box sx={{ height: '2.5px', background: `linear-gradient(90deg, ${C.accent}, ${alpha(C.accent, 0.25)})` }} />
          <Box sx={{ display: 'grid', gridTemplateColumns: isWide ? 'repeat(2, 1fr)' : '1fr', p: 1.5, pb: 0, gap: 0 }}>
            {items.map((item) => (
              <Link key={item.path} href={item.path} style={{ textDecoration: 'none' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, px: 1.5, py: 1.25, borderRadius: '12px', cursor: 'pointer', mb: 0.25, '&:hover': { backgroundColor: alpha(C.accent, 0.07) } }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, bgcolor: alpha(C.accent, 0.08), color: C.accent }}>
                    <IconMapper name={item.icon} size={20} />
                  </Box>
                  <Box sx={{ flex: 1, minWidth: 0 }}>
                    <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: C.text, lineHeight: 1.3 }}>
                      {item.label}
                    </Typography>
                    <Typography sx={{ fontSize: '0.72rem', color: C.textMute, mt: 0.2, lineHeight: 1.35, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical' }}>
                      {item.description}
                    </Typography>
                  </Box>
                  <Box sx={{ color: C.accent, flexShrink: 0, opacity: 0 }}>
                    <FiChevronRight size={14} />
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
          <Box sx={{ px: 1.5, pt: 0.75, pb: 1.5 }}>
            <Divider sx={{ mb: 1, borderColor: C.border }} />
            <Link href={viewAllPath} style={{ textDecoration: 'none' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 1.5, py: 1, borderRadius: '10px', cursor: 'pointer', '&:hover': { backgroundColor: alpha(C.accent, 0.07) } }}>
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 700, color: C.accent }}>
                  {viewAllLabel}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, bgcolor: alpha(C.accent, 0.1), borderRadius: '100px', px: 1, py: 0.4 }}>
                  <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: C.accent, lineHeight: 1 }}>
                    {items.length}
                  </Typography>
                  <FiArrowRight size={11} color={C.accent} />
                </Box>
              </Box>
            </Link>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  );
}
