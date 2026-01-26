"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import FadeInUp from "./utils/FadeInUp";

export default function Hero({ latestNews = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (latestNews.length <= 1) return; 

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % latestNews.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [latestNews.length]);

  const defaultImageSrc = "/hero.webp";

  const floatingAnimation = {
    y: [-15, 15, -15],
    rotate: [0, 1, -1, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section
      id="home"
      className="pt-28 pb-12 md:pt-24 md:pb-24 bg-accent dark:bg-gray-900 relative overflow-hidden transition-colors duration-300 min-h-[90vh] flex items-center"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 45, 0],
          opacity: [0.2, 0.3, 0.2],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-primary blur-3xl z-0 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8 md:gap-12 relative z-10 w-full">
        
        <div className="w-full md:w-5/12 text-center md:text-left">
          <FadeInUp delay={0.1}>
            <span className="inline-block py-1 px-3 rounded-full bg-green-100 text-primary dark:bg-green-900/30 dark:text-green-400 text-sm font-semibold mb-4 border border-green-200 dark:border-green-800">
              Start-up Agritech Manufaktur
            </span>
          </FadeInUp>

          <FadeInUp delay={0.2}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary dark:text-white mb-4 leading-tight">
              Bersama Kami <br />
              <span className="text-primary dark:text-green-400">
                Petani Punya Solusi!
              </span>
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.3}>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Menciptakan ekosistem pertanian yang lebih modern, efisien, dan
              berkelanjutan melalui inovasi alat semi mekanisasi.
            </p>
          </FadeInUp>
          
          <FadeInUp delay={0.4}>
             <Link href="/layanan" className="btn-primary hidden md:inline-flex">
                Jelajahi Solusi
             </Link>
          </FadeInUp>
        </div>

        <div className="w-full md:w-7/12 relative">
          
          {latestNews.length > 0 ? (
            <div className="relative w-full">
              <motion.div 
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative h-[400px] md:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 group"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full"
                  >
                    <Link href={`/berita/${latestNews[currentIndex].id}`} className="block w-full h-full relative cursor-pointer">
                      
                      <Image
                        src={latestNews[currentIndex].image || '/placeholder.jpg'}
                        alt={latestNews[currentIndex].title}
                        fill
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-90" />

                      <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 text-white z-10">
                        <span className="inline-block bg-primary text-white text-xs font-bold px-2 py-1 rounded mb-2">
                          {latestNews[currentIndex].category}
                        </span>
                        <h3 className="text-xl md:text-3xl font-bold leading-tight drop-shadow-md hover:text-green-400 transition-colors line-clamp-2">
                          {latestNews[currentIndex].title}
                        </h3>
                        <div className="mt-2 flex items-center text-sm text-gray-300 font-medium">
                           <span>Baca Selengkapnya</span>
                           <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                </AnimatePresence>

                <div className="absolute bottom-6 right-6 z-20 flex space-x-2">
                  {latestNews.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        idx === currentIndex ? "w-8 bg-primary" : "w-2 bg-white/50 hover:bg-white"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </motion.div>

              <div className="mt-6 flex justify-end">
                 <Link href="/berita" className="group flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-primary transition-colors">
                    Lihat Berita Lainnya
                    <span className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                       <i className="fas fa-arrow-right"></i>
                    </span>
                 </Link>
              </div>

            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="relative w-full"
            >
              <motion.div
                animate={floatingAnimation}
                className="relative h-64 sm:h-80 w-full rounded-2xl shadow-2xl overflow-hidden border-4 border-white dark:border-gray-700"
              >
                <Image
                  src={defaultImageSrc}
                  alt="Pertanian Modern"
                  fill
                  priority
                  className="object-cover"
                />
              </motion.div>
            </motion.div>
          )}

        </div>
      </div>
    </section>
  );
}