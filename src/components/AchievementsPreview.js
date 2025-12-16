'use client';

import Link from 'next/link';
import FadeInUp from './utils/FadeInUp'; 
import { StaggerContainer, StaggerItem } from './utils/StaggerContainer'; 

export default function AchievementsPreview() {
  return (
    <section className="py-10 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors duration-300">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-gold opacity-5 dark:opacity-10 blur-3xl pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12">
          
          {/* Left Content */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <FadeInUp>
                <span className="inline-block py-1 px-3 rounded-full bg-yellow-50 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400 text-xs font-bold mb-4 border border-yellow-200 dark:border-yellow-800">
                Jejak Langkah Kami
                </span>
            </FadeInUp>
            
            <FadeInUp delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white mb-4">
                Berkomitmen pada <span className="text-gold">Riset & Inovasi</span>
                </h2>
            </FadeInUp>
            
            <FadeInUp delay={0.2}>
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Tani Solution Indonesia tidak hanya sekadar berjualan, tetapi berbasis pada riset mendalam. Dedikasi kami telah diakui melalui berbagai penghargaan nasional dan kolaborasi riset internasional.
                </p>
            </FadeInUp>
            
            <FadeInUp delay={0.3}>
                <Link 
                href="/prestasi" 
                className="inline-flex items-center justify-center bg-secondary text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:border dark:border-gray-700 transition shadow-lg group"
                >
                Lihat Penghargaan & Riset
                <i className="fas fa-arrow-right ml-2 transform group-hover:translate-x-1 transition"></i>
                </Link>
            </FadeInUp>
          </div>

          {/* Right Content (Grid) */}
          <div className="w-full md:w-1/2">
            <StaggerContainer className="grid grid-cols-2 gap-4">
              
              <StaggerItem>
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-gold dark:hover:border-gold transition duration-300 h-full">
                    <i className="fas fa-trophy text-3xl text-gold mb-3"></i>
                    <div className="text-2xl font-bold text-secondary dark:text-white">Top 3</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Pertamuda Seed & Scale</div>
                  </div>
              </StaggerItem>
              
              <StaggerItem>
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-gold dark:hover:border-gold transition duration-300 h-full">
                    <i className="fas fa-globe text-3xl text-blue-500 mb-3"></i>
                    <div className="text-2xl font-bold text-secondary dark:text-white">Global</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">Riset Kolaborasi</div>
                  </div>
              </StaggerItem>

              <StaggerItem className="col-span-2">
                  <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-2xl border border-gray-100 dark:border-gray-700 hover:border-gold dark:hover:border-gold transition duration-300 flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold text-secondary dark:text-white">Hibah</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Pendanaan Riset & Pengembangan</div>
                    </div>
                    <div className="bg-green-100 text-primary dark:bg-green-900/30 dark:text-green-400 font-bold px-3 py-1 rounded text-sm">
                      Terverifikasi
                    </div>
                  </div>
              </StaggerItem>
            
            </StaggerContainer>
          </div>

        </div>
      </div>
    </section>
  );
}