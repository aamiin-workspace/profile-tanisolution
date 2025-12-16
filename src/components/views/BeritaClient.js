'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image'; 
import { motion } from 'framer-motion';
import FadeInUp from '@/components/utils/FadeInUp';
import { StaggerContainer, StaggerItem } from '@/components/utils/StaggerContainer';

export default function BeritaClient({ initialNews }) {
  const [filter, setFilter] = useState('Semua');
  
  const allNews = initialNews || [];

  const filteredNews = filter === 'Semua' 
    ? allNews 
    : allNews.filter(item => item.category === filter);

  const featuredNews = filteredNews.length > 0 ? filteredNews[0] : null;
  const otherNews = filteredNews.length > 1 ? filteredNews.slice(1) : [];
  const categories = ['Semua', 'Kegiatan', 'Teknologi', 'Edukasi', 'Tips'];

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'short', year: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Filter Buttons */}
            <FadeInUp delay={0.3}>
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {categories.map((cat) => (
                        <motion.button 
                            key={cat}
                            onClick={() => setFilter(cat)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                                filter === cat 
                                ? 'bg-primary text-white shadow-lg transform scale-105' 
                                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700'
                            }`}
                        >
                            {cat}
                        </motion.button>
                    ))}
                </div>
            </FadeInUp>

            {/* Content */}
            {allNews.length === 0 ? (
                <div className="text-center py-20">
                    <p className="text-gray-500 dark:text-gray-400">Belum ada berita tersimpan.</p>
                </div>
            ) : featuredNews ? (
                <>
                    {/* Berita Utama */}
                    <FadeInUp delay={0.4}>
                        <div className="mb-12">
                            <motion.div 
                                whileHover={{ y: -5 }}
                                className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row group transition-all duration-300"
                            >
                                <Link href={`/berita/${featuredNews.id}`} className="md:w-2/3 h-64 md:h-[400px] overflow-hidden relative cursor-pointer block">
                                    <Image 
                                        src={featuredNews.image || '/placeholder.jpg'} 
                                        alt={featuredNews.title} 
                                        fill
                                        className="object-cover transform group-hover:scale-105 transition duration-700" 
                                    />
                                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded shadow-md z-10">
                                        {featuredNews.category}
                                    </div>
                                </Link>
                                <div className="md:w-1/3 p-8 flex flex-col justify-center">
                                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center">
                                        <i className="far fa-calendar-alt mr-2"></i> {formatDate(featuredNews.date)}
                                        <span className="mx-2">•</span>
                                        <i className="far fa-user mr-2"></i> {featuredNews.author}
                                    </div>
                                    <h2 className="text-2xl font-bold text-secondary dark:text-white mb-4 group-hover:text-primary transition">
                                        <Link href={`/berita/${featuredNews.id}`} className="hover:underline">
                                            {featuredNews.title}
                                        </Link>
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                                        {featuredNews.excerpt}
                                    </p>
                                    <Link href={`/berita/${featuredNews.id}`} className="inline-flex items-center text-primary font-bold hover:underline">
                                        Baca Selengkapnya <i className="fas fa-arrow-right ml-2"></i>
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </FadeInUp>

                    {/* Berita Lainnya - Staggered Grid */}
                    {otherNews.length > 0 && (
                        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherNews.map((news) => (
                                <StaggerItem key={news.id} className="h-full">
                                    <motion.div 
                                        whileHover={{ y: -10 }}
                                        className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col group h-full"
                                    >
                                        <Link href={`/berita/${news.id}`} className="h-48 overflow-hidden relative cursor-pointer block">
                                            <Image 
                                                src={news.image || '/placeholder.jpg'} 
                                                alt={news.title} 
                                                fill
                                                className="object-cover transform group-hover:scale-110 transition duration-500" 
                                            />
                                            <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-secondary dark:text-white text-xs font-bold px-3 py-1 rounded shadow-sm z-10">
                                                {news.category}
                                            </div>
                                        </Link>
                                        <div className="p-6 flex flex-col flex-grow">
                                            <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                                                <i className="far fa-calendar-alt mr-1"></i> {formatDate(news.date)}
                                            </div>
                                            <h3 className="text-lg font-bold text-secondary dark:text-white mb-3 group-hover:text-primary transition line-clamp-2">
                                                <Link href={`/berita/${news.id}`}>{news.title}</Link>
                                            </h3>
                                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                                                {news.excerpt}
                                            </p>
                                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                                <Link href={`/berita/${news.id}`} className="text-sm text-primary font-semibold hover:text-green-700 inline-flex items-center">
                                                    Baca Artikel <i className="fas fa-arrow-right ml-1 text-xs"></i>
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                </StaggerItem>
                            ))}
                        </StaggerContainer>
                    )}
                </>
            ) : (
                <div className="text-center py-20 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                    <i className="far fa-newspaper text-3xl text-gray-400 mb-4"></i>
                    <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">Tidak ada berita kategori ini</h3>
                </div>
            )}
            
        </div>
    </section>
  );
}