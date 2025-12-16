'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import FadeInUp from './utils/FadeInUp';

// --- SUB-COMPONENT: KARTU PARTNER (Agar state gambar terisolasi) ---
function PartnerCard({ partner }) {
  // Logika: Gunakan URL dari DB, jika kosong pakai placeholder
  const originalSrc = partner.image || partner.src || '/placeholder.jpg';
  const [imgSrc, setImgSrc] = useState(originalSrc);

  // Reset state jika props berubah (misal saat data baru dimuat)
  useEffect(() => {
    setImgSrc(originalSrc);
  }, [originalSrc]);

  return (
    <div className="flex-shrink-0 w-40 md:w-48 group snap-center flex flex-col items-center">
      {/* Kotak Putih Pembungkus Logo */}
      <div className="w-full aspect-[3/2] flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-green-200 dark:hover:border-green-900 transition-all duration-300 relative mb-3 overflow-hidden">
        <Image
          src={imgSrc}
          alt={partner.name || "Partner Logo"}
          fill
          sizes="(max-width: 768px) 160px, 192px"
          className="object-contain p-2 transition-all duration-500 transform group-hover:scale-110 cursor-pointer"
          // Handler jika gambar error/tidak ditemukan
          onError={() => setImgSrc('/placeholder.jpg')}
        />
      </div>

      {/* Nama Partner */}
      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 text-center opacity-80 group-hover:opacity-100 group-hover:text-green-600 transition-all">
        {partner.name}
      </p>
    </div>
  );
}

// --- MAIN COMPONENT ---
export default function Partners({ partners = [] }) {
  // Jika data partners kosong, tampilkan pesan atau return null (opsional)
  // Di sini kita biarkan kosong agar tidak merusak layout
  const hasData = partners && partners.length > 0;

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Judul Section */}
        <div className="text-center mb-10">
          <FadeInUp>
            <h3 className="text-lg font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              Dipercaya & Berkolaborasi Dengan
            </h3>
          </FadeInUp>
        </div>

        {/* Carousel / Scroll Area */}
        <FadeInUp delay={0.2}>
          <div className="relative">
            {/* Efek Gradasi (Fade) di Kiri & Kanan */}
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-gray-50 dark:from-gray-900 to-transparent z-10 pointer-events-none"></div>

            {/* Container Scroll */}
            <div className="flex overflow-x-auto pb-6 scrollbar-hide gap-6 md:gap-8 px-4 snap-x">
              
              {!hasData ? (
                // Tampilan SEMENTARA jika data kosong (Mockup)
                // Agar layout tidak collaps saat loading/kosong
                [1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex-shrink-0 w-40 md:w-48 flex flex-col items-center opacity-50">
                        <div className="w-full aspect-[3/2] bg-gray-200 rounded-xl animate-pulse"></div>
                    </div>
                ))
              ) : (
                // Tampilan DATA ASLI
                partners.map((partner, index) => (
                  <PartnerCard key={partner.id || index} partner={partner} />
                ))
              )}

            </div>
          </div>
        </FadeInUp>

      </div>
    </section>
  );
}