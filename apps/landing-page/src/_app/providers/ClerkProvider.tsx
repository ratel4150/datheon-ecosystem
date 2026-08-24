// File: apps/landing-page/src/_app/providers/ClerkProvider.tsx
'use client';

import React from 'react';
import { ClerkProvider as ClerkProviderBase } from '@clerk/clerk-react';

interface ClerkProviderProps {
  children: React.ReactNode;
}

export function ClerkProvider({ children }: ClerkProviderProps) {
  const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    console.warn('Missing Clerk Publishable Key. Please set PUBLIC_CLERK_PUBLISHABLE_KEY in your .env file');
    return <>{children}</>;
  }

  return (
    <ClerkProviderBase publishableKey={publishableKey}>
      {children as any}
    </ClerkProviderBase>
  );
}
