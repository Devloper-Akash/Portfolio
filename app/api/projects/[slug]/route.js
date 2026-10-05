import { NextResponse } from 'next/server';
import { getPublishedContent } from '@/lib/portfolio-data';

export async function GET(_request, { params }) {
  const { slug } = await params;
  const projects = (await getPublishedContent()).filter((entry) => entry.kind === 'projects' && entry.visible).sort((a, b) => a.order - b.order);
  const index = Number(slug);
  const entry = projects.find((project) => project.key === slug) || (Number.isInteger(index) ? projects[index] : null);
  if (!entry) return NextResponse.json({ error: 'Project not found.' }, { status: 404 });
  return NextResponse.json({ project: { ...entry.data, slug: entry.key }, total: projects.length });
}
