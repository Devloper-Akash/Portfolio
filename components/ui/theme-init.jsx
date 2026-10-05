'use client';

import { useEffect } from 'react';

export default function ThemeInitializer() {
  useEffect(() => {
    let savedTheme = 'light';

    try {
      savedTheme = window.localStorage.getItem('portfolio-theme') === 'dark' ? 'dark' : 'light';
    } catch {
      // Keep the default light theme when browser storage is unavailable.
    }

    const root = document.documentElement;
    root.dataset.theme = savedTheme;
    root.classList.toggle('dark', savedTheme === 'dark');
    window.dispatchEvent(new CustomEvent('portfolio-theme-change', { detail: { theme: savedTheme } }));
  }, []);

  return null;
}
