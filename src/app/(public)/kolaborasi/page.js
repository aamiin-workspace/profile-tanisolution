import pool from '@/lib/db';
import KolaborasiClient from '@/components/views/KolaborasiClient';

export const metadata = {
  title: 'Kolaborasi | Magang, Riset & Kunjungan Tani Solution',
  description: 'Informasi lengkap mengenai program Magang/PKL, Kunjungan Industri, dan Kolaborasi Riset bersama Tani Solution Indonesia.',
};

async function getGalleryData() {
  try {
    const [rows] = await pool.query('SELECT * FROM collaborations ORDER BY created_at DESC');
    
    return rows.map(item => ({
        ...item,
        created_at: item.created_at.toISOString(),
        date: item.date ? item.date.toISOString() : null
    }));
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export default async function KolaborasiPage() {
  const galleryData = await getGalleryData();
  return <KolaborasiClient initialGalleryData={galleryData} />;
}