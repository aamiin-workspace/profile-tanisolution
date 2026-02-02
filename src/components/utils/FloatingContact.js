'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FloatingContact() {
  const [isVisible, setIsVisible] = useState(false);

  const phoneNumber = "6289524187347"; 
  const defaultMessage = "Halo Tani Solution, saya ingin bertanya mengenai produk/layanan Anda.";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-6 right-6 z-[60] flex items-center gap-2 group"
        >
          <span className="bg-white dark:bg-gray-800 text-gray-800 dark:text-white px-3 py-1 rounded-lg shadow-md text-sm font-semibold opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300 hidden md:block">
            Hubungi Kami
          </span>

          <div className="relative">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping"></span>
            
            <div className="relative w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 text-white">
              <i className="fab fa-whatsapp text-3xl"></i>
            </div>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  );
}