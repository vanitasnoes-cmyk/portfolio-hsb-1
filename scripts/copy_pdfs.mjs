import fs from 'fs';
import path from 'path';

const pdfFiles = [
  { src: 'Bài 1 hsb.pdf', dest: 'Bai_1_DaoThiKhanhHuyen.pdf' },
  { src: 'Bài 2 hsb.pdf', dest: 'Bai_2_DaoThiKhanhHuyen.pdf' },
  { src: 'Bài 3 hsb.pdf', dest: 'Bai_3_DaoThiKhanhHuyen.pdf' },
  { src: 'Bài 4  hsb.pdf', dest: 'Bai_4_DaoThiKhanhHuyen.pdf' }, // note the double space in source
  { src: 'Bài 5 hsb.pdf', dest: 'Bai_5_DaoThiKhanhHuyen.pdf' },
  { src: 'Bài 6 hsb.pdf', dest: 'Bai_6_DaoThiKhanhHuyen.pdf' },
  { src: 'Bài 7 hsb.pdf', dest: 'Bai_7_DaoThiKhanhHuyen.pdf' }
];

const workspaceRoot = 'c:/Users/USER/Downloads/Portfolio hsb 1';
const destDir = path.join(workspaceRoot, 'public/files');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

for (const file of pdfFiles) {
  let srcPath = path.join(workspaceRoot, file.src);
  if (!fs.existsSync(srcPath)) {
    // If double space fails, try single space
    if (file.src === 'Bài 4  hsb.pdf') {
      const altSrc = path.join(workspaceRoot, 'Bài 4 hsb.pdf');
      if (fs.existsSync(altSrc)) {
        srcPath = altSrc;
      }
    }
  }
  
  if (fs.existsSync(srcPath)) {
    const destPath = path.join(destDir, file.dest);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copied ${srcPath} -> ${destPath}`);
  } else {
    console.error(`Source not found: ${srcPath}`);
  }
}
