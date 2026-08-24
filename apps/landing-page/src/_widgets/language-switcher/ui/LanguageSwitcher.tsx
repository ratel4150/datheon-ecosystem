'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Box, Typography, CircularProgress, alpha } from '@mui/material';
import { FiChevronDown, FiCheck, FiGlobe } from 'react-icons/fi';
import { C, locales } from '../consts/language-switcher.constants';
import { changeLanguage } from '../model/language-switcher.model';
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

  // Cerrar al click exterior
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  const handleToggle = useCallback(() => {
    setOpen(prev => !prev);
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(prev => !prev);
    }
    if (e.key === 'Escape') {
      setOpen(false);
    }
  }, []);

  const handleChange = useCallback((code: string) => {
    if (code === currentLang) { setOpen(false); return; }
    setIsPending(true);
    changeLanguage(
      code as Locale,
      window.location.pathname,
      (path) => {
        if (onNavigate) onNavigate(path);
        else window.location.href = path;
        setOpen(false);
        setIsPending(false);
      }
    );
  }, [currentLang, onNavigate]);

  const handleMouseEnter = useCallback((code: string) => setHovered(code), []);
  const handleMouseLeave = useCallback(() => setHovered(null), []);

  return (
    <Box ref={ref} sx={{ position: 'relative', userSelect: 'none' }}>
      {/* Trigger */}
      <Box
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        tabIndex={0}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        sx={{
          display: 'flex', alignItems: 'center', gap: 0.75,
          px: 1.25, py: 0.65, borderRadius: '10px',
          border: `1px solid ${open ? C.accentLine : C.border}`,
          bgcolor: open ? C.accentBg : C.bg,
          cursor: 'pointer', transition: 'all 0.2s ease',
          '&:hover': { bgcolor: C.accentBg, borderColor: C.accentLine },
        }}
      >
        <Box sx={{ color: open ? C.accent : C.textMute, display: 'flex' }}>
          {isPending ? (
            <CircularProgress size={14} thickness={4} sx={{ color: C.accent }} />
          ) : (
            <FiGlobe size={14} />
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.6 }}>
          <Box sx={{ fontSize: '14px', lineHeight: 1 }}>{current.flag}</Box>
          <Typography sx={{
            fontSize: '0.78rem', fontWeight: 700,
            color: open ? C.accent : C.textMid,
            letterSpacing: '0.04em',
          }}>
            {current.native}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', color: C.textMute }}>
          <FiChevronDown size={12} style={{ transition: 'transform 0.22s ease', transform: open ? 'rotate(180deg)' : 'none' }} />
        </Box>
      </Box>

      {/* Dropdown - con CSS animations */}
      <Box
        role="listbox"
        aria-label="Seleccionar idioma"
        sx={{
          position: 'absolute', top: 'calc(100% + 8px)', right: 0,
          width: 240, bgcolor: C.bg,
          border: `1px solid ${C.border}`, borderRadius: '14px',
          boxShadow: C.dropdownShadow,
          overflow: 'hidden', zIndex: 1500,
          transition: 'opacity 0.18s ease, transform 0.18s ease',
          opacity: open ? 1 : 0,
          transform: open ? 'scale(1)' : 'scale(0.97)',
          pointerEvents: open ? 'auto' : 'none',
          '&::before': {
            content: '""', position: 'absolute', top: 0, left: 0, right: 0,
            height: '2px',
            background: `linear-gradient(90deg, ${C.accent}, #00d4ff)`,
          },
        }}
      >
        <Box sx={{ px: 2, pt: 2, pb: 1 }}>
          <Typography sx={{
            fontSize: '0.68rem', fontWeight: 700, color: C.textMute,
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            Idioma / Language
          </Typography>
        </Box>
        <Box sx={{ px: 1, pb: 1.5 }}>
          {locales.map(({ code, label, native, flag, display, country }) => {
            const isActive = code === currentLang;
            const isHovered = hovered === code;
            return (
              <Box
                key={code}
                role="option"
                aria-selected={isActive}
                onClick={() => handleChange(code)}
                onMouseEnter={() => handleMouseEnter(code)}
                onMouseLeave={handleMouseLeave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleChange(code);
                  }
                }}
                tabIndex={0}
                sx={{
                  display: 'flex', alignItems: 'center', gap: 1.25,
                  px: 1.25, py: 1, borderRadius: '10px',
                  cursor: isActive ? 'default' : 'pointer', mb: 0.25,
                  bgcolor: isActive ? alpha(C.accent, 0.08) : isHovered ? C.accentBg : 'transparent',
                  border: `1px solid ${isActive ? C.accentLine : 'transparent'}`,
                  transition: 'all 0.15s ease',
                }}
              >
                <Box sx={{ fontSize: '20px', lineHeight: 1, flexShrink: 0 }}>
                  {flag}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.75 }}>
                    <Typography sx={{
                      fontSize: '0.875rem', fontWeight: isActive ? 700 : 500,
                      color: isActive ? C.accent : C.text,
                      lineHeight: 1.2,
                    }}>
                      {label}
                    </Typography>
                    <Typography sx={{
                      fontSize: '0.65rem', fontWeight: 700, color: C.textMute,
                      fontFamily: 'DM Mono, monospace', letterSpacing: '0.06em',
                    }}>
                      {native}
                    </Typography>
                  </Box>
                  <Typography sx={{ fontSize: '0.7rem', color: C.textMute, lineHeight: 1.2, mt: 0.15 }}>
                    {country}
                  </Typography>
                </Box>
                {isActive && (
                  <Box
                    sx={{
                      width: 20, height: 20, borderRadius: '50%',
                      bgcolor: C.accent, color: '#fff',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                      transition: 'transform 0.15s ease',
                    }}
                  >
                    <FiCheck size={11} strokeWidth={3} />
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}
