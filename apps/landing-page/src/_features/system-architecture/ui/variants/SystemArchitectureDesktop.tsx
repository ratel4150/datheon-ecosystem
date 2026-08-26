'use client';

import { SystemArchitectureBase } from '../SystemArchitectureBase';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function SystemArchitectureDesktop({ lang }: Props) {
  return <SystemArchitectureBase lang={lang} variant="desktop" />;
}
