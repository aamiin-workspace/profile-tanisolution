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

export async function GET() {
  try {
    const [rows] = await pool.query('SELECT * FROM news ORDER BY date DESC');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await checkAuth(req); 

    const formData = await req.formData();
    
    const title = formData.get('title');
    const category = formData.get('category');
    const author = formData.get('author') || 'Admin'; 
    const date = formData.get('date') || new Date().toISOString().split('T')[0];
    const excerpt = formData.get('excerpt');
    const content = formData.get('content');
    const imageFile = formData.get('image');

    let imagePath = null;
    if (imageFile && imageFile.size > 0) {
        imagePath = await uploadFile(imageFile, 'news');
    }

    const query = `
      INSERT INTO news (title, category, author, date, excerpt, content, image) 
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(query, [title, category, author, date, excerpt, content, imagePath]);

    return NextResponse.json({ message: 'News created', id: result.insertId });

  } catch (error) {
    const status = error.message === 'Unauthorized' ? 401 : 500;
    return NextResponse.json({ error: error.message }, { status });
  }
}