import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { writeFile } from 'fs/promises';
import path from 'path';

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

    if (!image) {
      return NextResponse.json({ error: "Image is required" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileName = `${Date.now()}-${image.name.replace(/\s/g, '-')}`;
    const filePath = path.join(process.cwd(), 'public/uploads', fileName);
    
    await writeFile(filePath, buffer);
    const dbImagePath = `/uploads/${fileName}`;

    await pool.query('INSERT INTO partners (name, image) VALUES (?, ?)', [name, dbImagePath]);

    return NextResponse.json({ message: "Partner created successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}