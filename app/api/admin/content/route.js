import { NextResponse } from 'next/server';
import { revalidatePath, revalidateTag } from 'next/cache';
import { z } from 'zod';
import { connectDb } from '@/lib/db';
import { Content } from '@/lib/models';
import { requireAdmin, sameOrigin } from '@/lib/security';
import { DEFAULT_TECH_STACK_RECORD } from '@/lib/default-tech-stack';
import { DEFAULT_COMPETENCIES } from '@/lib/default-competencies';

const kinds = ['projects', 'services', 'certificates', 'experience', 'skills', 'techstack', 'competencies', 'profile', 'settings', 'sections', 'media'];
const mutationSchema = z.object({
  kind: z.enum(kinds), key: z.string().trim().min(1).max(100), title: z.string().trim().min(1).max(180),
  data: z.record(z.string(), z.unknown()), visible: z.boolean().default(true), order: z.number().int().min(0).max(10000).default(0),
});

export async function GET(request) {
  try {
    await requireAdmin(); await connectDb();
    const kind = new URL(request.url).searchParams.get('kind');
    if (kind === 'techstack') {
      try {
        await Content.updateOne(
          { kind: 'techstack', key: DEFAULT_TECH_STACK_RECORD.key },
          { $setOnInsert: DEFAULT_TECH_STACK_RECORD },
          { upsert: true },
        );
      } catch (error) {
        if (error.code !== 11000) throw error;
      }
    }
    if (kind === 'competencies') {
      try {
        await Promise.all(DEFAULT_COMPETENCIES.map((record) => Content.updateOne(
          { kind: 'competencies', key: record.key },
          { $setOnInsert: record },
          { upsert: true },
        )));
      } catch (error) {
        if (error.code !== 11000) throw error;
      }
    }
    const filter = kinds.includes(kind) ? { kind } : {};
    const records = await Content.find(filter).sort({ kind: 1, order: 1 }).lean();
    return NextResponse.json({ records: records.map(({ _id, kind, key, title, data, visible, order, updatedAt }) => ({ id: String(_id), kind, key, title, data, visible, order, updatedAt })) });
  } catch (error) {
    return NextResponse.json({ error: error.message === 'UNAUTHORIZED' ? 'Sign in required.' : error.message }, { status: error.message === 'UNAUTHORIZED' ? 401 : 500 });
  }
}

export async function POST(request) {
  try {
    if (!sameOrigin(request)) return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 });
    await requireAdmin(); await connectDb();
    const value = mutationSchema.parse(await request.json());
    const record = await Content.create({ ...value, updatedAt: new Date() });
    refreshContent();
    return NextResponse.json({ record: { id: String(record._id), kind: record.kind, key: record.key, title: record.title, data: record.data, visible: record.visible, order: record.order } }, { status: 201 });
  } catch (error) {
    const status = error.message === 'UNAUTHORIZED' ? 401 : error.name === 'ZodError' ? 400 : error.code === 11000 ? 409 : 500;
    return NextResponse.json({ error: error.message === 'UNAUTHORIZED' ? 'Sign in required.' : status === 409 ? 'That key is already used in this section.' : error.message }, { status });
  }
}

export async function PUT(request) {
  try {
    if (!sameOrigin(request)) return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 });
    await requireAdmin(); await connectDb();
    const { id, ...raw } = await request.json();
    if (!id) return NextResponse.json({ error: 'Record ID is required.' }, { status: 400 });
    const value = mutationSchema.parse(raw);
    const record = await Content.findByIdAndUpdate(id, { ...value, updatedAt: new Date() }, { new: true, runValidators: true }).lean();
    if (!record) return NextResponse.json({ error: 'Record not found.' }, { status: 404 });
    refreshContent();
    return NextResponse.json({ ok: true });
  } catch (error) {
    const status = error.message === 'UNAUTHORIZED' ? 401 : error.name === 'ZodError' ? 400 : error.code === 11000 ? 409 : 500;
    return NextResponse.json({ error: error.message === 'UNAUTHORIZED' ? 'Sign in required.' : error.message }, { status });
  }
}

export async function DELETE(request) {
  try {
    if (!sameOrigin(request)) return NextResponse.json({ error: 'Request origin is not allowed.' }, { status: 403 });
    await requireAdmin(); await connectDb();
    const { id } = await request.json();
    await Content.findByIdAndDelete(id);
    refreshContent();
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ error: error.message === 'UNAUTHORIZED' ? 'Sign in required.' : error.message }, { status: error.message === 'UNAUTHORIZED' ? 401 : 500 });
  }
}

function refreshContent() {
  revalidateTag('portfolio-content', { expire: 0 });
  revalidatePath('/');
  revalidatePath('/work/[id]', 'page');
}
