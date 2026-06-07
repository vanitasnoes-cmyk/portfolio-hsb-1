import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

function copyToStep(prefix, filename, sourceRel) {
  const src = path.join(root, 'public/images', sourceRel);
  const destDir = path.join(root, 'public/images/steps', prefix);
  const dest = path.join(destDir, filename);
  if (!fs.existsSync(src)) {
    console.warn(`Missing: ${src}`);
    return null;
  }
  fs.mkdirSync(destDir, { recursive: true });
  fs.copyFileSync(src, dest);
  return `/images/steps/${prefix}/${filename}`;
}

const manifest = {
  bt1: [
    copyToStep('bt1', '01.png', 'pdf-pages/bt1/01.png'),
    copyToStep('bt1', '02.png', 'pdf-pages/bt1/01.png'),
    copyToStep('bt1', '03.png', 'pdf-pages/bt1/02.png'),
    copyToStep('bt1', '04.png', 'pdf-pages/bt1/03.png'),
    copyToStep('bt1', '05.png', 'pdf-pages/bt1/03.png'),
    copyToStep('bt1', '06.png', 'pdf-pages/bt1/04.png'),
    copyToStep('bt1', '07.png', 'pdf-pages/bt1/04.png'),
    copyToStep('bt1', '08.png', 'pdf-pages/bt1/05.png'),
    copyToStep('bt1', '09.png', 'pdf-pages/bt1/06.png'),
    copyToStep('bt1', '10.png', 'pdf-pages/bt1/07.png'),
    copyToStep('bt1', '11.png', 'pdf-pages/bt1/07.png'),
    copyToStep('bt1', '12.png', 'pdf-pages/bt1/08.png'),
  ],
  bt2: [
    copyToStep('bt2', '01.png', 'pdf-pages/bt2/03.png'),
    copyToStep('bt2', '02.png', 'pdf-pages/bt2/03.png'),
    copyToStep('bt2', '03.png', 'pdf-pages/bt2/05.png'),
    copyToStep('bt2', '04.png', 'pdf-pages/bt2/06.png'),
    copyToStep('bt2', '05.png', 'pdf-pages/bt2/09.png'),
  ],
  bt3: [
    copyToStep('bt3', '01.png', 'pdf-pages/bt3/04.png'),
    copyToStep('bt3', '02.png', 'pdf-pages/bt3/05.png'),
    copyToStep('bt3', '03.png', 'pdf-pages/bt3/06.png'),
  ],
  bt4: [
    copyToStep('bt4', '01.png', 'pdf-pages/bt4/01.png'),
    copyToStep('bt4', '02.png', 'pdf-pages/bt4/02.png'),
    copyToStep('bt4', '03.png', 'pdf-pages/bt4/11.png'),
    copyToStep('bt4', '04.png', 'pdf-pages/bt4/03.png'),
    copyToStep('bt4', '05.png', 'extracted/bt4/05.png') || copyToStep('bt4', '05.png', 'pdf-pages/bt4/11.png'),
    copyToStep('bt4', '06.png', 'pdf-pages/bt4/07.png'),
    copyToStep('bt4', '07.png', 'pdf-pages/bt4/10.png'),
  ],
  bt5: [
    copyToStep('bt5', '01.png', 'pdf-pages/bt5/02.png'),
    copyToStep('bt5', '02.png', 'pdf-pages/bt5/03.png'),
    copyToStep('bt5', '03.png', 'pdf-pages/bt5/06.png'),
  ],
  bt6: [
    null,
    [copyToStep('bt6', '02a.png', 'pdf-pages/bt6/02.png'), copyToStep('bt6', '02b.png', 'pdf-pages/bt6/03.png')],
    copyToStep('bt6', '03.png', 'pdf-pages/bt6/04.png'),
    null,
    copyToStep('bt6', '05.png', 'pdf-pages/bt6/08.png'),
    copyToStep('bt6', '06.png', 'pdf-pages/bt6/11.png'),
  ],
};

const json = JSON.stringify(manifest, null, 2) + '\n';
fs.writeFileSync(path.join(root, 'src/data/step-evidence.json'), json);
fs.writeFileSync(path.join(root, 'public/images/steps/manifest.json'), json);
console.log('Applied step image mapping.');
