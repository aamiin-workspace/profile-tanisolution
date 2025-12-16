import pool from '@/lib/db';
import Link from 'next/link';
import ImageFallback from '@/components/utils/ImageFallback';

export const metadata = {
  title: 'Berita & Artikel | Tani Solution',
  description: 'Informasi terbaru seputar kegiatan dan teknologi Tani Solution.',
};

async function getNewsData() {
  try {
    const [rows] = await pool.query('SELECT * FROM news ORDER BY date DESC');
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

export default async function NewsPage() {
  const news = await getNewsData();

  return (
    <section className="py-16 bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Berita & Artikel</h2>
        </div>

        {news.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-xl">
                <p className="text-gray-500">Belum ada berita.</p>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item) => (
                    <article key={item.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md transition overflow-hidden">
                        {/* GUNAKAN IMAGE FALLBACK DISINI */}
                        <div className="relative w-full h-48 bg-gray-200">
                            <ImageFallback 
                                src={item.image} 
                                alt={item.title} 
                                className="w-full h-full object-cover hover:scale-105 transition duration-500"
                            />
                        </div>

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