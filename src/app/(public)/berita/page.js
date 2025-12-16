import pool from '@/lib/db'; // Pastikan path ini benar sesuai db.js Anda
import Link from 'next/link';
import ImageFallback from '@/components/utils/ImageFallback'; // Import komponen dari langkah 1

export const metadata = {
  title: 'Berita & Artikel | Tani Solution',
  description: 'Informasi terbaru seputar kegiatan, inovasi teknologi, dan edukasi pertanian dari Tani Solution.',
};

// Fungsi Ambil Data (Berjalan di Server)
async function getNewsData() {
  try {
    // Query ke TiDB
    const [rows] = await pool.query('SELECT * FROM news ORDER BY date DESC');
    
    // Serialisasi: Ubah objek Date menjadi String agar bisa dikirim ke komponen React
    return rows.map(item => ({
        ...item,
        date: item.date ? item.date.toISOString() : null,
        created_at: item.created_at ? item.created_at.toISOString() : null,
    }));
  } catch (error) {
    console.error("Gagal ambil berita:", error);
    // Kembalikan array kosong agar halaman tidak error 500 (Blank)
    return [];
  }
}

export default async function BeritaPage() {
  const news = await getNewsData();

  return (
    <section className="py-16 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Berita & Artikel
            </h2>
            <div className="h-1 w-20 bg-green-600 mx-auto rounded-full"></div>
            <p className="mt-4 text-gray-500 max-w-2xl mx-auto">
              Ikuti perkembangan terbaru kami dalam memajukan pertanian Indonesia melalui teknologi dan kolaborasi.
            </p>
        </div>

        {/* Content Section */}
        {news.length === 0 ? (
            // Tampilan Jika Data Kosong
            <div className="flex flex-col items-center justify-center py-20 bg-gray-50 dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                <div className="text-gray-400 text-6xl mb-4">
                  <i className="fas fa-newspaper"></i> {/* Pastikan FontAwesome ada, atau hapus icon ini */}
                </div>
                <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                  Belum ada berita yang diterbitkan saat ini.
                </p>
            </div>
        ) : (
            // Grid Berita
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => (
                    <article 
                      key={item.id} 
                      className="group bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 overflow-hidden flex flex-col"
                    >
                        
                        {/* Area Gambar (Menggunakan Component ImageFallback) */}
                        <div className="relative w-full h-48 bg-gray-200 dark:bg-gray-700 overflow-hidden">
                            <ImageFallback 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition duration-500 ease-in-out"
                            />
                            
                            {/* Badge Kategori */}
                            <div className="absolute top-4 left-4">
                                <span className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-green-700 dark:text-green-400 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide shadow-sm">
                                    {item.category}
                                </span>
                            </div>
                        </div>

                        {/* Konten Teks */}
                        <div className="p-6 flex flex-col flex-grow">
                            {/* Tanggal */}
                            <div className="flex items-center text-xs text-gray-400 mb-3 space-x-2">
                                <i className="far fa-calendar-alt"></i>
                                <span>
                                  {item.date ? new Date(item.date).toLocaleDateString('id-ID', {
                                      year: 'numeric', month: 'long', day: 'numeric'
                                  }) : '-'}
                                </span>
                            </div>
                            
                            {/* Judul */}
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-tight group-hover:text-green-600 transition-colors">
                                <Link href={`/berita/${item.id}`}>
                                    {item.title}
                                </Link>
                            </h3>
                            
                            {/* Excerpt / Cuplikan */}
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3 flex-grow">
                                {item.excerpt || "Simak selengkapnya artikel ini untuk mendapatkan informasi detail mengenai topik yang dibahas..."}
                            </p>

                            {/* Tombol Baca */}
                            <div className="mt-auto pt-4 border-t border-gray-100 dark:border-gray-700">
                                <Link 
                                  href={`/berita/${item.id}`} 
                                  className="inline-flex items-center text-green-600 dark:text-green-400 font-bold text-sm hover:text-green-800 dark:hover:text-green-300 transition-colors"
                                >
                                    Baca Selengkapnya 
                                    <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                                </Link>
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        )}

      </div>
    </section>
  );
}