'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { assets, infoList } from '@/assets/assets';
import TiltCard3D from './TiltCard3D';

export default function About() {
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
                    src={assets.user_image}
                    alt="Akash"
                    fill
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
                  I am a passionate and dedicated software developer with a strong background in web development. I have experience working with various programming languages and frameworks, and I am always eager to learn new technologies. I am committed to delivering high-quality code and creating innovative solutions to complex problems. My goal is to continuously improve my skills and contribute to the success of the projects I work on.
                </p>
                <div
                  style={{ transform: 'translateZ(20px)' }}
                  className="mt-4 flex items-center gap-2 text-xs font-mono text-slate-600 dark:text-slate-400"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Open for Fullstack & Backend Engineering roles</span>
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
                  <Image src={item.icon} alt={item.title} className="w-5 h-5 dark:hidden" />
                  <Image src={item.iconDark} alt={item.title} className="w-5 h-5 hidden dark:block" />
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

            {/* Tool Icons with 3D Tilt */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {[
                { name: 'VS Code', icon: assets.vscode, desc: 'Primary IDE' },
                { name: 'MongoDB', icon: assets.mongodb, desc: 'NoSQL Document Store' },
                { name: 'Firebase', icon: assets.firebase, desc: 'Auth & Cloud Storage' },
                { name: 'Git', icon: assets.git, desc: 'Version Control' },
                { name: 'Figma', icon: assets.figma, desc: 'UI/UX & Prototyping' },
              ].map((tool, index) => (
                <TiltCard3D
                  key={index}
                  tiltAngle={10}
                  glare={false}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 hover:border-slate-300 dark:hover:border-white/15 shadow-sm hover:shadow-md transition-colors group cursor-pointer"
                  style={{
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <div
                    style={{ transform: 'translateZ(24px)' }}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-white/5 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-sm"
                  >
                    <Image src={tool.icon} alt={tool.name} className="w-6 h-6 object-contain" />
                  </div>
                  <div style={{ transform: 'translateZ(18px)' }}>
                    <div className="font-mono text-xs font-bold text-slate-800 dark:text-slate-200">
                      {tool.name}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-500 font-sans">{tool.desc}</div>
                  </div>
                </TiltCard3D>
              ))}
            </div>

            {/* Additional Backend badges */}
            <div className="mt-6 pt-6 border-t border-slate-100 dark:border-white/5 flex flex-wrap gap-2">
              {[
                'Node.js',
                'Express.js',
                'Next.js 16',
                'React 19',
                'RESTful APIs',
                'JavaScript (ES6+)',
                'Tailwind CSS',
                'Mongoose',
                'JWT Authentication',
                'CORS & Security',
                'JSON-RPC / WebSockets',
              ].map((tech, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
