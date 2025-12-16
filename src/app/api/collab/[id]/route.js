import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

// Helper: Ambil Public ID Cloudinary untuk hapus file
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

// --- DELETE: Hapus Data & Gambar ---
export async function DELETE(request, { params }) {
  const { id } = await params;
  try {
    // 1. Cek gambar lama
    const [rows] = await pool.query('SELECT image FROM collaborations WHERE id = ?', [id]);
    if (rows.length > 0 && rows[0].image) {
        const publicId = getPublicIdFromUrl(rows[0].image);
        if (publicId) await cloudinary.uploader.destroy(publicId);
    }

    // 2. Hapus data DB
    await pool.query('DELETE FROM collaborations WHERE id = ?', [id]);
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
    const caption = formData.get('caption');
    const detail = formData.get('detail');
    const extra_1 = formData.get('extra_1');
    const extra_2 = formData.get('extra_2');
    const date = formData.get('date');
    const imageFile = formData.get('image');

    // Cek apakah user upload gambar baru?
    if (imageFile && typeof imageFile === 'object' && imageFile.size > 0) {
        // A. Hapus gambar lama
        const [rows] = await pool.query('SELECT image FROM collaborations WHERE id = ?', [id]);
        if (rows.length > 0 && rows[0].image) {
            const oldPublicId = getPublicIdFromUrl(rows[0].image);
            if (oldPublicId) await cloudinary.uploader.destroy(oldPublicId);
        }

        // B. Upload gambar baru
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'tanisolution/collaborations', resource_type: 'image' },
                (error, result) => (error ? reject(error) : resolve(result))
            ).end(buffer);
        });
        const newImageUrl = uploadResult.secure_url;

        // C. Update DB (Termasuk Image)
        const query = `
            UPDATE collaborations SET 
            title=?, category=?, caption=?, detail=?, extra_1=?, extra_2=?, date=?, image=? 
            WHERE id=?
        `;
        await pool.query(query, [title, category, caption, detail, extra_1, extra_2, date, newImageUrl, id]);

    } else {
        // Update DB (Tanpa ubah Image)
        const query = `
            UPDATE collaborations SET 
            title=?, category=?, caption=?, detail=?, extra_1=?, extra_2=?, date=? 
            WHERE id=?
        `;
        await pool.query(query, [title, category, caption, detail, extra_1, extra_2, date, id]);
    }

    return NextResponse.json({ message: "Updated successfully" });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}