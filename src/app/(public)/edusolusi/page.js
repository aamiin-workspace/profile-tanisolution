import EdusolusiClient from '@/components/views/EdusolusiClient';

export const metadata = {
  title: 'Edusolusi | Divisi Sosial Tani Solution',
  description: 'Membangun generasi baru petani Indonesia melalui edukasi, beasiswa, dan teknologi pertanian modern.',
  openGraph: {
    title: 'Edusolusi - Regenerasi Petani Indonesia',
    description: 'Program beasiswa dan edukasi teknologi pertanian untuk siswa dan mahasiswa.',
  }
};

export default function EdusolusiPage() {
  return <EdusolusiClient />;
}