"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FadeInUp from "./utils/FadeInUp";

export default function Hero() {
  const imageSrc = "/hero.webp";

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
      className="pt-24 pb-12 md:pt-20 md:pb-24 bg-accent dark:bg-gray-900 relative overflow-hidden transition-colors duration-300"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16 relative z-10">
        <div className="w-full md:w-1/2 text-center md:text-left">
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
        </div>

        <div className="w-full md:w-1/2 flex justify-center perspective-1000">
          <motion.div
            initial={{ opacity: 0, x: 50, rotateY: 10 }}
            whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative w-full md:w-4/5"
          >
            <motion.div
              animate={floatingAnimation}
              className="relative h-64 sm:h-80 w-full rounded-2xl shadow-2xl overflow-hidden border-4 border-white dark:border-gray-700"
            >
              <Image
                src={imageSrc}
                alt="Pertanian Modern"
                fill
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover"
              />
            </motion.div>

            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute -bottom-6 -left-6 bg-yellow-400 w-20 h-20 rounded-full blur-2xl opacity-40 z-[-1]"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
