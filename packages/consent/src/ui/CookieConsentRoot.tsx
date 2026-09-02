'use client';

import { CookieBanner, type CookieBannerContent, type CookieConsentTokens } from './CookieBanner';
import { AnalyticsLoader } from './AnalyticsLoader';

interface Props {
  t: CookieBannerContent;
  T: CookieConsentTokens;
}

export function CookieConsentRoot({ t, T }: Props) {
  return (
    <>
      <AnalyticsLoader />
      <CookieBanner t={t} T={T} />
    </>
  );
}
