import KreasolusiClient from '@/components/views/KreasolusiClient';
import BreadcrumbJsonLd from '@/components/utils/BreadcrumbJsonLd'; 

export const metadata = {
  title: 'Layanan Studio KreaSolusi | Tani Solution',
  description: 'Fasilitas produksi konten kreatif untuk UMKM. Tersedia layanan Self-Service (Gratis) dan Jasa Profesional terjangkau.',
};

export default function KreasolusiPage() {
  const breadcrumbItems = [
    { name: "Beranda", url: "https://www.tanisolution.id/" }, 
    { name: "Kreasolusi", url: "https://www.tanisolution.id/kreasolusi" }
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <KreasolusiClient />
    </>
  );
}