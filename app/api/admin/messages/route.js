import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';
import { Message } from '@/lib/models';
import { requireAdmin, sameOrigin } from '@/lib/security';

export async function GET() {
  try {
    await requireAdmin(); await connectDb();
    const messages = await Message.find().sort({ createdAt: -1 }).limit(250).lean();
    return NextResponse.json({ messages: messages.map((m) => ({ ...m, id: String(m._id), _id: undefined })) });
  } catch (error) {
    return NextResponse.json({ error: error.message === 'UNAUTHORIZED' ? 'Sign in required.' : error.message }, { status: error.message === 'UNAUTHORIZED' ? 401 : 500 });
  }
}

export async function PATCH(request) {
  try {
    if (!sameOrigin(request)) return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 });
    await requireAdmin(); await connectDb();
    const { id, status } = await request.json();
    if (!['new', 'read', 'archived'].includes(status)) return NextResponse.json({ error: 'Invalid message status.' }, { status: 400 });
    await Message.findByIdAndUpdate(id, { status });
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message === 'UNAUTHORIZED' ? 'Sign in required.' : error.message }, { status: error.message === 'UNAUTHORIZED' ? 401 : 500 });
  }
}
