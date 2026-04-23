import MinilabClient from '@/components/views/MinilabClient';
import BreadcrumbJsonLd from '@/components/utils/BreadcrumbJsonLd';

export const metadata = {
  title: 'Mini Lab Teknologi Pertanian | Tani Solution',
  description: 'Pusat edukasi teknologi pertanian ramah anak. Belajar IoT, Smart Farming, dan budidaya tanaman modern.',
};

export default function MinilabPage() {
  const breadcrumbItems = [
    { name: "Beranda", url: "https://www.tanisolution.id/" }, 
    { name: "Minilab", url: "https://www.tanisolution.id/minilab" }
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <MinilabClient />
    </>
  );
}