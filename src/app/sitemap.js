export default function sitemap() {
  const baseUrl = 'https://tanisolutionindonesia.vercel.app';

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/berita`, lastModified: new Date() },
    { url: `${baseUrl}/kolaborasi`, lastModified: new Date() },
    { url: `${baseUrl}/tentang-kami`, lastModified: new Date() },
  ];
}