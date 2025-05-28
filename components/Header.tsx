'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { AnimatePresence, motion } from 'framer-motion';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const headerRef = useRef<HTMLElement | null>(null);

  const handleScroll = () => {
    setSticky(window.scrollY > 50);
    if (window.scrollY > lastScrollY && window.scrollY > 50) {
      setHeaderVisible(false);
    } else {
      setHeaderVisible(true);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <motion.header
      ref={headerRef}
      initial={false}
      animate={{
        height: 55,
        backgroundColor: 'black',
        backdropFilter: 'none',
        y: headerVisible ? 0 : -72,
      }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 w-full overflow-hidden shadow-lg"
    >
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-[72px] md:h-[60px]">
        <Link href="/" className="ml-[-250px]">
          <Image
            src="/logo.png"
            alt="SS Innovations"
            width={80}
            height={25}
            className="cursor-pointer"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-10 text-white font-opensans">
          {[
            { title: 'Home', href: '/' },
            { title: 'Gallery', href: '/gallery' },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="group relative text-white transition hover:text-blue-400"
              style={{
                fontFamily: "'Open Sans', sans-serif",
                fontSize: '13px',
                fontWeight: '400',
              }}
            >
              {item.title}
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-white"
        >
          {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Glowing Line in the Default Header */}
      <AnimatePresence>
        {headerVisible && (
          <motion.div
            key="scroll-line"
            className="absolute bottom-0 left-0 h-[1.6px] w-full"
            style={{
              backgroundImage:
                'linear-gradient(to right, #3b82f6 0%, #3b82f6 80%, rgba(59, 130, 246, 0) 100%)',
            }}
            initial={{ width: 0, opacity: 0, x: -100 }}
            animate={{ width: '70%', opacity: 1, x: 0 }}
            exit={{ width: 0, opacity: 0, x: 100 }}
            transition={{ duration: 3.5 }}
          />
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
