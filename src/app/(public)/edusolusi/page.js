import EdusolusiClient from '@/components/views/EdusolusiClient';
import BreadcrumbJsonLd from '@/components/utils/BreadcrumbJsonLd'; // pastikan path ini sesuai

export const metadata = {
  title: 'Edusolusi | Divisi Sosial Tani Solution',
  description: 'Membangun generasi baru petani Indonesia melalui edukasi, beasiswa, dan teknologi pertanian modern.',
  openGraph: {
    title: 'Edusolusi - Regenerasi Petani Indonesia',
    description: 'Program beasiswa dan edukasi teknologi pertanian untuk siswa dan mahasiswa.',
  }
};

export default function EdusolusiPage() {
  const breadcrumbItems = [
    { name: "Beranda", url: "https://www.tanisolution.id/" },   // ganti domain
    { name: "Edusolusi", url: "https://www.tanisolution.id/edusolusi" }
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <EdusolusiClient />
    </>
  );
}