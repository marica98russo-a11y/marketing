import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const input = path.join(root, 'public');
const output = path.join(root, 'dist');
if (!existsSync(path.join(input, 'index.html'))) throw new Error('Home mancante');
mkdirSync(output, { recursive: true });
cpSync(input, output, { recursive: true });
console.log('Build completata: dist/');
