// File: apps/academy/src/_app/AcademyApp.tsx
'use client';

/** @jsxRuntime classic */
import React from 'react';

import { ClerkProvider } from '@datheon/auth';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { AcademyHero } from '@/_features/academy-hero';
import { AcademyBuildWhat } from '@/_features/academy-build-what';
import { AcademyDashboard } from '@/_features/academy-dashboard';
import { useOnboarding } from '@/_shared/model/onboarding';
import type { Lang } from '@datheon/i18n';

interface Props {
  lang: Lang;
}

function AuthenticatedArea({ lang }: Props) {
  const { isLoaded, isComplete, completeOnboarding } = useOnboarding();
  if (!isLoaded) return null;
  if (!isComplete) {
    return <AcademyBuildWhat lang={lang} onContinue={completeOnboarding} />;
  }
  return <AcademyDashboard lang={lang} />;
}

export function AcademyApp({ lang }: Props) {
  return (
    <ClerkProvider>
      <SignedOut>
        <AcademyHero lang={lang} />
      </SignedOut>
      <SignedIn>
        <AuthenticatedArea lang={lang} />
      </SignedIn>
    </ClerkProvider>
  );
}