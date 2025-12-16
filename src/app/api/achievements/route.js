import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

// --- GET: Ambil Semua Data ---
export async function GET() {
  try {
    // Urutkan berdasarkan tahun terbaru, lalu waktu input terbaru
    const [rows] = await pool.query('SELECT * FROM achievements ORDER BY year DESC, created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- POST: Tambah Prestasi Baru ---
export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title');
    const category = formData.get('category'); // 'award' atau 'research'
    const year = formData.get('year');
    const description = formData.get('description');
    const imageFile = formData.get('image');

    let imageUrl = null;

    // Upload ke Cloudinary (Folder: tanisolution/achievements)
    if (imageFile && typeof imageFile === 'object') {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'tanisolution/achievements', resource_type: 'image' },
                (error, result) => (error ? reject(error) : resolve(result))
            ).end(buffer);
        });
        imageUrl = uploadResult.secure_url;
    }

    // Simpan ke MySQL
    const query = `INSERT INTO achievements (title, category, year, description, image) VALUES (?, ?, ?, ?, ?)`;
    
    await pool.query(query, [title, category, year, description, imageUrl]);

    return NextResponse.json({ message: "Prestasi berhasil disimpan" });

  } catch (error) {
    console.error("Error POST achievement:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}