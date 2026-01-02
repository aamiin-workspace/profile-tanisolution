import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM partners ORDER BY created_at DESC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const data = await request.formData();
    const name = data.get('name');
    const image = data.get('image'); 

    if (!image || !name) {
      return NextResponse.json({ error: "Nama dan Gambar wajib diisi" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { 
          folder: 'tanisolution/partners', 
          resource_type: 'image'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const imageUrl = uploadResult.secure_url; 
    
    await pool.query('INSERT INTO partners (name, image) VALUES (?, ?)', [name, imageUrl]);

    return NextResponse.json({ message: "Partner created successfully", data: { name, image: imageUrl } });

  } catch (error) {
    console.error("Upload Error:", error);
    return NextResponse.json({ error: error.message || "Gagal upload gambar" }, { status: 500 });
  }
}