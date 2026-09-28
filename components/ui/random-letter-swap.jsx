'use client';

import { useEffect, useRef, useState } from 'react';

const RANDOM_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function RandomLetterSwap({
  label,
  staggerDuration = 0.025,
  transition = { duration: 0.6 },
}) {
  const [displayLabel, setDisplayLabel] = useState(label);
  const timerRef = useRef(null);
  const duration = transition?.duration ?? 0.6;

  useEffect(() => () => window.clearInterval(timerRef.current), []);

  function swapLetters() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    window.clearInterval(timerRef.current);
    const characters = [...label];
    const startedAt = performance.now();
    const durationMs = Math.max(180, duration * 1000);
    const staggerMs = Math.max(0, staggerDuration * 1000);
    const totalDuration = durationMs + Math.max(0, characters.length - 1) * staggerMs;

    timerRef.current = window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const nextLabel = characters.map((character, index) => {
        if (character === ' ' || elapsed >= durationMs + index * staggerMs) return character;
        return RANDOM_CHARACTERS[Math.floor(Math.random() * RANDOM_CHARACTERS.length)];
      }).join('');

      setDisplayLabel(nextLabel);

      if (elapsed >= totalDuration) {
        window.clearInterval(timerRef.current);
        timerRef.current = null;
        setDisplayLabel(label);
      }
    }, 35);
  }

  return (
    <span className="random-letter-swap" aria-hidden="true" onMouseEnter={swapLetters}>
      {displayLabel}
    </span>
  );
}
