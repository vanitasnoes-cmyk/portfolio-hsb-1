import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';

const workspaceRoot = 'c:/Users/USER/Downloads/Portfolio hsb 1';
const destDir = path.join(workspaceRoot, 'public/images');

async function extractPreviews() {
  // 1. Extract from CDR files (1 to 6)
  for (let i = 1; i <= 6; i++) {
    const fileName = `ẢNH ${i}.cdr`;
    const filePath = path.join(workspaceRoot, fileName);
    if (!fs.existsSync(filePath)) {
      console.log(`CDR file not found: ${fileName}`);
      continue;
    }
    
    try {
      const buf = fs.readFileSync(filePath);
      const zip = await JSZip.loadAsync(buf);
      
      // Look for page1.png first, then thumbnail.png
      let previewKey = 'previews/page1.png';
      if (!zip.files[previewKey]) {
        previewKey = 'previews/thumbnail.png';
      }
      
      if (zip.files[previewKey]) {
        const data = await zip.file(previewKey).async('nodebuffer');
        const destPath = path.join(destDir, `anh_${i}.png`);
        fs.writeFileSync(destPath, data);
        console.log(`Extracted ${fileName} (${previewKey}) -> public/images/anh_${i}.png`);
      } else {
        console.error(`No preview found inside ${fileName}`);
      }
    } catch (err) {
      console.error(`Error processing ${fileName}:`, err.message);
    }
  }

  // 2. Copy ẢNH 7.jpg
  const img7Src = path.join(workspaceRoot, 'ẢNH 7.jpg');
  if (fs.existsSync(img7Src)) {
    const img7Dest = path.join(destDir, 'anh_7.jpg');
    fs.copyFileSync(img7Src, img7Dest);
    console.log(`Copied ẢNH 7.jpg -> public/images/anh_7.jpg`);
  } else {
    console.error('ẢNH 7.jpg not found in root folder!');
  }
}

extractPreviews();
