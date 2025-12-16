'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({
    newsCount: 0,
    collabCount: 0,
    awardCount: 0,
    partnerCount: 0,
    userCount: 1 
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [newsRes, collabRes, awardRes, partnerRes] = await Promise.all([
          fetch('/api/news').then(res => res.json()),
          fetch('/api/collab').then(res => res.json()),
          fetch('/api/achievements').then(res => res.json()),
          fetch('/api/partners').then(res => res.json())
        ]);

        setStats({
          newsCount: newsRes.length || 0,   
          collabCount: collabRes.length || 0,
          awardCount: awardRes.length || 0,
          partnerCount: partnerRes.length || 0,
          userCount: 1
        });
        setLoading(false);
      } catch (error) {
        console.error("Gagal mengambil statistik:", error);
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Dashboard Overview</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 mb-8">
        
        {/* Card Berita */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Total Berita</h3>
            <span className="p-2 bg-blue-100 text-blue-600 rounded-lg"><i className="fas fa-newspaper"></i></span>
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{loading ? '...' : stats.newsCount}</p>
          <Link href="/admin/berita" className="text-sm text-primary mt-2 inline-block hover:underline">Kelola Berita →</Link>
        </div>

        {/* Card Kolaborasi */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Kolaborasi</h3>
            <span className="p-2 bg-purple-100 text-purple-600 rounded-lg"><i className="fas fa-handshake"></i></span>
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{loading ? '...' : stats.collabCount}</p>
          <Link href="/admin/kolaborasi" className="text-sm text-primary mt-2 inline-block hover:underline">Kelola Program →</Link>
        </div>

        {/* Card Penghargaan */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Penghargaan</h3>
            <span className="p-2 bg-yellow-100 text-yellow-600 rounded-lg"><i className="fas fa-trophy"></i></span>
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{loading ? '...' : stats.awardCount}</p>
          <Link href="/admin/penghargaan" className="text-sm text-primary mt-2 inline-block hover:underline">Kelola Data →</Link>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Mitra & Partner</h3>
            <span className="p-2 bg-orange-100 text-orange-600 rounded-lg"><i className="fas fa-users"></i></span>
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{loading ? '...' : stats.partnerCount}</p>
          <Link href="/admin/partners" className="text-sm text-primary mt-2 inline-block hover:underline">Kelola Mitra →</Link>
        </div>

        {/* Card User */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-500 dark:text-gray-400 font-medium">Admin Aktif</h3>
            <span className="p-2 bg-green-100 text-green-600 rounded-lg"><i className="fas fa-user-shield"></i></span>
          </div>
          <p className="text-3xl font-bold text-gray-800 dark:text-white">{stats.userCount}</p>
          <span className="text-sm text-gray-400 mt-2 inline-block">Online</span>
        </div>

      </div>

      <div className="bg-primary/10 border border-primary/20 rounded-xl p-6 dark:text-gray-200">
        <h2 className="text-xl font-bold mb-2">Selamat Datang di Panel Admin Tani Solution!</h2>
        <p>Gunakan menu di sidebar sebelah kiri untuk mengelola konten website Anda.</p>
      </div>
    </div>
  );
}