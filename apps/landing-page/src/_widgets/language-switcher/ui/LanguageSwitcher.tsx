
'use client';

import { useState, useRef, useEffect } from 'react';
import { Box, Typography, CircularProgress, alpha } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiCheck, FiGlobe } from 'react-icons/fi';
import { C, locales } from '../consts/language-switcher.constants';
import { translatePath } from '../model/language-switcher.model';
import type { Locale } from '@/_shared/types/i18n';

interface Props {
  currentLang: Locale;
  onNavigate?: (path: string) => void;
}

export function LanguageSwitcher({ currentLang, onNavigate }: Props) {
  const [open, setOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const current = locales.find(l => l.code === currentLang) ?? locales[0];

  useEffect(() => {
    if (!open) return;
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [open]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('keydown', h);
    return () => document.removeEventListener('keydown', h);
  }, []);

  const handleChange = (code: string) => {
    if (code === currentLang) { setOpen(false); return; }
    setIsPending(true);
    const path = translatePath(window.location.pathname, code as Locale);
    if (onNavigate) {
      onNavigate(path);
    } else {
      window.location.href = path;
    }
    setOpen(false);
    setIsPending(false);
  };

  return (
    <Box ref={ref} sx={{ position: 'relative', userSelect: 'none' }}>
      <Box
        role="button"
        onClick={() => setOpen(v => !v)}
        component={motion.div}
        whileTap={{ scale: 0.97 }}
        sx={{
          display: 'flex', alignItems: 'center', gap: 0.75,
          px: 1.25, py: 0.65, borderRadius: '10px',
          border: `1px solid ${open ? C.accentLine : C.border}`,
          bgcolor: open ? C.accentBg : C.bg,
          cursor: 'pointer', transition: 'all 0.2s ease',
          '&:hover': { bgcolor: C.accentBg, borderColor: C.accentLine },
        }}
      >
        <Box sx={{ color: open ? C.accent : C.textMute }}>
          {isPending ? <CircularProgress size={14} thickness={4} sx={{ color: C.accent }} /> : <FiGlobe size={14} />}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
          <Box component={motion.span} key={current.code} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} sx={{ fontSize: '14px' }}>
            {current.flag}
          </Box>
          <Typography sx={{ fontSize: '0.78rem', fontWeight: 700, color: open ? C.accent : C.textMid, letterSpacing: '0.04em' }}>
            {current.native}
          </Typography>
        </Box>
        <Box component={motion.div} animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.22 }}>
          <FiChevronDown size={12} />
        </Box>
      </Box>

      <AnimatePresence>
        {open && (
          <Box
            component={motion.div}
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            sx={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0,
              width: 220, bgcolor: C.bg,
              border: `1px solid ${C.border}`, borderRadius: '14px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.10)',
              overflow: 'hidden', zIndex: 1500,
            }}
          >
            <Box sx={{ px: 2, pt: 2, pb: 1 }}>
              <Typography sx={{ fontSize: '0.68rem', fontWeight: 700, color: C.textMute, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Idioma / Language
              </Typography>
            </Box>
            <Box sx={{ px: 1, pb: 1.5 }}>
              {locales.map(({ code, label, native, flag, country }) => {
                const isActive = code === currentLang;
                const isHovered = hovered === code;
                return (
                  <Box
                    key={code}
                    onClick={() => handleChange(code)}
                    onMouseEnter={() => setHovered(code)}
                    onMouseLeave={() => setHovered(null)}
                    sx={{
                      display: 'flex', alignItems: 'center', gap: 1.25,
                      px: 1.25, py: 1, borderRadius: '10px',
                      cursor: isActive ? 'default' : 'pointer', mb: 0.25,
                      bgcolor: isActive ? alpha(C.accent, 0.08) : isHovered ? C.accentBg : 'transparent',
                      border: `1px solid ${isActive ? C.accentLine : 'transparent'}`,
                    }}
                  >
                    <Box sx={{ fontSize: '20px', flexShrink: 0 }}>{flag}</Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75 }}>
                        <Typography sx={{ fontSize: '0.875rem', fontWeight: isActive ? 700 : 500, color: isActive ? C.accent : C.text }}>
                          {label}
                        </Typography>
                        <Typography sx={{ fontSize: '0.65rem', fontWeight: 700, color: C.textMute }}>
                          {native}
                        </Typography>
                      </Box>
                      <Typography sx={{ fontSize: '0.7rem', color: C.textMute }}>{country}</Typography>
                    </Box>
                    {isActive && (
                      <Box component={motion.div} initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} sx={{ width: 20, height: 20, borderRadius: '50%', bgcolor: C.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiCheck size={11} strokeWidth={3} />
                      </Box>
                    )}
                  </Box>
                );
              })}
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  );
}
