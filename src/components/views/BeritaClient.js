'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { motion } from 'framer-motion';
import FadeInUp from '@/components/utils/FadeInUp';

// --- Komponen Stagger (Animasi Berurutan) ---
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function BeritaClient({ initialNews }) {
  const [filter, setFilter] = useState('Semua');
  
  const allNews = initialNews || [];

  // Logic Filter
  const filteredNews = filter === 'Semua' 
    ? allNews 
    : allNews.filter(item => item.category === filter);

  const featuredNews = filteredNews.length > 0 ? filteredNews[0] : null;
  const otherNews = filteredNews.length > 1 ? filteredNews.slice(1) : [];
  
  const categories = ['Semua', 'Kegiatan', 'Teknologi', 'Edukasi', 'Tips'];

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <>
      {/* --- HEADER SECTION (BARU) --- */}
      {/* pt-32 memastikan konten turun ke bawah navbar */}
      <header className="pt-32 pb-12 bg-green-900 text-white relative overflow-hidden">
        {/* Hiasan Background (Blob) */}
        <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, -45, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-green-500 opacity-20 blur-3xl"
        ></motion.div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <FadeInUp>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Berita & <span className="text-green-400">Artikel</span></h1>
            </FadeInUp>
            <FadeInUp delay={0.1}>
                <p className="text-gray-300 text-lg">Update terkini seputar teknologi & kegiatan Tani Solution.</p>
            </FadeInUp>
        </div>
      </header>

      {/* --- MAIN CONTENT --- */}
      <section className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* --- Filter Buttons --- */}
              <FadeInUp delay={0.2}>
                  <div className="flex flex-wrap justify-center gap-3 mb-12">
                      {categories.map((cat) => (
                          <motion.button 
                              key={cat}
                              onClick={() => setFilter(cat)}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`px-6 py-2 rounded-full text-sm font-bold transition-all shadow-sm ${
                                  filter === cat 
                                  ? 'bg-green-600 text-white shadow-lg transform scale-105' 
                                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                              }`}
                          >
                              {cat}
                          </motion.button>
                      ))}
                  </div>
              </FadeInUp>

              {/* --- Content Area --- */}
              {allNews.length === 0 ? (
                  <div className="text-center py-20">
                      <p className="text-gray-500 dark:text-gray-400">Belum ada berita tersimpan.</p>
                  </div>
              ) : !featuredNews ? (
                  // Jika hasil filter kosong
                   <div className="text-center py-20 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                      <i className="far fa-newspaper text-3xl text-gray-400 mb-4"></i>
                      <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">Tidak ada berita kategori "{filter}"</h3>
                  </div>
              ) : (
                  <>
                      {/* --- Berita Utama (Featured) --- */}
                      <FadeInUp delay={0.3}>
                          <div className="mb-12">
                              <motion.div 
                                  whileHover={{ y: -5 }}
                                  className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row group transition-all duration-300"
                              >
                                  <Link href={`/berita/${featuredNews.id}`} className="md:w-2/3 h-64 md:h-[400px] overflow-hidden relative cursor-pointer block bg-gray-200">
                                      <Image 
                                          src={featuredNews.image || '/placeholder.jpg'} 
                                          alt={featuredNews.title} 
                                          fill
                                          className="object-cover transform group-hover:scale-105 transition duration-700" 
                                      />
                                      <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded shadow-md z-10 uppercase tracking-wider">
                                          {featuredNews.category}
                                      </div>
                                  </Link>
                                  <div className="md:w-1/3 p-8 flex flex-col justify-center">
                                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                                          <span className="mr-2">📅 {formatDate(featuredNews.date)}</span>
                                      </div>
                                      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 group-hover:text-green-600 transition">
                                          <Link href={`/berita/${featuredNews.id}`} className="hover:underline">
                                              {featuredNews.title}
                                          </Link>
                                      </h2>
                                      <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                                          {featuredNews.excerpt}
                                      </p>
                                      <Link href={`/berita/${featuredNews.id}`} className="inline-flex items-center text-green-600 font-bold hover:underline">
                                          Baca Selengkapnya →
                                      </Link>
                                  </div>
                              </motion.div>
                          </div>
                      </FadeInUp>

                      {/* --- Berita Lainnya (Grid) --- */}
                      {otherNews.length > 0 && (
                          <motion.div 
                              variants={container}
                              initial="hidden"
                              whileInView="show"
                              viewport={{ once: true }}
                              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                          >
                              {otherNews.map((news) => (
                                  <motion.div key={news.id} variants={itemAnim} className="h-full">
                                      <div 
                                          className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col group h-full"
                                      >
                                          <Link href={`/berita/${news.id}`} className="h-48 overflow-hidden relative cursor-pointer block bg-gray-200">
                                              <Image 
                                                  src={news.image || '/placeholder.jpg'} 
                                                  alt={news.title} 
                                                  fill
                                                  className="object-cover transform group-hover:scale-110 transition duration-500" 
                                              />
                                              <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-green-700 dark:text-white text-xs font-bold px-3 py-1 rounded shadow-sm z-10 uppercase">
                                                  {news.category}
                                              </div>
                                          </Link>
                                          <div className="p-6 flex flex-col flex-grow">
                                              <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                                                  <span>📅 {formatDate(news.date)}</span>
                                              </div>
                                              <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-3 group-hover:text-green-600 transition line-clamp-2">
                                                  <Link href={`/berita/${news.id}`}>{news.title}</Link>
                                              </h3>
                                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                                                  {news.excerpt}
                                              </p>
                                              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                                  <Link href={`/berita/${news.id}`} className="text-sm text-green-600 font-semibold hover:text-green-800 inline-flex items-center">
                                                      Baca Artikel →
                                                  </Link>
                                              </div>
                                          </div>
                                      </div>
                                  </motion.div>
                              ))}
                          </motion.div>
                      )}
                  </>
              )}
              
          </div>
      </section>
    </>
  );
}