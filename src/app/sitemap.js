import pool from '@/lib/db';

export default async function sitemap() {
  const baseUrl = "https://www.tanisolution.id";

  let dynamicNews = [];
  try {
    const [rows] = await pool.query('SELECT id, updated_at, created_at FROM news');
    
    dynamicNews = rows.map((item) => ({
      url: `${baseUrl}/berita/${item.id}`, 
      lastModified: new Date(item.updated_at || item.created_at),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Gagal mengambil data sitemap:", error);
  }

  // 2. HALAMAN STATIS
  const staticRoutes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${baseUrl}/teknolusi`,
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
      changeFrequency: 'weekly', 
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