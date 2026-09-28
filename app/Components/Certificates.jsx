'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { certificateData } from '@/assets/assets';

export default function Certificates() {
  const [expandedCert, setExpandedCert] = useState(null);
  const [selectedCert, setSelectedCert] = useState(null);

  const keyCompetencies = [
    'Full Stack Web Development Architecture',
    'HTML5, CSS3, ES6+ JavaScript',
    'React.js Component Ecosystem',
    'Node.js & Express RESTful APIs',
    'MongoDB Database & Mongoose ODM',
    'Production Deployment & Authentication',
  ];

  return (
    <section id="certificates" className="w-full px-[8%] sm:px-[12%] py-20 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 mb-3 font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            VERIFIED CREDENTIALS
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Accreditations &amp; Certificates
          </motion.h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans">
            Explore my certifications and courses completed to enhance my skills in full stack software engineering.
          </p>
        </div>

        <div className="certificate-list">
          {certificateData.map((cert, index) => {
            const isExpanded = expandedCert === index;
            const detailsId = `certificate-details-${index}`;

            return (
              <motion.article
                key={cert.credentialId || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: index * 0.08 }}
                viewport={{ once: true }}
                className={`certificate-item${isExpanded ? ' is-expanded' : ''}`}
              >
                <button
                  type="button"
                  className="experience-trigger certificate-trigger"
                  aria-expanded={isExpanded}
                  aria-controls={detailsId}
                  onClick={() => setExpandedCert(isExpanded ? null : index)}
                >
                  <span className="experience-trigger-main">
                    <span className="experience-meta">
                      <span>ACCREDITATION</span>
                      <span>ISSUED: {cert.date}</span>
                      <span>{cert.issuer}</span>
                    </span>
                    <span className="experience-role">{cert.title}</span>
                    <span className="experience-company">{cert.organization || cert.subtitle || 'Professional development'}</span>
                  </span>
                  <span className="experience-trigger-side">
                    <span className="experience-verified"><span />VERIFIED CREDENTIAL</span>
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
                      <div className="certificate-details-grid">
                        <div className="certificate-detail-copy">
                          <div className="experience-detail-block">
                            <h5>PROGRAM &amp; ACCREDITATION</h5>
                            <p>{cert.description}</p>
                          </div>
                          {cert.personalNote && (
                            <div className="experience-deliverable certificate-takeaway">
                              <div className="experience-detail-label">KEY TAKEAWAY &amp; ENGINEERING INSIGHT</div>
                              <p>{cert.personalNote}</p>
                            </div>
                          )}
                          <div className="experience-detail-block">
                            <h5>VERIFIED COMPETENCIES</h5>
                            <div className="experience-tags">
                              {(cert.competencies || keyCompetencies).map((competency, competencyIndex) => (
                                <span key={competencyIndex}>{competency}</span>
                              ))}
                            </div>
                          </div>
                          <div className="certificate-facts">
                            <div><span>Credential ID</span><strong>{cert.credentialId || `${cert.date}-VERIFIED`}</strong></div>
                            <div><span>Issued by</span><strong>{cert.issuer}{cert.organization ? ` · ${cert.organization}` : ''}</strong></div>
                            <div><span>Status</span><strong>Verified &amp; Authenticated</strong></div>
                          </div>
                          {cert.pdfUrl && (
                            <a href={cert.pdfUrl} target="_blank" rel="noopener noreferrer" className="certificate-pdf-link">
                              VIEW ORIGINAL DOCUMENT
                            </a>
                          )}
                        </div>

                        <div className="experience-certificate-column">
                          <button type="button" className="experience-certificate" onClick={() => setSelectedCert(cert)} aria-label={`Inspect ${cert.title} certificate`}>
                            <Image src={cert.image} alt={`${cert.title} certificate`} fill className="object-contain p-2" />
                            <span>INSPECT CREDENTIAL</span>
                          </button>
                          <p className="certificate-image-caption">Select the certificate to view it at full size.</p>
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
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCert(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(event) => event.stopPropagation()}
              className="relative max-w-5xl w-full aspect-[4/3] max-h-[90vh] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-slate-950 p-3"
            >
              <Image src={selectedCert.image} alt={`${selectedCert.title} certificate full size`} fill className="object-contain p-2" />
              <button onClick={() => setSelectedCert(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/75 hover:bg-black/95 text-white flex items-center justify-center font-mono text-sm border border-white/20 shadow-lg transition-colors z-20" aria-label="Close certificate preview">✕</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
