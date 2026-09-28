'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';

export default function ThemeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme || 'light');
  }, []);

  function toggleTheme() {
    const root = document.documentElement;
    const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';

    const applyTheme = () => {
      root.dataset.theme = nextTheme;
      root.classList.toggle('dark', nextTheme === 'dark');
      root.classList.add('theme-transitioning');
      window.setTimeout(() => root.classList.remove('theme-transitioning'), 600);
      try {
        window.localStorage.setItem('portfolio-theme', nextTheme);
      } catch {}
      window.dispatchEvent(new CustomEvent('portfolio-theme-change', { detail: { theme: nextTheme } }));
      setTheme(nextTheme);
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && document.startViewTransition) {
      document.startViewTransition(applyTheme);
    } else {
      applyTheme();
    }
  }

  const targetTheme = theme === 'dark' ? 'light' : 'dark';

  return (
    <motion.button
      type="button"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${targetTheme} mode`}
      title={`Switch to ${targetTheme} mode`}
      whileTap={{ scale: 0.94 }}
    >
      <span className="theme-toggle-icon" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={theme} initial={{ opacity: 0, rotate: -70, scale: 0.65 }} animate={{ opacity: 1, rotate: 0, scale: 1 }} exit={{ opacity: 0, rotate: 70, scale: 0.65 }} transition={{ duration: 0.22 }}>
            {theme === 'dark' ? '☼' : '☾'}
          </motion.span>
        </AnimatePresence>
      </span>
      <span>{theme === 'dark' ? 'LIGHT' : 'DARK'}</span>
    </motion.button>
  );
}
