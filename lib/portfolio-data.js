import { unstable_cache } from 'next/cache';
import { connectDb } from './db';
import { Content } from './models';

const kinds = ['projects', 'services', 'certificates', 'experience', 'skills', 'techstack', 'profile', 'settings', 'sections'];

async function readPublished() {
  try {
    await connectDb();
    const docs = await Content.find({ kind: { $in: kinds }, $or: [{ kind: 'sections' }, { visible: true }] }).sort({ order: 1 }).lean();
    return docs.map(({ kind, key, title, data, visible, order }) => ({ kind, key, title, data, visible, order }));
  } catch (error) {
    if (process.env.NODE_ENV === 'production' && process.env.MONGODB_URI) throw error;
    return [];
  }
}

export const getPublishedContent = unstable_cache(readPublished, ['published-portfolio-content'], {
  revalidate: 300,
  tags: ['portfolio-content'],
});

export async function getContentByKind(kind) {
  return (await getPublishedContent()).filter((entry) => entry.kind === kind).map((entry) => ({ ...entry.data, id: entry.key, order: entry.order }));
}
