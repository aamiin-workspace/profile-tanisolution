# Company Profile - PT Global Tani Solution

Website company profile resmi untuk PT Global Tani Solution, sebuah perusahaan yang berfokus pada solusi pertanian modern dan inovatif.

## Deskripsi Proyek

Proyek ini adalah website responsif yang menampilkan informasi perusahaan, layanan, berita, kolaborasi, dan fitur admin untuk mengelola konten. Dibangun menggunakan Next.js dengan App Router, Tailwind CSS untuk styling, dan integrasi dengan database MySQL serta Cloudinary untuk manajemen gambar.

## Fitur Utama

- **Halaman Publik**: Beranda, tentang perusahaan, layanan (EduSolusi, KreaSolusi, MiniLab, TeknoSolusi), berita, prestasi, kolaborasi, dan kontak.
- **Panel Admin**: Sistem login untuk admin, manajemen berita, kolaborasi, partners, dan penghargaan.
- **API Routes**: RESTful API untuk CRUD operations pada berita, kolaborasi, partners, dan achievements.
- **Responsive Design**: Desain yang responsif untuk desktop dan mobile.
- **Animasi**: Menggunakan Framer Motion untuk animasi halus.
- **Upload Gambar**: Integrasi dengan Cloudinary untuk penyimpanan dan pengelolaan gambar.
- **Keamanan**: Autentikasi menggunakan JWT dengan bcrypt untuk hashing password.
- **Navigasi Pintar**: Highlighting otomatis pada menu navigasi berdasarkan halaman aktif.
- **Optimasi Kode**: Kode bersih dengan ESLint yang telah diperbaiki untuk performa optimal.

## Tech Stack

- **Frontend**: Next.js 16, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MySQL
- **Authentication**: JWT (jose), bcrypt
- **Image Management**: Cloudinary
- **Animations**: Framer Motion
- **Icons**: Font Awesome
- **Linting**: ESLint

## Instalasi dan Setup

### Prasyarat

- Node.js (versi 18 atau lebih baru)
- MySQL database
- Akun Cloudinary (untuk upload gambar)

### Langkah Instalasi

1. **Clone repository**:

   ```bash
   git clone <repository-url>
   cd company-profile
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Setup environment variables**:
   Buat file `.env.local` di root directory dan isi dengan:

   ```
   DATABASE_URL=mysql://username:password@localhost:3306/database_name
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Setup database**:
   - Buat database MySQL baru
   - Jalankan script SQL untuk membuat tabel (jika ada, atau gunakan migration)

5. **Jalankan development server**:

   ```bash
   npm run dev
   ```

   Buka [http://localhost:3000](http://localhost:3000) di browser.

## Struktur Folder

```
company-profile/
├── public/                 # Static assets
│   ├── edusolusi/
│   ├── kreasolusi/
│   ├── minilab/
│   ├── partners/
│   ├── teknosolusi/
│   └── uploads/
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── (auth)/
│   │   ├── (public)/
│   │   ├── admin/
│   │   ├── api/
│   │   └── globals.css
│   ├── components/         # Reusable components
│   │   ├── utils/
│   │   └── views/
│   ├── lib/                # Utility libraries
│   │   ├── cloudinary.js
│   │   ├── db.js
│   │   └── upload.js
│   └── middleware.js
├── package.json
├── tailwind.config.js
├── next.config.mjs
├── jsconfig.json
├── eslint.config.mjs
└── README.md
```

## API Endpoints

- `GET/POST /api/news` - Mengelola berita
- `GET/PUT/DELETE /api/news/[id]` - Operasi spesifik berita
- `GET/POST /api/collab` - Mengelola kolaborasi
- `GET/PUT/DELETE /api/collab/[id]` - Operasi spesifik kolaborasi
- `GET/POST /api/partners` - Mengelola partners
- `GET/PUT/DELETE /api/partners/[id]` - Operasi spesifik partners
- `GET/POST /api/achievements` - Mengelola penghargaan
- `GET/PUT/DELETE /api/achievements/[id]` - Operasi spesifik penghargaan
- `POST /api/auth/login` - Login admin
- `POST /api/auth/logout` - Logout admin

## Scripts

- `npm run dev` - Jalankan development server
- `npm run build` - Build untuk production
- `npm run start` - Jalankan production server
- `npm run lint` - Jalankan ESLint

## Deployment

Proyek ini dapat di-deploy ke Vercel, Netlify, atau platform hosting lainnya yang mendukung Next.js.

Untuk deployment ke Vercel:

1. Push kode ke GitHub
2. Connect repository ke Vercel
3. Set environment variables di Vercel dashboard
4. Deploy

## Kontribusi

1. Fork repository
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## Lisensi

Proyek ini adalah private dan milik PT Global Tani Solution.

## Kontak

Untuk pertanyaan atau dukungan, hubungi tim development PT Global Tani Solution.
