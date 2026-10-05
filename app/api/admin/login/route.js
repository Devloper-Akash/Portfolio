import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';
import { connectDb } from '@/lib/db';
import { Admin } from '@/lib/models';
import { checkRateLimit, clientAddress, cookieName, issueSession, sameOrigin } from '@/lib/security';

export async function POST(request) {
  try {
    if (!sameOrigin(request)) return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 });
    if (!await checkRateLimit(`login:${clientAddress(request)}`, 8, 15 * 60 * 1000)) {
      return NextResponse.json({ error: 'Too many sign-in attempts. Try again in 15 minutes.' }, { status: 429 });
    }
    const { email, password } = await request.json();
    await connectDb();
    const admin = await Admin.findOne({ email: String(email || '').trim().toLowerCase() });
    if (!admin || typeof password !== 'string' || !await bcrypt.compare(password, admin.passwordHash)) {
      return NextResponse.json({ error: 'Email or password is incorrect.' }, { status: 401 });
    }
    const token = await issueSession(admin);
    const response = NextResponse.json({ ok: true, email: admin.email });
    response.cookies.set(cookieName, token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 8 * 60 * 60 });
    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message || 'Unable to sign in.' }, { status: 500 });
  }
}
