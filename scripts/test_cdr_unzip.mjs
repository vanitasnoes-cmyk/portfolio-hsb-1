import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const workspaceRoot = 'c:/Users/USER/Downloads/Portfolio hsb 1';

async function checkCdr(file) {
  const filePath = path.join(workspaceRoot, file);
  if (!fs.existsSync(filePath)) {
    console.log(`${file} does not exist`);
    return;
  }
  
  try {
    const buf = fs.readFileSync(filePath);
    const zip = await JSZip.loadAsync(buf);
    console.log(`=========================================`);
    console.log(`FILE: ${file}`);
    console.log(`=========================================`);
    const keys = Object.keys(zip.files);
    console.log(`Total files inside: ${keys.length}`);
    const previewKeys = keys.filter(k => k.toLowerCase().includes('preview'));
    console.log(`Preview files:`, previewKeys);
    
    // If there is a preview, save it!
    for (const key of previewKeys) {
      if (key.endsWith('.png') || key.endsWith('.jpg') || key.endsWith('.jpeg') || key.endsWith('.bmp')) {
        const data = await zip.file(key).async('nodebuffer');
        const outName = `scratch_preview_${file.replace(/\s+/g, '_')}_${path.basename(key)}`;
        fs.writeFileSync(path.join(workspaceRoot, outName), data);
        console.log(`Saved preview to ${outName}`);
      }
    }
  } catch (e) {
    console.error(`Error reading ${file} as zip:`, e.message);
  }
}

async function run() {
  await checkCdr('ẢNH 1.cdr');
  await checkCdr('ẢNH 2.cdr');
}

run();
