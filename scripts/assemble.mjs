import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const directory = path.join(root, 'source-bundle');
const names = (await readdir(directory))
  .filter((name) => /^bundle\.big\d+\.b64$/.test(name))
  .sort();
if (!names.length) throw new Error('No se encontró el bundle de la aplicación.');

const encoded = (await Promise.all(names.map((name) => readFile(path.join(directory, name), 'utf8')))).join('');
const entries = JSON.parse(Buffer.from(encoded, 'base64').toString('utf8'));
const allowed = new Set([
  'src/components/LuaStore.tsx',
  'src/components/AdminApp.tsx',
  'src/lib/auth.ts',
  'src/lib/seed.ts',
  'src/lib/store.ts',
  'src/lib/order-service.ts',
  'src/lib/types.ts',
  'src/lib/http.ts',
  'src/app/globals.css',
  'src/app/layout.tsx',
  'src/app/page.tsx',
  'src/app/admin/page.tsx',
  'src/app/api/store/route.ts',
  'src/app/api/products/route.ts',
  'src/app/api/inventory/route.ts',
  'src/app/api/orders/route.ts',
  'src/app/api/coupons/route.ts',
  'src/app/api/coupons/validate/route.ts',
  'src/app/api/dashboard/route.ts',
  'src/app/api/admin/login/route.ts',
  'src/app/api/admin/logout/route.ts',
  'src/app/api/admin/session/route.ts',
  'src/app/api/admin/orders/route.ts',
  'src/app/api/admin/order-status/route.ts',
  'src/app/api/admin/store-config/route.ts',
  'src/app/api/placeholder/route.ts',
  'next.config.mjs',
  'tsconfig.json',
  'next-env.d.ts',
  '.env.example',
  '.gitignore',
  'README.md',
  '.github/workflows/ci.yml',
  'scripts/check-data.mjs',
  'data/store.json'
]);

for (const entry of entries) {
  if (!allowed.has(entry.path)) throw new Error(`Ruta no permitida en el bundle: ${entry.path}`);
  const output = path.join(root, entry.path);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, Buffer.from(entry.content, 'base64'));
}
console.log(`Aplicación ensamblada: ${entries.length} archivos.`);
