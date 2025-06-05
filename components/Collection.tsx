'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const nightImages = [
  '/images/card1.jpg',
  '/images/card2.jpg',
  '/images/card3.jpg',
  '/images/card4.jpg',
  '/images/card5.jpg',
  '/images/card6.jpg',
  '/images/card7.jpg',
  '/images/card8.jpg',
  '/images/card9.jpg',
  '/images/card10.jpg',
];

const goldenImages = [
  '/images/golden1.jpg',
  '/images/golden2.jpg',
  '/images/golden3.jpg',
  '/images/golden4.jpg',
  '/images/golden5.jpg',
  '/images/golden6.jpg',
  '/images/golden7.jpg',
  '/images/golden8.jpg',
  '/images/golden9.jpg',
  '/images/golden10.jpg',
];

function ImageSlider({ images, title }: { images: string[]; title: string }) {
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);
  const next = () => setIndex((prev) => (prev + 1) % images.length);

  return (
    <div className="relative w-full max-w-4xl aspect-[16/9] my-16 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={images[index]}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          whileHover={{ scale: 1.01 }}
          className="absolute w-full h-full rounded-2xl p-4 sm:p-6 bg-white/5 backdrop-blur-xl border border-white/10 overflow-hidden shadow-[0_0_60px_0_rgba(0,255,255,0.05)] hover:shadow-[0_0_100px_0_rgba(0,255,255,0.2)] transition-all duration-300 group"
        >
          <div className="absolute -inset-2 rounded-2xl bg-cyan-500/10 blur-3xl z-[-1]" />
          <div className="relative w-full h-full overflow-hidden rounded-xl">
            <img
              src={images[index]}
              alt={`${title} ${index + 1}`}
              className="w-full h-full object-cover rounded-xl transition-transform duration-500 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition duration-300 rounded-xl" />

            {/* Title */}
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-10">
              <h2 className="text-white text-lg sm:text-2xl font-semibold drop-shadow-xl tracking-tight leading-tight font-[Open_Sans]">
                {title}
              </h2>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Arrows */}
      <button
        onClick={prev}
        className="absolute left-6 sm:left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
        bg-white/10 border border-white/30 backdrop-blur-md text-white transition-transform duration-50 hover:scale-110 group
        shadow-[0_0_20px_rgba(0,191,255,0.3)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6 group-hover:-translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={next}
        className="absolute right-6 sm:right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center
        bg-white/10 border border-white/30 backdrop-blur-md text-white transition-transform duration-500 hover:scale-110 group
        shadow-[0_0_20px_rgba(0,191,255,0.3)]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 sm:h-6 sm:w-6 group-hover:translate-x-1 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

export default function ValidatedSlider() {
  return (
    <section className="w-full min-h-screen bg-black flex flex-col items-center px-6 overflow-hidden font-[Open_Sans]">
      <ImageSlider images={nightImages} title="Through the Lens of Night" />
      <ImageSlider images={goldenImages} title="Golden Hours" />
    </section>
  );
}
