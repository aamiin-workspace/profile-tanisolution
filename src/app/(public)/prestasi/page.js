import { Suspense } from 'react'; // 1. Import Wajib
import pool from '@/lib/db';
import PrestasiClient from '@/components/views/PrestasiClient';

export const metadata = {
  title: 'Prestasi & Riset | Tani Solution Indonesia',
  description: 'Rekam jejak prestasi, penghargaan, dan publikasi riset Tani Solution dalam mengembangkan teknologi pertanian.',
};

// Fungsi Ambil Data (Server Side)
async function getAchievements() {
  try {
    // 2. Query Database
    // Saya ubah ORDER BY ke 'year DESC' agar prestasi terbaru muncul paling atas (Standar Portfolio)
    // Jika ingin yang lama duluan, ubah DESC jadi ASC.
    const [rows] = await pool.query('SELECT * FROM achievements ORDER BY year DESC, created_at DESC');
    
    // Serialisasi Data (Penting untuk Next.js)
    return rows.map(item => ({
        ...item,
        created_at: item.created_at ? item.created_at.toISOString() : null
    }));
  } catch (error) {
    console.error("Database Error:", error);
    return []; // Return array kosong agar halaman tidak error 500
  }
}

// 3. Komponen Loading (Agar user tahu sedang memuat data)
function LoadingState() {
    return (
        <div className="w-full h-96 flex items-center justify-center">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
    );
}

export default async function PrestasiPage() {
  const data = await getAchievements();

  return (
    // 4. WAJIB: Bungkus Client Component dengan Suspense
    // Ini mencegah error build di Vercel jika Client Component membaca URL
    <Suspense fallback={<LoadingState />}>
        <PrestasiClient initialData={data} />
    </Suspense>
  );
}