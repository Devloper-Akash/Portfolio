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
  const originHeader = request.headers.get('origin') || request.headers.get('referer');

  if (!originHeader) {
    const secFetchSite = request.headers.get('sec-fetch-site');
    return secFetchSite === 'same-origin' || secFetchSite === 'none';
  }

  let originUrl;
  try {
    originUrl = new URL(originHeader);
  } catch {
    return false;
  }

  const originHost = originUrl.host.toLowerCase();

  // 1. Compare against the incoming Host / X-Forwarded-Host header (standard same-origin request)
  const rawForwardedHost = request.headers.get('x-forwarded-host') || request.headers.get('host');
  const requestHost = rawForwardedHost?.split(',')[0]?.trim()?.toLowerCase();
  if (requestHost && originHost === requestHost) {
    return true;
  }

  // 2. Compare against request.url origin
  try {
    const reqUrl = new URL(request.url);
    if (originHost === reqUrl.host.toLowerCase()) {
      return true;
    }
  } catch {}

  // 3. Compare against configured APP_ORIGIN (supports comma-separated list of origins)
  if (process.env.APP_ORIGIN) {
    const allowed = process.env.APP_ORIGIN.split(',').map((val) => val.trim()).filter(Boolean);
    for (const item of allowed) {
      try {
        const itemUrl = new URL(item.startsWith('http') ? item : `https://${item}`);
        if (itemUrl.host.toLowerCase() === originHost) {
          return true;
        }
      } catch {}
    }
  }

  // 4. Compare against Vercel platform environment variables if available
  if (process.env.VERCEL_URL && originHost === process.env.VERCEL_URL.toLowerCase()) {
    return true;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL && originHost === process.env.VERCEL_PROJECT_PRODUCTION_URL.toLowerCase()) {
    return true;
  }

  // 5. In development, allow localhost or 127.0.0.1 on any port
  if (process.env.NODE_ENV !== 'production') {
    if (originUrl.hostname === 'localhost' || originUrl.hostname === '127.0.0.1') {
      return true;
    }
  }

  return false;
}

export function clientAddress(request) {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}
