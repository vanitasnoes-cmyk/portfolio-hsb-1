import fs from 'fs';
import path from 'path';

const filePath = 'c:/Users/USER/Downloads/Portfolio hsb 1/src/data/vnu-rubric.ts';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.toLowerCase().includes('ump') || 
      line.toLowerCase().includes('dương') ||
      line.toLowerCase().includes('dược') ||
      line.toLowerCase().includes('y khoa') ||
      line.toLowerCase().includes('tùng dương')) {
    console.log(`Line ${i+1}: ${line.trim()}`);
  }
}
