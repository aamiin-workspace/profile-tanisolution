import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

function createSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function deleteImageFromCloudinary(imageUrl) {
  if (!imageUrl) return;
  try {
    const regex = /\/v\d+\/(.+)\.\w+$/;
    const match = imageUrl.match(regex);
    if (match && match[1]) {
      const publicId = match[1];
      await cloudinary.uploader.destroy(publicId);
    }
  } catch (error) {
    console.error("Gagal menghapus gambar lama:", error);
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const [rows] = await pool.query('SELECT image FROM news WHERE id = ?', [id]);
    if (rows.length === 0) return NextResponse.json({ message: 'Not found' }, { status: 404 });

    if (rows[0].image) {
      await deleteImageFromCloudinary(rows[0].image);
    }

    await pool.query('DELETE FROM news WHERE id = ?', [id]);
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
    const author = formData.get('author');
    const date = formData.get('date');
    const excerpt = formData.get('excerpt');
    const content = formData.get('content');
    const image = formData.get('image');

    const slug = createSlug(title);

    const isNewImage = image && typeof image === 'object' && image.size > 0;

    if (isNewImage) {
      const [oldData] = await pool.query('SELECT image FROM news WHERE id = ?', [id]);
      
      if (oldData.length > 0 && oldData[0].image) {
        await deleteImageFromCloudinary(oldData[0].image);
      }

      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const newImageUrl = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'tani-solution-news' },
          (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
          }
        ).end(buffer);
      });

      await pool.query(
        `UPDATE news SET title=?, slug=?, category=?, author=?, date=?, excerpt=?, content=?, image=? WHERE id=?`,
        [title, slug, category, author, date, excerpt, content, newImageUrl, id]
      );

    } else {
      await pool.query(
        `UPDATE news SET title=?, slug=?, category=?, author=?, date=?, excerpt=?, content=? WHERE id=?`,
        [title, slug, category, author, date, excerpt, content, id]
      );
    }

    return NextResponse.json({ message: 'Updated successfully', slug: slug });
  } catch (error) {
    console.error("Update Error:", error);
    if (error.code === 'ER_DUP_ENTRY') {
        return NextResponse.json({ error: "Judul berita sudah ada (Slug duplikat)." }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}