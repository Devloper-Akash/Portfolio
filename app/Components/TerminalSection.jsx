'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import TiltCard3D from './TiltCard3D';

const INITIAL_LOGS = [
  { type: 'system', text: 'Initializing Akash Halder Developer Shell v2.6.4...' },
  { type: 'system', text: 'Connection established to backend-cluster [region: ap-south-1 (Kolkata)].' },
  { type: 'success', text: 'Status: 200 OK | All microservices operational.' },
  { type: 'info', text: 'Type "help" or click the quick commands below to inspect system architecture.' },
];

export default function TerminalSection() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [inputVal, setInputVal] = useState('');
  const [activeTab, setActiveTab] = useState('cli');
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const executeCommand = (cmdText) => {
    const raw = cmdText.trim();
    if (!raw) return;
    const cmd = raw.toLowerCase();

    const newLogs = [...logs, { type: 'command', text: `$ ${raw}` }];

    switch (cmd) {
      case 'help':
        newLogs.push({
          type: 'output',
          text: `Available commands:
  • status        - View backend system health & telemetry
  • experience    - Display professional internships & deliverables
  • skills        - Dump core engineering stack & proficiencies
  • architecture  - Render distributed backend system topology
  • projects      - List active production deployments
  • curl /ping    - Ping the API server for latency check
  • contact       - Fetch direct developer communication endpoints
  • clear         - Flush the terminal buffer`,
        });
        break;

      case 'experience':
        newLogs.push({
          type: 'output',
          text: `[CAREER & INDUSTRY EXPERIENCE]
• Organization: 3Skill Training (3SKILL EDTECH PVT. LTD.)
  Role:         Web Development Intern (2-Month Internship)
  Cert ID:      ID-INTERN260789 (Verified Credential)
  Deliverable:  Engineered & Deployed Complete Full-Stack Website
  Accreditation:DPIIT #startupindia | ISO 9001:2015 | MSME Registered
  Tech Stack:   React.js, Node.js, Express.js, REST APIs, Tailwind CSS`,
        });
        break;

      case 'status':
        newLogs.push({
          type: 'output',
          text: `[SYSTEM TELEMETRY]
-----------------------------------------
Host:        akash-backend-engine.internal
Role:        Full Stack Developer [Backend Specialist]
Runtime:     Node.js v22.12.0 LTS / Next.js 16
Database:    MongoDB Atlas + Firebase Cloud
Location:    Kolkata, India (UTC+05:30)
Availability: 99.99% Uptime (Zero unhandled crashes)
Memory RSS:  48.2 MB / Scalable Cluster`,
        });
        break;

      case 'skills':
        newLogs.push({
          type: 'output',
          text: `{
  "backend": ["Node.js", "Express.js", "RESTful APIs", "JWT / OAuth", "Middleware Architecture"],
  "databases": ["MongoDB", "Mongoose", "Firebase Firestore", "Relational Concepts"],
  "frontend": ["React.js", "Next.js 16 (App Router)", "JavaScript ES6+", "Tailwind CSS"],
  "core_competencies": ["API Optimization", "Schema Design", "Micro-Interactions", "Responsive Design"]
}`,
        });
        break;

      case 'architecture':
        newLogs.push({
          type: 'output',
          text: `[TOPOLOGY DIAGRAM]
┌────────────────┐      ┌─────────────────────────┐
│ Client Browser │ ───> │ Next.js 16 Edge Gateway │
└────────────────┘      └────────────┬────────────┘
                                     │ (JSON / Streaming)
                        ┌────────────▼────────────┐
                        │ Express API / Node Svc  │
                        └──────┬───────────┬──────┘
                               │           │
                     ┌─────────▼──┐     ┌──▼──────────┐
                     │  MongoDB   │     │ Firebase/S3 │
                     │ Data Store │     │ Asset Store │
                     └────────────┘     └─────────────┘`,
        });
        break;

      case 'projects':
        newLogs.push({
          type: 'output',
          text: `[DEPLOYED ARTIFACTS]
1. Frontend Project   - Modern interactive responsive web application
2. Geo Based App      - Real-time mobile geolocation and mapping service
3. ScriptBridge AI   - Regional OCR & AI Translation (Live: https://scriptbridge-ai.vercel.app | Repo: github.com/Devloper-Akash/ScriptBridge-AI---OCR-Translation)
4. ProResume          - ATS Resume Builder (Live: https://pro-resume-8ag5.vercel.app | Repo: github.com/Devloper-Akash/ProResume)`,
        });
        break;

      case 'curl /ping':
      case 'ping':
      case 'curl':
        newLogs.push({
          type: 'output',
          text: `HTTP/2 200 OK
date: ${new Date().toUTCString()}
content-type: application/json; charset=utf-8
x-response-time: 14.2ms

{
  "status": "HEALTHY",
  "ping": "pong",
  "region": "Kolkata, India",
  "developer": "Akash Halder"
}`,
        });
        break;

      case 'contact':
        newLogs.push({
          type: 'output',
          text: `Direct Communication:
  • Email:    halderakash826@gmail.com
  • GitHub:   https://github.com/Devloper-Akash
  • LinkedIn: https://www.linkedin.com/in/akash-halder-779701379/
  • Gateway:  Scroll down to #contact to dispatch message`,
        });
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      default:
        newLogs.push({
          type: 'error',
          text: `bash: ${raw}: command not found. Type "help" for a list of valid commands.`,
        });
        break;
    }

    setLogs(newLogs);
    setInputVal('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      executeCommand(inputVal);
    }
  };

  return (
    <section id="terminal" className="w-full px-[8%] sm:px-[12%] py-16 scroll-mt-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/25 mb-3 font-semibold"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            LIVE SHELL ENVIRONMENT
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            Interactive Developer Terminal
          </motion.h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-sans">
            Query runtime metrics, backend system architecture, and tech stacks directly via command line.
          </p>
        </div>

        {/* 3D Glassmorphic Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <TiltCard3D
            tiltAngle={3}
            glare={false}
            className="rounded-2xl overflow-hidden border border-slate-300 dark:border-white/10 bg-[#0a0d14] dark:bg-[#07090e]/95 backdrop-blur-xl shadow-2xl shadow-slate-300/70 dark:shadow-emerald-950/20"
            style={{
              boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.7), 0 0 25px rgba(16, 185, 129, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.12)',
            }}
          >
          {/* Terminal Window Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#111622] border-b border-white/5 select-none">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 hover:brightness-125 transition-all cursor-pointer"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500 hover:brightness-125 transition-all cursor-pointer"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500 hover:brightness-125 transition-all cursor-pointer"></span>
              <span className="ml-3 text-xs font-mono text-slate-400 hidden sm:inline">
                akash@backend-cluster:~ (bash)
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono">
              <button
                onClick={() => setActiveTab('cli')}
                className={`px-2.5 py-1 rounded transition-colors ${
                  activeTab === 'cli'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                shell.sh
              </button>
              <button
                onClick={() => executeCommand('architecture')}
                className="px-2.5 py-1 rounded text-slate-400 hover:text-slate-200 transition-colors"
              >
                arch.svg
              </button>
            </div>
          </div>

          {/* Terminal Quick Command Chips */}
          <div className="px-4 py-2 bg-[#0e131d] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs font-mono text-slate-400">
            <span className="text-slate-400 font-semibold hidden sm:inline">Quick Run:</span>
            {['status', 'skills', 'architecture', 'projects', 'curl /ping', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => executeCommand(cmd)}
                className="px-2.5 py-1 rounded bg-white/10 hover:bg-emerald-500/25 text-slate-200 hover:text-emerald-300 border border-white/10 hover:border-emerald-500/30 transition-all flex-shrink-0 font-medium"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Output Area */}
          <div className="p-5 font-mono text-xs sm:text-sm h-80 sm:h-96 overflow-y-auto space-y-3">
            {logs.map((log, idx) => (
              <div key={idx} className="leading-relaxed">
                {log.type === 'system' && (
                  <p className="text-slate-400 italic">{log.text}</p>
                )}
                {log.type === 'success' && (
                  <p className="text-emerald-400 font-medium">{log.text}</p>
                )}
                {log.type === 'info' && (
                  <p className="text-sky-300">{log.text}</p>
                )}
                {log.type === 'command' && (
                  <p className="text-white font-bold">{log.text}</p>
                )}
                {log.type === 'output' && (
                  <pre className="text-slate-200 whitespace-pre-wrap font-mono mt-1 pl-3 border-l border-emerald-500/40">
                    {log.text}
                  </pre>
                )}
                {log.type === 'error' && (
                  <p className="text-rose-400 font-semibold">{log.text}</p>
                )}
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Terminal Input Line */}
          <div className="px-4 py-3 bg-[#0d1117] border-t border-white/5 flex items-center gap-2 font-mono text-sm">
            <span className="text-emerald-400 font-bold select-none">
              akash@server:~$
            </span>
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="type 'help', 'status', or 'architecture'..."
              className="flex-1 bg-transparent text-emerald-300 focus:outline-none placeholder:text-slate-500 font-mono text-sm"
            />
            <button
              onClick={() => executeCommand(inputVal)}
              className="px-3 py-1 bg-emerald-500/25 hover:bg-emerald-500/40 text-emerald-300 text-xs rounded border border-emerald-500/40 transition-colors font-bold"
            >
              Exec
            </button>
          </div>
          </TiltCard3D>
        </motion.div>
      </div>
    </section>
  );
}
