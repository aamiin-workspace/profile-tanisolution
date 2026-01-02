'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import FadeInUp from '@/components/utils/FadeInUp';

export default function KolaborasiClient({ initialGalleryData }) {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState('magang');
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);
  
  const galleryData = initialGalleryData || [];

  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && ['magang', 'riset', 'kunjungan'].includes(tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const filteredGallery = galleryData.filter(item => item.category === activeTab);

  const getImageUrl = (path) => {
      if (!path) return "/placeholder.jpg"; 
      if (path.startsWith('http')) return path;
      return path; 
  };

  const renderContent = () => {
    return (
      <FadeInUp key={activeTab} className="space-y-8">
        {(() => {
          switch (activeTab) {
            case 'magang':
                return (
                    <>
                        <div className="border-b pb-4 mb-6">
                            <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-2">Program Magang & PKL</h2>
                            <p className="text-gray-600 dark:text-gray-300">Panduan lengkap bagi siswa SMK dan Mahasiswa untuk belajar langsung di industri.</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-purple-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                                    <i className="fas fa-user-check text-purple-600 mr-2"></i> Persyaratan Peserta
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300 list-disc list-outside ml-4">
                                    <li>Warga Negara Indonesia dan/atau Warga Negara Asing.</li>
                                    <li>Sehat jasmani dan Rohani.</li>
                                    <li><strong>Tingkat SMK:</strong> Siswa aktif sekolah negeri/swasta daerah Solo Raya terdaftar di Kemendikdasmen.</li>
                                    <li><strong>Tingkat Perguruan Tinggi:</strong> Mahasiswa aktif min. semester 5 atau fresh graduate (maks 1 tahun lulus) dari PTN/PTS.</li>
                                    <li>Bersedia menjalani magang min. 1 bulan.</li>
                                    <li>Memiliki komitmen, kedisiplinan, dan etika kerja yang baik.</li>
                                    <li>Bersedia mengikuti tata tertib perusahaan.</li>
                                </ul>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-purple-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                                    <i className="fas fa-file-alt text-purple-600 mr-2"></i> Dokumen Persyaratan
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-start"><i className="fas fa-check text-green-500 mt-1 mr-2"></i> Curriculum Vitae (CV) dilengkapi foto.</li>
                                    <li className="flex items-start"><i className="fas fa-check text-green-500 mt-1 mr-2"></i> Surat Pengantar Magang/PKL dari sekolah atau kampus.</li>
                                    <li className="flex items-start"><i className="fas fa-check text-green-500 mt-1 mr-2"></i> Proposal pengajuan magang (jika ada).</li>
                                    <li className="flex items-start"><i className="fas fa-check text-green-500 mt-1 mr-2"></i> Salinan SKL atau Ijazah (bagi yang sudah lulus).</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-purple-50 dark:bg-gray-800/50 p-6 rounded-xl border border-purple-200 dark:border-purple-900 mt-8">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📢 Alur Pengajuan</h3>
                            <div className="space-y-4 text-sm text-gray-700 dark:text-gray-300">
                                <p>1. Scan seluruh dokumen dan jadikan <strong>1 folder ZIP</strong>.</p>
                                <p>2. Kirim email ke <strong className="text-purple-700">tanisolutionindonesia@gmail.com</strong> dengan subject:</p>
                                <div className="bg-white dark:bg-gray-900 p-3 rounded border border-gray-300 dark:border-gray-700 font-mono text-xs text-gray-600 dark:text-gray-400 mb-2">
                                    Permohonan PKL Tansol_Periode Mulai_Nama Lengkap_Asal Sekolah/PT<br/>
                                    <span className="text-green-600">// Contoh: Permohonan PKL Tansol_Januari_Albert Einstein_Harvard University</span>
                                </div>
                                <p>3. Dokumen dikirim paling lambat <strong>1 bulan sebelum</strong> periode magang.</p>
                                <p>4. Setelah kirim email, wajib konfirmasi via WhatsApp Admin.</p>
                            </div>
                            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="mailto:tanisolutionindonesia@gmail.com" className="flex-1 bg-white text-purple-700 border border-purple-600 py-2 rounded-lg font-bold text-center hover:bg-purple-50 transition">
                                    <i className="far fa-envelope mr-2"></i> Kirim Email
                                </motion.a>
                                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://wa.me/6289524187347" target="_blank" rel="noreferrer" className="flex-1 bg-green-600 text-white py-2 rounded-lg font-bold text-center hover:bg-green-700 transition">
                                    <i className="fab fa-whatsapp mr-2"></i> Konfirmasi WA
                                </motion.a>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border-l-4 border-yellow-500 shadow-sm mt-8">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">⚙️ Mekanisme Kerja</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                                Magang dilaksanakan secara luring (Work From Office/WFO) di kantor maupun tempat produksi PT Global Tani Solution.
                            </p>
                            <div className="flex items-center text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <i className="far fa-clock mr-2 text-yellow-600"></i>
                                Senin - Jumat: 08.00 – 16.00 (Kantor) | 07.00 – 15.00 (Produksi)
                            </div>
                        </div>
                    </>
                );

            case 'riset':
                return (
                    <>
                        <div className="border-b pb-4 mb-6">
                            <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-400 mb-2">Kolaborasi Penelitian</h2>
                            <p className="text-gray-600 dark:text-gray-300">Wadah bagi akademisi untuk melakukan riset berbasis masalah nyata pertanian.</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-blue-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                                    <i className="fas fa-stream text-blue-600 mr-2"></i> Alur Penelitian
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300 list-decimal list-outside ml-4">
                                    <li>Pastikan topik penelitian sesuai dengan ranah kerja Tani Solution Indonesia.</li>
                                    <li>Kirim dokumen persyaratan via email <strong>paling lambat 1 minggu</strong> sebelum pelaksanaan.</li>
                                    <li>Lakukan konfirmasi pengajuan melalui WhatsApp Admin.</li>
                                    <li>Tim Tani Solution melakukan verifikasi administratif & review keamanan data.</li>
                                    <li>Jika diterima, pemohon akan dihubungi untuk koordinasi teknis.</li>
                                </ul>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-blue-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                                    <i className="fas fa-folder-open text-blue-600 mr-2"></i> Dokumen Persyaratan
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-start"><i className="fas fa-file-contract text-blue-500 mt-1 mr-2"></i> Surat permohonan penelitian dari kampus/instansi.</li>
                                    <li className="flex items-start"><i className="fas fa-file-alt text-blue-500 mt-1 mr-2"></i> Proposal penelitian singkat.</li>
                                    <li className="flex items-start"><i className="fas fa-id-card text-blue-500 mt-1 mr-2"></i> Profil peneliti (CV atau identitas mahasiswa).</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-xl border border-red-100 dark:border-red-800 mt-8">
                            <h3 className="text-lg font-bold text-red-700 dark:text-red-400 mb-3 flex items-center">
                                <i className="fas fa-exclamation-triangle mr-2"></i> Ketentuan Persetujuan
                            </h3>
                            <ul className="space-y-2 text-sm text-gray-700 dark:text-gray-300 list-disc list-outside ml-4">
                                <li>Tani Solution berhak <strong>menolak</strong> apabila jadwal bertabrakan dengan agenda besar perusahaan.</li>
                                <li>Penelitian akan <strong>ditolak</strong> jika data yang diminta mengandung informasi pribadi/rahasia.</li>
                            </ul>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="mailto:tanisolutionindonesia@gmail.com" className="bg-blue-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-700 transition">
                                <i className="far fa-envelope mr-2"></i> Ajukan Penelitian
                            </motion.a>
                            <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://wa.me/6289524187347" target="_blank" rel="noreferrer" className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-green-700 transition">
                                <i className="fab fa-whatsapp mr-2"></i> Konfirmasi WA
                            </motion.a>
                        </div>
                    </>
                );

            case 'kunjungan':
                return (
                    <>
                        <div className="border-b pb-4 mb-6">
                            <h2 className="text-3xl font-bold text-green-700 dark:text-green-400 mb-2">Kunjungan Industri</h2>
                            <p className="text-gray-600 dark:text-gray-300">Prosedur resmi untuk sekolah, universitas, atau instansi yang ingin melakukan studi banding.</p>
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-green-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                                    <i className="fas fa-users text-green-600 mr-2"></i> Ketentuan Peserta
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center"><i className="fas fa-dot-circle text-xs text-green-400 mr-2"></i> Jumlah peserta maksimal <strong>15 orang</strong>.</li>
                                    <li className="flex items-center"><i className="fas fa-dot-circle text-xs text-green-400 mr-2"></i> Berpakaian rapi dan sopan.</li>
                                    <li className="flex items-center"><i className="fas fa-dot-circle text-xs text-green-400 mr-2"></i> Wajib menjaga kebersihan.</li>
                                </ul>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-green-100 dark:border-gray-700">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4 flex items-center">
                                    <i className="fas fa-clipboard-list text-green-600 mr-2"></i> Dokumen Pengajuan
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                                    <li className="flex items-center"><i className="fas fa-check text-green-500 mr-2"></i> Surat permohonan kunjungan.</li>
                                    <li className="flex items-center"><i className="fas fa-check text-green-500 mr-2"></i> Daftar nama peserta & pendamping.</li>
                                    <li className="flex items-center"><i className="fas fa-check text-green-500 mr-2"></i> Gambaran kegiatan / rundown.</li>
                                </ul>
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm mt-8">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">📋 Tata Cara & Persetujuan</h3>
                            <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                                <p>1. Kirim dokumen pengajuan ke email kami <strong>paling lambat 3 hari</strong> sebelum jadwal.</p>
                                <p>2. Lakukan konfirmasi segera melalui WhatsApp Admin.</p>
                                <p>3. Tim kami akan mengecek ketersediaan waktu dan kesesuaian agenda.</p>
                            </div>
                            <div className="mt-6 flex flex-col sm:flex-row gap-4">
                                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="mailto:tanisolutionindonesia@gmail.com" className="flex-1 bg-green-700 text-white py-2 rounded-lg font-bold text-center hover:bg-green-800 transition">
                                    <i className="far fa-envelope mr-2"></i> Kirim Proposal
                                </motion.a>
                                <motion.a whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} href="https://wa.me/6289524187347" target="_blank" rel="noreferrer" className="flex-1 bg-green-500 text-white py-2 rounded-lg font-bold text-center hover:bg-green-600 transition">
                                    <i className="fab fa-whatsapp mr-2"></i> Konfirmasi WA
                                </motion.a>
                            </div>
                        </div>
                    </>
                );

            default: return null;
          }
        })()}
      </FadeInUp>
    );
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 }
  };

  return (
    <>
      <header className="pt-14 pb-12 bg-secondary text-white relative overflow-hidden">
        <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, -45, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-purple-600 opacity-20 blur-3xl"
        ></motion.div>
        
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <FadeInUp>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Pusat <span className="text-purple-400">Kolaborasi</span></h1>
            </FadeInUp>
            <FadeInUp delay={0.1}>
                <p className="text-gray-300 text-lg">Bergabunglah menciptakan inovasi pertanian masa depan.</p>
            </FadeInUp>
        </div>
      </header>

      <section className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row gap-8">
                
                <motion.div 
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="w-full md:w-1/4"
                >
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-24 border border-gray-100 dark:border-gray-700">
                        <h3 className="font-bold text-gray-400 dark:text-gray-500 uppercase text-xs tracking-wider mb-4">Pilih Program</h3>
                        <nav className="space-y-2">
                            {['magang', 'riset', 'kunjungan'].map((key) => (
                                <button
                                    key={key}
                                    onClick={() => setActiveTab(key)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between group ${
                                        activeTab === key 
                                        ? 'bg-purple-50 text-purple-700 font-bold border-l-4 border-purple-600 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-500 shadow-sm' 
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-purple-600 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-purple-300'
                                    }`}
                                >
                                    <span className="capitalize">{key}</span>
                                    {activeTab === key && <motion.i layoutId="activeTabIcon" className="fas fa-chevron-right text-xs"></motion.i>}
                                </button>
                            ))}
                        </nav>
                        <div className="mt-8 pt-6 border-t border-gray-100 dark:border-gray-700">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Butuh bantuan cepat?</p>
                            <a href="https://wa.me/6289524187347" target="_blank" rel="noreferrer" className="text-sm font-bold text-green-600 dark:text-green-400 hover:underline flex items-center">
                                <i className="fab fa-whatsapp mr-2"></i> Chat Admin
                            </a>
                        </div>
                    </div>
                </motion.div>

                <div className="w-full md:w-3/4 space-y-12">
                    {renderContent()}

                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden p-8">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-secondary dark:text-white">
                                <i className="fas fa-images mr-2 text-purple-500"></i>
                                Dokumentasi {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                            </h3>
                            <div className="h-1 flex-grow bg-gray-100 dark:bg-gray-700 ml-4 rounded-full"></div>
                        </div>

                        {filteredGallery.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {filteredGallery.map((item, index) => (
                                    <motion.div 
                                        key={item.id} 
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: index * 0.1 }} 
                                        className="group relative overflow-hidden rounded-xl bg-gray-100 dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition"
                                        onClick={() => setSelectedGalleryItem(item)}
                                    >
                                        <div className="aspect-w-4 aspect-h-3 h-48 overflow-hidden relative">
                                            <div className="w-full h-full relative">
                                                <Image 
                                                    src={getImageUrl(item.image)} 
                                                    alt={item.title} 
                                                    fill
                                                    className="object-cover transform group-hover:scale-110 transition duration-500" 
                                                />
                                            </div>
                                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition flex items-center justify-center">
                                                <i className="fas fa-eye text-white opacity-0 group-hover:opacity-100 text-3xl transition"></i>
                                            </div>
                                        </div>
                                        <div className="p-4 bg-white dark:bg-gray-800">
                                            {activeTab === 'kunjungan' && item.extra_1 && (
                                                <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold rounded mb-2">
                                                    {item.extra_1}
                                                </span>
                                            )}
                                            <h4 className="text-sm font-bold text-secondary dark:text-white line-clamp-1">{item.title}</h4>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-1">{item.caption}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500 dark:text-gray-400 italic text-center py-4">Belum ada dokumentasi untuk program ini.</p>
                        )}
                    </div>

                </div>
            </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedGalleryItem && (
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[70] bg-black bg-opacity-80 flex items-center justify-center p-4 backdrop-blur-sm"
                onClick={() => setSelectedGalleryItem(null)}
            >
                <motion.div 
                    variants={modalVariants}
                    initial="hidden" animate="visible" exit="exit"
                    className="bg-white dark:bg-gray-800 w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row relative max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <button 
                        className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-opacity-70 transition"
                        onClick={() => setSelectedGalleryItem(null)}
                    >
                        &times;
                    </button>

                    <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-200 min-h-[300px]">
                        <Image 
                            src={getImageUrl(selectedGalleryItem.image)} 
                            alt={selectedGalleryItem.title} 
                            fill
                            className="object-cover" 
                        />
                    </div>

                    <div className="w-full md:w-1/2 p-8 flex flex-col">
                        
                        {activeTab === 'magang' && (
                            <>
                                <span className="inline-block w-fit px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold mb-3">Kegiatan Magang</span>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{selectedGalleryItem.title}</h3>
                                <p className="text-sm font-semibold text-gray-500 mb-4">{selectedGalleryItem.caption}</p>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto">
                                    <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Uraian Kegiatan:</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-justify whitespace-pre-wrap">{selectedGalleryItem.detail}</p>
                                </div>
                            </>
                        )}

                        {activeTab === 'riset' && (
                            <>
                                <span className="inline-block w-fit px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold mb-3">Hasil Riset</span>
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{selectedGalleryItem.title}</h3>
                                <div className="flex items-center text-xs text-gray-500 mb-4">
                                    <i className="fas fa-user-graduate mr-2"></i>
                                    Peneliti: <span className="font-bold ml-1">{selectedGalleryItem.extra_1}</span>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-100 dark:border-gray-700 mt-auto">
                                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Abstrak Penelitian</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-justify italic whitespace-pre-wrap">"{selectedGalleryItem.extra_2}"</p>
                                </div>
                            </>
                        )}

                        {activeTab === 'kunjungan' && (
                            <>
                                <span className="inline-block w-fit px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold mb-3">Kunjungan Industri</span>
                                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">{selectedGalleryItem.title}</h3>
                                <div className="flex items-center mt-2 mb-4">
                                    <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3 text-gray-500"><i className="fas fa-building text-xs"></i></div>
                                    <div><p className="text-xs text-gray-400">Instansi Pengunjung</p><p className="text-sm font-bold text-secondary dark:text-gray-200">{selectedGalleryItem.extra_1}</p></div>
                                </div>
                                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto">
                                    <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">Detail Kegiatan:</h4>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed text-justify whitespace-pre-wrap">{selectedGalleryItem.detail}</p>
                                </div>
                            </>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </>
  );
}