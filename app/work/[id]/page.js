'use client';
import { use } from 'react';
import { workData } from '@/assets/assets';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { motion } from 'motion/react';
import Image from 'next/image';
import { assets } from '@/assets/assets';

export default function WorkDetails({ params }) {
    const { id } = use(params);
    const project = workData[id];

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen relative overflow-hidden dark:bg-[#1c1325] dark:text-white bg-slate-50 pt-28 pb-20">
            {/* Background Effects */}
            <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%] dark:hidden'>
              <Image src={assets.header_bg_color} alt='' className='w-full'/>
            </div>
            
            <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 flex items-center justify-center">
              {[ 
                { top: "10%", left: "15%", dur: 8 }, { top: "70%", left: "80%", dur: 6 }, 
                { top: "25%", left: "85%", dur: 7 }, { top: "50%", left: "20%", dur: 9 },
                { top: "85%", left: "30%", dur: 5 }, { top: "40%", left: "60%", dur: 8 }
              ].map((p, i) => (
                  <motion.div
                      key={i}
                      className="absolute w-2 h-2 bg-blue-500/20 dark:bg-sky-400/20 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.6)]"
                      style={{ top: p.top, left: p.left }}
                      animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2], scale: [1, 1.5, 1] }}
                      transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut" }}
                  />
              ))}
            </div>

            <div className="max-w-5xl mx-auto px-5 lg:px-8">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
                    <Link href="/#work" className="inline-flex items-center gap-2 mb-12 px-6 py-2.5 rounded-full border border-gray-300 dark:border-white/20 font-Ovo hover:bg-gray-100 dark:hover:bg-white/10 transition-all duration-300 hover:-translate-x-2 shadow-sm">
                        <span>&larr;</span> Back to Portfolio
                    </Link>
                </motion.div>

                <div className="flex flex-col items-center text-center mb-10">
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-lg md:text-xl font-bold tracking-widest uppercase text-blue-600 dark:text-sky-400 mb-2 drop-shadow-md">
                        {project.description}
                    </motion.p>
                    <motion.h1 
                        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, type: 'spring' }}
                        className="text-4xl md:text-5xl lg:text-6xl font-sans font-extrabold tracking-tight text-blue-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-sky-400 dark:to-indigo-500 drop-shadow-[0_0_10px_rgba(37,99,235,0.3)] dark:drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] mb-8"
                    >
                        {project.title}
                    </motion.h1>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full relative rounded-3xl overflow-hidden shadow-[0_15px_50px_-15px_rgba(0,0,0,0.3)] dark:shadow-[0_0_40px_rgba(56,189,248,0.15)] border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-black/40 backdrop-blur-xl group"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10 hidden md:block"></div>
                        <img src={project.bgImage} alt={project.title} className="w-full aspect-[4/3] object-cover object-center transform group-hover:scale-105 transition-transform duration-1000 ease-in-out" />
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.4 }}
                        className="w-full backdrop-blur-sm bg-white/40 dark:bg-white/5 border border-gray-100 dark:border-white/10 p-8 md:p-10 rounded-3xl shadow-xl flex flex-col justify-center"
                    >
                        <h3 className="text-2xl font-bold font-sans mb-6 dark:text-white border-b pb-4 dark:border-white/20">Project Overview</h3>
                        <p className="text-lg md:text-xl leading-relaxed text-gray-800 dark:text-gray-300 font-sans tracking-wide">
                            {project.longDescription || "A beautiful and interactive project showcasing modern development techniques."}
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
