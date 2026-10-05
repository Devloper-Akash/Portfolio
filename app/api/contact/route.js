import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDb } from '@/lib/db';
import { Message } from '@/lib/models';
import { checkRateLimit, clientAddress, sameOrigin } from '@/lib/security';

const messageSchema = z.object({ name: z.string().trim().min(1).max(120), email: z.string().trim().email().max(254), message: z.string().trim().min(1).max(5000) });

export async function POST(request) {
  try {
    if (!sameOrigin(request)) return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 });
    const value = messageSchema.parse(await request.json());
    if (process.env.NODE_ENV === 'production' && !await checkRateLimit(`contact:${clientAddress(request)}`, 5, 60 * 60 * 1000)) {
      return NextResponse.json({ error: 'Please wait before sending another message.' }, { status: 429 });
    }
    await connectDb();
    await Message.create(value);
    return NextResponse.json({ ok: true, saved: true });
  } catch (error) {
    return NextResponse.json({ error: error.name === 'ZodError' ? 'Enter your name, a valid email address, and a message before sending.' : error.message || 'Unable to save your message.' }, { status: error.name === 'ZodError' ? 400 : 500 });
  }
}
