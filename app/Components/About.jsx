'use client'
import { assets, infoList, toolsData } from '@/assets/assets'
import React from 'react'
import Image from 'next/image';
import { motion } from "motion/react"

const About = () => {
  return (
    <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1}} id='about' className='w-full px-[12%] py-10 scroll-mt-20'>
        <motion.h4 initial={{opacity:0,y:-20}} whileInView={{opacity:1,y:0}} transition={{duration:0.5,delay:0.3}} className='text-center mb-2 text-lg font-Ovo'>Introduction</motion.h4>
        <h2 className='text-center mb-4 text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-blue-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-sky-400 dark:to-indigo-500 drop-shadow-[0_0_10px_rgba(37,99,235,0.3)] dark:drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]'>
            {"About Me".split("").map((char, index) => (
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

        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} transition={{duration:1}} className='flex w-full flex-col lg:flex-row items-center gap-20 my-20'>
            <motion.div initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} transition={{duration:0.6}}className='w-64 sm:w-80 rounded-3xl max-w-none'>
                <Image src={assets.user_image} alt='user' className='w-full rounded-3xl'/>
            </motion.div>
            <motion.div  initial={{opacity:0,scale:0.9}} whileInView={{opacity:1,scale:1}} transition={{duration:0.6}} className='flex-1'>
                <p className='mb-10 max-w-2xl font-Ovo'>I am a passionate and dedicated software developer with a strong background in web development. I have experience working with various programming languages and frameworks, and I am always eager to learn new technologies. I am committed to delivering high-quality code and creating innovative solutions to complex problems. My goal is to continuously improve my skills and contribute to the success of the projects I work on.</p>

                <motion.ul  initial={{x:30,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:0.8,delay:1}} className='grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl'>
                   {infoList.map(({icon,iconDark,title,description},index)=>
                   <motion.li whileInView={{scale:1.05}} className='border border-gray-200 rounded-xl p-6 cursor-pointer hover:bg-white dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10 hover:-translate-y-2 duration-500 shadow-[0_4px_15px_rgba(0,0,0,0.05)] hover:shadow-[0_10px_25px_rgba(37,99,235,0.15)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_0_20px_rgba(56,189,248,0.2)] transition-all group' key={index}>
                    <Image src={iconDark} alt={title} className='hidden w-7 mt-3 dark:block transform group-hover:scale-110 transition-transform duration-300'/>
                    <Image src={icon} alt={title} className='w-7 mt-3 dark:hidden transform group-hover:scale-110 transition-transform duration-300'/> 
                    <h3 className='my-4 font-bold text-gray-700 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors'>{title}</h3>
                    <p className='text-gray-600 text-sm dark:text-white/80'>{description}</p>
                   </motion.li>
                  )}
                </motion.ul>

                <motion.h4  initial={{y:20,opacity:0}} whileInView={{y:0,opacity:1}} transition={{duration:1.3,delay:0.5}} className='my-6 text-gray-700 font-bold dark:text-white/90'>Tools I Use</motion.h4>
                <motion.ul initial={{x:30,opacity:0}} whileInView={{x:0,opacity:1}} transition={{duration:0.8,delay:1}} className='flex items-center gap-3 sm:gap-5 mt-4 flex-wrap'>
                  {toolsData.map((tool, index) => (
                    <motion.li whileInView={{scale:1.05}} key={index} className='flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 border border-gray-200 bg-white/50 dark:bg-white/5 rounded-xl cursor-pointer hover:-translate-y-1.5 duration-500 dark:border-white/10 hover:shadow-[0_10px_20px_rgba(37,99,235,0.15)] dark:hover:shadow-[0_0_15px_rgba(56,189,248,0.3)] transition-all'>
                      <Image src={tool} alt='Tool' className='w-5 sm:w-8 h-auto drop-shadow-sm' />
                    </motion.li>
                  ))}
                </motion.ul>
            </motion.div>
        </motion.div>
    </motion.div>
    
  )
}

export default About
