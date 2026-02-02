import pool from '@/lib/db';
import BeritaClient from '@/components/views/BeritaClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Berita & Artikel | Tani Solution',
  description: 'Informasi terbaru seputar kegiatan, inovasi teknologi, dan edukasi pertanian dari Tani Solution.',
};

async function getNewsData() {
  try {
    const [rows] = await pool.query('SELECT * FROM news ORDER BY date DESC');
    
    return rows.map(item => ({
        ...item,
        slug: item.slug || item.id.toString(),
        date: item.date ? item.date.toISOString() : null,
        created_at: item.created_at ? item.created_at.toISOString() : null,
    }));
  } catch (error) {
    console.error("Gagal ambil berita:", error);
    return [];
  }
}

export default async function BeritaPage() {
  const news = await getNewsData();
  return <BeritaClient initialNews={news} />;
}