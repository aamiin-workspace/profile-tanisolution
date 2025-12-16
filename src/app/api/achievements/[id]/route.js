import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { writeFile, unlink } from 'fs/promises';
import path from 'path';

async function deleteFile(fileUrl) {
  if (!fileUrl) return;
  try {
    const fileName = fileUrl.split('/').pop();
    const filePath = path.join(process.cwd(), 'public/uploads', fileName);
    await unlink(filePath);
  } catch (error) {
    console.log(`Info: File lama tidak ditemukan`);
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const [rows] = await pool.query('SELECT image FROM achievements WHERE id = ?', [id]);
    if (rows.length === 0) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    if (rows[0].image) await deleteFile(rows[0].image);

    await pool.query('DELETE FROM achievements WHERE id = ?', [id]);

    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    const title = formData.get('title');
    const category = formData.get('category');
    const year = formData.get('year');
    const description = formData.get('description');
    const image = formData.get('image');

    const isNewImage = image && typeof image === 'object' && image.size > 0;

    if (isNewImage) {
        const [oldData] = await pool.query('SELECT image FROM achievements WHERE id = ?', [id]);
        if (oldData.length > 0 && oldData[0].image) await deleteFile(oldData[0].image);

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const fileName = `${Date.now()}-${image.name.replace(/\s/g, '-')}`;
        const filePath = path.join(process.cwd(), 'public/uploads', fileName);
        await writeFile(filePath, buffer);
        const dbImagePath = `/uploads/${fileName}`;

        await pool.query(
            `UPDATE achievements SET title=?, category=?, year=?, description=?, image=? WHERE id=?`,
            [title, category, year, description, dbImagePath, id]
        );
    } else {
        await pool.query(
            `UPDATE achievements SET title=?, category=?, year=?, description=? WHERE id=?`,
            [title, category, year, description, id]
        );
    }

    return NextResponse.json({ message: 'Updated successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}