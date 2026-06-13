import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
for (const target of [
  { prefix: 'LuaStore.part', output: 'src/components/LuaStore.tsx' },
  { prefix: 'AdminApp.part', output: 'src/components/AdminApp.tsx' }
]) {
  const names = (await readdir(path.join(root, 'source-parts'))).filter((name) => name.startsWith(target.prefix)).sort();
  if (!names.length) throw new Error(`No hay partes para ${target.output}`);
  const content = (await Promise.all(names.map((name) => readFile(path.join(root, 'source-parts', name), 'utf8')))).join('');
  const output = path.join(root, target.output);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, content, 'utf8');
}
