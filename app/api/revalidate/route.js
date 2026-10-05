import { timingSafeEqual } from 'node:crypto';
import { revalidatePath, revalidateTag } from 'next/cache';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const expected = process.env.REVALIDATE_SECRET;
  const provided = request.headers.get('x-revalidate-secret') || '';
  const expectedBuffer = Buffer.from(expected || '');
  const providedBuffer = Buffer.from(provided);
  if (!expected || expectedBuffer.length !== providedBuffer.length || !timingSafeEqual(expectedBuffer, providedBuffer)) {
    return NextResponse.json({ error: 'Invalid revalidation token.' }, { status: 401 });
  }
  revalidateTag('portfolio-content', 'max');
  revalidatePath('/');
  revalidatePath('/work/[id]', 'page');
  return NextResponse.json({ revalidated: true });
}
