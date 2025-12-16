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

    let query = 'SELECT * FROM achievements';
    let params = [];

    if (category) {
      query += ' WHERE category = ?';
      params.push(category);
    }
    
    query += ' ORDER BY created_at DESC';

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
    const year = formData.get('year');
    const description = formData.get('description');
    const imageFile = formData.get('image');

    let imagePath = null;
    if (imageFile && imageFile.size > 0) {
        imagePath = await uploadFile(imageFile, 'award');
    }

    const query = `
      INSERT INTO achievements (category, title, year, description, image) 
      VALUES (?, ?, ?, ?, ?)
    `;

    const [result] = await pool.query(query, [category, title, year, description, imagePath]);

    return NextResponse.json({ message: 'Achievement created', id: result.insertId });

  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}