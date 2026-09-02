// File: apps/landing-page/src/_app/providers/ClerkWrapper.tsx
'use client';

import React from 'react';
import { ClerkProvider } from '@clerk/clerk-react';

interface ClerkWrapperProps {
  children: React.ReactNode;
}

export function ClerkWrapper({ children }: ClerkWrapperProps) {
  const publishableKey = import.meta.env.PUBLIC_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    return <>{children}</>;
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
      {children as any}
    </ClerkProvider>
  );
}
