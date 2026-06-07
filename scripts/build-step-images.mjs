import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createHash } from 'crypto';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const imagesRoot = path.join(root, 'public', 'images');
const extractedRoot = path.join(imagesRoot, 'extracted');
const stepsRoot = path.join(imagesRoot, 'steps');

const assignments = [
  { id: 'bt1', prefix: 'bt1', stepCount: 12 },
  { id: 'bt2', prefix: 'bt2', stepCount: 11 },
  { id: 'bt3', prefix: 'bt3', stepCount: 10 },
  { id: 'bt4', prefix: 'bt4', stepCount: 11 },
  { id: 'bt5', prefix: 'bt5', stepCount: 10 },
  { id: 'bt6', prefix: 'bt6', stepCount: 10 },
];

function hashFile(filePath) {
  return createHash('md5').update(fs.readFileSync(filePath)).digest('hex');
}

function collectSources(prefix) {
  const sources = [];
  const extractedDir = path.join(extractedRoot, prefix);
  if (fs.existsSync(extractedDir)) {
    fs.readdirSync(extractedDir)
      .filter((f) => f.endsWith('.png') && f !== 'manifest.json')
      .sort()
      .forEach((f) => sources.push(path.join(extractedDir, f)));
  }

  const legacy = [
    path.join(imagesRoot, `${prefix}_1.png`),
    path.join(imagesRoot, `${prefix}_2.png`),
  ];
  const seen = new Set(sources.map(hashFile));
  for (const file of legacy) {
    if (!fs.existsSync(file)) continue;
    const h = hashFile(file);
    if (seen.has(h)) continue;
    seen.add(h);
    sources.push(file);
  }
  return sources;
}

const manifest = {};

for (const { id, prefix, stepCount } of assignments) {
  const outDir = path.join(stepsRoot, prefix);
  fs.mkdirSync(outDir, { recursive: true });

  const sources = collectSources(prefix);
  const stepPaths = Array(stepCount).fill(null);

  sources.forEach((src, index) => {
    if (index >= stepCount) return;
    const destName = `${String(index + 1).padStart(2, '0')}.png`;
    const destPath = path.join(outDir, destName);
    fs.copyFileSync(src, destPath);
    stepPaths[index] = `/images/steps/${prefix}/${destName}`;
  });

  manifest[id] = stepPaths;
  console.log(`${id}: ${sources.length} images -> ${stepPaths.filter(Boolean).length} steps (of ${stepCount})`);
}

fs.writeFileSync(path.join(stepsRoot, 'manifest.json'), JSON.stringify(manifest, null, 2));
console.log('Wrote', path.join(stepsRoot, 'manifest.json'));
