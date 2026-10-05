import { readFile } from 'node:fs/promises';
import vm from 'node:vm';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
try {
  const envText = await readFile(path.join(root, '.env.local'), 'utf8');
  for (const line of envText.split(/\r?\n/)) {
    const match = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/);
    if (!match || process.env[match[1]]) continue;
    process.env[match[1]] = match[2].replace(/^(['"])(.*)\1$/, '$2');
  }
} catch {}
const { Admin, Content, Message, RateLimit } = await import('../lib/models.js');
const { connectDb } = await import('../lib/db.js');

const email = process.env.ADMIN_BOOTSTRAP_EMAIL?.trim().toLowerCase();
const password = process.env.ADMIN_BOOTSTRAP_PASSWORD;
if (!email || !password) throw new Error('Set ADMIN_BOOTSTRAP_EMAIL and ADMIN_BOOTSTRAP_PASSWORD in .env.local before seeding.');
if (password.length < 12 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password)) {
  throw new Error('Bootstrap password must be at least 12 characters and contain upper-case, lower-case, and a number.');
}

const sourcePath = path.join(root, 'assets', 'assets.js');
let source = await readFile(sourcePath, 'utf8');
source = source.replace(/^import\s+(\w+)\s+from\s+'\.\/([^']+)';\s*$/gm, (_, name, assetPath) => `const ${name} = '/${path.basename(assetPath)}';`);
source = source.replace(/export const /g, 'const ');
source += '\nglobalThis.__seed = { workData, serviceData, certificateData, experienceData, toolsData, infoList };';
const sandbox = {};
vm.runInNewContext(source, sandbox, { filename: sourcePath, timeout: 1000 });
const seed = JSON.parse(JSON.stringify(sandbox.__seed));
const toKey = (title) => title.toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 90);
const asRecords = (kind, items, keyFn) => items.map((data, order) => ({ kind, key: keyFn(data), title: data.title || data.role || data.name || kind, data, visible: true, order }));

const initialContent = [
  ...asRecords('projects', seed.workData, (item) => toKey(item.title)),
  ...asRecords('services', seed.serviceData, (item) => toKey(item.title)),
  ...asRecords('certificates', seed.certificateData, (item) => toKey(item.title)),
  ...asRecords('experience', seed.experienceData, (item) => toKey(`${item.company}-${item.role}`)),
  ...asRecords('skills', seed.toolsData.map((icon) => {
    const basename = path.basename(icon).replace(/\.[^.]+$/, '');
    const labels = { vscode: 'VS Code', mongodb: 'MongoDB', firebase: 'Firebase', figma: 'Figma', git: 'Git' };
    return { name: labels[basename] || basename, icon };
  }), (item) => toKey(item.name)),
  { kind: 'profile', key: 'main', title: 'Profile and about', visible: true, order: 0, data: { name: 'Akash Halder', email: 'halderakash826@gmail.com', headline: 'Full Stack Developer & Backend Specialist', biography: 'I am a passionate and dedicated software developer with a strong background in web development. I have experience working with various programming languages and frameworks, and I am always eager to learn new technologies.', availability: 'Open for Fullstack & Backend Engineering roles', resume: '/akash-halder-resume.pdf', linkedin: 'https://www.linkedin.com/in/akash-halder-779701379/' } },
  { kind: 'settings', key: 'site', title: 'Site settings', visible: true, order: 0, data: { title: 'Akash Halder | Full Stack Developer & Backend Specialist', description: 'Portfolio of Akash Halder - Full Stack Developer specializing in scalable backend systems, robust REST APIs, modern web architectures, and interactive 3D experiences.' } },
  ...['about', 'services', 'experience', 'work', 'certificates', 'contact'].map((key, order) => ({ kind: 'sections', key, title: key[0].toUpperCase() + key.slice(1), visible: true, order, data: { sectionId: key } })),
];

await connectDb();
await Promise.all([Admin.init(), Content.init(), Message.init(), RateLimit.init()]);
let admin = await Admin.findOne({ email });
if (admin) {
  console.log(`Administrator ${email} already exists; kept the current password.`);
} else {
  const passwordHash = await bcrypt.hash(password, 12);
  await Admin.create({ email, passwordHash });
  console.log(`Created administrator ${email}.`);
}

let inserted = 0;
for (const item of initialContent) {
  const exists = await Content.exists({ kind: item.kind, key: item.key });
  if (!exists) {
    await Content.create({ ...item, updatedAt: new Date() });
    inserted += 1;
  }
}
console.log(`Seeded ${inserted} missing portfolio records; existing admin edits were preserved.`);
await mongoose.disconnect();
