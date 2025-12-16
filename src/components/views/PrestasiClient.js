'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function PrestasiClient({ initialData }) {
  const [selectedImage, setSelectedImage] = useState(null);
  
  const allData = initialData || [];
  const awardsList = allData.filter(item => item.category === 'award');
  const researchList = allData.filter(item => item.category === 'research');

  const getImgUrl = (path) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return path; 
  };

  return (
    <>
      {/* --- HEADER SECTION --- */}
      <header className="pt-24 pb-12 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-gold opacity-20 blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="inline-block bg-gold text-white px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">Our Journey</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Prestasi & <span className="text-gold">Riset</span></h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Bukti komitmen kami dalam menghadirkan inovasi pertanian yang diakui secara nasional dan internasional.
            </p>
        </div>
      </header>

      {/* --- HIGHLIGHT FUNDING (STATIC) --- */}
      <section className="py-10 bg-transparent -mt-8 relative z-20 max-w-6xl mx-auto px-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 p-8 transition-colors duration-300">
            <div className="text-center mb-8">
            <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                Funding
            </h3>
            </div>
            
            <div className="flex flex-col items-center">
            <div className="text-center mb-8">
                <div className="text-5xl md:text-6xl font-bold text-primary dark:text-green-400 mb-2">
                Rp 145 Juta
                </div>
            </div>
            <div className="mt-1 pt-6 border-t border-gray-200 dark:border-gray-700 w-full max-w-md">
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                Total akumulasi dari berbagai program pendanaan dan kompetisi
                </p>
            </div>
            </div>
        </div>
      </section>

      {/* --- SECTION 1: AWARDS (GRID) --- */}
      <section id="awards" className="py-16 md:py-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white">Penghargaan</h2>
                <div className="w-16 h-1 bg-gold mx-auto mt-2"></div>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">Klik kartu untuk melihat dokumentasi.</p>
            </div>

            {awardsList.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {awardsList.map((item) => (
                        <div 
                            key={item.id} 
                            onClick={() => {
                                const url = getImgUrl(item.image);
                                if(url) setSelectedImage({ src: url, title: item.title });
                            }}
                            className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border-t-4 border-gold hover:-translate-y-1 transition duration-300 dark:border-gray-700 cursor-pointer group"
                        >
                            <div className="flex items-center justify-between mb-4">
                                {item.image ? (
                                    <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-gold group-hover:scale-110 transition">
                                        <Image 
                                            src={getImgUrl(item.image)} 
                                            alt="icon" 
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <i className="fas fa-trophy text-3xl text-gold group-hover:scale-110 transition"></i>
                                )}
                                
                                <span className="text-xs font-bold bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-200 px-2 py-1 rounded">
                                    {item.year}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">{item.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-500 italic py-10 bg-white dark:bg-gray-800 rounded-lg">Belum ada data penghargaan.</p>
            )}
        </div>
      </section>

      {/* --- SECTION 2: RISET (TIMELINE ZIG-ZAG OTOMATIS) --- */}
      <section id="riset" className="py-16 md:py-20 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 relative transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white">Riset & Kolaborasi</h2>
                <div className="w-16 h-1 bg-primary mx-auto mt-2"></div>
            </div>

            <div className="relative space-y-16 md:space-y-24">
                <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 w-1 bg-primary h-full opacity-30 dark:opacity-50"></div>

                {researchList.length > 0 ? researchList.map((item, index) => {
                    const isLeft = index % 2 === 0;

                    return (
                        <div key={item.id} className="relative flex flex-col md:flex-row items-start">
                            
                            <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-6 h-6 bg-white dark:bg-gray-800 border-4 border-primary rounded-full z-10"></div>
                            
                            {!isLeft && <div className="hidden md:block md:w-1/2"></div>}

                            <div className={`md:w-1/2 ${isLeft ? 'md:pr-8 md:text-right' : 'md:pl-8 md:text-left'} ml-12 md:ml-0`}>
                                <div 
                                    onClick={() => {
                                        const url = getImgUrl(item.image);
                                        if(url) setSelectedImage({ src: url, title: item.title });
                                    }}
                                    className={`cursor-pointer group inline-block ${!item.image ? 'cursor-default' : ''}`}
                                >
                                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-xs font-bold mb-2">
                                        {item.year} 
                                    </span>
                                    <h3 className="text-xl font-bold text-secondary dark:text-white group-hover:text-primary transition">
                                        {item.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mt-2">{item.description}</p>
                                    
                                    {item.image && (
                                        <div className={`text-xs text-primary font-bold mt-2 opacity-0 group-hover:opacity-100 transition ${isLeft ? 'md:justify-end' : ''} flex items-center`}>
                                            <i className="far fa-eye mr-1"></i> Dokumentasi
                                        </div>
                                    )}
                                </div>
                            </div>

                            {isLeft && <div className="hidden md:block md:w-1/2"></div>}
                        </div>
                    );
                }) : (
                     <p className="text-center text-gray-500 italic relative z-20 bg-white dark:bg-gray-900 px-4">Belum ada data riset.</p>
                )}
            </div>
        </div>
      </section>

      {/* --- MODAL POPUP --- */}
      {selectedImage && selectedImage.src && (
        <div 
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 transition-opacity duration-300"
            onClick={() => setSelectedImage(null)}
        >
            <div className="relative max-w-4xl w-full max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
                <button 
                    className="absolute -top-10 right-0 text-white hover:text-gray-300 text-3xl font-bold focus:outline-none"
                    onClick={() => setSelectedImage(null)}
                >
                    &times;
                </button>
                
                <div className="relative w-full h-[85vh]">
                    <Image 
                        src={selectedImage.src} 
                        alt={selectedImage.title} 
                        fill
                        className="object-contain rounded-lg shadow-2xl"
                    />
                </div>
                
                <div className="bg-white dark:bg-gray-800 p-4 rounded-b-lg -mt-1 relative z-10 text-center">
                    <h4 className="font-bold text-gray-800 dark:text-white">{selectedImage.title}</h4>
                </div>
            </div>
        </div>
      )}
    </>
  );
}