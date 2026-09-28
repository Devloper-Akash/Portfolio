'use client';

import React from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';

export default function Footer() {
  return (
    <footer className="w-full mt-24 border-t border-slate-200 dark:border-white/10 bg-white dark:bg-[#07090e] text-slate-600 dark:text-slate-400 py-12 px-6 sm:px-12 relative z-10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand identity & email */}
        <div className="text-center md:text-left space-y-2">
          <div className="text-2xl font-mono font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center justify-center md:justify-start gap-2">
            <span>AKASH</span>
            <span className="text-emerald-500">.</span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 font-mono font-bold">
              BACKEND SPECIALIST
            </span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-mono text-slate-700 dark:text-slate-400 font-medium">
            <Image src={assets.mail_icon} alt="email" className="w-4 h-4 dark:hidden" />
            <Image src={assets.mail_icon_dark} alt="email" className="w-4 h-4 hidden dark:block" />
            <a href="mailto:halderakash826@gmail.com" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
              halderakash826@gmail.com
            </a>
          </div>
        </div>

        {/* Status / Region */}
        <div className="text-center font-mono text-xs text-slate-500">
          <div className="flex items-center justify-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
            <span>All Systems Green • Kolkata, India</span>
          </div>
          <p className="mt-1 text-slate-500">&copy; 2026 Akash Halder. All rights reserved.</p>
        </div>

        {/* Social Links & Back to Top */}
        <div className="flex items-center gap-5 text-xs font-mono font-semibold">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/Devloper-Akash"
            className="text-slate-700 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            GitHub
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/akash-halder-779701379/"
            className="text-slate-700 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            LinkedIn
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://instagram.com"
            className="text-slate-700 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            Instagram
          </a>
          <a
            href="#top"
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ml-2 shadow-sm font-bold"
            title="Back to Top"
            aria-label="Back to Top"
          >
            &uarr;
          </a>
        </div>
      </div>
    </footer>
  );
}
