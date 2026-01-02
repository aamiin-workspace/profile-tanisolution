'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import CountUp from 'react-countup';
import { motion, AnimatePresence } from 'framer-motion'; 
import FadeInUp from '@/components/utils/FadeInUp'; 
import { StaggerContainer, StaggerItem } from '@/components/utils/StaggerContainer';

export default function EdusolusiClient() {
  const [modalImage, setModalImage] = useState(null);

  const handleDonasi = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const amount = form.amount.value;
    const method = form.method.value;
    const message = form.message.value;

    const waMessage = `Halo Tim Edusolusi,%0ANama: ${name}%0AEmail: ${email}%0ANominal Donasi: Rp${amount}%0AMetode: ${method}%0APesan: ${message}`;
    const waLink = `https://wa.me/6289524187347?text=${waMessage}`;

    window.open(waLink, '_blank');
  };

  return (
    <>
      <header className="pt-14 pb-12 bg-secondary text-white relative overflow-hidden">
        <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-0 -ml-20 -mt-20 w-64 h-64 rounded-full bg-blueCustom opacity-20 blur-3xl"
        ></motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <FadeInUp>
                <div className="inline-block bg-blueCustom text-white px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">Social Impact</div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Divisi <span className="text-blueCustom">Edusolusi</span></h1>
            </FadeInUp>
            <FadeInUp delay={0.2}>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Program sosial peningkatan minat regenerasi petani dengan fokus pada edukasi dan teknologi bagi generasi muda.
                </p>
            </FadeInUp>
        </div>
      </header>

      <section id="program" className="py-16 md:py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex mb-8 text-sm text-gray-500 dark:text-gray-400">
                <Link href="/" className="hover:text-primary dark:hover:text-blueCustom">Beranda</Link>
                <span className="mx-2">/</span>
                <span className="text-secondary dark:text-gray-200 font-semibold">Edusolusi</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                <div className="order-2 lg:order-1">
                    <FadeInUp>
                        <h2 className="text-3xl font-bold text-secondary dark:text-white mb-4">Membangun Generasi Baru <br/>Petani Indonesia</h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                            Kami percaya bahwa masa depan pertanian ada di tangan anak muda. Melalui Edusolusi, kami menyediakan kurikulum, pelatihan lapangan, dan akses teknologi agar profesi petani menjadi pilihan karir yang menjanjikan.
                        </p>
                    </FadeInUp>
                    
                    <div className="space-y-6">
                        <FadeInUp delay={0.2}>
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blueCustom text-white">
                                        <i className="fas fa-user-graduate text-xl"></i>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Karanganyar Berdaya</h3>
                                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                                        Membina lebih dari <strong className="text-gray-900 dark:text-gray-200">100 siswa sekolah</strong> untuk terjun langsung mempraktikkan teknologi pertanian modern.
                                    </p>
                                </div>
                            </div>
                        </FadeInUp>

                        <FadeInUp delay={0.3}>
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blueCustom text-white">
                                        <i className="fas fa-hand-holding-heart text-xl"></i>
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">Beasiswa Pendidikan</h3>
                                    <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
                                        Memberikan dukungan finansial berupa beasiswa kepada siswa berprestasi di lingkungan setempat.
                                    </p>
                                </div>
                            </div>
                        </FadeInUp>
                    </div>
                </div>

                <div className="order-1 lg:order-2">
                    <StaggerContainer className="grid grid-cols-2 gap-4">
                        {[
                            "/edusolusi/1.webp",
                            "/edusolusi/2.webp",
                            "/edusolusi/3.webp",
                            "/edusolusi/4.webp"
                        ].map((src, idx) => (
                            <StaggerItem key={idx}>
                                <motion.div 
                                    whileHover={{ scale: 1.05 }}
                                    className="relative w-full h-48 cursor-pointer rounded-xl overflow-hidden shadow-lg hover:shadow-xl border border-transparent dark:border-gray-700"
                                    onClick={() => setModalImage(src)}
                                >
                                    <Image 
                                        src={src} 
                                        alt={`Gallery ${idx}`}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                </motion.div>
                            </StaggerItem>
                        ))}
                    </StaggerContainer>
                </div>
            </div>

            <FadeInUp delay={0.4}>
                <div className="bg-blueCustom rounded-2xl p-8 md:p-12 text-center text-white shadow-xl transform hover:scale-[1.01] transition duration-500">
                    <h3 className="text-2xl font-bold mb-8">Dampak Nyata Program</h3>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-blue-400">
                        <div className="p-4">
                            <div className="text-4xl font-bold mb-2">
                                <CountUp end={100} duration={2} enableScrollSpy />+
                            </div>
                            <div className="text-blue-100">Siswa Sekolah Binaan</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold mb-2">
                                <CountUp end={131} duration={2} enableScrollSpy />+
                            </div>
                            <div className="text-blue-100">Penerima Beasiswa SD</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold mb-2">
                                <CountUp end={4} duration={2} enableScrollSpy />
                            </div>
                            <div className="text-blue-100">Mitra Sekolah & Universitas</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold mb-2">
                                <CountUp end={154} duration={2} enableScrollSpy />+
                            </div>
                            <div className="text-blue-100">Mahasiswa Berkolaborasi</div>
                        </div>
                    </div>
                </div>
            </FadeInUp>
        </div>
      </section>

      <section className="py-10 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <FadeInUp>
                    <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white">Galeri Kegiatan</h2>
                    <div className="w-16 h-1 bg-blueCustom mx-auto mt-2"></div>
                </FadeInUp>
            </div>

            <StaggerContainer className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 snap-x snap-mandatory no-scrollbar md:grid md:grid-cols-3 md:overflow-visible md:mx-0 md:px-0">
                {[
                    { title: "Kelas Edukasi", desc: "Pengenalan teori pertanian modern.", img: "/edusolusi/kelas.webp" },
                    { title: "Praktik Lapangan", desc: "Belajar penggunaan alat semi mekanisasi pertanaian langsung.", img: "/edusolusi/praktik.webp" },
                    { title: "Riset & Kolaborasi", desc: "Kerjasama dengan universitas.", img: "/edusolusi/riset.webp" }
                ].map((item, idx) => (
                    <StaggerItem key={idx} className="min-w-[80vw] md:min-w-0 snap-center px-0 h-full">
                        <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300 border border-gray-100 dark:border-gray-700 group h-full">
                            <div className="h-48 bg-gray-200 dark:bg-gray-800 overflow-hidden relative">
                                <motion.div 
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.5 }}
                                    className="w-full h-full"
                                >
                                   <Image 
                                      src={item.img} 
                                      alt={item.title}
                                      fill
                                      className="object-cover"
                                   />
                                </motion.div>
                            </div>
                            <div className="p-6">
                                <h4 className="font-bold text-lg mb-2 text-secondary dark:text-white">{item.title}</h4>
                                <p className="text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                            </div>
                        </div>
                    </StaggerItem>
                ))}
            </StaggerContainer>
        </div>
      </section>

      <section id="donasi" className="py-16 md:py-10 bg-white dark:bg-gray-900 transition-colors duration-300 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blueCustom opacity-5 rounded-l-full blur-3xl -z-0 pointer-events-none"></div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <FadeInUp>
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 dark:border-gray-700">
                    
                    <div className="md:w-5/12 bg-blueCustom p-10 flex flex-col justify-center text-white relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-32 h-32 bg-white opacity-10 rounded-full -mt-10 -ml-10"></div>
                        <div className="absolute bottom-0 right-0 w-40 h-40 bg-black opacity-10 rounded-full -mb-10 -mr-10"></div>
                        
                        <h2 className="text-3xl font-bold mb-4 relative z-10">Mari Berbagi Kebaikan</h2>
                        <p className="text-blue-100 mb-8 relative z-10 leading-relaxed">
                            Setiap kontribusi Anda, sekecil apapun, akan sangat berarti bagi kelanjutan pendidikan anak-anak petani di Indonesia. Jadilah bagian dari perubahan.
                        </p>
                        <ul className="space-y-3 relative z-10">
                            <li className="flex items-center"><i className="fas fa-check-circle mr-3 text-blue-300"></i> Transparan & Akuntabel</li>
                            <li className="flex items-center"><i className="fas fa-check-circle mr-3 text-blue-300"></i> Langsung ke Penerima</li>
                            <li className="flex items-center"><i className="fas fa-check-circle mr-3 text-blue-300"></i> Laporan Berkala</li>
                        </ul>
                    </div>

                    <div className="md:w-7/12 p-8 md:p-12 bg-white dark:bg-gray-800">
                        <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Isi Formulir Donasi</h3>
                        <form onSubmit={handleDonasi} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Nama Lengkap</label>
                                    <input type="text" name="name" required 
                                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blueCustom focus:border-transparent outline-none transition"
                                        placeholder="Nama Anda"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Email</label>
                                    <input type="email" name="email" required 
                                        className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blueCustom focus:border-transparent outline-none transition"
                                        placeholder="nama@email.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Nominal Donasi (IDR)</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-2.5 text-gray-500 font-bold">Rp</span>
                                    <input type="number" name="amount" required 
                                        className="w-full pl-12 pr-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blueCustom focus:border-transparent outline-none transition font-bold text-lg"
                                        placeholder="100.000"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Metode Pembayaran</label>
                                <select name="method" required 
                                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blueCustom focus:border-transparent outline-none transition"
                                >
                                    <option value="" className="dark:bg-gray-800">Pilih Metode</option>
                                    <option value="Bank Transfer" className="dark:bg-gray-800">Bank Transfer (BCA/Mandiri)</option>
                                    <option value="E-Wallet" className="dark:bg-gray-800">E-Wallet (GoPay/OVO/Dana)</option>
                                    <option value="QRIS" className="dark:bg-gray-800">QRIS</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Pesan Dukungan (Opsional)</label>
                                <textarea name="message" rows="3" 
                                    className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white focus:ring-2 focus:ring-blueCustom focus:border-transparent outline-none transition resize-none"
                                    placeholder="Tuliskan pesan semangat..."
                                ></textarea>
                            </div>

                            <motion.button 
                                type="submit" 
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-blueCustom text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-600 transition shadow-lg hover:shadow-xl"
                            >
                                <i className="fas fa-heart mr-2"></i> Kirim Donasi Sekarang
                            </motion.button>
                            
                            <p className="text-xs text-center text-gray-400 mt-4">
                                *Anda akan diarahkan ke WhatsApp Admin untuk konfirmasi pembayaran.
                            </p>
                        </form>
                    </div>
                </div>
            </FadeInUp>
        </div>
      </section>
      
      <section className="py-16 bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 text-center transition-colors duration-300">
         <div className="max-w-4xl mx-auto px-4">
             <FadeInUp>
                 <h2 className="text-2xl font-bold mb-4 text-secondary dark:text-white">Ingin Bergabung Menjadi Mitra Kami?</h2>
                 <motion.a 
                    href="https://wa.me/6289524187347?text=Halo" 
                    target="_blank" 
                    rel="noreferrer" 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-block mt-4 bg-blueCustom text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-600 transition shadow-lg"
                 >
                    Hubungi Tim Edusolusi
                 </motion.a>
             </FadeInUp>
         </div>
      </section>

      <AnimatePresence>
          {modalImage && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/80 flex items-center justify-center z-[60] backdrop-blur-sm" 
                onClick={() => setModalImage(null)}
            >
                <span className="absolute top-4 right-6 text-white text-3xl cursor-pointer hover:text-gray-300 transition">&times;</span>
                <motion.div
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.8 }}
                    className="relative max-h-[90vh] max-w-[90vw] w-auto h-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Image 
                        src={modalImage} 
                        alt="Preview" 
                        width={1200}
                        height={800}
                        className="rounded-lg shadow-xl object-contain max-h-[90vh]" 
                    />
                </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </>
  );
}