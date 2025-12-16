import pool from '@/lib/db';
import PrestasiClient from '@/components/views/PrestasiClient';

export const metadata = {
  title: 'Prestasi & Riset | Tani Solution Indonesia',
  description: 'Rekam jejak prestasi, penghargaan, dan publikasi riset Tani Solution dalam mengembangkan teknologi pertanian.',
};

async function getAchievements() {
  try {
    const [rows] = await pool.query('SELECT * FROM achievements ORDER BY created_at ASC');
    return rows.map(item => ({
        ...item,
        created_at: item.created_at.toISOString()
    }));
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

export default async function PrestasiPage() {
  const data = await getAchievements();
  return <PrestasiClient initialData={data} />;
}