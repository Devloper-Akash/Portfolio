'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from "motion/react";
import Image from 'next/image';
import { certificateData, assets } from '@/assets/assets';

const Certificates = () => {
    const [selectedCert, setSelectedCert] = useState(null);

    return (
        <div id='certificates' className='w-full px-[12%] py-10 scroll-mt-20'>
            <h4 className='text-center mb-2 text-lg font-Ovo'>My Achievements</h4>
            <h2 className='text-center mb-4 text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-blue-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-sky-400 dark:to-indigo-500 drop-shadow-[0_0_10px_rgba(37,99,235,0.3)] dark:drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]'>
                {"Certificates".split("").map((char, index) => (
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

            <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>Explore my certifications and courses completed to enhance my skills.</p>

            <div className='grid grid-cols-auto gap-8 my-10 sm:grid-cols-2 lg:grid-cols-3'>
                {certificateData.map((cert, index) => (
                    <motion.div 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        key={index} 
                        onClick={() => setSelectedCert(cert)}
                        className='w-full cursor-pointer relative bg-white dark:bg-[#1d1527] rounded-2xl p-4 shadow-lg hover:shadow-[0_15px_40px_rgba(37,99,235,0.3)] dark:shadow-none dark:hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-500 border border-gray-200 dark:border-white/10 flex flex-col items-center group'
                    >
                        <div className="w-full aspect-[4/3] relative rounded-xl overflow-hidden mb-4 bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10">
                            <Image src={cert.image} alt={cert.title} fill className="object-contain p-2 transition-transform duration-500 group-hover:scale-105" />
                        </div>
                        <h3 className='text-lg font-bold text-gray-900 dark:text-white mb-1 text-center'>{cert.title}</h3>
                        <p className='text-sm text-gray-600 dark:text-gray-300 text-center mb-3'>{cert.issuer}</p>
                        
                        <div className='mt-auto flex items-center gap-2 text-blue-600 dark:text-sky-400 text-sm font-semibold opacity-80 group-hover:opacity-100 transition-opacity'>
                            View Details 
                            <Image src={assets.right_arrow_bold} alt='' className='w-3 dark:hidden group-hover:translate-x-1 transition-transform'/>
                            <Image src={assets.right_arrow_bold_dark} alt='' className='hidden w-3 dark:block group-hover:translate-x-1 transition-transform'/>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Modal for viewing certificate details */}
            <AnimatePresence>
                {selectedCert && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm'
                        onClick={() => setSelectedCert(null)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                            className='bg-white dark:bg-[#1d1527] w-full max-w-4xl rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-white/20'
                        >
                            <div className='w-full md:w-3/5 aspect-[4/3] relative bg-gray-100 dark:bg-black/50 p-4'>
                                <Image src={selectedCert.image} alt={selectedCert.title} fill className='object-contain drop-shadow-xl' />
                            </div>
                            <div className='w-full md:w-2/5 p-8 flex flex-col justify-center relative'>
                                <button 
                                    onClick={() => setSelectedCert(null)}
                                    className='absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 transition-colors'
                                >
                                    <Image src={assets.close_black} alt="Close" className='w-3 dark:hidden' />
                                    <Image src={assets.close_white} alt="Close" className='w-3 hidden dark:block' />
                                </button>
                                <motion.h3 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className='text-2xl font-bold text-gray-900 dark:text-white mb-2'
                                >
                                    {selectedCert.title}
                                </motion.h3>
                                <motion.p 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className='text-blue-600 dark:text-sky-400 font-semibold mb-4 text-lg'
                                >
                                    {selectedCert.issuer}
                                </motion.p>
                                <motion.p 
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className='text-gray-700 dark:text-gray-300 mb-6 leading-relaxed'
                                >
                                    {selectedCert.description}
                                </motion.p>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <span className="inline-block bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 text-xs font-medium px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800/50">
                                        Completed: {selectedCert.date}
                                    </span>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default Certificates
