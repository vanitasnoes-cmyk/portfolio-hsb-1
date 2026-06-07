import fs from 'fs';
import path from 'path';

const workspaceRoot = 'c:/Users/USER/Downloads/Portfolio hsb 1';
const componentsDir = path.join(workspaceRoot, 'src/components');

function scanDir(dir) {
  const list = fs.readdirSync(dir);
  for (const f of list) {
    const fullPath = path.join(dir, f);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else {
      const ext = path.extname(f).toLowerCase();
      if (['.tsx', '.ts'].includes(ext)) {
        const content = fs.readFileSync(fullPath, 'utf8');
        const lines = content.split('\n');
        for (let i = 0; i < lines.length; i++) {
          const line = lines[i];
          if (line.includes('#0284c7') || line.includes('#0ea5e9') || line.includes('#bae6fd') || line.includes('sky-') || line.includes('indigo-')) {
            console.log(`${path.relative(workspaceRoot, fullPath)}:${i+1}: ${line.trim().slice(0, 100)}`);
          }
        }
      }
    }
  }
}

scanDir(componentsDir);
