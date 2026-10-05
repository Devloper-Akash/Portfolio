import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';
import { Content } from '@/lib/models';
import { requireAdmin, sameOrigin } from '@/lib/security';
import { removeSolidImageBackground } from '@/lib/remove-solid-image-background';

const signature = (buffer) => {
  if (buffer.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return 'image/png';
  if (buffer.subarray(0, 3).equals(Buffer.from([255, 216, 255]))) return 'image/jpeg';
  if (buffer.toString('ascii', 0, 4) === 'RIFF' && buffer.toString('ascii', 8, 12) === 'WEBP') return 'image/webp';
  if (buffer.toString('ascii', 0, 5) === '%PDF-') return 'application/pdf';
  return null;
};

export async function POST(request) {
  try {
    if (!sameOrigin(request)) return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 });
    await requireAdmin();
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) return NextResponse.json({ error: 'Cloudinary is not configured.' }, { status: 503 });
    const form = await request.formData();
    const file = form.get('file');
    if (!file || typeof file.arrayBuffer !== 'function' || file.size > 10 * 1024 * 1024) return NextResponse.json({ error: 'Choose a file smaller than 10 MB.' }, { status: 400 });
    let buffer = Buffer.from(await file.arrayBuffer());
    let mime = signature(buffer);
    if (!mime || (!mime.startsWith('image/') && mime !== 'application/pdf')) return NextResponse.json({ error: 'Only PNG, JPEG, WebP, and PDF files are accepted.' }, { status: 400 });
    if (form.get('remove_background') === 'true') {
      if (!mime.startsWith('image/')) return NextResponse.json({ error: 'Background removal only supports images.' }, { status: 400 });
      buffer = await removeSolidImageBackground(buffer);
      mime = 'image/png';
    }
    cloudinary.config({ cloud_name: process.env.CLOUDINARY_CLOUD_NAME, api_key: process.env.CLOUDINARY_API_KEY, api_secret: process.env.CLOUDINARY_API_SECRET, secure: true });
    const uploaded = await new Promise((resolve, reject) => cloudinary.uploader.upload_stream({ resource_type: mime === 'application/pdf' ? 'raw' : 'image', folder: 'portfolio', allowed_formats: mime === 'application/pdf' ? ['pdf'] : ['png', 'jpg', 'jpeg', 'webp'] }, (error, result) => error ? reject(error) : resolve(result)).end(buffer));
    await connectDb();
    const key = uploaded.public_id.replace(/[^a-zA-Z0-9_-]/g, '-');
    const record = await Content.findOneAndUpdate({ kind: 'media', key }, { kind: 'media', key, title: file.name.slice(0, 180), visible: true, order: 0, data: { url: uploaded.secure_url, publicId: uploaded.public_id, format: uploaded.format, size: uploaded.bytes, mime }, updatedAt: new Date() }, { upsert: true, new: true });
    return NextResponse.json({ media: { id: String(record._id), ...record.data, title: record.title } }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message === 'UNAUTHORIZED' ? 'Sign in required.' : error.message || 'Upload failed.' }, { status: error.message === 'UNAUTHORIZED' ? 401 : 500 });
  }
}
