'use client';

import { Box, Container, Stack, Typography } from '@mui/material';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, DISPLAY, MONO, chrome, resolveLang } from '../lib';
import type { LegalDocument } from '../lib';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
  document: LegalDocument;
}

export function LegalPage({ lang, document: doc }: Props) {
  const l = resolveLang(lang, chrome);
  const t = chrome[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;

  return (
    <Box component="section" sx={{ bgcolor: T.bg, minHeight: '60vh', py: { xs: 8, md: 10 }, transition: 'background-color 0.3s ease' }}>
      <Container maxWidth="sm">
        <Typography
          component="a"
          href="/"
          sx={{ fontFamily: MONO, fontSize: '0.8rem', color: T.textMute, textDecoration: 'none', mb: 4, display: 'inline-block', '&:hover': { color: T.accent } }}
        >
          {t.backLabel}
        </Typography>

        <Typography sx={{ fontFamily: DISPLAY, fontWeight: 800, fontSize: { xs: '1.8rem', md: '2.2rem' }, color: T.text, mb: 1, letterSpacing: '-0.01em' }}>
          {doc.title}
        </Typography>
        <Typography sx={{ fontFamily: MONO, fontSize: '0.75rem', color: T.textMute, mb: 5 }}>
          {t.lastUpdatedLabel}: {doc.lastUpdated}
        </Typography>

        <Stack spacing={4}>
          {doc.sections.map((section) => (
            <Box key={section.heading}>
              <Typography sx={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: '1.05rem', color: T.text, mb: 1.25 }}>{section.heading}</Typography>
              <Stack spacing={1.5}>
                {section.body.map((paragraph, i) => (
                  <Typography key={i} sx={{ fontSize: '0.92rem', color: T.textMid, lineHeight: 1.75 }}>
                    {paragraph}
                  </Typography>
                ))}
              </Stack>
            </Box>
          ))}
        </Stack>
      </Container>
    </Box>
  );
}
