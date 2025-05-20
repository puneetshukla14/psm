'use client'

import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/video1.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Text Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 text-white">
        <motion.h1
          className="text-4xl md:text-6xl font-bold mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Welcome to SS Innovations
        </motion.h1>

        <motion.button
          className="mt-4 px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold rounded-full shadow-lg hover:scale-105 transition-transform"
          whileHover={{ scale: 1.1 }}
        >
          Request a Demo
        </motion.button>
      </div>
    </section>
  )
}
