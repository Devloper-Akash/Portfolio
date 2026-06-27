'use client';
import React, { useEffect, useState, useSyncExternalStore } from 'react';
import About from "./Components/About";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Navbar from "./Components/Navbar";
import Services from "./Components/Services";
import Work from "./Components/Work";
import Certificates from "./Components/Certificates";
import GlobeSection from "./Components/GlobeSection";

function subscribeToThemePreference(callback) {
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  mediaQuery.addEventListener('change', callback);
  window.addEventListener('storage', callback);

  return () => {
    mediaQuery.removeEventListener('change', callback);
    window.removeEventListener('storage', callback);
  };
}

function getThemePreferenceSnapshot() {
  const savedTheme = window.localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    return true;
  }

  if (savedTheme === 'light') {
    return false;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export default function Home() {
  const preferredDarkMode = useSyncExternalStore(
    subscribeToThemePreference,
    getThemePreferenceSnapshot,
    () => false
  );
  const [themeOverride, setThemeOverride] = useState(null);
  const isDarkMode = themeOverride ?? preferredDarkMode;

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  return (
    <main id="top">
      <Navbar
        isDarkMode={isDarkMode}
        setIsDarkMode={setThemeOverride}
      />
      <Header />
      <About />
      <Services />
      <Work />
      <Certificates />
      <GlobeSection isDarkMode={isDarkMode} />
      <Contact />
      <Footer />
    </main>
  );
}
