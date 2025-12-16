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
  keywords: ['pertanian', 'agritech', 'magang smk', 'alat pertanian', 'tani solution', 'pupuk otomatis'], // Tambahkan ini
  openGraph: {
    title: 'Tani Solution Indonesia',
    description: 'Solusi Teknologi Pertanian Masa Depan.',
  },
};

async function getPartners() {
  try {
    const [rows] = await pool.query('SELECT * FROM partners ORDER BY created_at ASC');
    
    console.log("Data Partners dari DB:", rows); 
    
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
  const partnersData = await getPartners();

  return (
    <>
      <Hero />
      <About />
      <AchievementsPreview />
      <Partners partners={partnersData} />    
      <Contact />
    </>
  );
}