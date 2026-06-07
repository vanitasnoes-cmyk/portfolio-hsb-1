import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const workspaceRoot = 'c:/Users/USER/Downloads/Portfolio hsb 1';

async function listFiles(file) {
  const filePath = path.join(workspaceRoot, file);
  if (!fs.existsSync(filePath)) {
    console.log(`File does not exist: ${file}`);
    return;
  }
  const buf = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(buf);
  console.log(`=========================================`);
  console.log(`FILES IN ${file}:`);
  console.log(`=========================================`);
  const keys = Object.keys(zip.files);
  console.log(`Total files: ${keys.length}`);
  const mediaFiles = keys.filter(k => k.includes('media/'));
  console.log(`Media files (${mediaFiles.length}):`);
  console.log(mediaFiles.slice(0, 15).join('\n'));
  if (mediaFiles.length > 15) {
    console.log(`... and ${mediaFiles.length - 15} more`);
  }
}

async function run() {
  await listFiles('Bài 2 hsb.docx');
  await listFiles('Bài 5 hsb.docx');
  await listFiles('Bài 6 hsb.docx');
  await listFiles('Bài 7 hsb.docx');
}

run();
