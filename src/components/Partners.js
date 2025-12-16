'use client';

import Image from 'next/image';
import FadeInUp from './utils/FadeInUp';

export default function Partners({ partners = [] }) {

  // 1. Definisikan Fallback jika data kosong agar layout tidak hancur
  const displayPartners = partners && partners.length > 0 ? partners : [
    { id: 'mock-1', name: "Partner 1", image: null },
    { id: 'mock-2', name: "Partner 2", image: null },
    { id: 'mock-3', name: "Partner 3", image: null },
  ];

  // 2. Fungsi Helper untuk membersihkan URL Gambar
  const getImageUrl = (path) => {
      // Jika path null, undefined, atau string kosong -> pakai placeholder
      if (!path) return "/placeholder.jpg";
      
      const pathString = String(path).trim();
      if (pathString === "") return "/placeholder.jpg";

      // Jika URL eksternal (http/https) -> kembalikan apa adanya
      if (pathString.startsWith('http://') || pathString.startsWith('https://')) {
          return pathString;
      }

      if (!pathString.startsWith('/')) {
          return `/${pathString}`;
      }

      return pathString;
  };

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
                    {displayPartners.map((partner, index) => {
                        // Siapkan source gambar di luar return agar lebih bersih
                        const imageSrc = getImageUrl(partner.image || partner.src);

                        return (
                            <div 
                                key={partner.id || index} 
                                className="flex-shrink-0 w-40 md:w-48 group snap-center flex flex-col items-center" 
                            >
                                {/* Kotak Putih Pembungkus Logo */}
                                <div className="w-full aspect-[3/2] flex items-center justify-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-green-200 dark:hover:border-green-900 transition-all duration-300 relative mb-3">
                                    <Image 
                                        src={imageSrc}
                                        alt={partner.name || "Partner Logo"} 
                                        fill
                                        sizes="(max-width: 768px) 160px, 192px"
                                        className="object-contain p-2 transition-all duration-500 transform group-hover:scale-110 cursor-pointer"
                                        // Tambahkan onError handler sederhana (opsional, agar tidak crash total jika file hilang)
                                        onError={(e) => {
                                            e.currentTarget.srcset = "/placeholder.jpg";
                                        }}
                                    />
                                </div>
                                
                                {/* Nama Partner */}
                                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 text-center opacity-80 group-hover:opacity-100 group-hover:text-primary transition-all">
                                    {partner.name}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </FadeInUp>

      </div>
    </section>
  );
}