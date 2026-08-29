// _features/technology-stack/ui/animation/stackTransitions.ts
'use client';

export const fadeTransition = { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const };
export const springTransition = { type: 'spring' as const, stiffness: 260, damping: 22 };
export const drawTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const };
