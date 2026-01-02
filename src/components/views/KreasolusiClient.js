'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInUp from '@/components/utils/FadeInUp';

export default function KreasolusiClient() {
  
  const pricingData = [
    {
      title: "Foto Produk",
      icon: "fa-camera",
      color: "text-green-600 bg-green-100",
      items: [
        { name: "Foto Basic (3 Foto)", price: "Rp 5.000" },
        { name: "Foto Standar (5 Foto + Editing)", price: "Rp 10.000" },
        { name: "Foto Premium (10 Foto + Editing)", price: "Rp 15.000" },
      ]
    },
    {
      title: "Video Produk",
      icon: "fa-video",
      color: "text-purple-600 bg-purple-100", 
      items: [
        { name: "Video Basic (≤ 15 detik)", price: "Rp 5.000" },
        { name: "Video Standar (≤ 30 dtk + Edit)", price: "Rp 10.000" },
        { name: "Video Premium (≤ 60 dtk + Edit)", price: "Rp 20.000" },
      ]
    },
    {
      title: "Paket Bundling Hemat",
      icon: "fa-box-open",
      color: "text-orange-600 bg-orange-100", 
      items: [
        { name: "Foto + Video Basic", price: "Rp 10.000" },
        { name: "Foto + Video Standar", price: "Rp 20.000" },
        { name: "Foto + Video + Caption", price: "Rp 30.000" }, 
      ]
    },
    {
      title: "Layanan Live Streaming",
      icon: "fa-broadcast-tower",
      color: "text-red-600 bg-red-100",
      items: [
        { name: "Live Studio (Self-Service)", price: "FREE" }, 
        { name: "Pendampingan Live (30 Mnt)", price: "Rp 10.000" },
        { name: "Host Produk (30 Mnt)", price: "Rp 20.000" },
      ]
    }
  ];

  const facilities = [
    "Area Foto & Video", "Pencahayaan Lengkap", "Background Foto", 
    "Tripod", "Ring Light", "Mini Studio", 
    "Properti Estetik", "Akses Listrik & Internet"
  ];

  return (
    <>
      <header className="pt-14 pb-16 bg-green-900 text-white relative overflow-hidden">
        <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 -ml-20 -mt-20 w-80 h-80 rounded-full bg-green-500 opacity-20 blur-3xl"
        ></motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <FadeInUp>
                <div className="inline-block bg-green-700 border border-green-500 text-white px-4 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider shadow-lg">
                    Creative Hub & Studio
                </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Studio <span className="text-green-400">KreaSolusi</span>
                </h1>
            </FadeInUp>
            <FadeInUp delay={0.2}>
                <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto italic">
                    "Lebih Mudah Berkreasi, Lebih Dekat dengan Solusi."
                </p>
            </FadeInUp>
        </div>
      </header>

      <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <FadeInUp>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 h-80 group">

                    <Image
                    src="/kreasolusi/studio.webp"
                    alt="Studio KreaSolusi - Ruang Kreatif"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex flex-col justify-end p-6">
                    <h3 className="font-bold text-lg text-white">Ruang Kreatif UMKM</h3>
                    <p className="text-sm text-gray-300">
                        Fasilitas lengkap untuk konten berkualitas.
                    </p>
                    </div>

                </div>
                </FadeInUp>
                <FadeInUp delay={0.2}>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                        Apa itu <span className="text-green-600">KreaSolusi?</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 text-justify leading-relaxed">
                        Studio Kreasolusi merupakan fasilitas kreatif yang dibangun oleh PT Global Tani Solution sebagai ruang produksi konten yang dapat digunakan untuk foto produk, video, hingga live selling.
                    </p>

                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-green-500 shadow-sm">
                        <h4 className="font-bold text-gray-800 dark:text-white mb-3">Visi Kami</h4>
                        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                            Menciptakan ruang kreatif yang memberdayakan masyarakat dan UMKM untuk menghasilkan konten berkualitas tanpa hambatan.
                        </p>

                        <h4 className="font-bold text-gray-800 dark:text-white mb-3">Misi Kami</h4>
                        <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                            <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i> Menyediakan fasilitas produksi konten yang mudah dan gratis.</li>
                            <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i> Membantu UMKM lokal meningkatkan kualitas promosi.</li>
                            <li className="flex items-start"><i className="fas fa-check-circle text-green-500 mt-1 mr-3"></i> Memberikan layanan kreatif dengan harga terjangkau.</li>
                        </ul>
                    </div>
                </FadeInUp>
            </div>

            <div>
                <div className="text-center mb-12">
                    <FadeInUp>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Skema Layanan</h2>
                        <div className="h-1 w-20 bg-green-500 mx-auto rounded"></div>
                    </FadeInUp>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FadeInUp>
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-gradient-to-br from-green-600 to-green-800 rounded-2xl p-8 text-white h-full shadow-lg relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 -mr-10 -mt-10 w-40 h-40 bg-white opacity-10 rounded-full group-hover:scale-150 transition duration-700"></div>
                            <h3 className="text-2xl font-bold mb-2 flex items-center">
                                <i className="fas fa-user-clock mr-3 bg-white/20 p-2 rounded-lg"></i> Self-Service
                            </h3>
                            <div className="text-xs font-bold bg-yellow-400 text-green-900 inline-block px-3 py-1 rounded mb-6 uppercase">GRATIS / FREE</div>
                            <p className="mb-6 opacity-90 leading-relaxed">
                                Kreator, UMKM, atau warga sekitar dapat menggunakan studio secara mandiri tanpa biaya.
                            </p>
                            <ul className="space-y-3 text-sm opacity-90 mb-8 border-t border-white/20 pt-4">
                                <li className="flex items-center"><i className="fas fa-check mr-2 text-yellow-300"></i> Foto produk sederhana</li>
                                <li className="flex items-center"><i className="fas fa-check mr-2 text-yellow-300"></i> Perekaman video pendek</li>
                                <li className="flex items-center"><i className="fas fa-check mr-2 text-yellow-300"></i> Konten Media Sosial</li>
                                <li className="flex items-center"><i className="fas fa-check mr-2 text-yellow-300"></i> Live streaming mandiri</li>
                            </ul>
                            <a href="https://wa.me/6289524187347?text=Halo%20Admin,%20saya%20ingin%20booking%20Self-Service%20Studio" target="_blank" className="block text-center bg-white text-green-800 font-bold py-3.5 rounded-xl hover:bg-gray-100 transition shadow-lg">
                                Booking Jadwal Gratis
                            </a>
                        </motion.div>
                    </FadeInUp>

                    <FadeInUp delay={0.2}>
                        <motion.div 
                            whileHover={{ y: -5 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl p-8 h-full shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col"
                        >
                            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2 flex items-center">
                                <i className="fas fa-star text-yellow-500 mr-3 bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-lg"></i> Layanan Profesional
                            </h3>
                            <div className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-6 uppercase tracking-wide">Pendampingan Tim Ahli</div>
                            <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">
                                Butuh bantuan pengambilan gambar, editing, atau host live? Kami sediakan tim profesional dengan harga terjangkau.
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <div className="text-xs text-gray-500 uppercase font-semibold">Foto Basic</div>
                                    <div className="font-bold text-green-600 text-lg">Rp 5.000 <span className="text-xs text-gray-400 font-normal">/ 3 foto</span></div>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-700">
                                    <div className="text-xs text-gray-500 uppercase font-semibold">Video Basic</div>
                                    <div className="font-bold text-green-600 text-lg">Rp 5.000 <span className="text-xs text-gray-400 font-normal">/ 15 dtk</span></div>
                                </div>
                            </div>

                            <button onClick={() => document.getElementById('pricing-list').scrollIntoView({ behavior: 'smooth' })} className="block w-full text-center bg-gray-900 text-white dark:bg-gray-700 font-bold py-3.5 rounded-xl hover:bg-gray-800 transition shadow-lg">
                                Lihat Daftar Harga Lengkap
                            </button>
                        </motion.div>
                    </FadeInUp>
                </div>
            </div>

            <div id="pricing-list" className="scroll-mt-28">
                <div className="text-center mb-12">
                    <FadeInUp>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Daftar Harga Lengkap</h2>
                        <p className="text-gray-500 dark:text-gray-400">Transparan, Hemat, Berkualitas.</p>
                    </FadeInUp>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {pricingData.map((category, idx) => (
                        <FadeInUp key={idx} delay={idx * 0.1}>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-md overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition duration-300 h-full flex flex-col">
                                <div className={`p-5 text-center border-b border-gray-100 dark:border-gray-700 ${category.title.includes('Hemat') ? 'bg-orange-50 dark:bg-orange-900/10' : ''}`}>
                                    <div className={`w-12 h-12 ${category.color} rounded-full flex items-center justify-center mx-auto mb-3 text-xl shadow-sm`}>
                                        <i className={`fas ${category.icon}`}></i>
                                    </div>
                                    <h3 className="font-bold text-base text-gray-800 dark:text-white">{category.title}</h3>
                                </div>
                                <div className="p-5 flex-grow">
                                    <ul className="space-y-4">
                                        {category.items.map((item, i) => (
                                            <li key={i} className="flex justify-between items-start text-xs pb-3 border-b border-gray-50 dark:border-gray-700 last:border-0 last:pb-0">
                                                <span className="text-gray-600 dark:text-gray-300 w-2/3 pr-1 font-medium">{item.name}</span>
                                                <span className={`font-bold w-1/3 text-right ${item.price === 'FREE' ? 'text-green-600 bg-green-100 px-2 py-0.5 rounded' : 'text-gray-800 dark:text-white'}`}>{item.price}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </FadeInUp>
                    ))}
                </div>
            </div>

            <div className="bg-gray-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-green-600 opacity-20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600 opacity-10 rounded-full blur-3xl -ml-16 -mb-16 pointer-events-none"></div>
                
                <div className="relative z-10">
                    <div className="text-center mb-10">
                        <FadeInUp>
                            <h2 className="text-3xl font-bold mb-4">Fasilitas Studio</h2>
                            <p className="text-gray-400">Semua yang Anda butuhkan untuk berkarya ada di sini.</p>
                        </FadeInUp>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {facilities.map((item, idx) => (
                            <FadeInUp key={idx} delay={idx * 0.05}>
                                <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-white/10 text-center hover:bg-white/10 transition hover:scale-105 transform duration-300 h-full flex flex-col items-center justify-center">
                                    <i className="fas fa-check-circle text-green-400 mb-3 text-xl"></i>
                                    <p className="font-semibold text-sm tracking-wide">{item}</p>
                                </div>
                            </FadeInUp>
                        ))}
                    </div>
                </div>
            </div>

            <div className="text-center pb-8">
                <FadeInUp>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8">Cara Booking Studio</h2>
                    <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 max-w-5xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
                        
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
                            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold mr-3 text-sm flex-shrink-0">1</div>
                                <p className="text-xs text-gray-600 dark:text-gray-300">Hubungi Admin / Datang Langsung</p>
                            </div>
                            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold mr-3 text-sm flex-shrink-0">2</div>
                                <p className="text-xs text-gray-600 dark:text-gray-300">Pilih Jadwal & Jenis Layanan</p>
                            </div>
                            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold mr-3 text-sm flex-shrink-0">3</div>
                                <p className="text-xs text-gray-600 dark:text-gray-300">Datang Sesuai Waktu</p>
                            </div>
                            <div className="flex items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                                <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center font-bold mr-3 text-sm flex-shrink-0">4</div>
                                <p className="text-xs text-gray-600 dark:text-gray-300 font-bold">Produksi Konten!</p>
                            </div>
                        </div>

                        <div className="hidden md:block w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>

                        <div className="flex-1 flex flex-col justify-center">
                            <Link href="https://wa.me/6289524187347?text=Halo%20Admin,%20saya%20ingin%20booking%20Studio%20KreaSolusi" target="_blank" className="block w-full bg-green-600 text-white font-bold py-4 rounded-xl text-lg shadow-lg hover:bg-green-700 hover:shadow-green-500/30 transition transform hover:-translate-y-1 text-center">
                                <i className="fab fa-whatsapp mr-2"></i> Booking Sekarang
                            </Link>
                            <p className="mt-3 text-xs text-gray-400">
                                <i className="fas fa-map-marker-alt mr-1"></i> Lokasi: Karanganyar, Jawa Tengah
                            </p>
                        </div>
                    </div>
                </FadeInUp>
            </div>

        </div>
      </section>
    </>
  );
}