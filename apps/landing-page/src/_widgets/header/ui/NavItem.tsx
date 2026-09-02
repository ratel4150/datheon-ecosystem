// File: apps/landing-page/src/_widgets/header/ui/NavItem.tsx
'use client';

import { Box } from '@mui/material';
import { motion } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { C } from '../consts/header.constants';
import { useEffect, useRef } from 'react';

interface NavItemProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}

export function NavItem({ label, isOpen, onToggle, children }: NavItemProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) onToggle();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen, onToggle]);

  return (
    <Box ref={ref} sx={{ position: 'relative' }}>
      <Box onClick={onToggle} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, px: 1, py: 0.5, borderRadius: '8px', cursor: 'pointer', userSelect: 'none', color: isOpen ? C.accent : C.textMid, fontWeight: 500, fontSize: '0.9rem', transition: 'all 0.15s ease', '&:hover': { color: C.accent, bgcolor: C.accentBg } }}>
        {label}
        <Box component={motion.div} animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} sx={{ display: 'flex', color: 'inherit' }}>
          <FiChevronDown size={14} />
        </Box>
      </Box>
      {children}
    </Box>
  );
}
