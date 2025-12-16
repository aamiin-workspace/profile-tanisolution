'use client'; 

import { useState } from 'react';
import { motion } from 'framer-motion';
import FadeInUp from './utils/FadeInUp';

export default function Contact() {
  const [formData, setFormData] = useState({ nama: '', nowa: '', pesan: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
     
      const waNumber = '6289524187347'; 
      const text = `Halo Admin Tani Solution,%0A%0APerkenalkan saya:%0ANama: ${formData.nama}%0ANo WA: ${formData.nowa}%0A%0APesan:%0A${formData.pesan}`;
      
      window.open(`https://wa.me/${waNumber}?text=${text}`, '_blank');
      
      setFormData({ nama: '', nowa: '', pesan: '' });
      
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Gagal memproses pesan.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-10 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">

          <FadeInUp className="h-full">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white mb-6">Hubungi Kami</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Ingin berkolaborasi atau memesan alat pertanian modern? Klik salah satu kontak di bawah ini untuk terhubung langsung.
              </p>

              <div className="space-y-1">
                {[
                  {
                    href: "https://www.google.com/maps/search/?api=1&query=Jl.+Tegalsari,+RT.2/RW.5,+Pawang,+Gayamdompo,+Karanganyar,+Jawa+Tengah+57751",
                    icon: "fa-map-marker-alt",
                    title: "Kantor Pusat",
                    desc: "Jl. Tegalsari, RT.2/RW.5, Pawang, Gayamdompo, Karanganyar, Jawa Tengah 57751",
                    action: "Buka di Maps"
                  },
                  {
                    href: "https://www.google.com/maps/search/?api=1&query=Jl.+Lawu+No.357,+Popongan,+Karanganyar,+Jawa+Tengah+57715",
                    icon: "fa-wrench",
                    title: "Tempat Produksi",
                    desc: "Jl. Lawu No.357, Popongan, Karanganyar, Jawa Tengah 57715",
                    action: "Buka di Maps"
                  },
                  {
                    href: "https://wa.me/6289524187347",
                    icon: "fa-whatsapp", 
                    isBrand: true,
                    title: "WhatsApp Official",
                    desc: "+62 895-2418-7347",
                    action: "Chat Sekarang →"
                  },
                  {
                    href: "mailto:tanisolutionindonesia@gmail.com",
                    icon: "fa-envelope",
                    title: "Email",
                    desc: "tanisolutionindonesia@gmail.com",
                    action: "Kirim Email →"
                  }
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ x: 5, backgroundColor: "rgba(56, 142, 60, 0.05)" }}
                    className="flex items-start p-4 rounded-xl hover:bg-green-50 dark:hover:bg-gray-800 transition duration-300 group border border-transparent hover:border-green-100 dark:hover:border-green-900 cursor-pointer"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-primary dark:text-green-400 mt-1 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition duration-300 shadow-sm">
                      <i className={`${item.isBrand ? 'fab' : 'fas'} ${item.icon} text-lg`}></i>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-base font-bold text-secondary dark:text-white group-hover:text-primary dark:group-hover:text-green-400 transition">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-800 dark:group-hover:text-gray-200">
                        {item.desc}
                      </p>
                      <span className="text-xs text-primary dark:text-green-400 font-semibold mt-1 inline-block opacity-0 group-hover:opacity-100 transition-opacity">
                        {item.action === "Buka di Maps" && <i className="fas fa-external-link-alt mr-1"></i>}
                        {item.action}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </FadeInUp>

          <FadeInUp delay={0.2} className="h-full">
            <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 h-fit transition-colors duration-300 relative overflow-hidden">              
              <div className="absolute top-0 right-0 -mr-10 -mt-10 w-32 h-32 bg-green-50 dark:bg-green-900/10 rounded-full blur-3xl pointer-events-none"></div>
              <h3 className="text-xl font-bold text-secondary dark:text-white mb-6 relative z-10">Kirim Pesan Cepat</h3>
              <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-xs font-bold mb-1 ml-1">NAMA</label>
                  <input
                    id="nama"
                    type="text"
                    value={formData.nama}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Nama Lengkap Anda"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-xs font-bold mb-1 ml-1">NO. WHATSAPP</label>
                  <input
                    id="nowa"
                    type="tel"
                    value={formData.nowa}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    placeholder="Contoh: 0812..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 text-xs font-bold mb-1 ml-1">PESAN</label>
                  <textarea
                    id="pesan"
                    rows="4"
                    value={formData.pesan}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                    placeholder="Saya tertarik dengan produk..."
                    required
                  ></textarea>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-primary text-white font-bold py-3.5 rounded-xl hover:bg-green-700 transition shadow-lg shadow-green-500/30 text-sm flex items-center justify-center gap-2 mt-2"
                >
                  {isLoading ? (
                    'Memproses...'
                  ) : (
                    <>
                      <i className="fab fa-whatsapp text-lg"></i> Kirim ke WhatsApp
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </FadeInUp>

        </div>
      </div>
    </section>
  );
}