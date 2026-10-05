import { NextResponse } from 'next/server';
import { cookieName, sameOrigin } from '@/lib/security';

export async function POST(request) {
  if (!sameOrigin(request)) return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 });
  const response = NextResponse.json({ ok: true });
  response.cookies.set(cookieName, '', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', path: '/', maxAge: 0 });
  return response;
}
