import fs from 'fs';
import path from 'path';

const filesToScan = [
  'src/App.tsx',
  'src/components/PortfolioIntroMedia.tsx',
  'src/components/RubricSupplements.tsx',
  'src/components/ui/button.tsx', // just scanning src folders recursively is better
  'index.html',
  'package.json'
];

// Let's do a recursive scan of src/
const workspaceRoot = 'c:/Users/USER/Downloads/Portfolio hsb 1';

function scanDir(dir, found = []) {
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== 'dist' && f !== '.git') {
        scanDir(fullPath, found);
      }
    } else {
      const ext = path.extname(f).toLowerCase();
      if (['.tsx', '.ts', '.html', '.css', '.json', '.js', '.mjs'].includes(ext)) {
        found.push(fullPath);
      }
    }
  }
  return found;
}

const allFiles = scanDir(workspaceRoot);
console.log(`Scanning ${allFiles.length} files...`);

const keywords = ['tungduong', 'tùng dương', 'ducanh', 'đức anh', 'lucducanh', 'lưu đức anh', 'vietdung', 'việt dũng', 'vnu-ump', 'ump', 'y dược', 'y khoa', 'dược học', '2502', '2508', 'viet', 'hoàng việt', '25023421'];

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    for (const kw of keywords) {
      if (line.toLowerCase().includes(kw)) {
        console.log(`${path.relative(workspaceRoot, file)}:${i+1}: ${line.trim().slice(0, 120)}`);
        break;
      }
    }
  }
}
