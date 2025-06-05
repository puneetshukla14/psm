// SocialIcons.tsx
'use client';

import React from 'react';
import { Instagram, Linkedin, Github } from 'lucide-react';

const SocialIcons = () => {
  return (
    // Desktop View only
    <div className="hidden md:flex fixed right-4 top-1/2 -translate-y-1/2 flex-col items-center space-y-4 z-50">
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-pink-500 transition-transform duration-300 hover:scale-110">
        <Instagram className="w-6 h-6" />
      </a>
      <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-blue-400 transition-transform duration-300 hover:scale-110">
        <Linkedin className="w-6 h-6" />
      </a>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300 transition-transform duration-300 hover:scale-110">
        <Github className="w-6 h-6" />
      </a>
    </div>
  );
};

export default SocialIcons;
