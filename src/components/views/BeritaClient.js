"use client";

import { useState } from "react";
import Link from "next/link";
import ImageFallback from "@/components/utils/ImageFallback"; 
import { motion, AnimatePresence } from "framer-motion";
import FadeInUp from "@/components/utils/FadeInUp";
import {
  StaggerContainer,
  StaggerItem,
} from "@/components/utils/StaggerContainer";

export default function BeritaClient({ initialNews }) {
  const [filter, setFilter] = useState("Semua");
  const [searchTerm, setSearchTerm] = useState("");

  const allNews = initialNews || [];

  const filteredNews = allNews
    .filter((item) => filter === "Semua" || item.category === filter)
    .filter((item) => {
      const searchLower = searchTerm.toLowerCase();
      const titleMatch = item.title?.toLowerCase().includes(searchLower);
      const excerptMatch = item.excerpt?.toLowerCase().includes(searchLower);
      return titleMatch || excerptMatch;
    });

  const featuredNews = filteredNews.length > 0 ? filteredNews[0] : null;
  const otherNews = filteredNews.length > 1 ? filteredNews.slice(1) : [];
  
  const categories = ["Semua", "Kegiatan", "Teknologi", "Edukasi", "Tips"];

  const formatDate = (dateString) => {
    const options = { day: "numeric", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("id-ID", options);
  };

  return (
    <section className="py-14 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Berita & Artikel
            </h2>
            <div className="h-1 w-20 bg-green-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Ikuti perkembangan terbaru kami dalam memajukan pertanian Indonesia melalui teknologi dan kolaborasi.
            </p>
        </div>
        
        <FadeInUp delay={0.1}>
          <div className="max-w-md mx-auto mb-8">
            <div className="relative group">
              <input
                type="text"
                placeholder="Cari berita atau artikel..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:focus:ring-green-400 shadow-sm transition-all duration-300"
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <i className="fas fa-search text-gray-400 group-focus-within:text-primary transition-colors"></i>
              </div>
            </div>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.3}>
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => setFilter(cat)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                  filter === cat
                    ? "bg-primary text-white border-primary shadow-lg shadow-green-500/30"
                    : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </FadeInUp>

        {filteredNews.length === 0 ? (
          <FadeInUp>
            <div className="text-center py-20 text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 max-w-2xl mx-auto">
              <i className="far fa-newspaper text-4xl text-gray-300 mb-4 block"></i>
              <h3 className="text-lg font-bold text-gray-700 dark:text-gray-200">
                Tidak ada berita ditemukan
              </h3>
              <p className="text-sm mt-2">Coba kata kunci lain atau ganti kategori.</p>
              {(filter !== "Semua" || searchTerm !== "") && (
                  <button 
                    onClick={() => { setFilter("Semua"); setSearchTerm(""); }}
                    className="mt-4 text-primary hover:underline text-sm font-semibold"
                  >
                    Reset Filter
                  </button>
              )}
            </div>
          </FadeInUp>
        ) : (
          <>
            {featuredNews && (
              <div className="mb-12">
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 flex flex-col md:flex-row group hover:shadow-2xl transition-all duration-300">
                  <Link
                    href={`/berita/${featuredNews.slug}`}
                    className="md:w-2/3 h-64 md:h-[400px] overflow-hidden relative cursor-pointer block"
                  >
                    <ImageFallback
                      src={featuredNews.image}
                      alt={featuredNews.title}
                      fill
                      priority
                      className="object-cover transform group-hover:scale-105 transition duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded shadow-md z-10">
                      {featuredNews.category}
                    </div>
                  </Link>
                  <div className="md:w-1/3 p-6 md:p-8 flex flex-col justify-center relative">
                    <div className="text-xs font-semibold text-gray-400 mb-2 flex items-center uppercase tracking-wider">
                      <i className="far fa-calendar-alt mr-2"></i>{" "}
                      {formatDate(featuredNews.date)}
                    </div>
                    
                    <h2 className="text-2xl font-bold text-secondary dark:text-white mb-4 group-hover:text-primary transition leading-snug">
                      <Link href={`/berita/${featuredNews.slug}`}>
                        {featuredNews.title}
                      </Link>
                    </h2>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3 text-sm leading-relaxed">
                      {featuredNews.excerpt}
                    </p>
                    
                    <Link
                      href={`/berita/${featuredNews.slug}`}
                      className="inline-flex items-center text-primary font-bold hover:text-green-700 transition-colors"
                    >
                      Baca Selengkapnya{" "}
                      <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform"></i>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {otherNews.length > 0 && (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherNews.map((news) => (
                  <StaggerItem key={news.id} className="h-full">
                    <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 flex flex-col group h-full hover:-translate-y-1">
                      <Link
                        href={`/berita/${news.slug}`}
                        className="aspect-video overflow-hidden relative cursor-pointer block"
                      >
                        <ImageFallback
                          src={news.image}
                          alt={news.title}
                          fill
                          className="object-cover transform group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute top-3 right-3 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-secondary dark:text-white text-xs font-bold px-3 py-1 rounded shadow-sm z-10">
                          {news.category}
                        </div>
                      </Link>
                      
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3 flex items-center">
                          <i className="far fa-calendar-alt mr-1"></i>{" "}
                          {formatDate(news.date)}
                        </div>
                        
                        <h3 className="text-lg font-bold text-secondary dark:text-white mb-3 group-hover:text-primary transition line-clamp-2 leading-tight">
                          <Link href={`/berita/${news.slug}`}>{news.title}</Link>
                        </h3>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 flex-grow">
                          {news.excerpt}
                        </p>
                        
                        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                          <Link
                            href={`/berita/${news.slug}`}
                            className="text-sm text-primary font-semibold hover:text-green-700 inline-flex items-center"
                          >
                            Baca Artikel{" "}
                            <i className="fas fa-arrow-right ml-1 text-xs group-hover:translate-x-1 transition-transform"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            )}
          </>
        )}
      </div>
    </section>
  );
}