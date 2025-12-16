import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

const getPublicIdFromUrl = (url) => {
    if (!url || !url.includes('cloudinary')) return null;
    try {
        const parts = url.split('/');
        const filename = parts.pop();
        const folder = parts.pop();
        const parentFolder = parts.pop();
        return `${parentFolder}/${folder}/${filename.split('.')[0]}`;
    } catch (e) { return null; }
};

// --- DELETE: Hapus Data ---
export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    // Cek gambar lama untuk dihapus dari Cloudinary
    const [rows] = await pool.query('SELECT image FROM achievements WHERE id = ?', [id]);
    if (rows.length > 0 && rows[0].image) {
        const publicId = getPublicIdFromUrl(rows[0].image);
        if (publicId) await cloudinary.uploader.destroy(publicId);
    }

    await pool.query('DELETE FROM achievements WHERE id = ?', [id]);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- PUT: Update Data ---
export async function PUT(request, { params }) {
  const { id } = await params;
  try {
    const formData = await request.formData();
    
    const title = formData.get('title');
    const category = formData.get('category');
    const year = formData.get('year');
    const description = formData.get('description');
    const imageFile = formData.get('image');

    // Jika ada upload gambar baru
    if (imageFile && typeof imageFile === 'object' && imageFile.size > 0) {
        // Hapus gambar lama
        const [rows] = await pool.query('SELECT image FROM achievements WHERE id = ?', [id]);
        if (rows.length > 0 && rows[0].image) {
            const oldPublicId = getPublicIdFromUrl(rows[0].image);
            if (oldPublicId) await cloudinary.uploader.destroy(oldPublicId);
        }

        // Upload gambar baru
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'tanisolution/achievements', resource_type: 'image' },
                (error, result) => (error ? reject(error) : resolve(result))
            ).end(buffer);
        });
        const newImageUrl = uploadResult.secure_url;

        // Update DB dengan gambar baru
        await pool.query(
            `UPDATE achievements SET title=?, category=?, year=?, description=?, image=? WHERE id=?`, 
            [title, category, year, description, newImageUrl, id]
        );

    } else {
        // Update DB tanpa ganti gambar
        await pool.query(
            `UPDATE achievements SET title=?, category=?, year=?, description=? WHERE id=?`, 
            [title, category, year, description, id]
        );
    }

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}