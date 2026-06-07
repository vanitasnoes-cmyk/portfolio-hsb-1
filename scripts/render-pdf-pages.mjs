import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { pdf } from 'pdf-to-img';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const filesDir = path.join(root, 'public', 'files');
const outBase = path.join(root, 'public', 'images', 'pdf-pages');

const pdfs = [
  { prefix: 'bt1', file: 'BT1_Chuong1_NguyenVietDung.pdf' },
  { prefix: 'bt2', file: 'BT2_Chuong2_NguyenVietDung.pdf' },
  { prefix: 'bt3', file: 'BT2_Chuong3_NguyenVietDung.pdf' },
  { prefix: 'bt4', file: 'BT3_Chuong4_NguyenVietDung.pdf' },
  { prefix: 'bt5', file: 'BT2_Chuong5_NguyenVietDung.pdf' },
  { prefix: 'bt6', file: 'BT4_Chuong6_NguyenVietDung.pdf' },
];

for (const { prefix, file } of pdfs) {
  const outDir = path.join(outBase, prefix);
  fs.mkdirSync(outDir, { recursive: true });
  const doc = await pdf(path.join(filesDir, file), { scale: 2 });
  let pageNum = 0;
  for await (const image of doc) {
    pageNum++;
    const name = `${String(pageNum).padStart(2, '0')}.png`;
    fs.writeFileSync(path.join(outDir, name), image);
  }
  console.log(`${prefix}: ${pageNum} pages`);
}
