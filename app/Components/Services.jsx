'use client'

import { assets, serviceData } from '@/assets/assets'
import React from 'react'
import Image from 'next/image';
import { motion } from "motion/react";

const Services = () => {
  return (
    <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1}} id="services" className='w-full px-[12%] py-10 scroll-mt-20'>
        <motion.h4 initial={{y:-20,opacity:0}} whileInView={{y:0,opacity:1}} transition={{duration:0.3,delay:0.5}} className='text-center mb-2 text-lg font-Ovo'>What I Offer</motion.h4>
        <h2 className='text-center text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-blue-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-sky-400 dark:to-indigo-500 drop-shadow-[0_0_10px_rgba(37,99,235,0.3)] dark:drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]'>
            {"My Services".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.05 + 0.1, ease: "easeOut" }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
        </h2>

        <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>I am a dedicated fresher in software development, offering responsive and user-friendly web solutions. I focus on writing clean code, solving problems efficiently, and continuously learning new technologies to deliver high-quality results.</p>

        <div className='grid grid-cols-1 gap-8 my-10 sm:grid-cols-2 lg:grid-cols-4'>
            {serviceData.map(({icon,title,description,link},index) => {
                return (
                <motion.div 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1, ease: 'easeOut' }}
                  key={index} 
                  className='relative overflow-hidden bg-white/60 dark:bg-[#231533]/60 backdrop-blur-xl p-8 rounded-3xl border border-gray-200 dark:border-white/10 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_-10px_rgba(56,189,248,0.1)] cursor-pointer group hover:-translate-y-3 transition-all duration-500'
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 dark:from-sky-400/10 dark:to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    <div className="relative z-10 flex flex-col h-full">
                        <Image src={icon} alt='' className='w-12 mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 drop-shadow-md'/>
                        <h3 className='text-xl font-bold my-4 text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors duration-300'>{title}</h3>
                        <p className='text-gray-600 text-sm leading-relaxed dark:text-white/75 flex-grow'>{description}</p>
                        <a href={link || '#contact'} className='flex items-center gap-2 text-sm mt-8 font-semibold text-blue-600 dark:text-sky-400 opacity-80 group-hover:opacity-100 group-hover:gap-4 transition-all duration-300'>
                            Learn More <Image src={assets.right_arrow} alt='' className='w-4 dark:brightness-200'/>
                        </a>
                    </div>
                </motion.div>
                );
            })}
        </div>
    </motion.div>
  )
}

export default Services
