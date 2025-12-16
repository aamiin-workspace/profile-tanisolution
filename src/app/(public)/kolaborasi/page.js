import { Suspense } from 'react';
import pool from '@/lib/db'; // Import koneksi DB langsung
import KolaborasiClient from '@/components/views/KolaborasiClient';

export const metadata = {
  title: 'Kolaborasi | Magang, Riset & Kunjungan Tani Solution',
  description: 'Program Magang/PKL, Kunjungan Industri, dan Kolaborasi Riset bersama Tani Solution.',
};

// 1. Ambil Data Langsung dari DB (Tanpa Fetch API)
async function getCollaborations() {
  try {
    const [rows] = await pool.query('SELECT * FROM collaborations ORDER BY date DESC');
    
    // Serialisasi data (ubah Date object jadi String agar bisa masuk ke Client Component)
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

// Loading UI
function LoadingState() {
    return (
        <div className="w-full h-96 flex items-center justify-center">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
    );
}

export default async function KolaborasiPage() {
  const galleryData = await getCollaborations();

  return (
    // WAJIB SUSPENSE untuk Client Component yang pakai useSearchParams
    <Suspense fallback={<LoadingState />}>
        <KolaborasiClient initialGalleryData={galleryData} />
    </Suspense>
  );
}