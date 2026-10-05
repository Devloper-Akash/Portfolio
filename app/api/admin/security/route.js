import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { connectDb } from '@/lib/db';
import { Admin } from '@/lib/models';
import { checkRateLimit, clientAddress, requireAdmin, sameOrigin } from '@/lib/security';

const schema = z.object({ currentPassword: z.string().min(1), newPassword: z.string().min(12).max(128).regex(/[a-z]/).regex(/[A-Z]/).regex(/[0-9]/) });
export async function POST(request) {
  try {
    if (!sameOrigin(request)) return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 });
    if (!await checkRateLimit(`password:${clientAddress(request)}`, 6, 15 * 60 * 1000)) return NextResponse.json({ error: 'Too many password attempts. Try again later.' }, { status: 429 });
    const session = await requireAdmin();
    const { currentPassword, newPassword } = schema.parse(await request.json());
    await connectDb();
    const admin = await Admin.findById(session._id);
    if (!await bcrypt.compare(currentPassword, admin.passwordHash)) return NextResponse.json({ error: 'Current password is incorrect.' }, { status: 400 });
    admin.passwordHash = await bcrypt.hash(newPassword, 12);
    admin.tokenVersion += 1;
    await admin.save();
    const response = NextResponse.json({ ok: true });
    response.cookies.set(process.env.AUTH_COOKIE_NAME || 'portfolio_admin', '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message === 'UNAUTHORIZED' ? 'Sign in required.' : error.name === 'ZodError' ? 'Use at least 12 characters with upper-case, lower-case, and a number.' : error.message }, { status: error.message === 'UNAUTHORIZED' ? 401 : error.name === 'ZodError' ? 400 : 500 });
  }
}
