export default function sitemap() {
  const baseUrl = "https://www.tanisolution.id";

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/berita`, lastModified: new Date() },
    { url: `${baseUrl}/kolaborasi`, lastModified: new Date() },
    { url: `${baseUrl}/layanan`, lastModified: new Date() },
    { url: `${baseUrl}/tentang-kami`, lastModified: new Date() },
    { url: `${baseUrl}/kontak`, lastModified: new Date() },
  ];
}
