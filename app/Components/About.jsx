'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { assets, infoList } from '@/assets/assets';
import { DEFAULT_TECH_STACK } from '@/lib/default-tech-stack';
import TiltCard3D from './TiltCard3D';

function ToolIcon({ type, name, size = 'tile' }) {
  const common = {
    viewBox: '0 0 40 40',
    role: 'img',
    'aria-label': `${name} icon`,
    className: size === 'badge' ? 'h-3.5 w-3.5 shrink-0' : 'h-7 w-7 sm:h-8 sm:w-8 shrink-0',
  };

  switch (type) {
    case 'python':
      return (
        <svg {...common}>
          <path fill="#3776AB" d="M19.8 4c-8 0-7.5 3.5-7.5 3.5v5h7.7v1.5H9.2S4 13.4 4 21.2s4.5 7.5 4.5 7.5h2.7v-4.2s-.2-5 4.9-5h8.3s4.7.1 4.7-4.6V8.2S29.8 4 19.8 4Zm-4.3 3.1a1.4 1.4 0 1 1 0 2.8 1.4 1.4 0 0 1 0-2.8Z" />
          <path fill="#FFD43B" d="M20.2 36c8 0 7.5-3.5 7.5-3.5v-5H20v-1.5h10.8s5.2.6 5.2-7.2-4.5-7.5-4.5-7.5h-2.7v4.2s.2 5-4.9 5h-8.3s-4.7-.1-4.7 4.6v6.7S10.2 36 20.2 36Zm4.3-3.1a1.4 1.4 0 1 1 0-2.8 1.4 1.4 0 0 1 0 2.8Z" />
        </svg>
      );
    case 'docker':
      return (
        <svg {...common} viewBox="0 0 48 40">
          <g fill="#2496ED">
            <rect x="7" y="14" width="6" height="5" rx=".7" /><rect x="14" y="14" width="6" height="5" rx=".7" />
            <rect x="21" y="14" width="6" height="5" rx=".7" /><rect x="14" y="7" width="6" height="5" rx=".7" />
            <rect x="21" y="7" width="6" height="5" rx=".7" /><rect x="21" y="0" width="6" height="5" rx=".7" />
            <rect x="28" y="14" width="6" height="5" rx=".7" />
            <path d="M45 15.5c-2 .1-3.3-.5-4.2-1.5-.7 2.1-2.1 3.3-4.5 3.7-1.7.3-3.4.1-5-.5H3.8c-.7 0-1.1.5-1 1.2C4 28 10.1 34 21.1 34c9 0 15.6-4.8 18.4-13.4 4.7.3 7.1-2.4 7.5-4.2.1-.6-.5-1-2-1Z" />
          </g>
        </svg>
      );
    case 'express':
      return (
        <svg {...common} viewBox={size === 'badge' ? '0 0 24 24' : '0 0 40 40'}>
          <text x={size === 'badge' ? '1' : '2'} y={size === 'badge' ? '16' : '25'} fill="currentColor" fontFamily="Arial, sans-serif" fontSize={size === 'badge' ? '14' : '15'} fontWeight="700" letterSpacing="-1.2">ex</text>
          <path d={size === 'badge' ? 'M1 19h21' : 'M3 30h31'} stroke="currentColor" strokeWidth="1.4" opacity=".55" />
        </svg>
      );
    case 'supabase':
      return (
        <svg {...common}>
          <path fill="#3ECF8E" d="M21.8 4.6a1.5 1.5 0 0 1 2.7.9v9.2h10.2a1.5 1.5 0 0 1 1.2 2.4L19.2 35.1a1.5 1.5 0 0 1-2.7-.9V25H6.3a1.5 1.5 0 0 1-1.2-2.4L21.8 4.6Z" />
        </svg>
      );
    case 'shadcn':
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <path d="m8 28 20-20M14 34 34 14" />
        </svg>
      );
    case 'node':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path fill="#539E43" d="m12 1.5 9.1 5.25v10.5L12 22.5 2.9 17.25V6.75L12 1.5Z" />
          <text x="12" y="15.2" textAnchor="middle" fill="white" fontSize="7" fontWeight="700" fontFamily="Arial,sans-serif">JS</text>
        </svg>
      );
    case 'next':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#111827" />
          <path d="M8 17V7l8 10V7" fill="none" stroke="white" strokeWidth="1.8" />
        </svg>
      );
    case 'react':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.25">
          <ellipse cx="12" cy="12" rx="10" ry="4" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" /><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" /><circle cx="12" cy="12" r="1.6" fill="#61DAFB" stroke="none" />
        </svg>
      );
    case 'rest':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 5 3.5 12 8 19M16 5l4.5 7-4.5 7M13.5 4l-3 16" />
        </svg>
      );
    case 'javascript':
      return (
        <svg {...common} viewBox="0 0 24 24">
          <rect x="2" y="2" width="20" height="20" rx="2" fill="#F7DF1E" />
          <text x="19" y="18" textAnchor="end" fill="#222" fontSize="9" fontWeight="700" fontFamily="Arial,sans-serif">JS</text>
        </svg>
      );
    case 'tailwind':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="#38BDF8">
          <path d="M12 5c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1 .2 1.7 1 2.5 1.8 1.3 1.3 2.8 2.8 6 2.8 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-1-.2-1.7-1-2.5-1.8C16.7 6.5 15.2 5 12 5ZM6 12c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8 1 .2 1.7 1 2.5 1.8 1.3 1.3 2.8 2.8 6 2.8 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-1-.2-1.7-1-2.5-1.8C10.7 13.5 9.2 12 6 12Z" transform="translate(1 0) scale(.92)" />
        </svg>
      );
    case 'mongoose':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="#B8323A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 21s-7-4.2-7-10a7 7 0 0 1 14 0c0 5.8-7 10-7 10Z" /><path d="M12 7v11" />
        </svg>
      );
    case 'jwt':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="#D69E2E" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="8" cy="15" r="4" /><path d="m11 12 8-8m-3 3 2 2m-5 1 2 2" />
        </svg>
      );
    case 'security':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="#16A085" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" />
        </svg>
      );
    case 'websocket':
      return (
        <svg {...common} viewBox="0 0 24 24" fill="none" stroke="#6366F1" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="5" cy="12" r="2.2" fill="#6366F1" /><circle cx="19" cy="6" r="2.2" fill="#6366F1" /><circle cx="19" cy="18" r="2.2" fill="#6366F1" /><path d="m7 11 9.8-4M7 13l9.8 4" />
        </svg>
      );
    default:
      return <Image src={assets[type] || type} alt={`${name} icon`} width={32} height={32} className={`${common.className} object-contain`} />;
  }
}

export default function About({ profile, skills, techStack }) {
  const compactSkills = Array.isArray(skills) ? skills : [
    { name: 'VS Code', icon: 'vscode' }, { name: 'MongoDB', icon: 'mongodb' }, { name: 'Firebase', icon: 'firebase' },
    { name: 'Git', icon: 'git' }, { name: 'Figma', icon: 'figma' }, { name: 'Python', icon: 'python' },
    { name: 'Docker', icon: 'docker' }, { name: 'Express.js', icon: 'express' }, { name: 'Supabase', icon: 'supabase' }, { name: 'shadcn/ui', icon: 'shadcn' },
  ];
  const backendTech = (Array.isArray(techStack?.items) ? techStack.items : DEFAULT_TECH_STACK)
    .filter((tech) => typeof tech?.name === 'string' && tech.name.trim());
  return (
    <section id="about" className="w-full px-[8%] sm:px-[12%] py-20 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/25 mb-3 font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
            SYSTEM ARCHITECTURE & IDENTITY
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            About & Core Competencies
          </motion.h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans">
            Bridging robust backend engineering with responsive, interactive frontend architectures.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Bento Card 1: Visual Identity & Bio (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <TiltCard3D
              tiltAngle={4}
              glare={false}
              className="about-bio-card h-full rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0d1117]/85 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-xl shadow-slate-200/50 dark:shadow-black/50 transition-colors"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.12)',
              }}
            >
              <div className="about-bio-layout">
                <div
                  style={{ transform: 'translateZ(26px)' }}
                  className="about-profile relative aspect-square overflow-hidden border border-slate-200 dark:border-white/10 group"
                >
                  <Image
                    src={profile?.photoUrl || assets.user_image}
                    alt="Akash"
                    fill
                    sizes="(max-width: 768px) 80vw, 320px"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="about-bio-copy [transform-style:preserve-3d]">
                <div
                  style={{ transform: 'translateZ(22px)' }}
                  className="inline-block text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 mb-3"
                >
                  BIOGRAPHY
                </div>
                <p
                  style={{ transform: 'translateZ(18px)' }}
                  className="text-slate-700 dark:text-slate-300 text-sm leading-relaxed font-sans"
                >
                  {profile?.biography || 'I am a passionate and dedicated software developer with a strong background in web development. I have experience working with various programming languages and frameworks, and I am always eager to learn new technologies. I am committed to delivering high-quality code and creating innovative solutions to complex problems. My goal is to continuously improve my skills and contribute to the success of the projects I work on.'}
                </p>
                <div
                  style={{ transform: 'translateZ(20px)' }}
                  className="mt-4 flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>{profile?.availability || 'Open for Fullstack & Backend Engineering roles'}</span>
                </div>
                <div
                  style={{ transform: 'translateZ(24px)' }}
                  className="mt-5 flex flex-wrap items-center gap-3 text-xs font-mono"
                >
                  <a
                    href="/akash-halder-resume.pdf"
                    download="Akash-Halder-Resume.pdf"
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <span>Download Resume PDF</span>
                    <span>&darr;</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/akash-halder-779701379/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 rounded-xl bg-[#0a66c2]/10 hover:bg-[#0a66c2]/20 text-[#0a66c2] dark:text-[#38bdf8] border border-[#0a66c2]/30 font-bold transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                    </svg>
                    <span>LinkedIn Profile</span>
                  </a>
                </div>
                </div>
              </div>
            </TiltCard3D>
          </motion.div>

          {/* Bento Card 2: Core Metrics (5 cols) */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {infoList.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-5 rounded-2xl bg-white dark:bg-[#0d1117]/85 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-sm hover:shadow-md shadow-slate-200/40 transition-all group flex items-start gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Image src={item.icon} alt={item.title} width={20} height={20} className="w-5 h-5 dark:hidden" />
                  <Image src={item.iconDark} alt={item.title} width={20} height={20} className="w-5 h-5 hidden dark:block" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-slate-900 dark:text-slate-100 text-sm">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-xs mt-1 font-sans leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bento Card 3: Categorized Tech Stack Grid (12 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-12 rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#0d1117]/85 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/50 dark:shadow-black/40"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white">
                  Developer Ecosystem & Toolchain
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                  Primary weapons of choice for production-grade web systems
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-700 dark:text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Active Stack</span>
              </div>
            </div>

            {/* Compact tool badges matching the technology row below */}
            <div className="flex flex-wrap gap-2">
              {compactSkills.map((tool, idx) => (
                <motion.span
                  key={tool.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.36, delay: idx * 0.045, ease: [0.2, 0.7, 0.2, 1] }}
                  whileHover={{ y: -3, scale: 1.025, transition: { duration: 0.18 } }}
                  className="tech-stack-chip inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-medium bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 transition-colors"
                >
                  <span className="tech-stack-icon"><ToolIcon type={tool.icon} name={tool.name} size="badge" /></span>
                  <span>{tool.name}</span>
                </motion.span>
              ))}
            </div>

            {/* Additional Backend badges */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5 flex flex-wrap gap-2">
              {backendTech.map((tech, idx) => (
                <motion.span
                  key={tech.name}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 0.36, delay: idx * 0.04, ease: [0.2, 0.7, 0.2, 1] }}
                  whileHover={{ y: -3, scale: 1.025, transition: { duration: 0.18 } }}
                  className="tech-stack-chip inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] sm:text-[11px] font-mono font-medium bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 transition-colors"
                >
                  <span className="tech-stack-icon"><ToolIcon type={tech.icon || 'node'} name={tech.name} size="badge" /></span>
                  <span>{tech.name}</span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
