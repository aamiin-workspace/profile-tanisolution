export const metadata = {
  title: 'Site Under Maintenance',
  robots: { index: false, follow: false },
};

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-800 p-4 text-center">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md border border-gray-100">
        <div className="text-6xl mb-6">🛠️</div>
        <h1 className="text-2xl font-black mb-2 text-gray-900">Website Sedang Dalam Perbaikan</h1>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Mohon maaf, kami sedang melakukan peningkatan sistem untuk memberikan layanan yang lebih baik. Kami akan segera kembali.
        </p>
        <div className="animate-pulse bg-yellow-100 text-yellow-700 px-4 py-2 rounded-full text-xs font-bold inline-block">
          Estimasi: Segera Kembali
        </div>
      </div>
      <p className="mt-8 text-xs text-gray-400">&copy; Tani Solution Indonesia</p>
    </div>
  );
}