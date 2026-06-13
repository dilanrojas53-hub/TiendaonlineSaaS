'use strict';
const fs = require('node:fs');
const path = require('node:path');

const root = __dirname;
const sourceDir = path.join(root, 'source-parts');
const targets = [
  { prefix: 'server.part', output: 'server.js' },
  { prefix: 'app.part', output: 'public/app.js' },
  { prefix: 'styles.part', output: 'public/styles.css' },
  { prefix: 'store.part', output: 'data/store.json', ifMissing: true },
];

for (const target of targets) {
  const output = path.join(root, target.output);
  if (target.ifMissing && fs.existsSync(output)) continue;
  const parts = fs.readdirSync(sourceDir).filter((name) => name.startsWith(target.prefix)).sort();
  if (!parts.length) throw new Error(`Faltan partes para ${target.output}`);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, Buffer.concat(parts.map((name) => fs.readFileSync(path.join(sourceDir, name)))));
}
