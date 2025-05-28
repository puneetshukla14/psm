// app/page.tsx

'use client';

import React from 'react';
import Header from '@/components/Header';

const Page = () => {
  return (
    <main className="relative w-full h-screen overflow-hidden">
      {/* Header */}
      <Header />

      {/* Full-Screen Responsive YouTube Background */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="relative w-full h-full">
            <iframe
              className="absolute top-1/2 left-1/2 w-[177.77vh] h-[100vh] sm:w-[100vw] sm:h-[56.25vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              src="https://www.youtube.com/embed/GKJMrWXxjU8?autoplay=1&mute=1&loop=1&controls=0&playlist=GKJMrWXxjU8&modestbranding=1&rel=0&showinfo=0"
              title="Background Video"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>

      {/* Overlay Content */}
      <div className="flex items-center justify-center h-screen w-full text-white text-center px-4 bg-black/40">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
          Welcome to My Site
        </h1>
      </div>
    </main>
  );
};

export default Page;
