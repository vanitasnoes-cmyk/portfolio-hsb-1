import fs from 'fs';
import path from 'path';

const filePath = 'c:/Users/USER/Downloads/Portfolio hsb 1/src/App.tsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let startIndex = -1;
let endIndex = -1;
let count = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('const renderDetailedProcess =')) {
    startIndex = i;
  }
  if (startIndex !== -1 && i >= startIndex) {
    if (line.includes('{')) count += (line.match(/\{/g) || []).length;
    if (line.includes('}')) count -= (line.match(/\}/g) || []).length;
    if (count === 0 && i > startIndex) {
      endIndex = i;
      break;
    }
  }
}

console.log(`renderDetailedProcess found from line ${startIndex + 1} to ${endIndex + 1}`);
if (startIndex !== -1 && endIndex !== -1) {
  console.log(lines.slice(startIndex, endIndex + 1).join('\n'));
} else {
  console.log("Not found.");
}
