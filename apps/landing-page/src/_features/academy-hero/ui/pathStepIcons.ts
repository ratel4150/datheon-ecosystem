// _features/academy-hero/ui/pathStepIcons.ts
'use client';

import type { IconType } from 'react-icons';
import { FiZap, FiBookOpen, FiCode, FiAward } from 'react-icons/fi';

export const STEP_ICON: Record<string, IconType> = {
  idea: FiZap,
  learn: FiBookOpen,
  build: FiCode,
  ship: FiAward,
};
