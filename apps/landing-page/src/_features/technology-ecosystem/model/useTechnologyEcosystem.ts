// _features/technology-ecosystem/model/useTechnologyEcosystem.ts
import { useState, useEffect } from 'react';
import { CATEGORIES } from '../lib/data';

export function useTechnologyEcosystem() {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCategories = CATEGORIES.map((cat) => {
    const dimmed = activeFilter !== 'all' && activeFilter !== cat.id;
    return { ...cat, dimmed };
  });

  const handleFilter = (id: string) => {
    setActiveFilter(id);
    // Tracking (si se requiere)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'ecosystem_filter', { filter: id });
    }
  };

  return {
    activeFilter,
    mounted,
    filteredCategories,
    handleFilter,
    categories: CATEGORIES,
  };
}
