import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { deflateSync } from 'zlib';
import { getDocument, OPS } from 'pdfjs-dist/legacy/build/pdf.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const filesDir = path.join(root, 'public', 'files');
const outBase = path.join(root, 'public', 'images', 'extracted');

const pdfs = [
  { id: 'bt1', file: 'BT1_Chuong1_LuuDucAnh.pdf' },
  { id: 'bt2', file: 'BT2_Chuong2_LuuDucAnh.pdf' },
  { id: 'bt3', file: 'BT2_Chuong3_LuuDucAnh.pdf' },
  { id: 'bt4', file: 'BT3_Chuong4_LuuDucAnh.pdf' },
  { id: 'bt5', file: 'BT2_Chuong5_LuuDucAnh.pdf' },
  { id: 'bt6', file: 'BT4_Chuong6_LuuDucAnh.pdf' },
];

function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    c ^= buf[i];
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  return (c ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function normalizeToRgba(data, width, height) {
  const pixels = width * height;
  const channels = Math.round(data.length / pixels);
  const out = Buffer.alloc(pixels * 4);
  if (channels === 4) {
    data.copy(out, 0, 0, pixels * 4);
    return out;
  }
  if (channels === 3) {
    for (let i = 0, j = 0; i < pixels * 3; i += 3, j += 4) {
      out[j] = data[i];
      out[j + 1] = data[i + 1];
      out[j + 2] = data[i + 2];
      out[j + 3] = 255;
    }
    return out;
  }
  if (channels === 1) {
    for (let p = 0; p < pixels; p++) {
      const g = data[p];
      out[p * 4] = g;
      out[p * 4 + 1] = g;
      out[p * 4 + 2] = g;
      out[p * 4 + 3] = 255;
    }
    return out;
  }
  return null;
}

function encodePng(width, height, rgba) {
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = createChunk('IHDR', (() => {
    const b = Buffer.alloc(13);
    b.writeUInt32BE(width, 0);
    b.writeUInt32BE(height, 4);
    b[8] = 8;
    b[9] = 6;
    return b;
  })());

  const stride = width * 4;
  const raw = Buffer.alloc((stride + 1) * height);
  for (let y = 0; y < height; y++) {
    raw[y * (stride + 1)] = 0;
    rgba.copy(raw, y * (stride + 1) + 1, y * stride, y * stride + stride);
  }
  const idat = createChunk('IDAT', deflateSync(raw));
  const iend = createChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([signature, ihdr, idat, iend]);
}

async function extractImagesFromPdf(pdfPath, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  const data = new Uint8Array(fs.readFileSync(pdfPath));
  const pdf = await getDocument({ data, useSystemFonts: true }).promise;
  const saved = [];
  const seen = new Set();
  let imgIndex = 0;

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const { fnArray, argsArray } = await page.getOperatorList();

    for (let i = 0; i < fnArray.length; i++) {
      if (fnArray[i] !== OPS.paintImageXObject && fnArray[i] !== OPS.paintInlineImageXObject) {
        continue;
      }
      const imgName = argsArray[i][0];
      try {
        const img = await page.objs.get(imgName);
        if (!img?.data || img.width < 120 || img.height < 120) continue;
        if (img.width * img.height < 80000) continue;

        const key = `${img.width}x${img.height}-${img.data.length}`;
        if (seen.has(key)) continue;
        seen.add(key);

        const rgba = normalizeToRgba(Buffer.from(img.data), img.width, img.height);
        if (!rgba) continue;

        imgIndex++;
        const name = `${String(imgIndex).padStart(2, '0')}.png`;
        fs.writeFileSync(path.join(outDir, name), encodePng(img.width, img.height, rgba));
        saved.push({ name, width: img.width, height: img.height, pageNum });
      } catch {
        // skip unresolved image refs
      }
    }
  }

  return { numPages: pdf.numPages, saved };
}

const summary = {};
for (const { id, file } of pdfs) {
  const pdfPath = path.join(filesDir, file);
  const outDir = path.join(outBase, id);
  const result = await extractImagesFromPdf(pdfPath, outDir);
  summary[id] = result;
  console.log(`${id}: ${result.numPages} pages, ${result.saved.length} images`);
}

fs.writeFileSync(path.join(outBase, 'manifest.json'), JSON.stringify(summary, null, 2));
