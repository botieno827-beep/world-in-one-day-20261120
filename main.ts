import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const outputDirectory = process.env.MAKEFUN_OUTPUT_DIR || '/output';
// The 1600px master is front-page.png; the contest accepts at most 1024px.
const frontPage = readFileSync(new URL('./submission.png', import.meta.url));
mkdirSync(outputDirectory, { recursive: true });
writeFileSync(join(outputDirectory, 'entry.png'), frontPage, { mode: 0o644 });
