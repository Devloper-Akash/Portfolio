'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';
import { workData } from '@/assets/assets';

export default function Work({ projects }) {
  const work = Array.isArray(projects) ? projects : workData.map((item, index) => ({ ...item, slug: String(index) }));
  const projectTechStack = [
    ['React', 'Tailwind CSS', 'Responsive UI', 'State Flow'],
    ['Geolocation API', 'Leaflet / Maps', 'Mobile First', 'Push Alerts'],
    ['Gemini AI', 'React.js', 'Node.js', 'Tesseract OCR'],
    ['React', 'Vite', 'Supabase', 'Framer Motion'],
  ];

  return (
    <section id="work" className="work-section w-full px-[8%] sm:px-[12%] py-20 scroll-mt-24">
      <div className="max-w-6xl mx-auto">
        <div className="work-heading text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/25 mb-3 font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-500" />
            PRODUCTION RELEASES &amp; CASE STUDIES
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white">
            Featured Deployments
          </motion.h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans">
            Welcome to my Web Development Portfolio! Explore a collection of projects showcasing my expertise in full-stack development and interactive web engineering.
          </p>
        </div>

        <div className="work-list">
          {work.map((project, index) => {
            const projectPath = `/work/${project.slug || project.id || index}`;
            const techStack = project.techStack?.slice(0, 4) || projectTechStack[index] || [];
            const liveUrl = project.liveUrl && !project.liveUrl.endsWith('Devloper-Akash') ? project.liveUrl : null;

            return (
              <motion.article key={project.title || index} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, delay: Math.min(index * 0.06, 0.24) }} viewport={{ once: true }} className="work-item">
                <Link href={projectPath} className="work-visual" data-cursor="VIEW" aria-label={`View ${project.title}`}>
                  <Image src={project.bgImage} alt={project.title} fill sizes="(max-width: 760px) 100vw, 56vw" className="work-image object-cover" />
                  <span className="work-image-index">0{index + 1} / {String(work.length).padStart(2, '0')}</span>
                </Link>

                <div className="work-copy">
                  <div className="work-meta"><span>PROJECT {String(index + 1).padStart(2, '0')}</span><span>{project.description}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.longDescription}</p>
                  <div className="work-stack" aria-label="Technologies">
                    {techStack.map((tech) => <span key={tech}>{tech}</span>)}
                  </div>
                  <div className="work-links">
                    <Link href={projectPath} className="text-link">INSPECT SPECS</Link>
                    {liveUrl && <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="text-link text-link-muted">LIVE DEMO</a>}
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="work-github">
          <a href="https://github.com/Devloper-Akash" target="_blank" rel="noopener noreferrer" className="text-link">EXPLORE ALL REPOSITORIES ON GITHUB</a>
        </div>
      </div>
    </section>
  );
}
