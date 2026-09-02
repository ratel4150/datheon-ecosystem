// File: apps/landing-page/src/_widgets/header/ui/MobileNavGroup.tsx
'use client';

import { Box, List, ListItem, Typography, Collapse, alpha } from '@mui/material';
import { motion } from 'framer-motion';
import { FiChevronDown, FiArrowRight } from 'react-icons/fi';
import { IconMapper } from './IconMapper';
import { C } from '../consts/header.constants';
import type { SubItem } from '../model/header.types';

interface MobileNavGroupProps {
  label: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  items: SubItem[];
  viewAllPath: string;
  viewAllLabel: string;
  onClose: () => void;
}

export function MobileNavGroup({
  label,
  icon,
  isOpen,
  onToggle,
  items,
  viewAllPath,
  viewAllLabel,
  onClose,
}: MobileNavGroupProps) {
  return (
    <>
      <ListItem onClick={onToggle} sx={{ borderRadius: '12px', mb: 0.5, px: 1.5, py: 1.25, display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', bgcolor: isOpen ? C.accentBg : 'transparent', borderLeft: isOpen ? `3px solid ${C.accent}` : '3px solid transparent', transition: 'all 0.2s ease', '&:hover': { bgcolor: C.accentBg } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 36, height: 36, borderRadius: '10px', bgcolor: isOpen ? alpha(C.accent, 0.15) : C.accentBg, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease' }}>
            {icon}
          </Box>
          <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: C.text }}>
            {label}
          </Typography>
        </Box>
        <Box component={motion.div} animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }} sx={{ color: C.textMute }}>
          <FiChevronDown size={16} />
        </Box>
      </ListItem>

      <Collapse in={isOpen} timeout={220} unmountOnExit>
        <List component="div" disablePadding sx={{ pl: 2, mb: 0.5 }}>
          {items.map(({ label: lbl, path, icon: ic }) => (
            <ListItem key={path} onClick={() => { window.location.href = path; onClose(); }} sx={{ borderRadius: '10px', mb: 0.25, px: 1.5, py: 1, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1.5, '&:hover': { bgcolor: C.accentBg } }}>
              <Box sx={{ width: 28, height: 28, borderRadius: '8px', bgcolor: C.accentBg, color: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <IconMapper name={ic} size={15} />
              </Box>
              <Typography sx={{ fontSize: '0.875rem', color: C.textMid, fontWeight: 500 }}>
                {lbl}
              </Typography>
            </ListItem>
          ))}
          <ListItem onClick={() => { window.location.href = viewAllPath; onClose(); }} sx={{ borderRadius: '10px', px: 1.5, py: 0.75, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1, '&:hover': { bgcolor: C.accentBg } }}>
            <FiArrowRight size={13} color={C.accent} />
            <Typography sx={{ fontSize: '0.8rem', color: C.accent, fontWeight: 600 }}>
              {viewAllLabel}
            </Typography>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
}
