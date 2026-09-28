'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { assets } from '@/assets/assets';

const telemetry = [
  ['RUNTIME', 'Node.js 22'],
  ['FRAMEWORK', 'Next.js 16'],
  ['DATABASE', 'MongoDB'],
  ['UPTIME', '99.99%'],
];

const reveal = {
  initial: { opacity: 0, y: 24, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
};

export default function Header() {
  return (
    <section id="top" className="hero-section" aria-labelledby="hero-title">
      <div className="hero-index" aria-hidden="true">PORTFOLIO / 2026</div>
      <div className="hero-content">
        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.12 }} className="hero-identity">
          <span className="status-dot" />
          <span>AVAILABLE FOR WORK</span>
          <span className="hero-location">KOLKATA · UTC+05:30</span>
        </motion.div>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.22 }} className="hero-profile">
          <Image src={assets.profile_img} alt="Akash Halder" fill priority sizes="(max-width: 420px) 86px, (max-width: 760px) 96px, (max-width: 1100px) 210px, 252px" className="object-cover" />
        </motion.div>

        <motion.p {...reveal} transition={{ ...reveal.transition, delay: 0.32 }} className="hero-greeting">
          HELLO, I AM AKASH HALDER
        </motion.p>

        <motion.h1 {...reveal} transition={{ ...reveal.transition, delay: 0.42 }} id="hero-title" className="hero-title">
          FULL STACK
          <span>DEVELOPER<span className="hero-period">.</span></span>
        </motion.h1>

        <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.55 }} className="hero-lower">
          <p className="hero-description">
            I am a Fullstack Developer from Kolkata, India &amp; also a dedicated fresher passionate about architecting resilient backend systems, robust APIs, scalable databases, and modern interactive web experiences.
          </p>
          <div className="hero-actions">
            <a href="#work" className="text-link">EXPLORE WORK</a>
            <a href="/akash-halder-resume.pdf" download="Akash-Halder-Resume.pdf" className="text-link text-link-muted">RESUME <span aria-hidden="true">↓</span></a>
          </div>
        </motion.div>
      </div>

      <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.68 }} className="hero-telemetry" aria-label="Technical metadata">
        {telemetry.map(([label, value]) => (
          <div className="telemetry-item" key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </motion.div>
      <a href="#about" className="hero-scroll"><span /> SCROLL TO EXPLORE</a>
    </section>
  );
}
