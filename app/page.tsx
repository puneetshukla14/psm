'use client';

import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/Header';
import { PlayCircle } from 'lucide-react';
import Collection from '@/components/Collection';

const Page = () => {
  const playerRef = useRef<any>(null);
  const [isPlayerReady, setIsPlayerReady] = useState(false);

  // Load YouTube API
  useEffect(() => {
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    // Global callback when API is ready
    (window as any).onYouTubeIframeAPIReady = () => {
      playerRef.current = new (window as any).YT.Player('yt-bg-player', {
        videoId: 'GKJMrWXxjU8',
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          controls: 0,
          playlist: 'GKJMrWXxjU8',
          modestbranding: 1,
          showinfo: 0,
          rel: 0,
        },
        events: {
          onReady: () => setIsPlayerReady(true),
        },
      });
    };
  }, []);

  // Handle visibility change
  useEffect(() => {
    const handleVisibility = () => {
      if (isPlayerReady && playerRef.current?.pauseVideo && playerRef.current?.playVideo) {
        if (document.hidden) {
          playerRef.current.pauseVideo();
        } else {
          playerRef.current.playVideo();
        }
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [isPlayerReady]);

  return (
    <>
      <main className="relative w-full h-screen overflow-hidden text-white">
        <Header />

        {/* YouTube Background */}
        <div className="fixed top-[-25] left-0 w-full h-full -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="relative w-full h-full">
              <div
                id="yt-bg-player"
                className="absolute top-[58%] sm:top-1/2 left-1/2 w-[177.77vh] h-[100vh] sm:w-[100vw] sm:h-[56.25vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              ></div>
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-start px-4 sm:px-8 md:px-16 lg:px-24 bg-gradient-to-r from-black/80 via-black/60 to-transparent">
          <div className="max-w-2xl space-y-6 animate-fade-in">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight leading-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.6)] font-sans">
              <span className="font-extralight">Braj Ki</span>{' '}
              <span className="font-bold">Holi</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 font-light leading-relaxed drop-shadow-md font-sans">
              A divine explosion of <span className="font-semibold text-white">color</span>,{' '}
              <span className="font-semibold text-white">culture</span>, and{' '}
              <span className="font-semibold text-white">devotion</span> — captured in its
              purest form from the sacred lands of{' '}
              <span className="text-white font-semibold">Mathura</span> and{' '}
              <span className="text-white font-semibold">Vrindavan</span>, where legends dance
              with every drop of color.
            </p>

            <button className="relative bg-gradient-to-r from-[rgb(31,73,138)] to-[rgb(10,24,37)] hover:brightness-110 transition-all duration-300 text-white font-semibold py-3 px-6 sm:px-8 rounded-md text-base sm:text-lg shadow-[0_4px_20px_rgba(31,73,138,0.5)] hover:shadow-[0_0_30px_rgba(31,73,138,0.6)] transform-gpu hover:scale-105 flex items-center gap-2 sm:gap-3 ring-1 ring-white/10 ring-inset">
              <PlayCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white drop-shadow-md" />
              <span className="z-10 relative">Watch Now</span>
              <span className="absolute inset-0 rounded-md bg-gradient-to-br from-white/10 to-white/5 opacity-0 hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
            </button>
          </div>
        </div>
      </main>

      {/* Collection Section */}
      <Collection />
    </>
  );
};

export default Page;
