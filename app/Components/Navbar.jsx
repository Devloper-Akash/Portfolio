'use client';

import { assets } from '@/assets/assets'
import React, { useEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";

/* ─── Nav link with 3D tilt + neon underline ─── */
const NavLink = ({ href, label, isActive, onClick }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 250, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 250, damping: 20 });

  const handleMouse = (e) => {
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.li
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateX, rotateY, transformStyle: 'preserve-3d', perspective: 800 }}
      className="relative"
    >
      <a
        href={href}
        onClick={onClick}
        className={`relative font-medium text-[0.9rem] tracking-wide px-4 py-2 rounded-lg inline-block transition-colors duration-300
          ${isActive
            ? 'text-blue-600 dark:text-sky-400'
            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-sky-400'
          }`}
      >
        {label}

        {/* Neon underline glow */}
        <motion.span
          className="absolute -bottom-0.5 left-1/2 h-[2.5px] rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 shadow-[0_0_8px_rgba(56,189,248,0.8),0_0_20px_rgba(56,189,248,0.4)]"
          initial={false}
          animate={{
            width: isActive ? '60%' : '0%',
            x: '-50%',
            opacity: isActive ? 1 : 0,
          }}
          whileHover={{
            width: '60%',
            opacity: 1,
          }}
          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        />

        {/* Soft hover glow background */}
        <motion.span
          className="absolute inset-0 rounded-lg bg-blue-500/[0.06] dark:bg-sky-400/[0.08] -z-10"
          initial={{ opacity: 0, scale: 0.8 }}
          whileHover={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.25 }}
        />
      </a>
    </motion.li>
  );
};

/* ─── 3D Dark mode toggle ─── */
const DarkModeToggle = ({ isDarkMode, setIsDarkMode }) => (
  <motion.button
    onClick={() => setIsDarkMode(!isDarkMode)}
    className="relative w-10 h-10 flex items-center justify-center rounded-xl
               bg-white/60 dark:bg-white/[0.08] border border-gray-200/60 dark:border-white/10
               backdrop-blur-md shadow-sm hover:shadow-md dark:hover:shadow-sky-500/20 transition-shadow duration-300"
    whileHover={{ scale: 1.1, rotateZ: 10 }}
    whileTap={{ scale: 0.9 }}
    style={{ perspective: 600, transformStyle: 'preserve-3d' }}
  >
    <AnimatePresence mode="wait">
      <motion.div
        key={isDarkMode ? 'sun' : 'moon'}
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        exit={{ rotateY: 90, opacity: 0 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <Image
          src={isDarkMode ? assets.sun_icon : assets.moon_icon}
          alt="Toggle theme"
          className="w-5 h-5 pointer-events-none"
        />
      </motion.div>
    </AnimatePresence>
  </motion.button>
);

/* ─── Mobile menu link ─── */
const MobileNavLink = ({ href, label, index, onClick, isActive }) => (
  <motion.li
    initial={{ x: 80, opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: 80, opacity: 0 }}
    transition={{ duration: 0.35, delay: index * 0.07, ease: [0.25, 0.46, 0.45, 0.94] }}
  >
    <a
      href={href}
      onClick={onClick}
      className={`block text-lg font-medium py-3 px-4 rounded-xl transition-all duration-300
        ${isActive
          ? 'text-blue-600 dark:text-sky-400 bg-blue-50 dark:bg-sky-400/10 translate-x-2'
          : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-sky-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:translate-x-2'
        }`}
    >
      <span className="flex items-center gap-3">
        <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${isActive ? 'bg-blue-500 dark:bg-sky-400 shadow-[0_0_6px_rgba(56,189,248,0.8)]' : 'bg-gray-300 dark:bg-gray-600'}`}/>
        {label}
      </span>
    </a>
  </motion.li>
);

const Navbar = ({ isDarkMode, setIsDarkMode }) => {
  const [isScroll, setIsScroll] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('top');

  const navLinks = [
    { href: '#top', label: 'Home', section: 'top' },
    { href: '#about', label: 'About', section: 'about' },
    { href: '#services', label: 'Services', section: 'services' },
    { href: '#work', label: 'Work', section: 'work' },
    { href: '#contact', label: 'Contact', section: 'contact' },
  ];

  /* ─── Scroll handler: sticky bg + active section detection ─── */
  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);

      // Detect active section
      const sections = ['contact', 'work', 'services', 'about', 'top'];
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* Decorative header gradient (light mode only) */}
      <div className="fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden">
        <Image src={assets.header_bg_color} alt="" className="w-full" />
      </div>

      {/* ─── Main Navbar ─── */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`w-full fixed top-0 left-0 z-50 flex items-center justify-between
                    px-5 lg:px-8 xl:px-[8%] py-3 transition-all duration-500
                    ${isScroll
                      ? 'bg-white/70 dark:bg-[#0d0a1a]/80 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.4)] border-b border-gray-200/30 dark:border-white/[0.06]'
                      : 'bg-transparent'
                    }`}
      >
        {/* ─── Logo ─── */}
        <motion.a
          href="#top"
          className="cursor-pointer mr-8 select-none"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{ perspective: 600, transformStyle: 'preserve-3d' }}
        >
          <motion.span
            className="text-2xl sm:text-3xl font-sans font-extrabold tracking-tight
                       bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-600
                       dark:from-sky-400 dark:via-blue-400 dark:to-indigo-400
                       bg-clip-text text-transparent
                       drop-shadow-[0_2px_10px_rgba(37,99,235,0.3)]
                       dark:drop-shadow-[0_0_20px_rgba(56,189,248,0.5)]"
            whileHover={{ rotateY: 12, rotateX: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            style={{ transformStyle: 'preserve-3d', display: 'inline-block' }}
          >
            AKASH<span className="text-sky-500 dark:text-sky-300">.</span>
          </motion.span>
        </motion.a>

        {/* ─── Desktop nav pill ─── */}
        <motion.ul
          className={`hidden md:flex items-center gap-1 rounded-2xl px-3 py-1.5 transition-all duration-500
            ${isScroll
              ? 'bg-transparent'
              : 'bg-white/60 dark:bg-white/[0.04] backdrop-blur-xl border border-gray-200/40 dark:border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_4px_20px_rgba(0,0,0,0.3)]'
            }`}
          style={{ perspective: 1000 }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.section}
              href={link.href}
              label={link.label}
              isActive={activeSection === link.section}
            />
          ))}
        </motion.ul>

        {/* ─── Right actions ─── */}
        <div className="flex items-center gap-3">
          <DarkModeToggle isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

          {/* CTA Contact button */}
          <motion.a
            href="#contact"
            className="hidden lg:flex items-center gap-2.5 font-semibold text-sm
                       bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-sky-500 dark:to-indigo-500
                       text-white px-7 py-2.5 rounded-xl
                       shadow-[0_4px_15px_rgba(37,99,235,0.35)] dark:shadow-[0_4px_15px_rgba(56,189,248,0.3)]
                       hover:shadow-[0_8px_30px_rgba(37,99,235,0.50)] dark:hover:shadow-[0_8px_30px_rgba(56,189,248,0.45)]
                       transition-shadow duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            style={{ perspective: 600, transformStyle: 'preserve-3d' }}
          >
            Contact
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </motion.a>

          {/* Mobile hamburger */}
          <motion.button
            className="flex md:hidden items-center justify-center w-10 h-10 rounded-xl
                       bg-white/60 dark:bg-white/[0.08] border border-gray-200/60 dark:border-white/10
                       backdrop-blur-md"
            onClick={() => setMobileOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="flex flex-col gap-[5px] items-center">
              <motion.span className="block w-5 h-[2px] bg-gray-800 dark:bg-white rounded-full" />
              <motion.span className="block w-4 h-[2px] bg-gray-800 dark:bg-white rounded-full" />
              <motion.span className="block w-3 h-[2px] bg-gray-800 dark:bg-white rounded-full" />
            </div>
          </motion.button>
        </div>
      </motion.nav>

      {/* ─── Mobile Menu Overlay ─── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[998] bg-black/40 dark:bg-black/60 backdrop-blur-sm"
              onClick={closeMobile}
            />

            {/* Slide-in panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[999] w-72 sm:w-80
                         bg-white/90 dark:bg-[#0d0a1a]/95 backdrop-blur-2xl
                         border-l border-gray-200/30 dark:border-white/[0.06]
                         shadow-[-20px_0_60px_rgba(0,0,0,0.15)] dark:shadow-[-20px_0_60px_rgba(0,0,0,0.5)]
                         flex flex-col"
            >
              {/* Close button */}
              <div className="flex justify-between items-center p-5">
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Menu
                </span>
                <motion.button
                  onClick={closeMobile}
                  className="w-9 h-9 flex items-center justify-center rounded-lg
                             bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20
                             transition-colors"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>

              {/* Divider */}
              <div className="mx-5 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-white/10 to-transparent" />

              {/* Links */}
              <ul className="flex flex-col gap-1 p-5 flex-1">
                {navLinks.map((link, i) => (
                  <MobileNavLink
                    key={link.section}
                    href={link.href}
                    label={link.label}
                    index={i}
                    onClick={closeMobile}
                    isActive={activeSection === link.section}
                  />
                ))}
              </ul>

              {/* Bottom CTA */}
              <motion.div
                className="p-5 border-t border-gray-200/30 dark:border-white/[0.06]"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.4 }}
              >
                <a
                  href="#contact"
                  onClick={closeMobile}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold text-white
                             bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-sky-500 dark:to-indigo-500
                             shadow-[0_4px_15px_rgba(37,99,235,0.35)] dark:shadow-[0_4px_15px_rgba(56,189,248,0.3)]
                             hover:shadow-[0_8px_30px_rgba(37,99,235,0.50)] transition-shadow"
                >
                  Get in Touch
                  <span>→</span>
                </a>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
