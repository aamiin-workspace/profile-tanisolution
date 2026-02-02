"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import ImageFallback from "@/components/utils/ImageFallback";
import FadeInUp from "@/components/utils/FadeInUp";

export default function DetailBeritaClient({ news, popularNews = [] }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const shareUrl = useMemo(
    () => (typeof window !== "undefined" ? window.location.href : ""),
    [],
  );
  const canShare = useMemo(
    () => (typeof window !== "undefined" ? !!navigator.share : false),
    [],
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch (_) {
      alert("Gagal menyalin link");
    }
  };

  return (
    <div className="pt-14 pb-16 bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            href="/berita"
            className="text-gray-500 hover:text-primary dark:text-gray-400 dark:hover:text-green-400 transition text-sm flex items-center group w-fit"
          >
            <i className="fas fa-arrow-left mr-2 group-hover:-translate-x-1 transition-transform"></i>
            Kembali ke Berita
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <article className="lg:col-span-8">
            <FadeInUp>
              <span className="inline-block bg-green-100 text-primary dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
                {news.category}
              </span>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-secondary dark:text-white mb-6 leading-tight">
                {news.title}
              </h1>

              <div className="flex flex-wrap items-center text-gray-500 dark:text-gray-400 text-sm gap-4 mb-8">
                <span className="flex items-center">
                  <i className="far fa-calendar-alt mr-2"></i>
                  {formatDate(news.date)}
                </span>
                <span className="flex items-center">
                  <i className="far fa-user mr-2"></i>
                  {news.author}
                </span>
                <span className="flex items-center">
                  <i className="far fa-eye mr-2"></i>
                  {news.views || 0} Dibaca
                </span>
              </div>
            </FadeInUp>

            <FadeInUp delay={0.2}>
              <div className="mb-10 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-700 relative h-[300px] md:h-[450px] w-full">
                <ImageFallback
                  src={news.image || "/placeholder.jpg"}
                  alt={news.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </FadeInUp>

            <FadeInUp delay={0.3}>
              <div
                className="prose prose-lg max-w-none text-gray-700 dark:text-gray-300 dark:prose-invert leading-relaxed text-justify mb-10"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            </FadeInUp>

            <FadeInUp delay={0.4}>
              <div className="pt-8 border-t border-gray-100 dark:border-gray-800">
                <h4 className="font-bold text-secondary dark:text-white mb-4">
                  Bagikan Berita:
                </h4>
                <div className="flex flex-wrap gap-3 items-center">
                  {canShare && (
                    <button
                      onClick={async () => {
                        try {
                          await navigator.share({
                            title: news.title,
                            text: news.title,
                            url: shareUrl,
                          });
                        } catch (_) {}
                      }}
                      className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center hover:opacity-80 hover:-translate-y-1 transition-all"
                    >
                      <i className="fas fa-share-alt"></i>
                    </button>
                  )}
                  <button
                    onClick={handleCopyLink}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all hover:-translate-y-1 ${copied ? "bg-green-600 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:opacity-80"}`}
                  >
                    <i className={`fas ${copied ? "fa-check" : "fa-link"}`}></i>
                  </button>
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(news.title)}%20${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-green-500 text-white flex items-center justify-center hover:opacity-80 hover:-translate-y-1 transition-all"
                  >
                    <i className="fab fa-whatsapp"></i>
                  </a>
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:opacity-80 hover:-translate-y-1 transition-all"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                </div>
                {copied && (
                  <p className="mt-2 text-xs text-green-600">Link disalin!</p>
                )}
              </div>
            </FadeInUp>
          </article>

          <aside className="lg:col-span-4 space-y-8">
            <FadeInUp delay={0.5}>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white border-l-4 border-primary pl-3">
                    Berita Populer
                  </h3>
                </div>

                {popularNews.length === 0 ? (
                  <p className="text-gray-500 text-sm">
                    Belum ada berita populer.
                  </p>
                ) : (
                  <div className="space-y-6">
                    {popularNews.map((item, index) => (
                      <div key={item.id} className="flex group">
                        <span className="text-3xl font-black text-gray-200 dark:text-gray-700 mr-3 -mt-1 group-hover:text-primary/20 transition-colors">
                          {index + 1}
                        </span>

                        <div className="flex-1">
                          <Link
                            href={`/berita/${item.slug}`}
                            className="block mb-1"
                          >
                            <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                              {item.title}
                            </h4>
                          </Link>

                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-3 mt-2">
                            <span className="flex items-center">
                              <i className="far fa-calendar-alt mr-1"></i>
                              {formatDate(item.date)}
                            </span>
                            <span className="flex items-center text-primary dark:text-green-400 font-medium bg-green-50 dark:bg-green-900/20 px-2 py-0.5 rounded">
                              <i className="far fa-eye mr-1"></i>
                              {item.views || 0}
                            </span>
                          </div>
                        </div>

                        <Link
                          href={`/berita/${item.slug}`}
                          className="w-16 h-16 ml-3 flex-shrink-0 relative rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 group-hover:shadow-md transition-all"
                        >
                          <ImageFallback
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </Link>
                      </div>
                    ))}
                  </div>
                )}

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Link
                    href="/berita"
                    className="block w-full text-center py-2 rounded-lg border border-primary text-primary hover:bg-primary hover:text-white transition font-semibold text-sm"
                  >
                    Lihat Semua Berita
                  </Link>
                </div>
              </div>
            </FadeInUp>
          </aside>
        </div>
      </div>
    </div>
  );
}
