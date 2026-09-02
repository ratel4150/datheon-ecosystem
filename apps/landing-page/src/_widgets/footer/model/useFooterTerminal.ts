// _widgets/footer/model/useFooterTerminal.ts
'use client';

import { useCallback, useState } from 'react';

export function useFooterTerminal() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  return { expandedId, toggle };
}
