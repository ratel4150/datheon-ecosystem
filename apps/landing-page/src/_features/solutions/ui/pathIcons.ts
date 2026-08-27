// _features/solutions/ui/pathIcons.ts
'use client';

import type { IconType } from 'react-icons';
import { FiBox, FiZap, FiCpu, FiLink, FiTrendingUp, FiCompass } from 'react-icons/fi';
import type { PathId } from '../lib';

export const PATH_ICON: Record<PathId, IconType> = {
  construir: FiBox,
  automatizar: FiZap,
  inteligencia: FiCpu,
  conectar: FiLink,
  escalar: FiTrendingUp,
  transformar: FiCompass,
};
