import TeknosolusiClient from '@/components/views/TeknosolusiClient';

export const metadata = {
  title: 'Teknosolusi | Inovasi Alat Pertanian Alburdat',
  description: 'Solusi teknologi pertanian modern dengan alat semi-mekanisasi Alburdat untuk efisiensi lahan kering. Produk unggulan Tani Solution Indonesia.',
  keywords: ['Alburdat', 'Teknologi Pertanian', 'Mekanisasi Pertanian', 'Alat Tanam Jagung', 'Tani Solution'],
  openGraph: {
    title: 'Teknosolusi - Solusi Pertanian Modern',
    description: 'Tingkatkan produktivitas pertanian Anda dengan alat inovatif Alburdat.',
    images: ['/teknosolusi/alburdat.webp'], 
  }
};

export default function TeknosolusiPage() {
  return (
    <>
      <TeknosolusiClient />
    </>
  );
}