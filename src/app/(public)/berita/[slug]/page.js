import pool from '@/lib/db';
import { notFound } from 'next/navigation';
import DetailBeritaClient from '@/components/views/DetailBeritaClient';

async function getNewsDetail(slug) {
  try {
    const [rows] = await pool.query('SELECT * FROM news WHERE slug = ?', [slug]);

    console.log(`Mencari slug: ${slug}, Hasil: ${rows.length} data`);

    if (rows.length === 0) return null;
    
    return {
      ...rows[0],
      date: rows[0].date.toISOString(),
      created_at: rows[0].created_at.toISOString(),
      updated_at: rows[0].updated_at ? rows[0].updated_at.toISOString() : rows[0].created_at.toISOString()
    };
  } catch (error) {
    console.error("Database Error:", error); 
    return null;
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
    description: news.excerpt || news.content?.substring(0, 150) || 'Baca selengkapnya di Tani Solution Indonesia.',
    openGraph: {
      title: news.title,
      description: news.excerpt,
      url: `https://www.tanisolution.id/berita/${slug}`,
      siteName: 'Global Tani Solution',
      images: [
        {
          url: news.image || '/hero.webp',
          width: 800,
          height: 600,
          alt: news.title,
        }
      ],
      type: 'article',
      publishedTime: news.date,
      authors: [news.author || 'Tim Redaksi'],
    },
    twitter: {
      card: 'summary_large_image',
      title: news.title,
      description: news.excerpt,
      images: [news.image || '/hero.webp'],
    },
  };
}

export default async function DetailBeritaPage({ params }) {
  const { slug } = await params;
  const news = await getNewsDetail(slug);

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
      'logo': {
        '@type': 'ImageObject',
        'url': 'https://www.tanisolution.id/logo.png'
      }
    },
    'description': news.excerpt
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />     
      <DetailBeritaClient news={news} />
    </>
  );
}