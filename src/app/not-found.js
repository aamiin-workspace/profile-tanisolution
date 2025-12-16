import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata = {
  title: '404 - Halaman Tidak Ditemukan | Tani Solution',
};

export default function NotFound() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 pt-16 transition-colors duration-300">
        <div className="text-center px-4">
          
          <div className="text-9xl font-bold text-primary opacity-20 select-none">404</div>          
          <h1 className="text-3xl md:text-4xl font-bold text-secondary dark:text-white -mt-8 mb-4">
            Halaman Tidak Ditemukan
          </h1>
          
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            Maaf, halaman yang Anda cari mungkin telah dihapus, dipindahkan, atau alamatnya salah.
          </p>
          
          <Link 
            href="/" 
            className="bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-green-700 transition shadow-lg inline-block"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}