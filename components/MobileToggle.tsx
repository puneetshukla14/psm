'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';

type MobileToggleProps = {
  isOpen: boolean;
  toggle: () => void;
};

const MobileToggle = ({ isOpen, toggle }: MobileToggleProps) => {
  const router = useRouter();

  const topLine = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: 45, y: 7 },
  };
  const middleLine = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };
  const bottomLine = {
    closed: { rotate: 0, y: 0 },
    open: { rotate: -45, y: -7 },
  };

  const handleNavigate = (href: string) => {
    router.push(href);
    toggle();
  };

  return (
    <div className="relative z-50 flex flex-col items-center">
      {/* Hamburger Button always visible */}
      <button
        onClick={toggle}
        aria-label="Toggle menu"
        className="w-8 h-8 flex flex-col justify-center items-center gap-1 cursor-pointer"
        type="button"
      >
        <motion.span
          className="block w-7 h-[3px] bg-white rounded-sm"
          animate={isOpen ? 'open' : 'closed'}
          variants={topLine}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block w-7 h-[3px] bg-white rounded-sm"
          animate={isOpen ? 'open' : 'closed'}
          variants={middleLine}
          transition={{ duration: 0.3 }}
        />
        <motion.span
          className="block w-7 h-[3px] bg-white rounded-sm"
          animate={isOpen ? 'open' : 'closed'}
          variants={bottomLine}
          transition={{ duration: 0.3 }}
        />
      </button>

      {/* Menu buttons - positioned absolutely below the toggle */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 w-max bg-black p-4 rounded-md shadow-lg flex flex-col space-y-3"
          >
            <button
              onClick={() => handleNavigate('/gallery')}
              className="text-white text-lg font-semibold hover:text-blue-400 text-left"
            >
              Gallery
            </button>
            <button
              onClick={() => handleNavigate('/')}
              className="text-white text-lg font-semibold hover:text-blue-400 text-left"
            >
              Home
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileToggle;
