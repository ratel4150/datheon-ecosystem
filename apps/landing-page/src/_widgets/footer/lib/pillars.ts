// _widgets/footer/lib/pillars.ts
import type { Lang } from '@/_shared/types/i18n';

export interface FooterPillar {
  id: string;
  label: string;
  sub: string;
  href: string;
}

export const PILLARS: Record<Lang, FooterPillar[]> = {
  es: [
    { id: 'build', label: 'CONSTRUIR', sub: 'Datheón', href: '/' },
    { id: 'learn', label: 'APRENDER', sub: 'Datheón Academy', href: '/universidad' },
    { id: 'explore', label: 'EXPLORAR', sub: 'Labs', href: '/labs' },
  ],
  en: [
    { id: 'build', label: 'BUILD', sub: 'Datheón', href: '/' },
    { id: 'learn', label: 'LEARN', sub: 'Datheón Academy', href: '/universidad' },
    { id: 'explore', label: 'EXPLORE', sub: 'Labs', href: '/labs' },
  ],
  fr: [
    { id: 'build', label: 'CONSTRUIRE', sub: 'Datheón', href: '/' },
    { id: 'learn', label: 'APPRENDRE', sub: 'Datheón Academy', href: '/universidad' },
    { id: 'explore', label: 'EXPLORER', sub: 'Labs', href: '/labs' },
  ],
};

export const TECH_CHIPS: string[] = ['AI', 'CLOUD', 'SOFTWARE', 'DATA', 'IoT', 'GPU'];
