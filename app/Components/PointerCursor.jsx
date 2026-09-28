'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function PointerCursor() {
  const [label, setLabel] = useState('');
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 34, mass: 0.45 });
  const springY = useSpring(y, { stiffness: 420, damping: 34, mass: 0.45 });

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!finePointer.matches || reducedMotion.matches) return undefined;

    document.documentElement.classList.add('has-custom-cursor');
    const move = (event) => {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target instanceof Element ? event.target.closest('[data-cursor]') : null;
      setLabel(target?.getAttribute('data-cursor') || (event.target instanceof Element && event.target.closest('a, button') ? 'active' : ''));
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => {
      window.removeEventListener('pointermove', move);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, [x, y]);

  return (
    <motion.div className={`custom-cursor${label ? ' is-active' : ''}${label && label !== 'active' ? ' has-label' : ''}`} style={{ x: springX, y: springY }} aria-hidden="true">
      <span>{label && label !== 'active' ? label : ''}</span>
    </motion.div>
  );
}
