import './globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Tani Solution Indonesia',
  description: 'Solusi inovasi pertanian untuk masa depan Indonesia.',
  icons: {
    icon: '/tani.webp',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-700 font-sans`}>
        {children}
      </body>
    </html>
  );
}