import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
for (const target of [
  { prefix: 'Lua.part', output: 'src/components/LuaStore.tsx' },
  { prefix: 'Admin.part', output: 'src/components/AdminApp.tsx' }
]) {
  const directory = path.join(root, 'source-encoded');
  const names = (await readdir(directory)).filter((name) => name.startsWith(target.prefix)).sort();
  if (!names.length) throw new Error(`No hay partes para ${target.output}`);
  const encoded = (await Promise.all(names.map((name) => readFile(path.join(directory, name), 'utf8')))).join('');
  const output = path.join(root, target.output);
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, Buffer.from(encoded, 'base64'));
}
