'use client';

import Link from 'next/link';
import Image from 'next/image';
import { redirect, useRouter } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, SVGMotionProps } from 'framer-motion';
import SocialIcons from '@/components/SocialIcons'; // 👈 Import this
import { X, Instagram, Linkedin, Github } from 'lucide-react';


const Header = () => {
  const router = useRouter();
  const [isToggled, setIsToggled] = useState(false);
  const [sticky, setSticky] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement | null>(null);

  const handleToggle = () => {
    setIsToggled(true);
    setTimeout(() => {
      router.push('/developer');
    }, 300);
  };

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
          setHeaderVisible(currentScrollY < lastScrollY.current || currentScrollY < 50);
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
          height: 50,
          backgroundColor: 'black',
          backdropFilter: 'none',
          y: headerVisible ? 0 : -72,
          boxShadow: sticky ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none',
        }}
        transition={{ duration: 0.5 }}
        className="hidden md:block fixed top-0 left-0 right-0 z-50 w-full overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-[72px] md:h-[50px] relative">

  {/* Left: Logo */}
  <div className="absolute left-[-50] top-1/2 transform -translate-y-1/2">
    <Link href="/">
      <Image
        src="/images/logo.png"
        alt="puneet shukla"
        width={100}
        height={30}
        className="cursor-pointer"
        priority
      />
    </Link>
  </div>

  {/* Center: Navigation */}
  <nav className="mx-auto flex space-x-10 text-white font-opensans">
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

  {/* Right: Toggle Button */}
<div className="absolute right-[-20px] top-1/2 transform -translate-y-1/2">
  <button
    onClick={handleToggle}
    className="w-48 h-10 flex items-center bg-white/10 rounded-full px-2 transition-colors duration-300 border border-white/30 hover:bg-white/20 relative overflow-hidden"
  >
    {/* Toggle Knob */}
    <motion.div
      layout
      className="w-6 h-6 rounded-full bg-white shadow-md z-10"
      animate={{ x: isToggled ? 130 : 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    />

    {/* Glowing Developer Mode Text */}
    <span className="ml-3 text-sm font-semibold text-white relative z-0">
      <span
        className={`${
          !isToggled ? "glow-text" : ""
        } transition-opacity duration-500`}
      >
        Developer Mode
      </span>
    </span>
  </button>
</div>


</div>


        {/* Glowing Bottom Line */}
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

      {/* Mobile Header */}
<header
  className={`md:hidden fixed top-0 left-0 right-0 z-50 px-4 py-3 transition-transform duration-300 ${
    headerVisible ? 'translate-y-0' : '-translate-y-20'
  }`}
>
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
</header>



<SocialIcons />


      {/* Mobile Sidebar Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
            />

<motion.aside


  className="fixed top-0 left-0 h-full w-[80vw] max-w-[320px] bg-black text-white z-50 p-6 shadow-xl flex flex-col"
  initial={{ x: '-100%', opacity: 0 }}
  animate={{ x: 0, opacity: 1 }}
  exit={{ x: '-100%', opacity: 0 }}
  transition={{
    x: { type: 'spring', stiffness: 100, damping: 30, mass: 0.8 },
    opacity: { duration: 0.4, ease: 'easeInOut' },
  }}
>




<div className="relative mb-8 flex items-center justify-center -mt-5">
  <Link href="/" onClick={closeMobileMenu} className="flex items-center -mt-3">
    <Image
      src="/images/logo.png"
      alt="SS Innovations"
      width={120}
      height={32}
      className="object-contain"
      priority
    />
  </Link>
<button
  onClick={closeMobileMenu}
  aria-label="Close menu"
  style={{ left: '-15px' }}
  className="absolute text-white w-10 h-10 flex items-center justify-center rounded-full bg-white/40 hover:bg-white/20 transition -mt-3"
>
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




{/* Mobile Sidebar Menu buttons jiame hmae lighting ka change karna haiisme ek gloiwng lme aani vhaiye blur color ki jo toggle krte hi glow ho  */}
<nav className="space-y-4 px-4 pt-0 pb-3 text-left">

  {/* Mobile Bottom Toggle (Developer Mode) */}
<motion.div
  initial={{ y: 100, opacity: 0 }}
  animate={{ y: 0, opacity: 1 }}
  exit={{ y: 100, opacity: 0 }}
  transition={{ type: "spring", stiffness: 120, damping: 20 }}
  className="fixed bottom-20 left-1/6 transform -translate-x-1/2 sm:hidden z-50"
>
  <div className="px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg flex items-center space-x-2">
    <span className="text-white text-sm font-medium relative overflow-hidden">
      <span className="inline-block animate-text-glow bg-gradient-to-r from-blue-400 via-white to-blue-400 bg-clip-text text-transparent">
        Developer Mode
      </span>
    </span>
    <button
      onClick={handleToggle}
      className="w-14 h-7 flex items-center bg-white/10 rounded-full p-1 transition-colors duration-300 border border-white/30 hover:bg-white/20 relative overflow-hidden"
    >
      <motion.div
        layout
        className="w-5 h-5 rounded-full bg-white shadow-md z-10"
        animate={{ x: isToggled ? 28 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      />
      {!isToggled && (
        <motion.div
          initial={{ x: 6, opacity: 0 }}
          animate={{ x: 2, opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="absolute left-1 text-white text-xs pointer-events-none z-0"
        >
          ←
        </motion.div>
      )}
    </button>
  </div>
</motion.div>
  {menuItems.map((item, index) => (
    <Link
      key={index}
      href={item.href}
      onClick={closeMobileMenu}
      className="block w-full rounded-lg px-4 py-2 text-sm font-medium text-white bg-white/10 border border-white/20 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-blue-600/80 hover:border-white/40 hover:shadow-md hover:scale-[1.02]"
    >
      {item.title}
    </Link>
  ))}
</nav>

{/* Bottom Social Icons */}
      <div className="mt-auto pt-6 flex justify-center space-x-6">
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-pink-500 transition-transform duration-300 hover:scale-110"
        >
          <Instagram className="w-6 h-6" />
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-blue-400 transition-transform duration-300 hover:scale-110"
        >
          <Linkedin className="w-6 h-6" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-gray-300 transition-transform duration-300 hover:scale-110"
        >
          <Github className="w-6 h-6" />
        </a>
      </div>

            </motion.aside>
            
          </>
        )}
      </AnimatePresence>
    </>
  );
};
export default Header;