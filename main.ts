import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const frontPage = readFileSync(new URL('./front-page.png', import.meta.url));
mkdirSync(outputDirectory, { recursive: true });
writeFileSync(join(outputDirectory, 'entry.png'), frontPage, { mode: 0o644 });
