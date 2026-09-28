'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { experienceData } from '@/assets/assets';

export default function Experience() {
  const [expandedExperience, setExpandedExperience] = useState(null);
  const [selectedCertImage, setSelectedCertImage] = useState(null);

  return (
    <section id="experience" className="experience-section w-full px-[8%] sm:px-[12%] py-20 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/25 mb-3 font-semibold">
            <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
            PROFESSIONAL JOURNEY &amp; INTERNSHIPS
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white">
            Work Experience
          </motion.h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans">
            Hands-on professional software engineering internships, production deliverables, and industry-aligned project execution.
          </p>
        </div>

        <div className="experience-list">
          {experienceData.map((exp, index) => {
            const isExpanded = expandedExperience === index;
            const detailsId = `experience-details-${index}`;

            return (
              <motion.article key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.55, delay: index * 0.08 }} viewport={{ once: true }} className={`experience-item${isExpanded ? ' is-expanded' : ''}`}>
                <button
                  type="button"
                  className="experience-trigger"
                  aria-expanded={isExpanded}
                  aria-controls={detailsId}
                  onClick={() => setExpandedExperience(isExpanded ? null : index)}
                >
                  <span className="experience-trigger-main">
                    <span className="experience-meta">
                      <span>{exp.type.toUpperCase()}</span>
                      <span>{exp.duration}</span>
                      <span>CERT ID: #{exp.certificateId}</span>
                    </span>
                    <span className="experience-role">{exp.role}</span>
                    <span className="experience-company">{exp.company} <span>({exp.companyFull})</span></span>
                  </span>
                  <span className="experience-trigger-side">
                    <span className="experience-verified"><span />VERIFIED &amp; COMPLETED</span>
                    <span className="experience-toggle">{isExpanded ? 'CLOSE DETAILS' : 'VIEW DETAILS'} <span aria-hidden="true">{isExpanded ? '−' : '+'}</span></span>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      id={detailsId}
                      key="details"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                      className="experience-details"
                    >
                      <div className="experience-details-grid">
                        <div className="experience-detail-copy">
                          <div className="experience-deliverable">
                            <div className="experience-detail-label">KEY INTERNSHIP DELIVERABLE</div>
                            <h4>Built Complete Full-Stack Website</h4>
                            <p>{exp.coreDeliverable}</p>
                          </div>

                          <div className="experience-detail-block">
                            <h5>PROGRAM FOCUS &amp; SCOPE</h5>
                            <p>{exp.summary}</p>
                          </div>

                          <div className="experience-detail-block">
                            <h5>KEY CONTRIBUTIONS &amp; ENGINEERING TASKS</h5>
                            <ul className="experience-achievements">
                              {exp.achievements.map((item, achievementIndex) => (
                                <li key={achievementIndex}><span aria-hidden="true">✓</span>{item}</li>
                              ))}
                            </ul>
                          </div>

                          <div className="experience-detail-block">
                            <h5>COMPANY ACCREDITATIONS &amp; RECOGNITIONS</h5>
                            <div className="experience-tags">
                              {exp.accreditations.map((item, accreditationIndex) => <span key={accreditationIndex}>{item}</span>)}
                            </div>
                          </div>

                          <div className="experience-detail-block">
                            <h5>TECHNOLOGIES &amp; TOOLS APPLIED</h5>
                            <div className="experience-tags">
                              {exp.techStack.map((item, techIndex) => <span key={techIndex}>{item}</span>)}
                            </div>
                          </div>
                        </div>

                        <div className="experience-certificate-column">
                          <button type="button" className="experience-certificate" onClick={() => setSelectedCertImage(exp.certificateImage)} aria-label={`Inspect ${exp.company} certificate`}>
                            <Image src={exp.certificateImage} alt={`${exp.company} Certificate`} fill className="object-contain p-2" />
                            <span>VERIFIED CERTIFICATE</span>
                          </button>
                          <div className="experience-signatories">
                            <div><span>Signatory 1</span><strong>Satyajit Swain (Founder &amp; CEO)</strong></div>
                            <div><span>Signatory 2</span><strong>Adil Quadri (Co-Founder &amp; COO)</strong></div>
                            <div><span>Official ID</span><strong>{exp.certificateId}</strong></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedCertImage && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedCertImage(null)} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-zoom-out">
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} onClick={(event) => event.stopPropagation()} className="relative max-w-4xl w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-950 p-3">
              <Image src={selectedCertImage} alt="3Skill Internship Certificate Full" fill className="object-contain p-2" />
              <button onClick={() => setSelectedCertImage(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/75 hover:bg-black/95 text-white flex items-center justify-center font-mono text-sm border border-white/20 shadow-lg transition-colors z-20 cursor-pointer" aria-label="Close modal">✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
