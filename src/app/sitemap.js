import pool from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function sitemap() {
  const baseUrl = "https://www.tanisolution.id";

  let dynamicNews = [];
  try {
    const [rows] = await pool.query('SELECT id, slug, date, created_at FROM news');
    
    console.log(`Sitemap: Ditemukan ${rows.length} berita di database.`);

    dynamicNews = rows.map((item) => ({
      url: `${baseUrl}/berita/${item.slug || item.id}`, 
      
      lastModified: new Date(item.date || item.created_at || new Date()),
      
      changeFrequency: 'weekly',
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Gagal mengambil data sitemap (Cek Koneksi/Query DB):", error.message);
  }

  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/teknosolusi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/minilab`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/edusolusi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/kreasolusi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/prestasi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/berita`, 
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/kolaborasi`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  return [...staticRoutes, ...dynamicNews];
}