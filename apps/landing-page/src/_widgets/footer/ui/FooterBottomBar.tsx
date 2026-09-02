// File: apps/landing-page/src/_widgets/footer/ui/FooterBottomBar.tsx
'use client';

import { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { FiArrowUp } from 'react-icons/fi';
import { MONO } from '../lib';
import { CONSENT_REOPEN_EVENT } from '@/_shared/lib/cookie-consent';

interface Tokens {
  textMute: string;
  accent: string;
  border: string;
}

interface FooterBottomBarProps {
  lang: string;
  copyright: string;
  signature: string;
  privacy: string;
  terms: string;
  cookies: string;
  backToTopLabel: string;
  T: Tokens;
}

export function FooterBottomBar({ lang, copyright, signature, privacy, terms, cookies, backToTopLabel, T }: FooterBottomBarProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);

  return (
    <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ alignItems: 'center', justifyContent: 'space-between', gap: 1.25 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ alignItems: 'center', gap: { xs: 0.5, sm: 2 } }}>
        <Typography sx={{ fontFamily: MONO, fontSize: '0.7rem', color: T.textMute }}>{copyright}</Typography>
        <Typography sx={{ fontFamily: MONO, fontSize: '0.7rem', color: T.textMute, opacity: 0.6, display: { xs: 'none', sm: 'block' } }}>·</Typography>
        <Typography sx={{ fontFamily: MONO, fontSize: '0.7rem', color: T.textMute, opacity: 0.7 }}>{signature}</Typography>
      </Stack>

      <Stack direction="row" sx={{ alignItems: 'center', gap: 2 }}>
        <Typography
          component="a"
          href={`/${lang}/privacidad`}
          sx={{ fontFamily: MONO, fontSize: '0.7rem', color: T.textMute, textDecoration: 'none', '&:hover': { color: T.accent } }}
        >
          {privacy}
        </Typography>
        <Typography
          component="a"
          href={`/${lang}/terminos`}
          sx={{ fontFamily: MONO, fontSize: '0.7rem', color: T.textMute, textDecoration: 'none', '&:hover': { color: T.accent } }}
        >
          {terms}
        </Typography>
        <Box
          component="button"
          type="button"
          onClick={() => window.dispatchEvent(new CustomEvent(CONSENT_REOPEN_EVENT))}
          className="ft-focus"
          sx={{
            appearance: 'none',
            bgcolor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            p: 0,
            fontFamily: MONO,
            fontSize: '0.7rem',
            color: T.textMute,
            '&:hover': { color: T.accent },
          }}
        >
          {cookies}
        </Box>
        <Box
          component="button"
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' })}
          aria-label={backToTopLabel}
          className="ft-focus"
          sx={{
            appearance: 'none',
            cursor: 'pointer',
            width: 26,
            height: 26,
            borderRadius: '50%',
            border: `1px solid ${T.border}`,
            bgcolor: 'transparent',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: T.textMute,
            transition: 'border-color 0.2s ease, color 0.2s ease',
            '&:hover': { borderColor: T.accent, color: T.accent },
          }}
        >
          <FiArrowUp size={12} />
        </Box>
      </Stack>
    </Stack>
  );
}