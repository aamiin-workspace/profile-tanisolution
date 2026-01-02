export default function About() {
  return (
    <section id="about" className="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-secondary dark:text-white">Tentang Kami</h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-2"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            PT Global Tani Solution (dikenal juga dengan Tani Solution Indonesia) merupakan start up manufaktur teknologi pertanian (agritech) yang berfokus pada produksi alat semi mekanisasi pertanian. Tani Solution Indonesia hadir dengan semangat untuk merevolusi sektor pertanian Indonesia melalui inovasi teknologi dan edukasi. Melalui pendekatan ini, kami ingin menciptakan ekosistem pertanian yang lebih modern, efisien, dan berkelanjutan.
          </p>
        </div>

        {/* Grid Visi & Misi */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-16">
          
          {/* Visi Card */}
          <div className="bg-green-50 dark:bg-gray-800 p-8 rounded-2xl border border-green-100 dark:border-gray-700 transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-primary group cursor-default relative overflow-hidden h-full">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-green-200 dark:bg-green-900 rounded-full opacity-20 group-hover:scale-150 transition-transform duration-700"></div>
            
            <h3 className="text-xl font-bold text-primary mb-4 flex items-center relative z-10">
              <i className="fas fa-eye mr-2"></i> Visi Kami
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed relative z-10">
              Menjadi pionir inovasi alat pertanian tepat guna serta menginspirasi generasi muda.
            </p>
          </div>

          {/* Misi List */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-secondary dark:text-white mb-4 flex items-center pl-2">
              <i className="fas fa-bullseye text-primary mr-2 animate-pulse"></i>
              Misi Kami
            </h3>

            <ul className="space-y-3">
              {[
                "Menciptakan alat pertanian tepat guna dan ramah lingkungan.",
                "Menyediakan program edukasi bagi generasi muda agar tertarik pada pertanian.",
                "Membangun kemitraan kuat dengan petani lokal."
              ].map((item, idx) => (
                <li
                  key={idx}
                  className="
                    flex items-start p-4 rounded-xl 
                    transition-all duration-300 
                    hover:bg-green-50 dark:hover:bg-gray-800 
                    hover:shadow-lg hover:translate-x-2 
                    border border-transparent hover:border-green-100 dark:hover:border-gray-700
                    cursor-default group
                  "
                >
                  <div className="flex-shrink-0 mt-1 mr-3">
                    <i className="
                      fas fa-check-circle text-gray-300 dark:text-gray-600
                      group-hover:text-primary 
                      transition-colors duration-300 
                      text-lg
                    "></i>
                  </div>

                  <span className="text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Video Section */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-6">
             <h3 className="text-xl font-semibold text-secondary dark:text-white flex items-center justify-center">
                <i className="fas fa-play-circle text-primary mr-2"></i>
                Lihat Kami Beraksi
             </h3>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white dark:border-gray-700 bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-600">
            <div className="aspect-video w-full">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube.com/embed/Hu0EkTi24ZQ?si=Y-Fj64HIvu2tI_2F" 
                title="Tani Solution Indonesia Profile"
                frameBorder="0" 
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
           <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4 italic">
            Cuplikan kegiatan dan teknologi yang kami kembangkan di lahan pertanian.
          </p>
        </div>

      </div>
    </section>
  );
}