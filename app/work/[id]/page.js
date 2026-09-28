'use client';

import React, { useState } from 'react';
import { use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { workData } from '@/assets/assets';
import ThemeToggle from '@/components/ui/theme-toggle';

export default function WorkDetails({ params }) {
  const resolvedParams = use(params);
  const id = parseInt(resolvedParams.id, 10);
  const project = workData[id];
  const [isZoomed, setIsZoomed] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(0);

  if (!project) {
    notFound();
  }

  const isVercelLive = project.title === 'ProResume' || project.title === 'ScriptBridge AI' || project.liveUrl?.includes('vercel.app');
  const galleryImages = [
    { label: isVercelLive ? 'Live Vercel Landing Page' : 'Project Overview', src: project.bgImage },
    ...(project.liveScreenshot && project.liveScreenshot !== project.bgImage ? [{ label: 'Live Vercel Landing', src: project.liveScreenshot }] : []),
  ];

  const currentImage = galleryImages[selectedPhoto]?.src || project.bgImage;

  return (
    <main id="top" className="project-detail-page min-h-screen relative overflow-hidden bg-slate-50 dark:bg-[#07090e] text-slate-900 dark:text-slate-100 pt-24 pb-24 px-4 sm:px-8 bg-cyber-grid transition-colors duration-300">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-indigo-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="project-detail-container max-w-5xl mx-auto">
        {/* Top Navigation & Breadcrumb */}
        <div className="project-detail-nav flex items-center justify-between mb-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/#work"
              className="project-back-link inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 dark:border-white/10 font-mono text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-700 dark:hover:text-emerald-400 bg-white dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 shadow-sm transition-all"
            >
              <span>&larr;</span>
              <span>Return to Portfolio</span>
            </Link>
          </motion.div>

          <div className="project-detail-tools">
            <ThemeToggle />
            <div className="project-counter flex items-center gap-2 font-mono text-xs text-slate-500">
              <span>PROJECT {id + 1} OF {workData.length}</span>
            </div>
          </div>
        </div>

        {/* Project Header Title & Classification */}
        <div className="project-detail-heading max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="project-detail-classification inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-800 dark:text-cyan-400 border border-cyan-500/25 mb-4 font-bold"
          >
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></span>
            {project.description.toUpperCase()}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="project-detail-title text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]"
          >
            {project.title}
          </motion.h1>

          {project.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mt-2 text-sm sm:text-base font-mono font-semibold text-emerald-700 dark:text-emerald-400"
            >
              {project.subtitle}
            </motion.p>
          )}

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 font-sans leading-relaxed"
          >
            {project.longDescription}
          </motion.p>
        </div>

        {/* Project Metadata Quick Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="project-detail-meta grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-white dark:bg-[#0d1117]/90 border border-slate-200/80 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-black/40 mb-8"
        >
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold block">Role</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white mt-0.5 block">
              {project.role || 'Full Stack Engineer'}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold block">Timeline</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-slate-900 dark:text-white mt-0.5 block">
              {project.timeline || '3 Months'}
            </span>
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold block">Live Deployment</span>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs sm:text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 flex items-center gap-1.5 hover:underline"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="truncate">{project.liveUrl.replace('https://', '')}</span>
              </a>
            ) : (
              <span className="text-xs sm:text-sm font-mono font-bold text-emerald-700 dark:text-emerald-400 mt-0.5 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                Production Ready
              </span>
            )}
          </div>
          <div>
            <span className="text-[10px] font-mono text-slate-500 uppercase font-semibold block">Core Stack</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-cyan-700 dark:text-cyan-400 mt-0.5 block truncate">
              {project.techStack?.[0] || 'React'} + {project.techStack?.[1] || 'Node.js'}
            </span>
          </div>
        </motion.div>

        {/* Gallery View Tabs (if multiple images available) */}
        {galleryImages.length > 1 && (
          <div className="project-gallery-tabs flex items-center gap-2 mb-3 font-mono text-xs">
            <span className="text-slate-500 font-semibold mr-1">Preview View:</span>
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedPhoto(idx)}
                aria-pressed={selectedPhoto === idx}
                className={`px-3 py-1 rounded-xl transition-all font-bold ${
                  selectedPhoto === idx
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                    : 'bg-white dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 hover:bg-slate-100'
                }`}
              >
                {img.label}
              </button>
            ))}
          </div>
        )}

        {/* High-Resolution Project Showcase Photo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="project-detail-showcase rounded-3xl overflow-hidden border border-slate-300 dark:border-white/15 bg-slate-900 shadow-2xl relative mb-8 group cursor-pointer"
          onClick={() => setIsZoomed(true)}
        >
          <div className="relative aspect-[16/9] w-full bg-slate-950">
            <Image
              src={currentImage}
              alt={project.title}
              fill
              className="object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
              priority
            />
            {/* View Identifier Badge */}
            <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-emerald-400 font-mono text-xs flex items-center gap-2 border border-emerald-500/30 shadow-lg z-10">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{isVercelLive ? 'Live Vercel Landing Page' : 'Project Showcase'}</span>
            </div>
            {/* Click to zoom badge */}
            <div className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-black/75 backdrop-blur-md text-white font-mono text-xs flex items-center gap-2 border border-white/20 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
              <span>🔍 Click to inspect full image</span>
            </div>
          </div>
        </motion.div>

        {/* Primary Action Buttons Bar with Live URL & GitHub */}
        <div className="project-detail-actions flex flex-wrap gap-4 mb-16">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            className="project-action-primary flex-1 min-w-[220px] text-center py-3.5 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold transition-all shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 group"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
              </span>
              <span>Launch Live Website ({project.liveUrl.replace('https://', '')})</span>
              <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </a>
          )}

          <a
            href={project.githubUrl || 'https://github.com/Devloper-Akash'}
            target="_blank"
            rel="noopener noreferrer"
            className="project-action-secondary flex-1 min-w-[200px] text-center py-3.5 px-6 rounded-2xl bg-slate-900 dark:bg-white/10 hover:bg-slate-800 dark:hover:bg-white/15 text-white font-mono text-xs font-bold transition-all border border-slate-700 dark:border-white/15 shadow-sm flex items-center justify-center gap-2"
          >
            <span>Explore Source Code on GitHub</span>
          </a>

          <Link
            href="/#contact"
            className="project-action-secondary min-w-[170px] text-center py-3.5 px-6 rounded-2xl bg-white hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white font-mono text-xs font-bold transition-all shadow-sm flex items-center justify-center gap-2"
          >
            <span>Inquire Architecture</span>
          </Link>
        </div>

        {/* Case Study Deep Dive Sections */}
        <div className="project-detail-sections space-y-12">
          {/* Section 1: Problem & Solution Bento */}
          <div className="project-problem-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="project-detail-panel p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1117]/85 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/40">
              <div className="text-[11px] font-mono text-rose-700 dark:text-rose-400 font-bold mb-2">
                01. PROBLEM STATEMENT & CHALLENGE
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3">
                The User Friction
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {project.problemStatement ||
                  'Traditional applications and workflows in this space suffer from high complexity, awkward formatting, poor mobile support, and lack of instant feedback.'}
              </p>
            </div>

            <div className="project-detail-panel p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1117]/85 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/40">
              <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold mb-2">
                02. ENGINEERING SOLUTION
              </div>
              <h3 className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-3">
                The Technical Architecture
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {project.solution ||
                  'Delivered a streamlined, responsive application with sub-second feedback loops, modern state management, and optimized asset delivery pipelines.'}
              </p>
            </div>
          </div>

          {/* Section 2: UX Design & Human Centered Workflow */}
          <div className="project-detail-panel p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1117]/85 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/40">
            <div className="text-[11px] font-mono text-cyan-700 dark:text-cyan-400 font-bold mb-2">
              03. UX DESIGN PROCESS & USER EXPERIENCE
            </div>
            <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-4">
              Designing for Cognitive Ease & High Conversions
            </h3>
            <p className="text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed font-sans mb-6">
              {project.uxProcess ||
                'Prioritizing accessibility (WCAG AA), intuitive mental models, 8pt spacing tokens, and distraction-free editing interfaces.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-white/5 font-mono text-xs">
              {project.title === 'ScriptBridge AI' ? (
                <>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">AI OCR & Script Detection</span>
                    <span className="text-slate-600 dark:text-slate-400 text-[11px] font-sans">
                      Automatic handwriting recognition and script detection across 55+ languages with confidence scoring.
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <span className="text-cyan-700 dark:text-cyan-400 font-bold block mb-1">Gemini AI Neural Translation</span>
                    <span className="text-slate-600 dark:text-slate-400 text-[11px] font-sans">
                      Deep context-aware multilingual translation for regional Indian languages and classical literature.
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <span className="text-indigo-700 dark:text-indigo-400 font-bold block mb-1">Speech & Multi-Format Export</span>
                    <span className="text-slate-600 dark:text-slate-400 text-[11px] font-sans">
                      Real-time audio speech synthesis via Web Speech API plus instant export to PDF, TXT, and DOCX.
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <span className="text-emerald-700 dark:text-emerald-400 font-bold block mb-1">Dual-Pane Symmetry</span>
                    <span className="text-slate-600 dark:text-slate-400 text-[11px] font-sans">
                      Simultaneous form editing and real-time live preview with zero layout jumping.
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <span className="text-cyan-700 dark:text-cyan-400 font-bold block mb-1">Modular Architecture</span>
                    <span className="text-slate-600 dark:text-slate-400 text-[11px] font-sans">
                      Component-driven design with reactive state synchronization and fluid transitions.
                    </span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5">
                    <span className="text-indigo-700 dark:text-indigo-400 font-bold block mb-1">Cloud Integration & Export</span>
                    <span className="text-slate-600 dark:text-slate-400 text-[11px] font-sans">
                      Secure persistence, fast asset processing, and single-click production downloads.
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Section 3: Key Features Checklist */}
          {project.keyFeatures && (
            <div className="project-detail-panel p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1117]/85 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/40">
              <div className="text-[11px] font-mono text-indigo-700 dark:text-indigo-400 font-bold mb-2">
                04. SYSTEM CAPABILITIES & FEATURES
              </div>
              <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-6">
                Key Deliverables & Implemented Features
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.keyFeatures.map((feature, fIdx) => (
                  <div
                    key={fIdx}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5"
                  >
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-mono text-xs font-bold flex-shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="text-xs sm:text-sm font-sans text-slate-700 dark:text-slate-200 leading-relaxed font-medium">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 4: Performance & Validation Metrics */}
          {project.metrics && (
            <div className="project-detail-panel p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1117]/85 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/40">
              <div className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400 font-bold mb-2">
                05. VALIDATION & BENCHMARKS
              </div>
              <h3 className="text-2xl font-heading font-bold text-slate-900 dark:text-white mb-6">
                Measurable Impact & Quantitative Results
              </h3>
              <div className="project-metrics grid grid-cols-2 sm:grid-cols-4 gap-4">
                {project.metrics.map((m, mIdx) => (
                  <div
                    key={mIdx}
                    className="project-metric p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 font-mono text-center"
                  >
                    <div className="project-metric-label text-[10px] text-slate-500 uppercase font-semibold">{m.label}</div>
                    <div className="project-metric-value text-base sm:text-lg font-bold text-emerald-700 dark:text-emerald-400 mt-1">
                      {m.val}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section 5: Technologies Used */}
          {project.techStack && (
            <div className="project-detail-panel p-6 sm:p-8 rounded-3xl bg-white dark:bg-[#0d1117]/85 border border-slate-200/80 dark:border-white/10 shadow-xl shadow-slate-200/40 dark:shadow-black/40">
              <div className="text-[11px] font-mono text-slate-500 uppercase font-semibold mb-3">
                Ecosystem & Technologies Used
              </div>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech, tIdx) => (
                  <span
                    key={tIdx}
                    className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-slate-100 dark:bg-white/5 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-white/10 shadow-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Project Navigation Footer */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <Link
            href="/#work"
            className="text-slate-600 dark:text-slate-400 hover:text-emerald-700 dark:hover:text-emerald-400 font-bold transition-colors"
          >
            &larr; Back to All Deployments
          </Link>
          <a
            href="#top"
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-bold transition-colors"
          >
            Back to Top &uarr;
          </a>
        </div>
      </div>

      {/* Fullscreen Zoom Image Modal */}
      <AnimatePresence>
        {isZoomed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsZoomed(false)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="relative max-w-6xl w-full aspect-[16/9] rounded-3xl overflow-hidden shadow-2xl border border-white/20"
            >
              <Image
                src={currentImage}
                alt={project.title}
                fill
                className="object-contain"
              />
              <button
                onClick={() => setIsZoomed(false)}
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 text-white flex items-center justify-center font-mono text-sm border border-white/20"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
