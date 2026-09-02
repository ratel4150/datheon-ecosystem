type Theme = 'light' | 'dark';

export const getThemePreference = (): Theme | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('theme') as Theme | null;
};

export const setThemePreference = (theme: Theme): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('theme', theme);
};
