'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import FadeInUp from '@/components/utils/FadeInUp';
import Image from 'next/image';

export default function MinilabClient() {

  const zones = [
    {
      title: "Zona 1: Irigasi Tetes Otomatis",
      plant: "Pakcoy",
      tech: "Automatic Drip Irrigation",
      desc: "Sistem irigasi presisi yang meneteskan air langsung ke akar. Menghemat air dan menjaga kelembaban tanah tetap stabil tanpa becek.",
      icon: "fa-tint",
      color: "bg-blue-100 text-blue-600",
      detail: "Tanaman Pakcoy tumbuh subur dengan efisiensi air tinggi.",
    },
    {
      title: "Zona 2: Pest Trap Solar Panel",
      plant: "Terong",
      tech: "Green Energy Pest Control",
      desc: "Perangkap hama mandiri energi surya. Menggunakan lampu UV otomatis di malam hari untuk mengalihkan hama dari tanaman.",
      icon: "fa-solar-panel",
      color: "bg-yellow-100 text-yellow-600",
      detail: "Melindungi Terong dari hama nokturnal secara organik.",
    },
    {
      title: "Zona 3: Smart Soil Sensor",
      plant: "Tomat",
      tech: "IoT Soil Moisture",
      desc: "Sensor tanah cerdas yang 'berbicara' dengan mesin pompa. Menyiram otomatis hanya saat tanah mulai kering.",
      icon: "fa-microchip",
      color: "bg-red-100 text-red-600",
      detail: "Mencegah buah Tomat pecah akibat kelebihan air.",
    },
    {
      title: "Zona 4: Ultrasonic Pest Repeller", 
      plant: "Jahe",
      tech: "Smart Motion & Sound Repeller", 
      desc: "Menggunakan sensor gerak/suara untuk mendeteksi hama tanah (tikus/ulat), lalu otomatis memancarkan gelombang ultrasonik untuk mengusirnya.", 
      icon: "fa-rss", 
      color: "bg-orange-100 text-orange-600",
      detail: "Perlindungan aktif rimpang Jahe dari hama pengerat.",
    },
    {
      title: "Zona 5: Acoustic Pest Defense", 
      plant: "Cabai",
      tech: "Smart Bio-Acoustic System", 
      desc: "Mendeteksi aktivitas hama di sekitar tanaman, kemudian mengeluarkan suara frekuensi khusus (ultrasonik) untuk mencegah hama mendekat.", 
      icon: "fa-volume-up", 
      color: "bg-green-100 text-green-600",
      detail: "Menjaga daun Cabai tetap utuh tanpa pestisida berlebih.",
    },
    {
      title: "Zona 6: Smart Greenhouse",
      plant: "Bunga Hias",
      tech: "Climate Control IoT",
      desc: "Ekosistem tertutup dengan kontrol suhu, kelembaban, dan irigasi sprinkle otomatis untuk tanaman sensitif.",
      icon: "fa-temperature-high",
      color: "bg-pink-100 text-pink-600",
      detail: "Rumah kaca pintar untuk Bunga Hias.",
    }
  ];

  return (
    <>
      <header className="pt-14 pb-16 bg-teal-900 text-white relative overflow-hidden">
        <motion.div 
            animate={{ scale: [1, 1.1, 1], rotate: [0, 20, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-teal-500 opacity-20 blur-3xl"
        ></motion.div>

        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
            <FadeInUp>
                <div className="inline-block bg-teal-800 border border-teal-600 px-4 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider shadow-lg">
                    Education & Innovation Center
                </div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
                <h1 className="text-4xl md:text-6xl font-bold mb-4">
                    Mini Lab <span className="text-teal-400">Teknologi</span>
                </h1>
            </FadeInUp>
            <FadeInUp delay={0.2}>
                <p className="text-gray-300 text-lg md:text-xl max-w-3xl mx-auto italic leading-relaxed">
                    "Mengintegrasikan budidaya tanaman dengan kecanggihan teknologi untuk masa depan pangan yang berkelanjutan."
                </p>
            </FadeInUp>
        </div>
      </header>

      <section className="py-16 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <FadeInUp>
                <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 group">
                    <Image
                    src="/minilab/minilab.webp"
                    alt="Mini Lab Teknologi Pertanian"
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-teal-900/90 via-teal-900/30 to-transparent flex flex-col justify-end p-8 text-white">
                    <h3 className="text-2xl font-bold mb-2">Smart Farming Edupark</h3>
                    <p className="text-sm opacity-90">
                        Sarana edukasi interaktif ramah anak.
                    </p>
                    </div>

                </div>
                </FadeInUp>
                <FadeInUp delay={0.2}>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                        Laboratorium Teknologi <span className="text-teal-600">Pertanian</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-justify leading-relaxed">
                        Laboratorium Teknologi Pertanian ini dirancang sebagai ruang pembelajaran dan kolaborasi yang mengintegrasikan budidaya tanaman dengan penerapan teknologi pertanian. Melalui konsep lahan tematik dan greenhouse, laboratorium ini menjadi sarana edukasi serta riset kolaboratif untuk mendorong inovasi dan regenerasi pertanian berbasis teknologi.
                    </p>
                                        <p className="text-gray-600 dark:text-gray-300 mb-6 text-justify leading-relaxed">
                        Dengan konsep yang ramah anak, laboratorium ini diharapkan dapat menjadi destinasi kunjungan sekolah atau kegiatan anak-anak untuk belajar mengenai asal-usul pangan, cara kerja teknologi, dan pentingnya menjaga ekosistem melalui praktik pertanian yang berkelanjutan.
                    </p>

                    <div className="bg-teal-50 dark:bg-teal-900/20 p-5 rounded-xl border border-teal-200 dark:border-teal-800">
                        <h4 className="font-bold text-teal-800 dark:text-teal-400 mb-3 uppercase text-sm tracking-wide">Fungsi Utama:</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start text-gray-700 dark:text-gray-300">
                                <i className="fas fa-check-circle text-teal-500 mt-1 mr-3"></i>
                                <span>Sarana edukasi teknologi pertanian</span>
                            </li>
                            <li className="flex items-start text-gray-700 dark:text-gray-300">
                                <i className="fas fa-check-circle text-teal-500 mt-1 mr-3"></i>
                                <span>Demonstrasi penerapan teknologi pertanian di lapangan</span>
                            </li>
                            <li className="flex items-start text-gray-700 dark:text-gray-300">
                                <i className="fas fa-check-circle text-teal-500 mt-1 mr-3"></i>
                                <span>Fasilitas riset kolaboratif pertanian</span>
                            </li>
                        </ul>
                    </div>
                </FadeInUp>
            </div>

            <div>
                <div className="text-center mb-12">
                    <FadeInUp>
                        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Jelajahi 6 Zona Teknologi</h2>
                        <div className="h-1 w-24 bg-teal-500 mx-auto rounded"></div>
                        <p className="mt-4 text-gray-500 dark:text-gray-400">Setiap petak menerapkan teknologi modern yang berbeda.</p>
                    </FadeInUp>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {zones.map((zone, idx) => (
                        <FadeInUp key={idx} delay={idx * 0.1}>
                            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 h-full flex flex-col">
                                <div className={`p-6 flex items-center gap-4 ${zone.color} bg-opacity-20`}>
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center bg-white shadow-sm text-xl`}>
                                        <i className={`fas ${zone.icon}`}></i>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-800">{zone.title}</h3>
                                        <p className="text-xs font-semibold uppercase tracking-wide opacity-80">Tanaman: {zone.plant}</p>
                                    </div>
                                </div>
                                <div className="p-6 flex-grow flex flex-col">
                                    <h4 className="font-bold text-teal-600 mb-2 text-sm">{zone.tech}</h4>
                                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed flex-grow">
                                        {zone.desc}
                                    </p>
                                    <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                                            <i className="fas fa-info-circle mr-1"></i> {zone.detail}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </FadeInUp>
                    ))}
                </div>
            </div>

            <FadeInUp>
                <div className="bg-gradient-to-r from-teal-700 to-green-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -ml-10 -mb-10"></div>
                    
                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-1 text-left">
                            <div className="inline-block bg-yellow-400 text-green-900 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase shadow-sm">
                                <i className="fas fa-school mr-1"></i> Edukasi Interaktif
                            </div>
                            <h2 className="text-3xl font-bold mb-4">Belajar Pertanian Jadi Seru!</h2>
                            <p className="opacity-90 leading-relaxed mb-6 text-lg">
                                Laboratorium kami terbuka untuk kunjungan sekolah (Field Trip). Anak-anak dapat melihat langsung bagaimana <strong>Sensor Suara</strong> mendeteksi hama atau bagaimana <strong>Greenhouse</strong> menciptakan cuaca buatan.
                            </p>
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium">
                                <li className="flex items-center"><i className="fas fa-check-circle text-yellow-300 mr-2"></i> Mengenal Teknologi IoT</li>
                                <li className="flex items-center"><i className="fas fa-check-circle text-yellow-300 mr-2"></i> Panen Sayur Sehat</li>
                                <li className="flex items-center"><i className="fas fa-check-circle text-yellow-300 mr-2"></i> Belajar Ekosistem Alam</li>
                                <li className="flex items-center"><i className="fas fa-check-circle text-yellow-300 mr-2"></i> Inspirasi Petani Milenial</li>
                            </ul>
                        </div>
                        <div className="md:w-1/3 flex justify-center">
                            <div className="bg-white/20 backdrop-blur-md p-8 rounded-full border-2 border-white/30 shadow-inner">
                                <i className="fas fa-child text-8xl text-white drop-shadow-lg"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </FadeInUp>

            <div className="text-center pb-8">
                <FadeInUp>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Tertarik Mengadakan Kunjungan?</h2>
                    <div className="inline-flex flex-col sm:flex-row gap-4">
                        <Link href="https://wa.me/6289524187347?text=Halo%20Admin,%20saya%20ingin%20info%20kunjungan%20sekolah%20ke%20Mini%20Lab" target="_blank" className="px-8 py-4 bg-teal-600 text-white rounded-xl font-bold shadow-lg hover:bg-teal-700 transition flex items-center justify-center gap-2 transform hover:-translate-y-1">
                            <i className="fab fa-whatsapp text-xl"></i> Jadwalkan Kunjungan
                        </Link>
                        <Link href="/kolaborasi" className="px-8 py-4 bg-white text-teal-700 border-2 border-teal-600 rounded-xl font-bold shadow-sm hover:bg-teal-50 transition flex items-center justify-center gap-2">
                            <i className="fas fa-search text-xl"></i> Lihat Program Lain
                        </Link>
                    </div>
                </FadeInUp>
            </div>

        </div>
      </section>
    </>
  );
}