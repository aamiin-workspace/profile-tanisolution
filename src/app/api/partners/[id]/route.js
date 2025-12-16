import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import cloudinary from '@/lib/cloudinary';

// Helper: Ekstrak Public ID dari URL Cloudinary untuk keperluan hapus
const getPublicIdFromUrl = (url) => {
    if (!url || !url.includes('cloudinary')) return null;
    // Contoh URL: https://res.cloudinary.com/.../v12345/tanisolution/partners/foto.jpg
    // Kita butuh: tanisolution/partners/foto (tanpa ekstensi)
    try {
        const parts = url.split('/');
        const filename = parts.pop(); // foto.jpg
        const folder = parts.pop(); // partners
        const parentFolder = parts.pop(); // tanisolution
        const publicId = `${parentFolder}/${folder}/${filename.split('.')[0]}`;
        return publicId;
    } catch (e) {
        return null;
    }
};

// --- DELETE: Hapus Data & Gambar ---
export async function DELETE(request, { params }) {
  // Await params (Next.js 15 requirement)
  const { id } = await params; 
  
  try {
    // 1. Cari URL gambar lama di database
    const [rows] = await pool.query('SELECT image FROM partners WHERE id = ?', [id]);
    
    if (rows.length > 0) {
        const oldImageUrl = rows[0].image;
        
        // 2. Hapus gambar dari Cloudinary jika itu gambar Cloudinary
        const publicId = getPublicIdFromUrl(oldImageUrl);
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }
    }

    // 3. Hapus record dari Database
    await pool.query('DELETE FROM partners WHERE id = ?', [id]);
    
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// --- PUT: Update Data ---
export async function PUT(request, { params }) {
  const { id } = await params;
  
  try {
    const data = await request.formData();
    const name = data.get('name');
    const image = data.get('image'); // Bisa berupa string (jika tidak diganti) atau File (jika diganti)

    // Jika user mengupload gambar baru (tipe object File)
    if (image && typeof image === 'object' && image.size > 0) {
        
        // 1. Ambil gambar lama untuk dihapus
        const [rows] = await pool.query('SELECT image FROM partners WHERE id = ?', [id]);
        if (rows.length > 0) {
             const oldPublicId = getPublicIdFromUrl(rows[0].image);
             if (oldPublicId) await cloudinary.uploader.destroy(oldPublicId);
        }

        // 2. Upload gambar baru ke Cloudinary
        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'tanisolution/partners', resource_type: 'image' },
                (error, result) => (error ? reject(error) : resolve(result))
            ).end(buffer);
        });

        const newImageUrl = uploadResult.secure_url;

        // 3. Update Database (Nama & Gambar Baru)
        await pool.query('UPDATE partners SET name = ?, image = ? WHERE id = ?', [name, newImageUrl, id]);

    } else {
        // Jika hanya ganti nama (Gambar tidak berubah)
        await pool.query('UPDATE partners SET name = ? WHERE id = ?', [name, id]);
    }

    return NextResponse.json({ message: "Updated successfully" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}