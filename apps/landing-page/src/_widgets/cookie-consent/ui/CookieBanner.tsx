'use client';

import { useState } from 'react';
import { Box, Container, Stack, Typography, Button, Switch, GlobalStyles } from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/_shared/lib/theme';
import type { ConsentChoices } from '@/_shared/lib/cookie-consent';
import { C, DARK, MONO, content, resolveLang } from '../lib';
import { useCookieConsent } from '../model';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function CookieBanner({ lang }: Props) {
  const l = resolveLang(lang, content);
  const t = content[l];
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const T = isDark ? DARK : C;

  const { visible, expanded, choices, acceptAll, rejectAll, saveCustom, openSettings } = useCookieConsent();
  const [draft, setDraft] = useState<ConsentChoices>(choices);

  if (!visible) return null;

  const handleSave = () => saveCustom(draft);

  return (
    <AnimatePresence>
      <Box
        component={motion.div}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1400,
          bgcolor: T.surface,
          borderTop: `1px solid ${T.border}`,
          boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
        }}
      >
        <GlobalStyles styles={{ '.cc-focus:focus-visible': { outline: `2px solid ${T.accent}`, outlineOffset: 2 } }} />
        <Container maxWidth="md" sx={{ py: 2.5 }}>
          {!expanded ? (
            <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ alignItems: { xs: 'stretch', sm: 'center' }, justifyContent: 'space-between', gap: 2 }}>
              <Typography sx={{ fontSize: '0.85rem', color: T.textMid, lineHeight: 1.6, flex: 1 }}>{t.message}</Typography>
              <Stack direction="row" sx={{ gap: 1, flexShrink: 0, flexWrap: 'wrap' }}>
                <Button
                  onClick={openSettings}
                  className="cc-focus"
                  sx={{ fontFamily: MONO, fontSize: '0.75rem', color: T.textMid, textTransform: 'none', '&:hover': { color: T.accent, bgcolor: 'transparent' } }}
                >
                  {t.customize}
                </Button>
                <Button
                  onClick={rejectAll}
                  className="cc-focus"
                  sx={{
                    fontFamily: MONO,
                    fontSize: '0.78rem',
                    color: T.text,
                    textTransform: 'none',
                    border: `1px solid ${T.border}`,
                    borderRadius: '8px',
                    px: 2,
                    '&:hover': { borderColor: T.accent },
                  }}
                >
                  {t.rejectAll}
                </Button>
                <Button
                  onClick={acceptAll}
                  variant="contained"
                  className="cc-focus"
                  sx={{
                    bgcolor: T.accent,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    px: 2.25,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontFamily: MONO,
                    '&:hover': { bgcolor: T.accentDk },
                  }}
                >
                  {t.acceptAll}
                </Button>
              </Stack>
            </Stack>
          ) : (
            <Stack spacing={2}>
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: T.text }}>{t.necessaryLabel}</Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: T.textMute }}>{t.necessaryDesc}</Typography>
                </Box>
                <Switch checked disabled />
              </Stack>
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: T.text }}>{t.analyticsLabel}</Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: T.textMute }}>{t.analyticsDesc}</Typography>
                </Box>
                <Switch checked={draft.analytics} onChange={(e) => setDraft((d) => ({ ...d, analytics: e.target.checked }))} className="cc-focus" />
              </Stack>
              <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                <Box>
                  <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, color: T.text }}>{t.marketingLabel}</Typography>
                  <Typography sx={{ fontSize: '0.78rem', color: T.textMute }}>{t.marketingDesc}</Typography>
                </Box>
                <Switch checked={draft.marketing} onChange={(e) => setDraft((d) => ({ ...d, marketing: e.target.checked }))} className="cc-focus" />
              </Stack>

              <Stack direction="row" sx={{ justifyContent: 'flex-end', gap: 1, pt: 1 }}>
                <Button
                  onClick={handleSave}
                  variant="contained"
                  className="cc-focus"
                  sx={{
                    bgcolor: T.accent,
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '0.78rem',
                    px: 2.5,
                    borderRadius: '8px',
                    textTransform: 'none',
                    fontFamily: MONO,
                    '&:hover': { bgcolor: T.accentDk },
                  }}
                >
                  {t.save}
                </Button>
              </Stack>
            </Stack>
          )}
        </Container>
      </Box>
    </AnimatePresence>
  );
}
