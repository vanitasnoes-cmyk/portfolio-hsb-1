import fs from 'fs';
import path from 'path';

const filePath = 'c:/Users/USER/Downloads/Portfolio hsb 1/src/App.tsx';
const content = fs.readFileSync(filePath, 'utf8');
const lines = content.split('\n');

let startIndex = -1;
let endIndex = -1;
let openBrackets = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('const portfolioProjects = [')) {
    startIndex = i;
  }
  if (startIndex !== -1) {
    // count brackets to find where the array ends
    for (let c = 0; c < line.length; c++) {
      if (line[c] === '[') openBrackets++;
      if (line[c] === ']') openBrackets--;
    }
    if (openBrackets === 0) {
      endIndex = i;
      break;
    }
  }
}

console.log(`portfolioProjects found from line ${startIndex + 1} to ${endIndex + 1}`);
// Let's print those lines
if (startIndex !== -1 && endIndex !== -1) {
  console.log(lines.slice(startIndex, endIndex + 1).join('\n').slice(0, 3000));
}
