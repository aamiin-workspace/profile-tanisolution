'use client'; 

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  return (
    <footer className="bg-secondary dark:bg-gray-950 text-white py-10 border-t-4 border-primary dark:border-green-600 mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            
            <div className="flex justify-center items-center mb-4">
                <Link href="/" onClick={scrollToTop} className="flex items-center group cursor-pointer">
                    <Image 
                        src="/tani.webp" 
                        alt="Logo Tani Solution" 
                        width={32}
                        height={32}
                        className="h-8 w-auto grayscale brightness-200 mr-2 group-hover:grayscale-0 transition duration-300 object-contain" 
                    />
                    <span className="font-bold text-lg group-hover:text-primary dark:group-hover:text-green-400 transition duration-300">
                        Tani Solution Indonesia
                    </span>
                </Link>
            </div>

            <p className="mb-6 text-gray-400 dark:text-gray-500 text-sm max-w-lg mx-auto">
                Solusi inovasi pertanian untuk masa depan Indonesia yang lebih cerah.
            </p>

            <div className="flex justify-center space-x-6 mb-8">
                <a 
                    href="https://instagram.com/tanisolution.id" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-gray-400 hover:text-white dark:hover:text-green-400 transition transform hover:scale-110"
                >
                    <i className="fab fa-instagram fa-lg"></i>
                </a>
                
                <a 
                    href="https://tiktok.com/@bisnispetani" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-gray-400 hover:text-white dark:hover:text-green-400 transition transform hover:scale-110"
                >
                    <i className="fab fa-tiktok fa-lg"></i>
                </a>
                
                <a 
                    href="https://youtube.com/@TaniSolution" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="text-gray-400 hover:text-white dark:hover:text-green-400 transition transform hover:scale-110"
                >
                    <i className="fab fa-youtube fa-lg"></i>
                </a>
                
                <a 
                    href="mailto:tanisolutionindonesia@gmail.com" 
                    className="text-gray-400 hover:text-white dark:hover:text-green-400 transition transform hover:scale-110"
                >
                    <i className="far fa-envelope fa-lg"></i>
                </a>
            </div>

            <p className="text-xs text-gray-500 dark:text-gray-600">
                &copy; {new Date().getFullYear()} PT Global Tani Solution. All rights reserved.
            </p>
        </div>
    </footer>
  );
}