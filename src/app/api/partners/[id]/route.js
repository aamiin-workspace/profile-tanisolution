import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

async function deleteOldFile(imageUrl) {
    if(!imageUrl) return;
    try {
        const fileName = imageUrl.split('/').pop();
        const filePath = path.join(process.cwd(), 'public/uploads', fileName);
        await unlink(filePath);
    } catch (e) {
        console.log("File not found/already deleted");
    }
}

export async function DELETE(request, { params }) {
  const { id } = await params; 
  try {
    const [rows] = await pool.query('SELECT image FROM partners WHERE id = ?', [id]);
    if (rows.length > 0) {
        await deleteOldFile(rows[0].image);
    }

    await pool.query('DELETE FROM partners WHERE id = ?', [id]);
    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const data = await request.formData();
    const name = data.get('name');
    const image = data.get('image');

    if (image && typeof image === 'object') {
        const [rows] = await pool.query('SELECT image FROM partners WHERE id = ?', [id]);
        if (rows.length > 0) await deleteOldFile(rows[0].image);

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}-${image.name.replace(/\s/g, '-')}`;
        const filePath = path.join(process.cwd(), 'public/uploads', fileName);
        await writeFile(filePath, buffer);
        const dbImagePath = `/uploads/${fileName}`;

        await pool.query('UPDATE partners SET name = ?, image = ? WHERE id = ?', [name, dbImagePath, id]);
    } else {
        await pool.query('UPDATE partners SET name = ? WHERE id = ?', [name, id]);
    }

    return NextResponse.json({ message: "Updated" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}