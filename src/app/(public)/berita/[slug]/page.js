import pool from '@/lib/db';
import { notFound } from 'next/navigation';
import DetailBeritaClient from '@/components/views/DetailBeritaClient';

async function getNewsDetail(slug) {
  try {
    const [rows] = await pool.query('SELECT * FROM news WHERE slug = ?', [slug]);

    if (rows.length === 0) return null;

    await pool.query(
        'UPDATE news SET views = COALESCE(views, 0) + 1 WHERE id = ?', 
        [rows[0].id]
    );

    return {
      ...rows[0],
      views: (rows[0].views || 0) + 1,
      date: rows[0].date.toISOString(),
      created_at: rows[0].created_at.toISOString(),
      updated_at: rows[0].updated_at ? rows[0].updated_at.toISOString() : rows[0].created_at.toISOString()
    };
  } catch (error) {
    console.error("Database Error (Detail):", error.message); 
    return null;
  }
}

async function getPopularNews(currentSlug) {
  try {
    const [rows] = await pool.query(`
      SELECT id, title, slug, date, image, category, views 
      FROM news 
      WHERE slug != ? 
      ORDER BY views DESC, date DESC 
      LIMIT 5
    `, [currentSlug]);

    return rows.map(item => ({
      ...item,
      slug: item.slug || item.id.toString(),
      date: item.date ? item.date.toISOString() : null,
    }));
  } catch (error) {
    console.error("Database Error (Popular):", error.message);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params; 
  const news = await getNewsDetail(slug); 

  if (!news) {
    return { 
        title: 'Berita Tidak Ditemukan',
        robots: { index: false } 
    };
  }

  return {
    title: `${news.title} | Tani Solution`,
    description: news.excerpt || news.content?.substring(0, 150),
    openGraph: {
      title: news.title,
      description: news.excerpt,
      url: `https://www.tanisolution.id/berita/${slug}`,
      siteName: 'Global Tani Solution',
      images: [{ url: news.image || '/hero.webp', width: 800, height: 600, alt: news.title }],
      type: 'article',
      publishedTime: news.date,
      authors: [news.author || 'Tim Redaksi'],
    },
  };
}

export default async function DetailBeritaPage({ params }) {
  const { slug } = await params;

  const newsData = getNewsDetail(slug);
  const popularData = getPopularNews(slug);

  const [news, popularNews] = await Promise.all([newsData, popularData]);

  if (!news) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    'headline': news.title,
    'image': [news.image || 'https://www.tanisolution.id/hero.webp'],
    'datePublished': news.date,
    'dateModified': news.updated_at || news.date,
    'author': {
      '@type': 'Person',
      'name': news.author || 'Admin Tani Solution'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'Global Tani Solution',
      'logo': { '@type': 'ImageObject', 'url': 'https://www.tanisolution.id/logo.png' }
    },
    'description': news.excerpt
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />     
      <DetailBeritaClient news={news} popularNews={popularNews} />
    </>
  );
}