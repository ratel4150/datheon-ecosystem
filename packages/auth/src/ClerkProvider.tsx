// packages/auth/src/ClerkProvider.tsx
// Migrado verbatim desde apps/landing-page/src/_app/providers/ClerkProvider.tsx
'use client';

import React from 'react';
import { ClerkProvider as ClerkProviderBase } from '@clerk/clerk-react';
import { CLERK_PUBLISHABLE_KEY } from './ClerkConfig';

interface ClerkProviderProps {
  children: React.ReactNode;
}

export function ClerkProvider({ children }: ClerkProviderProps) {
  if (!CLERK_PUBLISHABLE_KEY) {
    console.warn('Missing Clerk Publishable Key. Please set PUBLIC_CLERK_PUBLISHABLE_KEY in your .env file');
    return <>{children}</>;
  }

  return (
    <ClerkProviderBase publishableKey={CLERK_PUBLISHABLE_KEY}>
      {children as any}
    </ClerkProviderBase>
  );
}
