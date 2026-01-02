'use client'; 

import { useState } from 'react';
import Image from 'next/image';

export default function ImageFallback({ src, alt, className }) {
  const [error, setError] = useState(false);

  const imageSource = (error || !src) ? '/placeholder.jpg' : src;

  return (
    <img
      src={imageSource}
      alt={alt}
      className={className}
      onError={() => setError(true)} 
    />
  );
}