'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, SVGMotionProps } from 'framer-motion';

const Header = () => {
  const [sticky, setSticky] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const lastScrollY = useRef(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);

  // Fix: explicitly type props as SVGMotionProps for path elements
  const Path = (props: SVGMotionProps<SVGPathElement>) => (
    <motion.path
      fill="transparent"
      strokeWidth="2.5"
      stroke="white"
      strokeLinecap="round"
      {...props}
    />
  );

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          setSticky(currentScrollY > 50);

          if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
            setHeaderVisible(false);
          } else {
            setHeaderVisible(true);
          }

          lastScrollY.current = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { title: 'Home', href: '/' },
    { title: 'Gallery', href: '/gallery' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Desktop Header */}
      <motion.header
        ref={headerRef}
        initial={false}
        animate={{
          height: 55,
          backgroundColor: 'black',
          backdropFilter: 'none',
          y: headerVisible ? 0 : -72,
          boxShadow: sticky ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none',
        }}
        transition={{ duration: 0.5 }}
        className="hidden md:block fixed top-0 left-0 right-0 z-50 w-full overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center h-[72px] md:h-[60px]">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="SS Innovations"
              width={80}
              height={25}
              className="cursor-pointer"
              priority
            />
          </Link>

          <nav className="hidden md:flex space-x-10 text-white font-opensans">
            {menuItems.map((item, index) => (
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
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>
        </div>

        {/* Glowing Line */}
        <motion.div
          className="absolute bottom-0 left-0 h-[1.6px] w-full"
          style={{
            backgroundImage:
              'linear-gradient(to right, #3b82f6 0%, #3b82f6 80%, rgba(59, 130, 246, 0) 100%)',
          }}
          initial={{ width: 0, opacity: 0, x: -100 }}
          animate={{ width: '70%', opacity: 1, x: 0 }}
          transition={{ duration: 3.5 }}
        />
      </motion.header>

      {/* Mobile Header with Hamburger and Logo */}
      <header
        className={`md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 bg-black/90 backdrop-blur-sm transition-transform duration-300 ${
          headerVisible ? 'translate-y-0' : '-translate-y-20'
        }`}
      >
        {/* Hamburger Button */}
        <button
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          type="button"
          className="relative w-10 h-10 cursor-pointer z-50 rounded-full bg-black/60 hover:bg-black/80 transition"
        >
          <svg width="24" height="24" viewBox="0 0 24 24">
            <Path
              variants={{
                closed: { d: 'M 3 6 L 21 6' },
                open: { d: 'M 6 18 L 18 6' },
              }}
              initial="closed"
              animate={mobileMenuOpen ? 'open' : 'closed'}
              transition={{ duration: 0.3 }}
            />
            <Path
              d="M 3 12 L 21 12"
              variants={{
                closed: { opacity: 1 },
                open: { opacity: 0 },
              }}
              initial="closed"
              animate={mobileMenuOpen ? 'open' : 'closed'}
              transition={{ duration: 0.3 }}
            />
            <Path
              variants={{
                closed: { d: 'M 3 18 L 21 18' },
                open: { d: 'M 6 6 L 18 18' },
              }}
              initial="closed"
              animate={mobileMenuOpen ? 'open' : 'closed'}
              transition={{ duration: 0.3 }}
            />
          </svg>
        </button>

        {/* Mobile Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="SS Innovations"
            width={100}
            height={28}
            className="object-contain"
            priority
          />
        </Link>
        {/* Empty space for right alignment */}
        <div className="w-10" />
      </header>

      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              aria-hidden="true"
            />

            <motion.aside
              className="fixed top-0 left-0 h-full w-[80vw] max-w-[320px] bg-black text-white z-50 p-6 shadow-xl flex flex-col"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              aria-hidden={!mobileMenuOpen}
            >
              {/* Top bar with logo and close button */}
              <div className="flex items-center justify-between mb-8">
                <Link href="/" onClick={closeMobileMenu} className="flex items-center">
                  <Image
                    src="/logo.png"
                    alt="SS Innovations"
                    width={120}
                    height={32}
                    className="object-contain"
                    priority
                  />
                </Link>

                {/* Close button */}
                <button
                  onClick={closeMobileMenu}
                  aria-label="Close menu"
                  className="text-white w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition"
                >
                  {/* Cross Icon (SVG) */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <nav>
                <ul className="space-y-6 text-lg font-medium tracking-wide font-opensans">
                  {menuItems.map((item, index) => (
                    <li key={index}>
                      <Link
                        href={item.href}
                        onClick={closeMobileMenu}
                        onBlur={closeMobileMenu}
                        className="block transition-colors duration-300 hover:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {item.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
