'use client'
import React from 'react'
import { motion } from "motion/react";
import { assets, workData } from '@/assets/assets'
import Image from 'next/image';
import Link from 'next/link';


const Work = () => {
  return (
    <div id='work' className='w-full px-[12%] py-10 scroll-mt-20'>
        <h4 className='text-center mb-2 text-lg font-Ovo'>My Portfolio</h4>
        <h2 className='text-center mb-4 text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-blue-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-sky-400 dark:to-indigo-500 drop-shadow-[0_0_10px_rgba(37,99,235,0.3)] dark:drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]'>
            {"My Latest Work".split("").map((char, index) => (
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

        <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>Welcome to my Web Development Portfolio! Explore a collection of projects showcasing my expertise in full-stack development.</p>

        <div className='grid grid-cols-auto gap-8 my-10 sm:grid-cols-2 lg:grid-cols-4'>
            {workData.map((project, index) => (
                <Link href={`/work/${index}`} key={index} style={{backgroundImage: `url(${project.bgImage})`}} className='w-full h-full object-cover group overflow-hidden bg-no-repeat aspect-square bg-cover bg-center rounded-2xl cursor-pointer relative block shadow-lg hover:shadow-[0_15px_40px_rgba(37,99,235,0.3)] dark:shadow-none dark:hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] hover:-translate-y-2 transition-all duration-500'>
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-500"></div>
                   <div className='bg-white/90 dark:bg-[#1d1527]/90 backdrop-blur-md w-11/12 rounded-xl absolute bottom-4 left-1/2 -translate-x-1/2 p-5 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-between border border-white/20 dark:border-white/10 group-hover:bottom-6'>
                        <div>
                            <h2 className='font-bold text-gray-900 dark:text-white drop-shadow-sm'>{project.title}</h2>
                            <p className='text-sm text-gray-700 dark:text-white/80'>{project.description}</p>
                        </div>
                        <div className='border rounded-full border-gray-900 dark:border-white w-10 aspect-square flex items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.1)] dark:shadow-[0_0_10px_rgba(255,255,255,0.2)] group-hover:bg-blue-600 dark:group-hover:bg-sky-400 group-hover:border-transparent transition-all duration-300'>
                            <Image src={assets.send_icon} alt='send icon' className='w-5 filter invert-0 dark:invert group-hover:invert-100 dark:group-hover:invert-0 transition-all'/> 
                        </div>
                   </div>
                </Link>
            ))}
        </div>
        <div>
            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href='' className='w-max flex items-center justify-center gap-3 text-gray-800 dark:text-white font-bold bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 rounded-full py-4 px-12 mx-auto my-16 shadow-[0_5px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.25)] dark:shadow-none dark:hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] hover:text-blue-600 dark:hover:text-sky-400 transition-all duration-500'>
                Show More
                <Image src={assets.right_arrow_bold_dark} alt='' className='hidden w-4 dark:block'/>
                <Image src={assets.right_arrow_bold} alt='' className='w-4 dark:hidden'/>
            </motion.a>
        </div>
    </div>
  )
}

export default Work
