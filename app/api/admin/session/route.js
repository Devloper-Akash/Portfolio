import { NextResponse } from 'next/server';
import { getAdmin } from '@/lib/security';

export async function GET() {
  const admin = await getAdmin();
  return NextResponse.json({ admin: admin ? { email: admin.email } : null });
}
