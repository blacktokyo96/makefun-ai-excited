import { copyFileSync, existsSync, mkdirSync, statSync } from 'node:fs';
import { dirname, join } from 'node:path';

const source = join(import.meta.dirname, 'entry.png');
const destination = join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png');

if (!existsSync(source)) {
  throw new Error('Missing entry.png next to main.ts.');
}
if (statSync(source).size === 0) {
  throw new Error('entry.png is empty (0 bytes); cannot copy an empty entry.');
}

mkdirSync(dirname(destination), { recursive: true });
copyFileSync(source, destination);
