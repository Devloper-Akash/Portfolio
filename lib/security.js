import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';
import { connectDb } from './db';
import { Admin, RateLimit } from './models';

export const cookieName = process.env.AUTH_COOKIE_NAME || 'portfolio_admin';
const jwtKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 32) throw new Error('JWT_SECRET must contain at least 32 characters.');
  return new TextEncoder().encode(secret);
};

export async function issueSession(admin) {
  const token = await new SignJWT({ sub: String(admin._id), ver: admin.tokenVersion })
    .setProtectedHeader({ alg: 'HS256' }).setIssuedAt().setExpirationTime('8h').sign(jwtKey());
  return token;
}

export async function getAdmin() {
  const token = (await cookies()).get(cookieName)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, jwtKey());
    await connectDb();
    const admin = await Admin.findById(payload.sub).select('email tokenVersion').lean();
    return admin && admin.tokenVersion === payload.ver ? admin : null;
  } catch {
    return null;
  }
}

export async function requireAdmin() {
  const admin = await getAdmin();
  if (!admin) throw new Error('UNAUTHORIZED');
  return admin;
}

export async function checkRateLimit(key, limit, windowMs) {
  await connectDb();
  const now = new Date();
  const expiry = new Date(Date.now() + windowMs);
  try {
    const record = await RateLimit.findOneAndUpdate(
      { key, expiresAt: { $gt: now } },
      { $inc: { count: 1 } },
      { new: true },
    );
    if (record) return record.count <= limit;
    await RateLimit.findOneAndUpdate({ key }, { $set: { count: 1, expiresAt: expiry } }, { upsert: true, new: true });
    return true;
  } catch (error) {
    if (error?.code === 11000) return false;
    throw error;
  }
}

export function sameOrigin(request) {
  const origin = request.headers.get('origin');
  const expected = process.env.APP_ORIGIN;
  if (!origin || !expected) return false;
  try { return new URL(origin).origin === new URL(expected).origin; } catch { return false; }
}

export function clientAddress(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}
