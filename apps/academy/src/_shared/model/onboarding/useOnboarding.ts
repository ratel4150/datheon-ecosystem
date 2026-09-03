'use client';

import { useCallback } from 'react';
import { useUser } from '@clerk/clerk-react';

export function useOnboarding() {
  const { user, isLoaded } = useUser();

  const isComplete = Boolean(user?.unsafeMetadata?.onboardingComplete);
  const buildChoice = user?.unsafeMetadata?.buildChoice as string | undefined;

  const completeOnboarding = useCallback(
    async (choiceId: string) => {
      if (!user) return;
      await user.update({
        unsafeMetadata: { ...user.unsafeMetadata, onboardingComplete: true, buildChoice: choiceId },
      });
    },
    [user],
  );

  return { isLoaded, isComplete, buildChoice, firstName: user?.firstName ?? null, completeOnboarding };
}
