'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import TiltCard3D from './TiltCard3D';
import ShinyButton from '../../components/ui/shiny-button';

export default function Contact() {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [result, setResult] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');
    setResult('Dispatching payload to API gateway...');
    const formData = new FormData(event.target);

    // Preserving exact Web3Forms access key
    formData.append('access_key', '552bfebe-a203-4cb4-b6ed-06c96e38c094');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setResult('HTTP 200 OK: Message dispatched successfully!');
        event.target.reset();
      } else {
        setStatus('error');
        setResult(data.message || 'HTTP 500: Message could not be dispatched.');
      }
    } catch (error) {
      setStatus('error');
      setResult('Network Error: Failed to reach dispatch endpoint.');
    }
  };

  return (
    <section id="contact" className="w-full px-[8%] sm:px-[12%] py-20 scroll-mt-24">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 mb-3 font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            SECURE DISPATCH GATEWAY
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Dispatch A Message
          </motion.h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto font-sans">
            Ready to collaborate on high-scale backend systems, APIs, or modern web applications? Send a direct payload.
          </p>
        </div>

        {/* 3D Dispatch Terminal Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <TiltCard3D
            tiltAngle={3}
            glare={false}
            className="rounded-3xl p-6 sm:p-10 bg-white dark:bg-[#0d1117]/95 backdrop-blur-2xl border border-slate-200/80 dark:border-white/10 shadow-2xl shadow-slate-200/50 dark:shadow-black/50 relative overflow-hidden"
            style={{
              boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
            }}
          >
            {/* Header pill indicator */}
            <div
              style={{ transform: 'translateZ(20px)' }}
              className="flex items-center justify-between pb-6 mb-6 border-b border-slate-200 dark:border-white/5 font-mono text-xs"
            >
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-400 font-medium">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">POST</span>
              <span>/api/v1/communication/dispatch</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-500 text-[11px] font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>TLS 1.3 ENCRYPTED</span>
            </div>
          </div>

          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Name Input */}
              <div>
                <label className="block text-xs font-mono text-slate-800 dark:text-slate-300 mb-2 font-bold">
                  IDENTIFIER [NAME] <span className="text-emerald-600 dark:text-emerald-400">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. John Doe / Tech Recruiter"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-transparent focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm"
                />
              </div>

              {/* Email Input */}
              <div>
                <label className="block text-xs font-mono text-slate-800 dark:text-slate-300 mb-2 font-bold">
                  RETURN ROUTE [EMAIL] <span className="text-emerald-600 dark:text-emerald-400">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. contact@company.com"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-transparent focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm"
                />
              </div>
            </div>

            {/* Message Input */}
            <div>
              <label className="block text-xs font-mono text-slate-800 dark:text-slate-300 mb-2 font-bold">
                PAYLOAD BODY [MESSAGE] <span className="text-emerald-600 dark:text-emerald-400">*</span>
              </label>
              <textarea
                name="message"
                required
                rows={5}
                placeholder="Describe project requirements, tech stack, or engineering inquiry..."
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 text-slate-900 dark:text-white font-mono text-sm focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-transparent focus:ring-1 focus:ring-emerald-500 transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600 shadow-sm resize-none"
              ></textarea>
            </div>

            {/* Status Message Display */}
            {result && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3 rounded-xl text-xs font-mono border ${
                  status === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-300 font-bold'
                    : status === 'error'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-300 font-bold'
                    : 'bg-slate-100 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                }`}
              >
                {result}
              </motion.div>
            )}

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-mono">
                <span className="text-slate-500 font-medium">
                  Direct: halderakash826@gmail.com
                </span>
                <span className="text-slate-400 dark:text-slate-600">•</span>
                <a
                  href="https://www.linkedin.com/in/akash-halder-779701379/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0a66c2] dark:text-[#38bdf8] hover:underline font-bold inline-flex items-center gap-1"
                >
                  <span>LinkedIn Profile</span>
                </a>
              </div>

              <ShinyButton
                type="submit"
                disabled={status === 'sending'}
                className="w-full sm:w-auto px-8 py-3.5 font-mono text-xs font-bold"
              >
                {status === 'sending' ? (
                  <span>DISPATCHING...</span>
                ) : (
                  <>
                    <span>TRANSMIT PAYLOAD</span>
                    <span className="contact-shiny-button__arrow" aria-hidden="true">&rarr;</span>
                  </>
                )}
              </ShinyButton>
            </div>
          </form>
          </TiltCard3D>
        </motion.div>
      </div>
    </section>
  );
}
