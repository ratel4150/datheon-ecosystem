// _features/solutions/lib/resolveLang.ts
export function resolveLang<T extends Record<string, unknown>>(lang: string, dict: T): keyof T {
  return (lang in dict ? lang : 'es') as keyof T;
}
