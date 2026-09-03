// File: apps/academy/src/_features/academy-dashboard/ui/AcademyDashboard.tsx
'use client';

import { Box, Typography } from '@mui/material';
import { useTheme, C, DARK, DISPLAY, MONO } from '@datheon/ui';
import { BUILD_OPTIONS } from '@/_features/academy-build-what';
import { DonateLink } from '@/_features/academy-donate';
import { useOnboarding } from '@/_shared/model/onboarding';
import { AcademyDashboardShell } from '@/_widgets/dashboard-shell';
import { content, resolveLangDashboard } from '../lib';
import type { Lang } from '@datheon/i18n';

interface Props {
  lang: Lang;
}

export function AcademyDashboard({ lang }: Props) {
  const l = resolveLangDashboard(lang);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;
  const { firstName, buildChoice } = useOnboarding();
  const choiceOption = BUILD_OPTIONS.find((o) => o.id === buildChoice);

  return (
    <AcademyDashboardShell lang={lang} T={T}>
      <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: { xs: '1.5rem', md: '1.8rem' }, color: T.text, mb: 1.5 }}>
        {t.welcomePrefix}{firstName ? `, ${firstName}` : ''}.
      </Typography>

      {choiceOption && (
        <Box
          sx={{
            display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 2, py: 1, borderRadius: '10px',
            bgcolor: `${choiceOption.color}14`, border: `1px solid ${choiceOption.color}40`, mb: 3,
          }}
        >
          <Typography sx={{ fontFamily: MONO, fontSize: '0.68rem', color: T.textMute }}>{t.buildChoiceLabel}</Typography>
          <Typography sx={{ fontFamily: MONO, fontSize: '0.78rem', fontWeight: 700, color: choiceOption.color }}>{choiceOption.label}</Typography>
        </Box>
      )}

      <Typography sx={{ fontSize: '0.95rem', color: T.textMute, lineHeight: 1.7, maxWidth: 480, mb: 5 }}>{t.buildingNote}</Typography>

      <DonateLink lang={lang} T={T} />
    </AcademyDashboardShell>
  );
}