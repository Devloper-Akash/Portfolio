'use client';
import React from 'react'
import { motion } from 'motion/react';
import Image from 'next/image';
import { assets } from '@/assets/assets';

const Footer = () => {
  return (
    <div className='mt-20'>
        <div className='text-center'>
            <div className='text-3xl font-sans font-bold tracking-tight text-blue-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-sky-400 dark:to-indigo-500 drop-shadow-[0_0_10px_rgba(37,99,235,0.3)] dark:drop-shadow-[0_0_15px_rgba(56,189,248,0.4)] mx-auto mb-2 flex justify-center hover:opacity-80 transition-opacity'>
                {"AKASH.".split("").map((char, index) => (
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
            </div>

            <div className='w-max flex items-center gap-2 mx-auto'>
                <Image src={assets.mail_icon} alt='' className='w-6 dark:hidden'/>
                <Image src={assets.mail_icon_dark} alt='' className='hidden w-6 dark:block'/>
                halderakash826@gmail.com
            </div>
        </div>

        <div className='text-center sm:flex items-center justify-between border-t
        border-grey-400 dark:border-white/15 mx-[10%] mt-12 py-6'>
            <p>&copy; 2026 Akash Halder. All rights reserved.</p>
            <ul className='flex items-center gap-10 justify-center mt-4 sm:mt-0'>
                <li><a target="_blank" href='https://github.com/Devloper-Akash' className='hover:-translate-y-0.5 hover:text-blue-600 dark:hover:text-sky-400 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.6)] transition-all duration-300 inline-block'>GitHub</a></li>
                <li><a target="_blank" href='https://www.linkedin.com/in/akash-halder-779701379/' className='hover:-translate-y-0.5 hover:text-blue-600 dark:hover:text-sky-400 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.6)] transition-all duration-300 inline-block'>Linkedln</a></li>
                 <li><a target="_blank" href='' className='hover:-translate-y-0.5 hover:text-blue-600 dark:hover:text-sky-400 hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.6)] transition-all duration-300 inline-block'>Instagram</a></li>
            </ul>
        </div>
    </div>
  )
}

export default Footer
