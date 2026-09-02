// File: apps/landing-page/src/_widgets/footer/ui/FooterMain.tsx
'use client';

import { Box, GlobalStyles } from '@mui/material';
import { useTheme } from '@/_shared/lib/theme';
import { C, DARK, content, resolveLang, PILLARS } from '../lib';
import { useStoredStage } from '../model';
import { FooterTopBanner } from './FooterTopBanner';
import { FooterColumns } from './FooterColumns';
import { FooterBottomBar } from './FooterBottomBar';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  currentLang: string;
}

export function FooterMain({ currentLang }: Props) {
  const lang = (currentLang in PILLARS ? currentLang : 'es') as Lang;
  const l = resolveLang(lang, content);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;
  const storedStage = useStoredStage();
  const personalizedNote = storedStage ? t.personalizedTemplate.replace('{stage}', storedStage.label) : null;

  return (
    <Box component="footer" sx={{ bgcolor: T.footerBg, transition: 'background-color 0.3s ease' }}>
      <GlobalStyles styles={{ '.ft-focus:focus-visible': { outline: `2px solid ${T.accent}`, outlineOffset: 2 } }} />

      <FooterTopBanner
        headline={t.ctaHeadline}
        buttonLabel={t.ctaButton}
        trustNote={t.ctaTrustNote}
        availabilityLabel={t.availabilityLabel}
        personalizedNote={personalizedNote}
        T={T}
      />

      <Box sx={{ maxWidth: 960, mx: 'auto', px: { xs: 3, md: 4 }, py: { xs: 5, md: 6 } }}>
        <FooterColumns
          tagline={t.tagline}
          pillars={PILLARS[l]}
          exploreLabel={t.exploreColumnLabel}
          technologyLabel={t.technologyColumnLabel}
          connectLabel={t.connectColumnLabel}
          academyLabel={t.academyLink}
          newsletterPlaceholder={t.newsletterPlaceholder}
          newsletterButton={t.newsletterButton}
          newsletterThanks={t.newsletterThanks}
          newsletterError={t.newsletterErrorLabel}
          systemStatusLabel={t.systemStatusLabel}
          terminalInit={t.terminalInit}
          terminalReady={t.terminalReady}
          T={T}
        />

        <Box sx={{ borderTop: `1px solid ${T.border}`, mt: { xs: 4, md: 5 }, pt: 2.5 }}>
        <FooterBottomBar lang={l} copyright={t.copyright} signature={t.signature} privacy={t.privacy} terms={t.terms} cookies={t.cookies} backToTopLabel={t.backToTopLabel} T={T} />
        </Box>
      </Box>
    </Box>
  );
}
