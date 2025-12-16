import { Suspense } from 'react';
import Image from 'next/image';
import pool from '@/lib/db'; // Import koneksi DB langsung
import Link from 'next/link';

// 1. Fungsi Ambil Data Langsung (Tanpa Fetch API)
async function getNewsData() {
  try {
    const [rows] = await pool.query('SELECT * FROM news ORDER BY date DESC');
    
    // Serialisasi data (ubah Date object jadi String agar aman)
    return rows.map(item => ({
        ...item,
        date: item.date ? item.date.toISOString() : null,
        created_at: item.created_at ? item.created_at.toISOString() : null,
    }));
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

// 2. Komponen Helper untuk Gambar (Agar tidak blank jika gambar error)
const NewsImage = ({ src, alt }) => {
    // Cek apakah URL valid
    const safeSrc = src ? src : '/placeholder.jpg'; 
    
    return (
        <div className="relative w-full h-48 overflow-hidden rounded-t-lg bg-gray-200">
            {/* Gunakan img biasa dulu untuk debugging, lebih toleran daripada Image Next.js */}
            <img 
                src={safeSrc} 
                alt={alt} 
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
                onError={(e) => { e.target.src = '/placeholder.jpg'; }} // Fallback jika gambar hilang
            />
        </div>
    );
};

export default async function NewsPage() {
  // Panggil fungsi data
  const news = await getNewsData();

  return (
    <section className="py-16 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Berita & Artikel</h2>
            <p className="mt-4 text-gray-500">Informasi terbaru seputar kegiatan dan teknologi Tani Solution.</p>
        </div>

        {/* Cek jika data kosong */}
        {news.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-xl">
                <p className="text-gray-500 text-lg">Belum ada berita yang diterbitkan.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => (
                    <article key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition">
                        
                        {/* Gambar */}
                        <NewsImage src={item.image} alt={item.title} />

                        <div className="p-6">
                            <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                                <span className="bg-green-100 text-green-800 px-2 py-1 rounded font-bold">
                                    {item.category}
                                </span>
                                <span>{item.date ? item.date.split('T')[0] : '-'}</span>
                            </div>
                            
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">
                                {item.title}
                            </h3>
                            
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                                {item.excerpt || "Klik untuk membaca selengkapnya..."}
                            </p>

                            <Link href={`/news/${item.id}`} className="text-primary font-bold text-sm hover:underline">
                                Baca Selengkapnya →
                            </Link>
                        </div>
                    </article>
                ))}
            </div>
        )}

      </div>
    </section>
  );
}