'use client';

import { useState } from 'react';

export default function OrderForm() {
  const products = [
    { id: 'lengkap', name: 'Paket Lengkap (Alat + Tas + Selang)', price: 299000 },
    { id: 'alat', name: 'Alat Saja (Unit Utama)', price: 199000 },
    { id: 'tas', name: 'Tas Gendong Pupuk Saja', price: 85000 },
    { id: 'selang', name: 'Selang Fleksibel Saja', price: 45000 },
  ];

  const [form, setForm] = useState({
    product: products[0],
    qty: 1,
    nama: '',
    whatsapp: '',
    kota: '',
    alamat: '',
    payment: 'COD'
  });

  const totalPrice = form.product.price * form.qty;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleProductChange = (product) => {
    setForm({ ...form, product: product });
  };

  const handleQtyChange = (e) => {
    const val = parseInt(e.target.value);
    setForm({ ...form, qty: val < 1 ? 1 : val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const adminWA = "6289524187347"; 

    const message = `Halo Admin, saya mau pesan promo Alburdat:%0A%0A` +
      `Produk: ${form.product.name}%0A` +
      `Jumlah: ${form.qty} Pcs%0A` +
      `Total Tagihan: Rp ${totalPrice.toLocaleString('id-ID')}%0A` +
      `--------------------------------%0A` +
      `Nama: ${form.nama}%0A` +
      `WhatsApp: ${form.whatsapp}%0A` +
      `Kota/Kec: ${form.kota}%0A` +
      `Alamat: ${form.alamat}%0A` +
      `Pembayaran: ${form.payment}%0A%0A` +
      `Mohon segera diproses ya!`;

    window.open(`https://wa.me/${adminWA}?text=${message}`, '_blank');
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg border border-gray-200">
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* 1. PILIHAN PRODUK */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Pilihan Produk:</h3>
          <div className="space-y-3">
            {products.map((item) => (
              <div 
                key={item.id}
                onClick={() => handleProductChange(item)}
                className={`flex items-center p-3 border rounded-lg cursor-pointer transition-all ${
                  form.product.id === item.id 
                    ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center mr-3 flex-shrink-0 ${
                   form.product.id === item.id ? 'border-blue-600' : 'border-gray-400'
                }`}>
                  {form.product.id === item.id && <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>}
                </div>
                <div>
                    <p className="text-sm font-bold text-gray-800 leading-tight">{item.name}</p>
                    <p className="text-xs text-gray-600 mt-1">Rp {item.price.toLocaleString('id-ID')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. ATUR JUMLAH (QUANTITY) - BARU */}
        <div>
            <label className="block text-sm font-bold text-gray-900 mb-2">Jumlah Pesanan:</label>
            <div className="flex items-center">
                <button 
                    type="button"
                    onClick={() => setForm({...form, qty: Math.max(1, form.qty - 1)})}
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-l font-bold text-gray-600"
                >-</button>
                <input 
                    type="number" 
                    name="qty"
                    min="1"
                    value={form.qty}
                    onChange={handleQtyChange}
                    className="w-16 h-10 border-y border-gray-200 text-center font-bold text-gray-800 outline-none"
                />
                <button 
                    type="button"
                    onClick={() => setForm({...form, qty: form.qty + 1})}
                    className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-r font-bold text-gray-600"
                >+</button>
            </div>
        </div>

        {/* 3. DATA PENERIMA */}
        <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap <span className="text-red-500">*</span></label>
              <input 
                type="text" name="nama" required 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition"
                placeholder="Nama Anda"
                onChange={handleChange}
              />
            </div>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">No WhatsApp <span className="text-red-500">*</span></label>
              <input 
                type="tel" name="whatsapp" required 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition"
                placeholder="08xxxxxxxxxx"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Kota / Kecamatan <span className="text-red-500">*</span></label>
              <input 
                type="text" name="kota" required 
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition"
                placeholder="Contoh: Gondangrejo, Karanganyar"
                onChange={handleChange}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Alamat Lengkap <span className="text-red-500">*</span></label>
              <textarea 
                name="alamat" required rows="2"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 outline-none focus:border-blue-500 transition"
                placeholder="Jalan, RT/RW, Patokan Rumah..."
                onChange={handleChange}
              ></textarea>
            </div>
        </div>

        {/* 4. METODE PEMBAYARAN */}
        <div>
            <h3 className="font-bold text-gray-900 mb-2">Metode Pembayaran:</h3>
            <div className="grid grid-cols-2 gap-3">
                <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${form.payment === 'COD' ? 'bg-orange-50 border-orange-500' : 'bg-white'}`}>
                    <input 
                        type="radio" name="payment" value="COD" 
                        checked={form.payment === 'COD'} 
                        onChange={handleChange}
                        className="w-4 h-4 accent-orange-600"
                    />
                    <span className="ml-2 text-sm font-bold text-gray-700">COD</span>
                </label>
                <label className={`flex items-center p-3 border rounded-lg cursor-pointer ${form.payment === 'Transfer' ? 'bg-blue-50 border-blue-500' : 'bg-white'}`}>
                    <input 
                        type="radio" name="payment" value="Transfer" 
                        checked={form.payment === 'Transfer'} 
                        onChange={handleChange}
                        className="w-4 h-4 accent-blue-600"
                    />
                    <span className="ml-2 text-sm font-bold text-gray-700">Transfer</span>
                </label>
            </div>
        </div>

        {/* 5. RINCIAN TOTAL */}
        <div className="bg-orange-50 p-4 rounded-xl border border-orange-100 mt-6">
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 text-sm">Produk terpilih:</span>
                <span className="text-gray-800 font-medium text-sm text-right max-w-[50%] truncate">{form.product.name}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600 text-sm">Rincian:</span>
                <span className="text-gray-800 text-sm">{form.qty} x Rp {form.product.price.toLocaleString('id-ID')}</span>
            </div>
            
            <div className="flex justify-between items-center border-t border-orange-200 pt-3">
                <span className="font-bold text-lg text-gray-800">Total Tagihan</span>
                <span className="font-black text-2xl text-orange-600">Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
        </div>

        {/* TOMBOL SUBMIT */}
        <button 
          type="submit" 
          className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 rounded-lg shadow-lg text-lg uppercase tracking-wide transition-all transform hover:scale-[1.02]"
        >
          Beli Sekarang
        </button>

      </form>
    </div>
  );
}