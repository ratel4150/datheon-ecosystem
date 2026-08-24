// File: apps/landing-page/src/_widgets/header/ui/AppBarMain.tsx
'use client';

import {
  AppBar, Toolbar, IconButton, Typography, Stack, Box,
  Drawer, List, Button,
  Divider, alpha,
  Link,
  ListItem,
} from '@mui/material';
import { FaMoon } from 'react-icons/fa';
import {
  FiCalendar, FiLayers, FiGrid, FiMenu, FiX,
  FiBookmark,
} from 'react-icons/fi';
import { useEffect, useState } from 'react';


import { DropdownMenu } from './DropdownMenu';
import { NavItem } from './NavItem';
import { MobileNavGroup } from './MobileNavGroup';
// import { ClerkAuth } from './ClerkAuth';  // COMENTADO TEMPORALMENTE
import { C } from '../consts/header.constants';
import { servicesData, sectorsData } from '../consts/header.constants';
import { tx } from '../lib/header.utils';
import type { Lang } from '../model/header.types';
import { LanguageSwitcher } from '@/_widgets/language-switcher';

type Props = { currentLang: string };

export function AppBarMain({ currentLang }: Props) {
  const lang = (currentLang as Lang) in servicesData ? (currentLang as Lang) : 'es';

  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isLg, setIsLg] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 900);
      setIsLg(window.innerWidth >= 1200);
    };
    update();
    setMounted(true);
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { if (!isMobile) setDrawerOpen(false); }, [isMobile]);

  const toggleMenu = (name: string) => setOpenMenu(prev => prev === name ? null : name);
  const closeAll = () => { setDrawerOpen(false); setOpenMenu(null); };

  const currentServices = servicesData[lang];
  const currentSectors = sectorsData[lang];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        className="appbar-slide"
        sx={{
          bgcolor: C.bg,
          color: C.text,
          borderBottom: `1px solid ${scrolled ? C.border : 'transparent'}`,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          boxShadow: scrolled ? '0 2px 16px rgba(0,0,0,0.06)' : 'none',
          transition: 'border-color 0.3s ease, box-shadow 0.3s ease, backdrop-filter 0.3s ease',
          zIndex: 1300,
        }}
      >
        <Toolbar sx={{
          px: { xs: 1.5, sm: 2, md: 3, lg: 4 },
          minHeight: { xs: 56, sm: 60, md: 68 },
          gap: { xs: 1, md: 2 },
        }}>
          {/* Logo */}
          <Stack
            direction="row"
            spacing={1.5}
            sx={{ alignItems: 'center', cursor: 'pointer', flexShrink: 0, transition: 'opacity 0.2s', '&:hover': { opacity: 0.85 } }}
            onClick={() => window.location.href = '/'}
          >
            <Box sx={{
              width: { xs: 36, md: 40 }, height: { xs: 36, md: 40 },
              borderRadius: '10px', border: `1px solid ${C.accentLine}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              overflow: 'hidden', position: 'relative', flexShrink: 0,
              bgcolor: alpha(C.accent, 0.04),
            }}>
              <Typography sx={{ fontSize: '1.5rem', fontWeight: 800, color: C.accent }}>D</Typography>
            </Box>
            <Box>
              <Typography sx={{
                fontFamily: 'Poppins, sans-serif', fontWeight: 800,
                fontSize: { xs: '1.05rem', md: '1.2rem' },
                color: C.text, lineHeight: 1, letterSpacing: '-0.01em',
              }}>
                Dathe<Box component="span" sx={{ color: C.accent }}>ó</Box>n
              </Typography>
              <Typography sx={{
                fontSize: '0.58rem', letterSpacing: '0.12em', color: C.textMute,
                fontWeight: 600, textTransform: 'uppercase', lineHeight: 1, mt: 0.3,
                display: { xs: 'none', sm: 'block' },
              }}>
                Smart Tech Solutions
              </Typography>
            </Box>
          </Stack>

          {/* Desktop Nav */}
          {mounted && !isMobile && (
            <Stack direction="row" spacing={0.5} sx={{ flexGrow: 1, alignItems: 'center', pl: { md: 2, lg: 3 } }}>
              <NavItem label={tx('services', lang)} isOpen={openMenu === 'services'}
                onToggle={() => toggleMenu('services')}>
                <DropdownMenu items={currentServices}
                  viewAllPath={`/${lang}/servicios`}
                  viewAllLabel={tx('viewAllSvc', lang)}
                  open={openMenu === 'services'} />
              </NavItem>

              <NavItem label={tx('sectors', lang)} isOpen={openMenu === 'sectors'}
                onToggle={() => toggleMenu('sectors')}>
                <DropdownMenu items={currentSectors}
                  viewAllPath={`/${lang}/sectores`}
                  viewAllLabel={tx('viewAllSec', lang)}
                  open={openMenu === 'sectors'} />
              </NavItem>

              <Box onClick={() => window.location.href = '/universidad'} sx={{
                px: 1, py: 0.5, borderRadius: '8px', cursor: 'pointer',
                fontWeight: 500, fontSize: '0.9rem', color: C.textMid,
                transition: 'all 0.15s ease',
                '&:hover': { color: C.accent, bgcolor: C.accentBg },
              }}>
                {tx('university', lang)}
              </Box>
            </Stack>
          )}

          {(!mounted || isMobile) && <Box sx={{ flexGrow: 1 }} />}

          {/* Right actions */}
          <Stack direction="row" spacing={{ xs: 0.5, sm: 0.75 }}
            sx={{ alignItems: 'center', ml: 'auto', flexShrink: 0 }}>
           <LanguageSwitcher currentLang={lang} client:load />

            <IconButton size="small" title={tx('darkMode', lang)} sx={{
              color: C.textMute,
              width: { xs: 32, md: 36 }, height: { xs: 32, md: 36 },
              '&:hover': { color: C.accent, bgcolor: C.accentBg },
            }}>
              <FaMoon size={14} />
            </IconButton>

            {/* <ClerkAuth lang={lang} />  COMENTADO */}

            {mounted && isLg && (
              <Link href="https://calendly.com/team_datheon/consulta-gratuita"
                target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <Button variant="contained" size="small" startIcon={<FiCalendar size={14} />}
                  sx={{
                    bgcolor: C.accent, color: '#fff', fontWeight: 600,
                    textTransform: 'none', borderRadius: '10px',
                    px: 2.25, py: 0.85, fontSize: '0.85rem', whiteSpace: 'nowrap',
                    boxShadow: `0 2px 8px ${alpha(C.accent, 0.35)}`,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      bgcolor: C.accentDk,
                      boxShadow: `0 4px 14px ${alpha(C.accent, 0.45)}`,
                      transform: 'translateY(-1px)',
                    },
                  }}>
                  {tx('schedule', lang)}
                </Button>
              </Link>
            )}

            {mounted && isMobile && (
              <IconButton onClick={() => setDrawerOpen(true)} aria-label="Abrir menú"
                sx={{
                  border: `1px solid ${C.border}`, borderRadius: '10px',
                  color: C.textMid,
                  width: { xs: 36, sm: 40 }, height: { xs: 36, sm: 40 },
                  '&:hover': { bgcolor: C.accentBg, color: C.accent, borderColor: C.accentLine },
                }}>
                <FiMenu size={18} />
              </IconButton>
            )}
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Drawer mobile */}
    <Drawer 
  anchor="right" 
  open={drawerOpen} 
  onClose={closeAll}
  slotProps={{
    paper: {
      sx: {
        width: { xs: '100vw', sm: 380 },
        bgcolor: C.bg,
        boxShadow: '-4px 0 40px rgba(0,0,0,0.10)',
        borderLeft: `1px solid ${C.border}`,
      },
    },
    root: {
      disableScrollLock: true,
    },
  }}
>
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Box sx={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            px: 2.5, py: 2, borderBottom: `1px solid ${C.border}`,
          }}>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
              <Box sx={{
                width: 36, height: 36, borderRadius: '9px',
                border: `1px solid ${C.accentLine}`,
                overflow: 'hidden', position: 'relative', flexShrink: 0,
                bgcolor: alpha(C.accent, 0.04),
              }}>
                <Typography sx={{ fontSize: '1.2rem', fontWeight: 800, color: C.accent }}>D</Typography>
              </Box>
              <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: C.text }}>
                Dathe<Box component="span" sx={{ color: C.accent }}>ó</Box>n
              </Typography>
            </Stack>
            <IconButton onClick={closeAll} sx={{
              color: C.textMute, border: `1px solid ${C.border}`,
              borderRadius: '9px', width: 34, height: 34,
              '&:hover': { bgcolor: C.accentBg, color: C.accent, borderColor: C.accentLine },
            }}>
              <FiX size={16} />
            </IconButton>
          </Box>

          <Box sx={{ flex: 1, overflowY: 'auto', px: 1.5, py: 2 }}>
            <List disablePadding>
              <MobileNavGroup
                label={tx('services', lang)} icon={<FiLayers size={17} />}
                isOpen={openMenu === 'services'} onToggle={() => toggleMenu('services')}
                items={currentServices} viewAllPath={`/${lang}/servicios`}
                viewAllLabel={tx('viewAllSvc', lang)} onClose={closeAll} />

              <MobileNavGroup
                label={tx('sectors', lang)} icon={<FiGrid size={17} />}
                isOpen={openMenu === 'sectors'} onToggle={() => toggleMenu('sectors')}
                items={currentSectors} viewAllPath={`/${lang}/sectores`}
                viewAllLabel={tx('viewAllSec', lang)} onClose={closeAll} />

              <ListItem onClick={() => { window.location.href = '/universidad'; closeAll(); }} sx={{
                borderRadius: '12px', mb: 0.5, px: 1.5, py: 1.25,
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 1.5,
                borderLeft: '3px solid transparent',
                '&:hover': { bgcolor: C.accentBg },
              }}>
                <Box sx={{
                  width: 36, height: 36, borderRadius: '10px',
                  bgcolor: C.accentBg, color: C.accent,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <FiBookmark size={17} />
                </Box>
                <Typography sx={{ fontWeight: 600, fontSize: '0.95rem', color: C.text }}>
                  {tx('university', lang)}
                </Typography>
              </ListItem>
            </List>

            <Box sx={{ mt: 1.5, px: 0.5 }}>
              <Divider sx={{ mb: 1.5, borderColor: C.border }} />
              {/* <ClerkAuth lang={lang} /> COMENTADO */}
            </Box>
          </Box>

          <Box sx={{ px: 2, py: 2, borderTop: `1px solid ${C.border}`, bgcolor: C.bgSub }}>
            <Link href="https://calendly.com/d/cv8d-jjp-nhd/consultoria-estrategica"
              target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
              <Button fullWidth variant="contained" startIcon={<FiCalendar size={16} />}
                sx={{
                  bgcolor: C.accent, color: '#fff', fontWeight: 700,
                  textTransform: 'none', borderRadius: '12px', py: 1.4, fontSize: '0.95rem',
                  boxShadow: `0 4px 14px ${alpha(C.accent, 0.35)}`,
                  '&:hover': { bgcolor: C.accentDk, boxShadow: `0 6px 20px ${alpha(C.accent, 0.45)}` },
                }}>
                {tx('schedule', lang)}
              </Button>
            </Link>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
