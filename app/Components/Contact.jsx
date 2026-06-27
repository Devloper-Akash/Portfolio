"use client";

import { motion } from "motion/react";
import { assets } from '@/assets/assets'
import React,{useState} from 'react'
import Image from 'next/image';

const Contact = () => {

   const [result, setResult] = useState("");
   const [status, setStatus] = useState("idle");

  const onSubmit = async (event) => {
    event.preventDefault();
    setStatus("sending");
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "552bfebe-a203-4cb4-b6ed-06c96e38c094");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });

      const data = await response.json();

      if (data.success) {
        setStatus("success");
        setResult("Message sent successfully");
        event.target.reset();
      } else {
        console.log("Error", data);
        setStatus("error");
        setResult(data.message || "Message could not be sent");
      }
    } catch (error) {
      console.log("Submission error", error);
      setStatus("error");
      setResult("Message could not be sent");
    }
  };

  const statusStyles = {
    success: "text-emerald-600",
    error: "text-red-600",
    sending: "text-gray-500",
  };

  const renderStatusIcon = () => {
    if (status === "success") {
      return (
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-emerald-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.78-9.72a.75.75 0 0 0-1.06-1.06L9.25 10.69 7.78 9.22a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l4-4Z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    if (status === "error") {
      return (
        <svg
          aria-hidden="true"
          className="h-5 w-5 text-red-600"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm-2.53-10.53a.75.75 0 0 1 1.06 0L10 8.94l1.47-1.47a.75.75 0 1 1 1.06 1.06L11.06 10l1.47 1.47a.75.75 0 0 1-1.06 1.06L10 11.06l-1.47 1.47a.75.75 0 0 1-1.06-1.06L8.94 10 7.47 8.53a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    return null;
  };

  return (
    <div id='contact'  className='w-full px-[12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none'>
        <h4 className='text-center mb-2 text-lg font-Ovo'>Connect with me</h4>
        <h2 className='text-center mb-4 text-4xl sm:text-5xl font-sans font-extrabold tracking-tight text-blue-900 dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-sky-400 dark:to-indigo-500 drop-shadow-[0_0_10px_rgba(37,99,235,0.3)] dark:drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]'>
            {"Get in touch".split("").map((char, index) => (
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

        <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>I&apos;d love hear from you! if you have any questions, comments, or feedback, please use the form below.</p>

        <form onSubmit={onSubmit} className='max-w-2xl mx-auto mt-10 rounded-3xl border border-gray-200 bg-white/60 p-6 sm:p-10 backdrop-blur-xl shadow-[0_15px_40px_rgba(0,0,0,0.05)] dark:border-white/10 dark:bg-white/5 dark:shadow-[0_10px_30px_rgba(56,189,248,0.05)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] dark:hover:shadow-[0_15px_40px_rgba(56,189,248,0.15)] transition-all duration-700'>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <input type="text" placeholder='Enter your name' required className='w-full rounded-2xl border border-gray-300 bg-white/70 backdrop-blur-sm px-5 py-4 text-sm font-Outfit text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(37,99,235,0.2)] dark:border-white/15 dark:bg-[#140d1c]/80 dark:text-white dark:placeholder:text-white/40 dark:focus:border-sky-400 dark:focus:shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:-translate-y-0.5' name='name' />
            <input type="email" placeholder='Enter your email' required  className="w-full rounded-2xl border border-gray-300 bg-white/70 backdrop-blur-sm px-5 py-4 text-sm font-Outfit text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 focus:border-blue-500 focus:shadow-[0_0_15px_rgba(37,99,235,0.2)] dark:border-white/15 dark:bg-[#140d1c]/80 dark:text-white dark:placeholder:text-white/40 dark:focus:border-sky-400 dark:focus:shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:-translate-y-0.5" name='email' />
          </div>
          <textarea rows="6" placeholder='Enter your message' required  className="w-full rounded-2xl border border-gray-300 bg-white/70 backdrop-blur-sm px-5 py-4 text-sm font-Outfit text-gray-800 outline-none transition-all duration-300 placeholder:text-gray-400 resize-none focus:border-blue-500 focus:shadow-[0_0_15px_rgba(37,99,235,0.2)] dark:border-white/15 dark:bg-[#140d1c]/80 dark:text-white dark:placeholder:text-white/40 dark:focus:border-sky-400 dark:focus:shadow-[0_0_15px_rgba(56,189,248,0.3)] hover:-translate-y-0.5" name='message'></textarea>

          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="mt-6 py-4 px-10 w-max flex items-center justify-between gap-3 bg-black/90 dark:bg-white/10 dark:border dark:border-white/20 text-white rounded-full mx-auto shadow-[0_5px_15px_rgba(0,0,0,0.1)] hover:shadow-[0_8px_25px_rgba(37,99,235,0.4)] dark:hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] hover:bg-blue-600 dark:hover:bg-sky-500 transition-all duration-500 font-bold tracking-wide"
          >Submit now <Image src={assets.right_arrow_white} alt='' className='w-5 pl-1'/></motion.button>

          {result && (
            <p className={`mt-4 flex items-center justify-center gap-2 text-sm font-Outfit ${statusStyles[status] || "text-gray-700"}`}>
              {renderStatusIcon()}
              <span>{result}</span>
            </p>
          )}
        </form>
    </div>
  )
}

export default Contact
