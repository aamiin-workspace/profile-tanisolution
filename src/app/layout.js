import "./globals.css";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  metadataBase: new URL('https://www.tanisolution.id'),
  
  alternates: {
    canonical: '/',
  },

  title: {
    default: "Global Tani Solution | Inovasi Alat Pertanian Modern",
    template: "%s | Global Tani Solution",
  },
  description:
    "Pusat solusi teknologi pertanian (Agritech), magang industri, dan kolaborasi riset di Indonesia. Produsen alat pemupukan modern.",
  keywords: [
    "pertanian",
    "agritech",
    "alat pertanian",
    "tani solution",
    "pupuk otomatis",
    "Global Tani Solution",
    "teknologi pertanian",
    "edusolusi",
    "teknosolusi",
    "kreasolusi",
    "minilab",
    "alat tabur pupuk",
    "alburdat",
  ],

  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },

  openGraph: {
    title: "Global Tani Solution",
    description: "Solusi Teknologi Pertanian Masa Depan.",
    siteName: "Global Tani Solution",
    type: "website",
    locale: "id_ID",
    url: "https://www.tanisolution.id",
  },
  
  verification: {
    google: "X8Q84r87Eq2jFCLceLc-G_f8spanMQPQAHdJw4Aqu5U",
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "name": "Global Tani Solution",
        "alternateName": ["Tani Solution", "Tani Solution Indonesia"],
        "url": "https://www.tanisolution.id/",
        "description": "Inovasi Alat Pertanian Modern",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://www.tanisolution.id/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Teknolusi",
        "url": "https://www.tanisolution.id/teknosolusi"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Agritech",
        "url": "https://www.tanisolution.id/minilab"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Edusolusi",
        "url": "https://www.tanisolution.id/edusolusi"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Kreasolusi",
        "url": "https://www.tanisolution.id/kreasolusi"
      },
      {
        "@type": "SiteNavigationElement",
        "name": "Berita",
        "url": "https://www.tanisolution.id/berita"
      }
    ]
  };

  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.className} bg-gray-50 text-gray-700 font-sans flex flex-col min-h-screen`}>

        <main className="flex-grow">
          {children}
        </main>
      </body>

      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
    </html>
  );
}