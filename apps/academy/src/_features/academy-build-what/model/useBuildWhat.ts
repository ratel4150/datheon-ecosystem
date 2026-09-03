'use client';

import { useCallback, useState } from 'react';

export function useBuildWhat() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const select = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);
  return { selectedId, select };
}
