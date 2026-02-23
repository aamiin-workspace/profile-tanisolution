'use client';

import Image from 'next/image'; 
import OrderForm from '@/components/promo/OrderForm'; 
import ProductSlider from '@/components/promo/ProductSlider'; 

export default function PromoAlburdatClient() {
  return (
    <div className="bg-gray-100 min-h-screen pb-24 font-sans text-gray-800">
      
      <div className="max-w-lg mx-auto bg-white shadow-xl min-h-screen border-x border-gray-200">
        
        <div className="relative bg-white">
           <ProductSlider />
        </div>

        <div className="p-5 border-b border-gray-100 bg-white">
            <h1 className="text-xl font-black text-gray-900 leading-tight mb-2">
                Alburdat: Alat Tabur Pupuk & Benih Biji-bijian 
            </h1>
            
            <div className="mt-4 space-y-2">
                <FeatureCheck text="Bahan Besi Galvanis Anti Karat (Kuat & Ringan)" />
                <FeatureCheck text="Kapasitas Tas Pupuk 10+ Kg sekali isi" />
                <FeatureCheck text="Bisa untuk Jagung, Kedelai, Kacang Hijau, dll" />
                <FeatureCheck text="Tersedia Paket Hemat & Eceran" />
            </div>
        </div>

        <div className="w-full relative aspect-[1/1] bg-gray-100 border-b border-gray-200">
            <Image 
                src="/promo/promo4.webp" 
                alt="Paket Lengkap Alburdat" 
                fill 
                className="object-cover"
            />
        </div>

        <div className="w-full relative aspect-[1/1] bg-gray-100 border-b border-gray-200">
            <Image 
                src="/promo/promo5.webp" 
                alt="Paket Lengkap Alburdat" 
                fill 
                className="object-cover"
            />
        </div>

        <div className="w-full relative aspect-[1/1] bg-gray-100 border-b border-gray-200">
            <Image 
                src="/promo/promo6.webp" 
                alt="Paket Lengkap Alburdat" 
                fill 
                className="object-cover"
            />
        </div>

        <div className="bg-gray-50 p-6 pb-6 border-t border-gray-200 text-sm text-gray-700">
            <h3 className="font-bold text-gray-900 mb-4 uppercase tracking-wide border-b border-gray-300 pb-2">
                Syarat & Ketentuan
            </h3>
            
            <p className="mb-4 text-gray-600 leading-relaxed">
                Selamat datang di toko resmi kami. Dengan melakukan pembelian di toko kami, Anda dianggap telah membaca, memahami, dan menyetujui syarat dan ketentuan di bawah ini:
            </p>

            <ul className="list-disc pl-5 space-y-2 mb-6">
                <li>
                    <strong>Spesifikasi Produk:</strong> Setiap produk yang dikirim sesuai dengan deskripsi yang tertera di halaman ini.
                </li>
                <li>
                    <strong>Jadwal Pengiriman:</strong> Pesanan diproses Senin-Jumat. Order yang masuk setelah pukul <strong>15.00 WIB</strong> akan dikirim pada hari kerja berikutnya.
                </li>
                <li>
                    <strong>Kondisi Retur:</strong> Barang harus dalam keadaan baru, bersih, dan kemasan lengkap saat dikembalikan.
                </li>
                <li className="text-red-600 font-medium">
                    <strong>Wajib Video Unboxing:</strong> Segala bentuk komplain tanpa menyertakan video unboxing (buka paket) tidak dapat kami layani.
                </li>
            </ul>

            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
                <p className="font-bold text-gray-800 mb-1">Butuh Bantuan?</p>
                <p className="text-xs text-gray-500 mb-2">
                    Silakan hubungi admin via chat jika mengalami kesulitan dalam perakitan atau penggunaan alat.
                </p>
                <a 
                    href="https://wa.me/62895429640790" 
                    className="inline-flex items-center text-green-600 font-bold hover:text-green-700 transition"
                >
                    <i className="fab fa-whatsapp text-lg mr-2"></i> Admin CS: 0895-4296-40790
                </a>
            </div>
        </div>

        <div id="form-area" className="px-4 py-8 bg-white scroll-mt-10">
            <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-gray-900">Formulir Pemesanan</h2>
                <p className="text-sm text-gray-600">Silakan pilih paket produk di bawah ini:</p>
            </div>
            
            <OrderForm />
        </div>

        <div className="bg-blue-50 p-6 pb-24 border-t border-blue-100">
            <h3 className="font-bold text-center text-blue-900 mb-6 uppercase tracking-wider text-sm">
                Jaminan Kepuasan Pelanggan
            </h3>

            <div className="space-y-4">
                <TrustItem 
                    icon="fa-truck-fast" color="text-blue-600"
                    title="Pengiriman Seluruh Indonesia" 
                    desc="Packing aman menjamin produk sampai dengan selamat."
                />
                <TrustItem 
                    icon="fa-hand-holding-dollar" color="text-orange-600"
                    title="Bisa Bayar Di Tempat (COD)" 
                    desc="Barang sampai baru bayar. Aman, nyaman, dan bebas penipuan."
                />
                <TrustItem 
                    icon="fa-shield-halved" color="text-green-600"
                    title="Garansi Tukar Baru" 
                    desc="Jika barang diterima dalam keadaan rusak/patah, kami ganti baru 100% Gratis."
                />
            </div>
        </div>

      </div>

      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 p-3 shadow-xl z-50 md:hidden">
        <a href="#form-area" className="block w-full bg-orange-500 text-white font-bold py-3 rounded-lg text-center shadow-lg uppercase tracking-wide">
            Beli Sekarang
        </a>
      </div>

    </div>
  );
}

function FeatureCheck({ text }) {
    return (
        <div className="flex items-start gap-2">
            <i className="fas fa-check-circle text-green-500 mt-1"></i>
            <span className="text-sm font-medium text-gray-700">{text}</span>
        </div>
    )
}

function TrustItem({ icon, title, desc, color }) {
    return (
        <div className="flex gap-4 items-start bg-white p-4 rounded-xl shadow-sm border border-blue-100">
            <div className={`text-2xl ${color} mt-1 w-8`}>
                <i className={`fas ${icon}`}></i>
            </div>
            <div>
                <h4 className="font-bold text-gray-900 text-sm">{title}</h4>
                <p className="text-xs text-gray-600 mt-1 leading-relaxed">{desc}</p>
            </div>
        </div>
    )
}