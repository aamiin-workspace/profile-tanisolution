import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM collaborations ORDER BY date DESC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();
    
    const title = formData.get('title');
    const category = formData.get('category');
    const caption = formData.get('caption');
    const detail = formData.get('detail');
    const extra_1 = formData.get('extra_1') || '';
    const extra_2 = formData.get('extra_2') || '';
    const date = formData.get('date');
    const imageFile = formData.get('image');

    let imageUrl = null;

    if (imageFile && typeof imageFile === 'object') {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'tanisolution/collaborations', resource_type: 'image' },
                (error, result) => (error ? reject(error) : resolve(result))
            ).end(buffer);
        });
        imageUrl = uploadResult.secure_url;
    }

    const query = `
      INSERT INTO collaborations 
      (title, category, caption, detail, extra_1, extra_2, date, image) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    await pool.query(query, [
      title, category, caption, detail, extra_1, extra_2, date, imageUrl
    ]);

    return NextResponse.json({ message: "Data berhasil disimpan" });

  } catch (error) {
    console.error("Error POST collab:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}