'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import RandomLetterSwap from '@/components/ui/random-letter-swap';
import ThemeToggle from '@/components/ui/theme-toggle';

const navItems = [
  { href: '#about', label: 'ABOUT' },
  { href: '#services', label: 'SERVICES' },
  { href: '#experience', label: 'EXPERIENCE' },
  { href: '#work', label: 'WORK' },
  { href: '#certificates', label: 'CERTIFICATES' },
  { href: '#contact', label: 'CONTACT' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('top');
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const sections = navItems.map(({ href }) => document.querySelector(href)).filter(Boolean);
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0, 0.15, 0.4] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <header className="site-header">
      <motion.nav initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.75 }} className="site-nav" aria-label="Main navigation">
        <a href="#top" className="nav-mark" aria-label="Akash Halder, home">AH<span>.</span></a>
        <div className="nav-links">
          {navItems.map(({ href, label }) => (
            <a key={href} href={href} aria-label={label} className={activeSection === href.slice(1) ? 'nav-link is-active' : 'nav-link'}>
              <RandomLetterSwap label={label} staggerDuration={0.025} transition={{ duration: 0.6, type: 'spring' }} />
              <span className="nav-link-indicator" />
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <a href="#contact" className="nav-contact" aria-label="Let's talk">
            <RandomLetterSwap label="LET'S TALK" staggerDuration={0.025} transition={{ duration: 0.6, type: 'spring' }} />
          </a>
          <button className="nav-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}>
            <span /><span />
          </button>
        </div>
      </motion.nav>
      <AnimatePresence>
        {menuOpen && (
          <motion.div className="mobile-nav-panel" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
            {navItems.map(({ href, label }, index) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)} aria-label={label}>
                <span className="mobile-nav-number">0{index + 1}</span>
                <RandomLetterSwap label={label} staggerDuration={0.025} transition={{ duration: 0.6, type: 'spring' }} />
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
