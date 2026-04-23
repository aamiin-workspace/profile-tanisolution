import { Suspense } from 'react';
import pool from '@/lib/db';
import KolaborasiClient from '@/components/views/KolaborasiClient';
import BreadcrumbJsonLd from '@/components/utils/BreadcrumbJsonLd';

export const revalidate = 60;

export const metadata = {
  title: 'Kolaborasi | Magang, Riset & Kunjungan Tani Solution',
  description: 'Program Magang/PKL, Kunjungan Industri, dan Kolaborasi Riset bersama Tani Solution.',
};

async function getCollaborations() {
  try {
    const [rows] = await pool.query('SELECT * FROM collaborations ORDER BY date DESC');
    
    return rows.map(item => ({
        ...item,
        date: item.date ? item.date.toISOString() : null,
        created_at: item.created_at ? item.created_at.toISOString() : null
    }));
  } catch (error) {
    console.error("Database Error:", error);
    return [];
  }
}

function LoadingState() {
    return (
        <div className="w-full h-96 flex items-center justify-center">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
    );
}

export default async function KolaborasiPage() {
  const galleryData = await getCollaborations();

  const breadcrumbItems = [
    { name: "Beranda", url: "https://www.tanisolution.id/" }, 
    { name: "Kolaborasi", url: "https://www.tanisolution.id/kolaborasi" }
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <Suspense fallback={<LoadingState />}>
        <KolaborasiClient initialGalleryData={galleryData} />
      </Suspense>
    </>
  );
}