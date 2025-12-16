'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AdminModal from '@/components/admin/AdminModal';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const isActive = (path, exact = false) => {
    if (exact) {
      return pathname === path
        ? 'bg-primary text-white shadow-md'
        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700';
    }
    return pathname.startsWith(path)
      ? 'bg-primary text-white shadow-md'
      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700';
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.replace('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      
      <AdminModal 
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        type="confirm"
        title="Konfirmasi Logout"
        message="Apakah Anda yakin ingin keluar dari sistem?"
        onConfirm={handleLogout}
        confirmText="Ya, Keluar"
      />

      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col h-screen sticky top-0 transition-colors duration-300">
        <div className="h-16 flex items-center justify-center border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-secondary dark:text-white">
            Admin <span className="text-primary">Panel</span>
          </h2>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <p className="px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Master Data
          </p>

          <Link
            href="/admin"
            className={`flex items-center px-4 py-3 rounded-lg transition-all font-medium ${isActive('/admin', true)}`}
          >
            <i className="fas fa-home w-6" />
            <span>Beranda</span>
          </Link>

          <Link
            href="/admin/berita"
            className={`flex items-center px-4 py-3 rounded-lg transition-all font-medium ${isActive('/admin/berita')}`}
          >
            <i className="fas fa-newspaper w-6" />
            <span>Berita</span>
          </Link>

          <Link
            href="/admin/kolaborasi"
            className={`flex items-center px-4 py-3 rounded-lg transition-all font-medium ${isActive('/admin/kolaborasi')}`}
          >
            <i className="fas fa-handshake w-6" />
            <span>Kolaborasi</span>
          </Link>

          <Link
            href="/admin/penghargaan"
            className={`flex items-center px-4 py-3 rounded-lg transition-all font-medium ${isActive('/admin/penghargaan')}`}
          >
            <i className="fas fa-trophy w-6" />
            <span>Penghargaan</span>
          </Link>

          <Link
            href="/admin/partners"
            className={`flex items-center px-4 py-3 rounded-lg transition-all font-medium ${isActive('/admin/partners')}`}
          >
            <i className="fas fa-users w-6" /> 
            <span>Partners</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowLogoutModal(true)}
            className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition font-medium"
          >
            <i className="fas fa-sign-out-alt w-6" />
            <span>Keluar</span>
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden overflow-y-auto">
        <header className="bg-white dark:bg-gray-800 shadow-sm h-16 flex items-center px-6 md:hidden sticky top-0 z-30">
           <span className="font-bold text-lg dark:text-white">Admin Panel</span>
        </header>

        <div className="p-6">
           {children}
        </div>
      </main>
      
    </div>
  );
}