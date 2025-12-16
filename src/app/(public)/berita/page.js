import pool from '@/lib/db';
import BeritaClient from '@/components/views/BeritaClient';
import FadeInUp from '@/components/utils/FadeInUp';

export const metadata = {
  title: 'Berita & Kegiatan | Tani Solution Indonesia',
  description: 'Update terkini mengenai inovasi teknologi pertanian, kegiatan edukasi, dan tips bertani modern dari Tani Solution Indonesia.',
};

async function getNews() {
  try {
    const [rows] = await pool.query('SELECT * FROM news ORDER BY date DESC');
    
    const news = rows.map(item => ({
      ...item,
      date: item.date.toISOString(),
      created_at: item.created_at.toISOString()
    }));
    
    return news;
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export default async function BeritaPage() {
  const news = await getNews();

  return (
    <>
      <header className="pt-24 pb-12 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full bg-gray-600 opacity-20 blur-3xl animate-pulse"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
             <FadeInUp>
                <div className="inline-block bg-gray-700 text-white px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-wider">Update Terkini</div>
            </FadeInUp>
            <FadeInUp delay={0.1}>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">Berita & <span className="text-primary">Kegiatan</span></h1>
            </FadeInUp>
            <FadeInUp delay={0.2}>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                    Ikuti perkembangan terbaru, inovasi teknologi, dan kegiatan sosial dari Tani Solution Indonesia.
                </p>
            </FadeInUp>
        </div>
      </header>

      <BeritaClient initialNews={news} />
    </>
  );
}