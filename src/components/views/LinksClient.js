"use client";

import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

const links = [
  {
    title: "Belanja di Shopee",
    url: "https://shopee.co.id/tanisolutionindonesia",
    logo: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg",
    style: "bg-[#EE4D2D] text-white",
  },
  {
    title: "Tokopedia",
    url: "https://www.tokopedia.com/tani-solution-indonesia",
    logo: "https://cdn.brandfetch.io/idoruRsDhk/theme/dark/symbol.svg?c=1dxbfHSJFAPEGdCLU4o5B",
    style: "bg-[#03AC0E] text-white",
  },
  {
    title: "Instagram",
    url: "https://www.instagram.com/tanisolution.id/",
    logo: "https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png",
    style: "bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white",
  },
  {
    title: "WhatsApp Konsultasi",
    url: "http://wa.me/62895429640790",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg",
    style: "bg-[#25D366] text-white",
  }
];

export default function LinksClient() {
  return (
    <main className="min-h-[100dvh] bg-accent flex flex-col items-center py-12 px-6 font-sans">
      
      {/* Profile Section */}
      <div className="text-center mb-10">
        <div className="w-24 h-24 bg-white rounded-full mx-auto mb-4 flex items-center justify-center shadow-md border-2 border-primary relative overflow-hidden p-4">
          <Image 
            src="/tani.webp"
            alt="Logo Tani Solution"
            width={80}
            height={80}
            className="object-contain"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold text-secondary tracking-tight">Tani Solution Indonesia</h1>
        <p className="text-[10px] text-gray-500 mt-2 font-bold tracking-[0.2em] uppercase opacity-80">
          Solusi Mekanisasi Pertanian
        </p>
      </div>

      {/* Links List */}
      <div className="w-full max-w-sm flex flex-col gap-4">
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${link.style} group flex items-center justify-between p-4 rounded-2xl shadow-lg shadow-black/10 hover:scale-[1.02] active:scale-95 transition-all duration-300`}
          >
            <div className="flex items-center gap-4">
              {/* Efek Kaca (Glassmorphism) pada Container Logo */}
              <div className="bg-white/20 backdrop-blur-md p-2 rounded-xl flex items-center justify-center w-12 h-12 border border-white/30 shadow-inner">
                <img 
                  src={link.logo} 
                  alt={link.title} 
                  className="w-full h-full object-contain filter drop-shadow-sm"
                />
              </div>
              <span className="font-bold text-base tracking-wide">{link.title}</span>
            </div>
            <ExternalLink className="w-5 h-5 opacity-40 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>

      {/* Footer Signature */}
      <footer className="mt-auto pt-16">
        <div className="flex flex-col items-center gap-2">
            <span className="h-px w-8 bg-gold mb-2"></span>
            <p className="text-[10px] text-secondary/40 font-black tracking-widest uppercase">
              tanisolution.id
            </p>
        </div>
      </footer>
    </main>
  );
}