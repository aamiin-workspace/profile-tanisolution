import Hero from '@/components/Hero';
import About from '@/components/About';
import AchievementsPreview from '@/components/AchievementsPreview';
import Partners from '@/components/Partners';
import Contact from '@/components/Contact';
import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Tani Solution Indonesia | Inovasi Alat Pertanian Modern',
  description: 'Pusat solusi teknologi pertanian (Agritech), magang industri, dan kolaborasi riset di Indonesia. Produsen alat pemupukan modern.',
  keywords: ['pertanian', 'agritech', 'magang smk', 'alat pertanian', 'tani solution', 'pupuk otomatis'],
  openGraph: {
    title: 'Tani Solution Indonesia',
    description: 'Solusi Teknologi Pertanian Masa Depan.',
  },
};

async function getLatestNews() {
  try {
    const [rows] = await pool.query(`
      SELECT id, title, category, image, date 
      FROM news 
      ORDER BY date DESC 
      LIMIT 4
    `);
    
    return rows.map(row => ({
      ...row,
      date: row.date.toISOString(),
    }));
  } catch (error) {
    console.error("Gagal ambil berita hero:", error);
    return [];
  }
}

async function getPartners() {
  try {
    const [rows] = await pool.query('SELECT * FROM partners ORDER BY created_at ASC');
    return rows.map(row => ({
      ...row,
      created_at: row.created_at.toString(),
    }));
  } catch (error) {
    console.error("Gagal ambil partner:", error);
    return [];
  }
}

export default async function HomePage() {
  const [partnersData, latestNewsData] = await Promise.all([
    getPartners(),
    getLatestNews()
  ]);

  return (
    <>
      <Hero latestNews={latestNewsData} />
      <About />
      <AchievementsPreview />
      <Partners partners={partnersData} />    
      <Contact />
    </>
  );
}