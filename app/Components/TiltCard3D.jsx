'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'motion/react';

/**
 * TiltCard3D
 * High-performance 3D perspective tilt card adhering to taste-skill guidelines.
 * All React hooks are called unconditionally at the top level for zero-violation compliance.
 * Runs motion values outside React render cycles for smooth 60fps interaction.
 */
export default function TiltCard3D({
  children,
  className = '',
  tiltAngle = 8,
  glare = true,
  glareColor = 'rgba(16, 185, 129, 0.15)', // Default subtle emerald specular highlight
  style = {},
  onClick,
}) {
  const cardRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Mouse coordinate motion values (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for rotation
  const mouseXSpring = useSpring(x, { stiffness: 280, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 280, damping: 22 });

  // 3D rotation transforms
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [tiltAngle, -tiltAngle]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-tiltAngle, tiltAngle]);

  // Glare position percentage (0% to 100%)
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  // Unconditional glare background transform (Rules of Hooks compliant)
  const glareBg = useTransform(
    [glareX, glareY],
    ([gx, gy]) =>
      `radial-gradient(circle at ${gx}% ${gy}%, ${glareColor} 0%, rgba(255,255,255,0.06) 25%, transparent 65%)`
  );

  const handleMouseMove = (e) => {
    if (prefersReducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = e.clientX - rect.left;
    const mouseYPos = e.clientY - rect.top;

    x.set(mouseXPos / width - 0.5);
    y.set(mouseYPos / height - 0.5);
  };

  const handleMouseEnter = () => {
    if (prefersReducedMotion) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (prefersReducedMotion) return;
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  if (prefersReducedMotion) {
    return (
      <div className={`relative ${className}`} style={style} onClick={onClick}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1200,
        ...style,
      }}
      className={`relative will-change-transform ${className}`}
    >
      {/* Dynamic Specular Glare / Sheen Overlay */}
      {glare && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-20 overflow-hidden transition-opacity duration-300"
          style={{
            background: glareBg,
            opacity: isHovered ? 1 : 0,
          }}
        />
      )}

      {/* Card Content with 3D child preservation */}
      <div className="w-full h-full [transform-style:preserve-3d]">
        {children}
      </div>
    </motion.div>
  );
}
