import React from 'react'
import Image from 'next/image';
import { assets } from '@/assets/assets';
import { motion } from "motion/react"

const Header = () => {
  return (
    <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4 '>
      <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}>
        <Image src={assets.profile_img} alt='' className='rounded-full w-32' />
      </motion.div>

      {/* Subtle Particle Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10 flex items-center justify-center">
        {[
          { top: "20%", left: "10%", dur: 8 }, { top: "80%", left: "85%", dur: 6 },
          { top: "15%", left: "75%", dur: 7 }, { top: "60%", left: "15%", dur: 9 },
          { top: "40%", left: "90%", dur: 5 }, { top: "90%", left: "30%", dur: 8 },
          { top: "30%", left: "40%", dur: 10 }, { top: "75%", left: "60%", dur: 7 },
          { top: "10%", left: "50%", dur: 6 }, { top: "85%", left: "10%", dur: 9 },
          { top: "50%", left: "80%", dur: 8 }, { top: "45%", left: "20%", dur: 7 }
        ].map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 bg-blue-500/50 dark:bg-sky-400/50 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"
            style={{ top: p.top, left: p.left }}
            animate={{ y: [0, -40, 0], opacity: [0.2, 1, 0.2] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.h3 
        initial={{ y: -20, opacity: 0 }} 
        whileInView={{ y: 0, opacity: 1 }} 
        transition={{ duration: 0.6, delay: 0.3 }} 
        className='flex items-end justify-center mb-6 font-Ovo font-bold'
      >
        <motion.div 
            animate={{ scale: [1, 1.1, 1], z: [0, 20, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformStyle: "preserve-3d", perspective: 1000 }}
            className='flex items-end justify-center gap-1 text-2xl md:text-3xl font-sans font-bold tracking-tight text-blue-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-sky-400 dark:to-indigo-500 drop-shadow-[0_0_10px_rgba(37,99,235,0.3)] dark:drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]'
        >
            {"Hi, I Am AKASH".split("").map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: index * 0.05 + 0.3, ease: "easeOut" }}
                className="inline-block"
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <Image src={assets.hand_icon} alt='' className='w-6 ml-2 mb-1' />
        </motion.div>
      </motion.h3>

      <h1 className='text-3xl sm:text-6xl lg:text-[66px] font-sans font-bold tracking-tight text-center flex justify-center flex-wrap 
                       text-blue-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-sky-400 dark:to-indigo-500
                       drop-shadow-[0_0_10px_rgba(37,99,235,0.3)] dark:drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]'>
        {"Full Stack Developer".split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: index * 0.06 + 0.8, ease: "easeOut" }}
            className="inline-block"
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
          className="inline-block ml-1 text-blue-600 dark:text-sky-400"
        >
          |
        </motion.span>
      </h1>

      <motion.p initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 0.7 }} className='max-w-2xl mx-auto font-Ovo'>I am a Fullstack Developer from Kolkata , India & also I am a fresher.</motion.p>

      <div className='flex flex-col sm:flex-row items-center gap-4 mt-4  '>
        <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 1 }} href='#contact' className='px-10 py-3 border border-white rounded-full bg-black text-white flex items-center gap-2'>Contact Me <Image src={assets.right_arrow_white} alt='' className='w-4' /></motion.a>

        <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ y: 30, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, delay: 1.1 }} href='/sample-resume.pdf' download className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-white dark:text-black'>My Resume <Image src={assets.download_icon} alt='' className='w-4' /></motion.a>
      </div>

    </div>
  )
}

export default Header
