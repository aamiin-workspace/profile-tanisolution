'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion'; 
import FadeInUp from '@/components/utils/FadeInUp'; 
import { StaggerContainer, StaggerItem } from '@/components/utils/StaggerContainer';

export default function TeknosolusiClient() {
  const [mainImg, setMainImg] = useState("/teknosolusi/alburdat.webp");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const thumbnails = [
    "/teknosolusi/alburdat.webp",
    "/teknosolusi/alburdat1.webp",
    "/teknosolusi/alburdat2.webp"
  ];

  const testimonials = [
    {
      username: "sutrisno_tani88",
      date: "2 Minggu lalu",
      text: "Alhamdulillah barang sampai dengan selamat. Packing kayu rapi banget. Alat sudah dicoba di sawah, lumpur dalam pun bisa jalan lancar. Mantap gan!",
      product: "Varian: ALBURDAT V2",
      rating: 5
    },
    {
      username: "hendra_jaya_agro",
      date: "1 Bulan lalu",
      text: "Respon penjual sangat cepat. Tanya-tanya teknis dijelaskan detail lewat chat. Barang kokoh, las-lasannya rapi. Sukses terus buat Tani Solution.",
      product: "Varian: Full Set + Sparepart",
      rating: 5
    },
    {
      username: "kurniawan_sragen",
      date: "3 Minggu lalu",
      text: "Pengiriman agak lama di ekspedisi kargo, tapi barang aman. Kualitas besi tebal, bukan kaleng-kaleng. Recommended seller.",
      product: "Varian: Unit Only",
      rating: 4
    }
  ];

  return (
    <>
      {/* Header Section */}
      <header className="pt-24 pb-12 bg-secondary text-white relative overflow-hidden">
        <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-primary opacity-20 blur-3xl"
        ></motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeInUp>
            <div className="inline-block bg-primary text-white px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">
                Agritech
            </div>
          </FadeInUp>
          <FadeInUp delay={0.1}>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Divisi <span className="text-primary">Teknosolusi</span>
            </h1>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Inovasi semi-mekanisasi pertanian untuk meningkatkan efisiensi lahan kering.
            </p>
          </FadeInUp>
        </div>
      </header>

      {/* Product Detail Section */}
      <section id="product-detail" className="py-16 md:py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
          <FadeInUp>
            <nav className="flex mb-8 text-sm text-gray-500 dark:text-gray-400">
                <Link href="/" className="hover:text-primary dark:hover:text-green-400">Beranda</Link>
                <span className="mx-2">/</span>
                <span className="text-secondary dark:text-gray-200 font-semibold">Teknosolusi</span>
            </nav>
          </FadeInUp>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            
            {/* Gallery Image */}
            <div className="w-full lg:w-1/2">
              <FadeInUp delay={0.2}>
                <div className="bg-accent dark:bg-gray-800 rounded-2xl p-6 shadow-inner mb-4 transition-colors relative w-full h-[400px]">
                    <motion.div 
                        whileHover={{ scale: 1.02 }}
                        className="relative w-full h-full cursor-pointer"
                        onClick={() => setIsModalOpen(true)}
                    >
                        <Image 
                            src={mainImg} 
                            alt="Alat Alburdat" 
                            fill
                            className="object-contain rounded-lg shadow-lg mix-blend-multiply dark:mix-blend-normal"
                        />
                    </motion.div>
                </div>
              </FadeInUp>
              <FadeInUp delay={0.3}>
                <div className="grid grid-cols-3 gap-4">
                    {thumbnails.map((src, index) => (
                    <motion.div 
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className="relative h-24 w-full rounded-lg overflow-hidden cursor-pointer hover:opacity-75 border-2 border-transparent hover:border-primary dark:hover:border-green-400 transition"
                        onClick={() => setMainImg(src)} 
                    >
                        <Image 
                            src={src}
                            alt={`Thumbnail ${index}`}
                            fill
                            className="object-cover"
                        />
                    </motion.div>
                    ))}
                </div>
              </FadeInUp>
            </div>

            {/* Description */}
            <div className="w-full lg:w-1/2">
              <FadeInUp delay={0.4}>
                <div className="inline-block bg-green-100 text-primary dark:bg-green-900/30 dark:text-green-400 px-3 py-1 rounded-full text-sm font-bold mb-4">
                    Produk Unggulan
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-4">ALBURDAT</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    Alburdat adalah alat inovasi semi-mekanisasi pertanian yang dirancang khusus untuk pemupukan yang efisien. Alat ini bekerja optimal pada lahan kering, membantu petani menghemat tenaga dan waktu.
                </p>
              </FadeInUp>

              <div className="space-y-4 mb-8">
                {[
                    {icon: 'fa-check', title: 'Optimasi Lahan Kering', desc: 'Dirancang khusus agar bekerja maksimal di berbagai kondisi lahan kering.'},
                    {icon: 'fa-leaf', title: 'Ramah Lingkungan', desc: 'Mendukung pertanian berkelanjutan dengan dosis presisi.'},
                    {icon: 'fa-cogs', title: 'Semi Mekanisasi', desc: 'Mengurangi beban fisik petani manual.'}
                ].map((item, idx) => (
                    <FadeInUp key={idx} delay={0.5 + (idx * 0.1)}>
                        <div className="flex items-start">
                            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white mt-1 flex-shrink-0">
                                <i className={`fas ${item.icon}`}></i>
                            </div>
                            <div className="ml-4">
                                <h4 className="font-bold text-secondary dark:text-white">{item.title}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
                            </div>
                        </div>
                    </FadeInUp>
                ))}
              </div>

              {/* Action Buttons */}
              <FadeInUp delay={0.8}>
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <motion.a 
                            href="https://wa.me/6289524187347?text=Halo,%20saya%20tertarik%20dengan%20produk%20Alburdat." 
                            target="_blank" rel="noreferrer" 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center bg-green-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-700 transition shadow-lg flex-1 text-center"
                        >
                            <i className="fab fa-whatsapp mr-2 text-xl"></i> Pesan Sekarang
                        </motion.a>
                        <motion.a 
                            href="https://shopee.co.id/primegarden_" 
                            target="_blank" rel="noreferrer" 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition shadow-lg flex-1 text-center"
                        >
                            <i className="fas fa-shopping-bag mr-2 text-xl"></i> Beli di Shopee
                        </motion.a>
                    </div>

                    <motion.a 
                        href="https://wa.me/6289524187347?text=Halo,%20saya%20ingin%20konsultasi%20untuk%20custom%20alat%20pertanian." 
                        target="_blank" rel="noreferrer" 
                        whileHover={{ scale: 1.02 }}
                        className="inline-flex items-center justify-center border-2 border-primary text-primary dark:text-green-400 dark:border-green-400 px-8 py-3 rounded-xl font-bold hover:bg-primary hover:text-white dark:hover:bg-green-400 dark:hover:text-gray-900 transition w-full text-center mt-2"
                    >
                        <i className="fas fa-tools mr-2"></i> Ingin Custom Alat? Konsultasi Disini
                    </motion.a>
                </div>
              </FadeInUp>

            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <FadeInUp>
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white">Proses Produksi</h2>
                    <div className="w-16 h-1 bg-primary mx-auto mt-2"></div>
                    <p className="mt-4 text-gray-600 dark:text-gray-300">Dibuat langsung di workshop kami di Karanganyar.</p>
                </FadeInUp>
            </div>
            
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    {num: '01', title: 'Riset & Desain', desc: 'Memastikan alat sesuai kebutuhan ergonomis petani.'},
                    {num: '02', title: 'Manufaktur', desc: 'Diproduksi di Jl. Lawu No.357 dengan material kuat.'},
                    {num: '03', title: 'Uji Coba', desc: 'Setiap unit melewati uji fungsi mekanis.'}
                ].map((item, idx) => (
                    <StaggerItem key={idx}>
                        <div className="bg-white dark:bg-gray-700 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 h-full hover:shadow-md transition-shadow">
                            <div className="text-4xl text-primary font-bold mb-4">{item.num}</div>
                            <h3 className="text-xl font-bold text-secondary dark:text-white mb-2">{item.title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{item.desc}</p>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-16 bg-white dark:bg-gray-900 relative overflow-hidden border-t border-gray-100 dark:border-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center mb-12">
            <FadeInUp>
                <div className="inline-flex items-center justify-center bg-orange-50 dark:bg-orange-900/20 border border-orange-100 dark:border-orange-900 px-4 py-1 rounded-full mb-4">
                <i className="fas fa-shopping-bag text-orange-500 mr-2"></i>
                <span className="text-orange-600 dark:text-orange-400 text-sm font-bold tracking-wide">OFFICIAL STORE RATING</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">
                Ulasan Pembeli di <span className="text-[#EE4D2D]">Shopee</span>
                </h2>
                <div className="flex items-center justify-center mt-3 text-yellow-400 text-lg">
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star"></i>
                <i className="fas fa-star-half-alt"></i>
                <span className="text-gray-500 dark:text-gray-400 text-sm ml-2 font-medium">
                    (4.8/5.0 Rata-rata Ulasan)
                </span>
                </div>
            </FadeInUp>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {testimonials.map((testi, index) => (
              <StaggerItem key={index} className="h-full">
                <motion.div 
                    whileHover={{ y: -5 }} 
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                >
                    <div className="flex items-center mb-4 border-b border-gray-50 dark:border-gray-700 pb-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center text-gray-500 dark:text-gray-300 mr-3">
                        <i className="fas fa-user"></i>
                    </div>
                    <div>
                        <div className="text-sm font-bold text-gray-800 dark:text-white">{testi.username}</div>
                        <div className="text-xs text-gray-400 dark:text-gray-500">{testi.date}</div>
                    </div>
                    <div className="ml-auto">
                        <i className="fas fa-check-circle text-green-500 text-xs mr-1"></i>
                        <span className="text-[10px] text-green-600 bg-green-50 dark:bg-green-900/30 dark:text-green-400 px-2 py-0.5 rounded-full">Terverifikasi</span>
                    </div>
                    </div>

                    <div className="flex text-[#EE4D2D] mb-3 text-sm">
                    {[...Array(5)].map((_, i) => (
                        <i key={i} className={`fas fa-star ${i < testi.rating ? "" : "text-gray-300 dark:text-gray-600"}`}></i>
                    ))}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 flex-grow">
                    "{testi.text}"
                    </p>

                    <div className="mt-auto bg-gray-50 dark:bg-gray-900 p-2 rounded text-xs text-gray-500 dark:text-gray-400 flex items-center">
                    <div className="relative h-3 w-8 mr-2 opacity-50">
                        <Image 
                            src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg" 
                            alt="Shopee" 
                            fill
                            className="object-contain"
                        />
                    </div>
                    {testi.product}
                    </div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <FadeInUp delay={0.5}>
            <div className="text-center">
                <motion.a 
                    href="https://shopee.co.id/primegarden_" 
                    target="_blank" rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center justify-center bg-[#EE4D2D] text-white px-8 py-3 rounded-lg font-bold hover:bg-orange-600 transition shadow-lg"
                >
                    <i className="fas fa-shopping-bag mr-2"></i> Lihat Semua Ulasan di Shopee
                </motion.a>
                <p className="text-xs text-gray-400 mt-3">
                    *Review asli diambil dari toko Shopee Prime Garden
                </p>
            </div>
          </FadeInUp>

        </div>
      </section>

      {/* Footer Call to Action */}
      <section className="py-16 bg-primary text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
            <FadeInUp>
                <h2 className="text-3xl font-bold mb-4">Tingkatkan Hasil Panen Anda Hari Ini</h2>
                <p className="text-green-100 mb-8 text-lg">Bergabunglah dengan ratusan petani modern lainnya.</p>
                <motion.a 
                    href="/#contact" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white text-primary font-bold px-8 py-3 rounded-full hover:bg-gray-100 transition shadow-lg inline-block"
                >
                    Hubungi Sales Kami
                </motion.a>
            </FadeInUp>
        </div>
      </section>

      {/* Modal Fullscreen */}
      <AnimatePresence>
        {isModalOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-[60] backdrop-blur-sm" 
                onClick={() => setIsModalOpen(false)}
            >
                <span className="absolute top-4 right-6 text-white text-4xl cursor-pointer hover:text-gray-300 transition">&times;</span>
                <div className="relative max-h-[90vh] max-w-[90vw] h-full w-full" onClick={(e) => e.stopPropagation()}>
                    <Image 
                        src={mainImg} 
                        alt="Full Preview" 
                        fill
                        className="object-contain" 
                    />
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}