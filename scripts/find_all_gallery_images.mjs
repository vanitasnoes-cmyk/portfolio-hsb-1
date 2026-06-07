import fs from 'fs';
import path from 'path';

const workspaceRoot = 'c:/Users/USER/Downloads/Portfolio hsb 1';

function scanDir(dir) {
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (f !== 'node_modules' && f !== 'dist' && f !== '.git') {
        scanDir(fullPath);
      }
    } else {
      const lower = f.toLowerCase();
      if (lower.includes('ảnh') || lower.includes('anh') || /^[1-7]\.(jpg|jpeg|png)$/.test(lower)) {
        console.log(`Found: ${path.relative(workspaceRoot, fullPath)} (Size: ${stat.size} bytes)`);
      }
    }
  }
}

scanDir(workspaceRoot);
