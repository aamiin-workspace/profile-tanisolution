import pool from '@/lib/db';
import { notFound } from 'next/navigation';
import DetailBeritaClient from '@/components/views/DetailBeritaClient';

async function getNewsDetail(id) {
  try {
    const [rows] = await pool.query('SELECT * FROM news WHERE id = ?', [id]);
    if (rows.length === 0) return null;
    
    return {
      ...rows[0],
      date: rows[0].date.toISOString(),
      created_at: rows[0].created_at.toISOString()
    };
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params; 
  
  const news = await getNewsDetail(id);
  
  if (!news) {
    return { title: 'Berita Tidak Ditemukan' };
  }

  return {
    title: `${news.title} | Tani Solution`,
    description: news.excerpt || 'Baca selengkapnya di Tani Solution Indonesia.',
    openGraph: {
      images: [news.image || '/hero.webp'],
    },
  };
}

export default async function DetailBeritaPage({ params }) {
  const { id } = await params;

  const news = await getNewsDetail(id);

  if (!news) {
    notFound();
  }

  return <DetailBeritaClient news={news} />;
}