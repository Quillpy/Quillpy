import { useState } from 'react';

export function useTheme() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('quillpy_theme');
      if (stored === 'light' || stored === 'dark') return stored;
    }
    return 'dark';
  });

  const setThemeWithStorage = (newTheme: 'dark' | 'light') => {
    localStorage.setItem('quillpy_theme', newTheme);
    setTheme(newTheme);
  };

  return { theme, setTheme: setThemeWithStorage };
}