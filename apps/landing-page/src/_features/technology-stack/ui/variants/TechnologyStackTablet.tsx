'use client';

import { StackExplorer } from '../StackExplorer';
import type { Lang } from '@/_shared/types/i18n';

interface Props {
  lang: Lang;
}

export function TechnologyStackTablet({ lang }: Props) {
  return <StackExplorer lang={lang} compact enableHover />;
}
