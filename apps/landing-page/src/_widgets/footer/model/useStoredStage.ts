// File: apps/landing-page/src/_widgets/footer/model/useStoredStage.ts
// File: apps/landing-page/src/_widgets/footer/model/useStoredStage.ts
'use client';

import { useEffect, useState } from 'react';
import { getStoredStage, type StoredStage } from '@/_shared/lib/userJourney';

export function useStoredStage(): StoredStage | null {
  const [stage, setStage] = useState<StoredStage | null>(null);

  useEffect(() => {
    setStage(getStoredStage());
  }, []);

  return stage;
}