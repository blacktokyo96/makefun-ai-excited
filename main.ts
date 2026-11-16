import { existsSync, mkdirSync, copyFileSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';

const source = join(dirname(import.meta.filename), 'entry.png');
if (!existsSync(source)) {
  throw new Error('Missing entry.png: place the entry image next to main.ts.');
}
if (statSync(source).size === 0) {
  throw new Error('Empty entry.png: the entry image must contain image data.');
}
const output = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
mkdirSync(dirname(output), { recursive: true });
copyFileSync(source, output);
