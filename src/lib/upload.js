import { writeFile } from 'fs/promises';
import path from 'path';

export async function uploadFile(file, prefix) {
  if (!file) return null;

  if (!file.type.startsWith('image/')) {
    throw new Error('Hanya file gambar yang diperbolehkan!');
  }

  if (file.size > 5 * 1024 * 1024) {
    throw new Error('File terlalu besar (Max 5MB)');
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  
  const filename = `${prefix}-${Date.now()}${path.extname(file.name)}`;

  const filePath = path.join(process.cwd(), 'public/uploads', filename);
  
  await writeFile(filePath, buffer);

  return `/uploads/${filename}`;
}