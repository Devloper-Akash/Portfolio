'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { serviceData } from '@/assets/assets';
import TiltCard3D from './TiltCard3D';

export default function Services() {
  const serviceBadges = [
    ['Next.js', 'React', 'REST APIs'],
    ['Responsive', 'PWA', 'Location Tracking'],
    ['Wireframes', 'Accessibility', 'Figma'],
    ['Visual Systems', 'Branding', 'Vector Assets'],
  ];

  return (
    <section id="services" className="w-full px-[8%] sm:px-[12%] py-20 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 border border-indigo-500/25 mb-3 font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            SERVICES & DELIVERABLES
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Engineering Capabilities
          </motion.h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans">
            I am a dedicated fresher in software development, offering responsive and user-friendly web solutions. I focus on writing clean code, solving problems efficiently, and continuously learning new technologies to deliver high-quality results.
          </p>
        </div>

        {/* 3D Interactive Capability Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceData.map(({ icon, title, description, link }, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <TiltCard3D
                tiltAngle={9}
                glare={false}
                className="h-full rounded-3xl p-6 bg-white dark:bg-[#0d1117]/85 backdrop-blur-xl border border-slate-200/80 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 shadow-lg shadow-slate-200/40 dark:shadow-xl dark:shadow-black/50 hover:shadow-2xl transition-colors group flex flex-col justify-between"
                style={{
                  boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                }}
              >
                <div className="[transform-style:preserve-3d]">
                  {/* 3D Elevated Icon Container */}
                  <div
                    style={{ transform: 'translateZ(34px)' }}
                    className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center mb-6 transition-all duration-300 shadow-sm"
                  >
                    <Image src={icon} alt={title} className="w-7 h-7 drop-shadow-sm group-hover:scale-110 transition-transform duration-300" />
                  </div>

                  {/* 3D Elevated Service Title */}
                  <h3
                    style={{ transform: 'translateZ(26px)' }}
                    className="text-xl font-heading font-bold text-slate-900 dark:text-white mb-2"
                  >
                    {title}
                  </h3>

                  {/* Service Description */}
                  <p
                    style={{ transform: 'translateZ(18px)' }}
                    className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed font-sans mb-4"
                  >
                    {description}
                  </p>

                  {/* Micro tech tags */}
                  <div
                    style={{ transform: 'translateZ(22px)' }}
                    className="flex flex-wrap gap-1.5 mb-6"
                  >
                    {serviceBadges[index]?.map((badge, bIdx) => (
                      <span
                        key={bIdx}
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/5 transition-colors"
                      >
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 3D Elevated Action Link */}
                <a
                  href={link || '#contact'}
                  style={{ transform: 'translateZ(24px)' }}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 group-hover:text-emerald-800 dark:group-hover:text-emerald-300 transition-colors pt-4 border-t border-slate-100 dark:border-white/5"
                >
                  <span>Initialize Project</span>
                  <span className="group-hover:translate-x-1.5 transition-transform">&rarr;</span>
                </a>
              </TiltCard3D>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
