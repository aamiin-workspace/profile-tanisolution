import { Suspense } from 'react';
import pool from '@/lib/db';
import KolaborasiClient from '@/components/views/KolaborasiClient';

export const metadata = {
  title: 'Kolaborasi | Magang, Riset & Kunjungan Tani Solution',
  description: 'Informasi lengkap mengenai program Magang/PKL, Kunjungan Industri, dan Kolaborasi Riset bersama Tani Solution Indonesia.',
};

async function getGalleryData() {
  try {
    const [rows] = await pool.query('SELECT * FROM collaborations ORDER BY date DESC, created_at DESC');
    
    return rows.map(item => ({
        ...item,
        created_at: item.created_at ? item.created_at.toISOString() : null,
        date: item.date ? item.date.toISOString() : null
    }));
  } catch (error) {
    console.error("Database Error:", error);
    return []; 
  }
}

function SearchLoading() {
    return (
        <div className="w-full h-96 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
    );
}

export default async function KolaborasiPage() {
  const galleryData = await getGalleryData();

  return (
    <Suspense fallback={<SearchLoading />}>
        <KolaborasiClient initialGalleryData={galleryData} />
    </Suspense>
  );
}