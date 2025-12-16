'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'; // Pengganti useNavigate
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok) {        
        setTimeout(() => {
          router.push('/admin');
        }, 500);
      } else {
        setError(data.message || 'Username atau password salah');
        setLoading(false);
      }

    } catch (err) {
      setLoading(false);
      setError('Terjadi kesalahan jaringan. Cek server.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md animate-fadeInUp border border-gray-100 dark:border-gray-700">
        
        {/* Logo (Optional) */}
        <div className="flex justify-center mb-6">
            <div className="relative w-20 h-20">
                <Image src="/tani.webp" alt="Logo" fill className="object-contain" />
            </div>
        </div>

        <h2 className="text-3xl font-bold text-center text-primary dark:text-green-400 mb-6">Admin Login</h2>

        {error && (
          <div className="bg-red-100 border border-red-200 text-red-700 p-3 rounded mb-4 text-sm text-center animate-pulse">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Username</label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:text-white transition"
              required
              placeholder="Masukkan username"
            />
          </div>

          <div className="relative">
            <label className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2">Password</label>
            <input 
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg pr-10 focus:outline-none focus:ring-2 focus:ring-primary dark:text-white transition"
              required
              placeholder="Masukkan password"
            />
            <span 
              className="absolute right-3 top-[42px] cursor-pointer text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
            </span>
          </div>

          <button 
            type="submit"
            className="w-full bg-primary text-white py-3 rounded-lg font-bold hover:bg-green-700 transition flex justify-center items-center gap-2 shadow-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Memproses...
              </>
            ) : (
              "Masuk Dashboard"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}