'use client';

import { Typography } from '@mui/material';
import { MONO } from '@datheon/ui';
import { ACADEMY_CONTACT_EMAIL } from '@/_shared/lib/contact';
import { content, resolveLangDonate, DONATION_URL } from '../lib';
import type { Lang } from '@datheon/i18n';

interface Tokens {
  textMute: string;
  accent: string;
}

interface Props {
  lang: Lang;
  T: Tokens;
}

export function DonateLink({ lang, T }: Props) {
  const l = resolveLangDonate(lang);
  const t = content[l];
  const isExternal = Boolean(DONATION_URL);
  const href = DONATION_URL ?? `mailto:${ACADEMY_CONTACT_EMAIL}?subject=${encodeURIComponent(t.mailSubject)}`;

  return (
    <Typography
      component="a"
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      sx={{
        fontFamily: MONO,
        fontSize: '0.72rem',
        color: T.textMute,
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        '&:hover': { color: T.accent },
      }}
    >
      {t.label}
    </Typography>
  );
}
