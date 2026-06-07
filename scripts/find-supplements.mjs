import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const appFile = path.join(root, 'src/App.tsx');

const content = fs.readFileSync(appFile, 'utf8');
const lines = content.split('\n');
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('RubricSupplements') || lines[i].includes('LessonRubricSupplements')) {
    console.log(`Line ${i + 1}: ${lines[i]}`);
  }
}
