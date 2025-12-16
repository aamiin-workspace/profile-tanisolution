import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { uploadFile } from '@/lib/upload';
import { jwtVerify } from 'jose';

async function checkAuth(req) {
  const token = req.cookies.get('token')?.value;
  if (!token) throw new Error('Unauthorized');
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  await jwtVerify(token, secret);
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category'); 

    let query = 'SELECT * FROM collaborations';
    let params = [];

    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY date DESC';

    const [rows] = await pool.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await checkAuth(req);

    const formData = await req.formData();
    
    const category = formData.get('category'); 
    const title = formData.get('title');
    const caption = formData.get('caption');
    const detail = formData.get('detail');
    const extra_1 = formData.get('extra_1') || '';
    const extra_2 = formData.get('extra_2') || '';
    const date = formData.get('date') || new Date().toISOString().split('T')[0];
    const imageFile = formData.get('image');

    let imagePath = null;
    if (imageFile && imageFile.size > 0) {
        imagePath = await uploadFile(imageFile, 'collab');
    }

    const query = `
      INSERT INTO collaborations (category, title, caption, detail, extra_1, extra_2, date, image) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(query, 
      [category, title, caption, detail, extra_1, extra_2, date, imagePath]
    );

    return NextResponse.json({ message: 'Collaboration created', id: result.insertId });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}