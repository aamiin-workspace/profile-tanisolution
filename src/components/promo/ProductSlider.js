'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

export default function ProductSlider() {
  const scrollRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false); 

  const images = [
    '/promo/promo3.jpg',
    '/promo/promo.jpeg',          
    '/promo/promo1.jpeg',       
    '/promo/promo2.jpeg',          
  ];

  useEffect(() => {
    if (isPaused) return; 

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, offsetWidth, scrollWidth } = scrollRef.current;
        
        const isEnd = scrollLeft + offsetWidth >= scrollWidth - 10; 
        
        if (isEnd) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scrollRef.current.scrollTo({ left: scrollLeft + offsetWidth, behavior: 'smooth' });
        }
      }
    }, 3000); 

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setActiveSlide(index);
    }
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide aspect-square bg-gray-200"
        style={{ scrollBehavior: 'smooth' }}
      >
        {images.map((src, index) => (
          <div key={index} className="flex-shrink-0 w-full h-full relative snap-center">
            <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
               <span className="text-xs font-bold">Slide {index + 1}</span>
            </div>
            
            <Image 
              src={src} 
              alt={`Slide ${index + 1}`} 
              fill 
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-10">
        {images.map((_, index) => (
          <div 
            key={index}
            className={`h-2 rounded-full transition-all duration-300 shadow-sm border border-white/30 ${
              activeSlide === index ? 'bg-white w-6' : 'bg-white/60 w-2'
            }`}
          />
        ))}
      </div>
      
      <button 
        onClick={() => {
            scrollRef.current.scrollBy({ left: -scrollRef.current.offsetWidth, behavior: 'smooth' });
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 3000);
        }}
        className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/80 w-8 h-8 rounded-full items-center justify-center text-white hover:text-gray-800 transition backdrop-blur-sm"
      >
        <i className="fas fa-chevron-left"></i>
      </button>

      <button 
        onClick={() => {
            scrollRef.current.scrollBy({ left: scrollRef.current.offsetWidth, behavior: 'smooth' });
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), 3000);
        }}
        className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/80 w-8 h-8 rounded-full items-center justify-center text-white hover:text-gray-800 transition backdrop-blur-sm"
      >
        <i className="fas fa-chevron-right"></i>
      </button>

    </div>
  );
}