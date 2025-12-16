'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import FadeInUp from '@/components/utils/FadeInUp';

export default function DetailBeritaClient({ news }) {
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <div className="pt-24 pb-16 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Navigasi Kembali */}
            <FadeInUp>
                <div className="mb-6">
                    <Link href="/berita" className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-green-400 transition text-sm flex items-center group">
                        <i className="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i> Kembali ke Berita
                    </Link>
                </div>
            </FadeInUp>

            {/* Header Artikel */}
            <div className="mb-8 text-center md:text-left">
                <FadeInUp delay={0.1}>
                    <span className="inline-block bg-green-100 text-primary dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
                        {news.category}
                    </span>
                </FadeInUp>
                <FadeInUp delay={0.2}>
                    <h1 className="text-3xl md:text-5xl font-bold text-secondary dark:text-white mb-4 leading-tight">
                        {news.title}
                    </h1>
                </FadeInUp>
                <FadeInUp delay={0.3}>
                    <div className="flex items-center justify-center md:justify-start text-gray-500 dark:text-gray-400 text-sm space-x-4">
                        <span><i className="far fa-calendar-alt mr-2"></i>{formatDate(news.date)}</span>
                        <span><i className="far fa-user mr-2"></i>{news.author}</span>
                    </div>
                </FadeInUp>
            </div>

            {/* Gambar Utama */}
            <FadeInUp delay={0.4}>
                <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 relative h-[300px] md:h-[500px] w-full">
                    <Image 
                        src={news.image || '/placeholder.jpg'} 
                        alt={news.title} 
                        fill
                        priority
                        className="object-cover"
                    />
                </div>
            </FadeInUp>

            {/* Konten Artikel */}
            <FadeInUp delay={0.5}>
                <div 
                    className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: news.content }} 
                />
            </FadeInUp>

            {/* Footer Artikel (Share) */}
            <FadeInUp delay={0.6}>
                <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800">
                    <h4 className="font-bold text-secondary dark:text-white mb-4">Bagikan Berita:</h4>
                    <div className="flex space-x-4">
                        <motion.button whileHover={{ y: -3 }} className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-80 transition-opacity"><i className="fab fa-facebook-f"></i></motion.button>
                        <motion.button whileHover={{ y: -3 }} className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:opacity-80 transition-opacity"><i className="fab fa-whatsapp"></i></motion.button>
                        <motion.button whileHover={{ y: -3 }} className="w-10 h-10 rounded-full bg-sky-400 text-white flex items-center justify-center hover:opacity-80 transition-opacity"><i className="fab fa-twitter"></i></motion.button>
                    </div>
                </div>
            </FadeInUp>

        </article>
      </div>
  );
}