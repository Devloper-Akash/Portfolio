export const DEFAULT_TECH_STACK = [
  { name: 'Node.js', icon: 'node' },
  { name: 'Express.js', icon: 'express' },
  { name: 'Next.js 16', icon: 'next' },
  { name: 'React 19', icon: 'react' },
  { name: 'RESTful APIs', icon: 'rest' },
  { name: 'JavaScript (ES6+)', icon: 'javascript' },
  { name: 'Tailwind CSS', icon: 'tailwind' },
  { name: 'Mongoose', icon: 'mongoose' },
  { name: 'JWT Authentication', icon: 'jwt' },
  { name: 'CORS & Security', icon: 'security' },
  { name: 'JSON-RPC / WebSockets', icon: 'websocket' },
];

export const DEFAULT_TECH_STACK_RECORD = {
  kind: 'techstack',
  key: 'developer-ecosystem',
  title: 'Developer Ecosystem & Toolchain',
  data: { items: DEFAULT_TECH_STACK },
  visible: true,
  order: 0,
};
