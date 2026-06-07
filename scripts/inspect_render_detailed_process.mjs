import fs from 'fs';
import path from 'path';

const filePath = 'c:/Users/USER/Downloads/Portfolio hsb 1/src/App.tsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let startIndex = -1;
let endIndex = -1;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('const renderDetailedProcess =')) {
    startIndex = i;
    break;
  }
}

if (startIndex !== -1) {
  // Print 600 lines from the start of function
  console.log(lines.slice(startIndex, startIndex + 600).join('\n'));
} else {
  console.log("renderDetailedProcess not found.");
}
