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
        const publicId = `${parentFolder}/${folder}/${filename.split('.')[0]}`;
        return publicId;
    } catch (e) {
        return null;
    }
};

export async function DELETE(request, { params }) {
  const { id } = await params; 
  
  try {
    const [rows] = await pool.query('SELECT image FROM partners WHERE id = ?', [id]);
    
    if (rows.length > 0) {
        const oldImageUrl = rows[0].image;
        
        const publicId = getPublicIdFromUrl(oldImageUrl);
        if (publicId) {
            await cloudinary.uploader.destroy(publicId);
        }
    }

    await pool.query('DELETE FROM partners WHERE id = ?', [id]);
    
    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
  
  try {
    const data = await request.formData();
    const name = data.get('name');
    const image = data.get('image'); 

    if (image && typeof image === 'object' && image.size > 0) {
        
        const [rows] = await pool.query('SELECT image FROM partners WHERE id = ?', [id]);
        if (rows.length > 0) {
             const oldPublicId = getPublicIdFromUrl(rows[0].image);
             if (oldPublicId) await cloudinary.uploader.destroy(oldPublicId);
        }

        const bytes = await image.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: 'tanisolution/partners', resource_type: 'image' },
                (error, result) => (error ? reject(error) : resolve(result))
            ).end(buffer);
        });

        const newImageUrl = uploadResult.secure_url;

        await pool.query('UPDATE partners SET name = ?, image = ? WHERE id = ?', [name, newImageUrl, id]);

    } else {
        await pool.query('UPDATE partners SET name = ? WHERE id = ?', [name, id]);
    }

    return NextResponse.json({ message: "Updated successfully" });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}