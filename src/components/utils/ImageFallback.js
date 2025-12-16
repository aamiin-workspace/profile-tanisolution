'use client'; // WAJIB: Menandakan ini berjalan di browser

import { useState } from 'react';
import Image from 'next/image';

export default function ImageFallback({ src, alt, className }) {
  const [error, setError] = useState(false);

  // Jika src kosong atau error, tampilkan placeholder
  const imageSource = (error || !src) ? '/placeholder.jpg' : src;

  // Jika URL dari Cloudinary/External, pakai <img> biasa agar lebih aman dari strict mode Next/Image
  // Atau tetap pakai Next Image jika config sudah benar. 
  // Untuk keamanan maksimal di kasus Anda, kita pakai <img> biasa dengan handling error state.
  
  return (
    <img
      src={imageSource}
      alt={alt}
      className={className}
      onError={() => setError(true)} // Event handler ini aman di sini karena 'use client'
    />
  );
}