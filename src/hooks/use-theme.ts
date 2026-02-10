import { useState, useEffect } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('system');

  useEffect(() => {
    const root = window.document.documentElement;
    const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    root.classList.remove('light', 'dark');
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.add('light');
    }
  }, [theme]);

  return { theme, setTheme };
}
