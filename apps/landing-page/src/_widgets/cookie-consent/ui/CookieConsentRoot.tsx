'use client';

import { CookieBanner } from './CookieBanner';
import { AnalyticsLoader } from './AnalyticsLoader';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function CookieConsentRoot({ lang }: Props) {
  return (
    <>
      <AnalyticsLoader />
      <CookieBanner lang={lang} />
    </>
  );
}
