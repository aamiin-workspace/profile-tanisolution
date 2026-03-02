import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

const getPublicIdFromUrl = (url) => {
    if (!url || !url.includes('cloudinary')) return null;
    try {
        const parts = url.split('/upload/');
        if (parts.length < 2) return null;
        const publicIdWithExt = parts[1].replace(/^v\d+\//, ''); 
        return publicIdWithExt.split('.')[0];
    } catch (e) { 
        return null; 
    }
};

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    const [rows] = await pool.query('SELECT image FROM achievements WHERE id = ?', [id]);
    
    if (rows.length > 0 && rows[0].image) {
        const publicId = getPublicIdFromUrl(rows[0].image);
        if (publicId) await cloudinary.uploader.destroy(publicId);
    }

    await pool.query('DELETE FROM achievements WHERE id = ?', [id]);
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
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
    
    // Pastikan jika kosong, diubah menjadi null agar aman masuk database
    const description = formData.get('description') || null;
    const link = formData.get('link') || null; 
    
    const imageFile = formData.get('image');

    // KONDISI 1: JIKA ADMIN MENGGANTI GAMBAR
    if (imageFile && typeof imageFile === 'object' && imageFile.size > 0) {
        
        // Hapus gambar lama di Cloudinary
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

        // Update database dengan gambar baru DAN link
        await pool.query(
            `UPDATE achievements SET title=?, category=?, year=?, description=?, image=?, link=? WHERE id=?`, 
            [title, category, year, description, newImageUrl, link, id]
        );

    // KONDISI 2: JIKA ADMIN TIDAK MENGGANTI GAMBAR
    } else {
        // Update database TANPA menyentuh gambar, tapi ikut sertakan link
        await pool.query(
            `UPDATE achievements SET title=?, category=?, year=?, description=?, link=? WHERE id=?`, 
            [title, category, year, description, link, id]
        );
    }

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}