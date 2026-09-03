// File: apps/academy/src/_widgets/dashboard-shell/ui/AcademyDashboardShell.tsx
'use client';

import * as React from 'react';
import { styled, useTheme as useMuiTheme, type Theme, type CSSObject } from '@mui/material/styles';
import { Box } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Chip from '@mui/material/Chip';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import FolderRoundedIcon from '@mui/icons-material/FolderRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import { UserButton } from '@clerk/clerk-react';
import { MONO, DISPLAY } from '@datheon/ui';
import { content, resolveLangShell } from '../lib';
import type { Lang } from '@datheon/i18n';

const DRAWER_WIDTH = 240;

interface Tokens {
  bg: string; surface: string; text: string; textMid: string; textMute: string; accent: string; border: string;
}

const openedMixin = (theme: Theme): CSSObject => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: { width: `calc(${theme.spacing(8)} + 1px)` },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarStyledProps extends MuiAppBarProps {
  open?: boolean;
}

function makeAppBar(T: Tokens) {
  return styled(MuiAppBar, { shouldForwardProp: (prop) => prop !== 'open' })<AppBarStyledProps>(({ theme }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: T.surface,
    color: T.text,
    borderBottom: `1px solid ${T.border}`,
    boxShadow: 'none',
    transition: theme.transitions.create(['width', 'margin'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.leavingScreen }),
    variants: [
      {
        props: ({ open }) => open,
        style: {
          marginLeft: DRAWER_WIDTH,
          width: `calc(100% - ${DRAWER_WIDTH}px)`,
          transition: theme.transitions.create(['width', 'margin'], { easing: theme.transitions.easing.sharp, duration: theme.transitions.duration.enteringScreen }),
        },
      },
    ],
  }));
}

function makeDrawer(T: Tokens) {
  return styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme }) => ({
    width: DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': { backgroundColor: T.surface, borderRight: `1px solid ${T.border}` },
    variants: [
      { props: ({ open }) => open, style: { ...openedMixin(theme), '& .MuiDrawer-paper': openedMixin(theme) } },
      { props: ({ open }) => !open, style: { ...closedMixin(theme), '& .MuiDrawer-paper': closedMixin(theme) } },
    ],
  }));
}

interface NavItem {
  id: string;
  labelKey: 'navDashboard' | 'navProject' | 'navProfile';
  icon: React.ReactNode;
  available: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'dashboard', labelKey: 'navDashboard', icon: <HomeRoundedIcon />, available: true },
  { id: 'project', labelKey: 'navProject', icon: <FolderRoundedIcon />, available: false },
  { id: 'profile', labelKey: 'navProfile', icon: <PersonRoundedIcon />, available: false },
];

interface Props {
  lang: Lang;
  T: Tokens;
  children: React.ReactNode;
}

export function AcademyDashboardShell({ lang, T, children }: Props) {
  const muiTheme = useMuiTheme();
  const [open, setOpen] = React.useState(false);
  const l = resolveLangShell(lang);
  const t = content[l];

  const AppBar = React.useMemo(() => makeAppBar(T), [T]);
  const StyledDrawer = React.useMemo(() => makeDrawer(T), [T]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: T.bg }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={[{ marginRight: 5, color: T.textMid }, open && { display: 'none' }]}
          >
            <MenuIcon />
          </IconButton>
          <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1rem', color: T.text, flexGrow: 1 }}>
            {t.appBarTitle}
          </Typography>
          <UserButton />
        </Toolbar>
      </AppBar>

      <StyledDrawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)} sx={{ color: T.textMid }}>
            {muiTheme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider sx={{ borderColor: T.border }} />
        <List>
          {NAV_ITEMS.map((item) => (
            <ListItem key={item.id} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                disabled={!item.available}
                selected={item.id === 'dashboard'}
                sx={[
                  { minHeight: 48, px: 2.5 },
                  open ? { justifyContent: 'initial' } : { justifyContent: 'center' },
                  { '&.Mui-selected': { bgcolor: `${T.accent}1F` }, '&.Mui-selected:hover': { bgcolor: `${T.accent}2A` } },
                ]}
              >
                <ListItemIcon
                  sx={[
                    { minWidth: 0, justifyContent: 'center', color: item.id === 'dashboard' ? T.accent : T.textMute },
                    open ? { mr: 3 } : { mr: 'auto' },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={t[item.labelKey]}
                  sx={{ opacity: open ? 1 : 0, '& .MuiListItemText-primary': { color: T.text, fontSize: '0.88rem' } }}
                />
                {open && !item.available && (
                  <Chip label={t.comingSoon} size="small" sx={{ fontFamily: MONO, fontSize: '0.6rem', height: 20, bgcolor: 'transparent', border: `1px solid ${T.border}`, color: T.textMute }} />
                )}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </StyledDrawer>

      <Box component="main" sx={{ flexGrow: 1, p: { xs: 2.5, md: 4 } }}>
        <DrawerHeader />

        <Breadcrumbs separator="›" sx={{ mb: 3, fontFamily: MONO, fontSize: '0.78rem' }}>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.78rem', color: T.textMute }}>{t.breadcrumbHome}</Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.78rem', color: T.textMute }}>{t.breadcrumbBuildStep}</Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.78rem', color: T.text, fontWeight: 700 }}>{t.breadcrumbDashboard}</Typography>
        </Breadcrumbs>

        {children}
      </Box>
    </Box>
  );
}
