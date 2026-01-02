import { Suspense } from 'react';
import pool from '@/lib/db';
import PrestasiClient from '@/components/views/PrestasiClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Prestasi & Riset | Tani Solution Indonesia',
  description: 'Rekam jejak prestasi dan riset Tani Solution.',
};

async function getAchievements() {
  try {
    const [rows] = await pool.query('SELECT * FROM achievements ORDER BY year DESC, created_at DESC');
    return rows.map(item => ({
        ...item,
        created_at: item.created_at ? item.created_at.toISOString() : null
    }));
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

function LoadingState() {
    return <div className="p-20 text-center">Loading Data...</div>;
}

export default async function PrestasiPage() {
  const data = await getAchievements();

  return (
    <Suspense fallback={<LoadingState />}>
        <PrestasiClient initialData={data} />
    </Suspense>
  );
}