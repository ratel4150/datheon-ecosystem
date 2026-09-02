// File: apps/landing-page/src/_features/ecosystem/lib/resolveLang.ts
// _features/ecosystem/lib/resolveLang.ts
export function resolveLang<T extends Record<string, unknown>>(lang: string, dict: T): keyof T {
  return (lang in dict ? lang : 'es') as keyof T;
}
