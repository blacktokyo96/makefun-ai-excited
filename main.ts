import { existsSync, statSync, mkdirSync, copyFileSync } from 'node:fs';
import { dirname, join } from 'node:path';

const source = join(dirname(new URL(import.meta.url).pathname), 'entry.png');
if (!existsSync(source)) {
  throw new Error('Missing entry.png next to main.ts');
}
if (statSync(source).size === 0) {
  throw new Error('entry.png is empty (0 bytes); refusing to run');
}
const output = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');
mkdirSync(dirname(output), { recursive: true });
copyFileSync(source, output);
