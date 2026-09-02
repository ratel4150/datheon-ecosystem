// File: apps/landing-page/src/_widgets/header/ui/IconMapper.tsx
'use client';

import { FiCpu, FiZap, FiLayers, FiSmartphone, FiCloud, FiDatabase, FiWifi, FiBox, FiDollarSign, FiHeart, FiBook } from 'react-icons/fi';

export const IconMapper = ({ name, size = 20 }: { name: string; size?: number }) => {
  const icons: Record<string, React.ReactNode> = {
    FiCpu: <FiCpu size={size} />,
    FiZap: <FiZap size={size} />,
    FiLayers: <FiLayers size={size} />,
    FiSmartphone: <FiSmartphone size={size} />,
    FiCloud: <FiCloud size={size} />,
    FiDatabase: <FiDatabase size={size} />,
    FiWifi: <FiWifi size={size} />,
    FiBox: <FiBox size={size} />,
    FiDollarSign: <FiDollarSign size={size} />,
    FiHeart: <FiHeart size={size} />,
    FiBook: <FiBook size={size} />,
  };
  return icons[name] || <FiLayers size={size} />;
};
