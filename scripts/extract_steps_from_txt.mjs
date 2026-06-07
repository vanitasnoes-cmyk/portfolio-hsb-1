import fs from 'fs';
import path from 'path';

const files = [
  'scratch_Bài_1_hsb.txt',
  'scratch_Bài_2_hsb.txt',
  'scratch_Bài_3_hsb.txt',
  'scratch_Bài_4_hsb.txt',
  'scratch_Bài_5_hsb.txt',
  'scratch_Bài_6_hsb.txt',
  'scratch_Bài_7_hsb.txt'
];

function extractSteps(content) {
  const lines = content.split('\n');
  const steps = [];
  
  // Find lines starting with a number like "1. ", "Step 1: ", etc.
  // or containing "Bước X:" or "Bài X:"
  const stepRegex = /^\s*(?:Bước\s+\d+|bước\s+\d+|\d+[\.\)]|\-\s+\d+)\s*[\.:]?\s*(.*)/;
  
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    const match = line.match(stepRegex);
    if (match) {
      steps.push(line);
    }
  }
  return steps;
}

function run() {
  for (const file of files) {
    const filePath = path.join('c:/Users/USER/Downloads/Portfolio hsb 1', file);
    if (!fs.existsSync(filePath)) {
      console.log(`Missing ${file}`);
      continue;
    }
    
    const content = fs.readFileSync(filePath, 'utf8');
    const steps = extractSteps(content);
    console.log(`=========================================`);
    console.log(`FILE: ${file} (total length: ${content.length} chars)`);
    console.log(`Found ${steps.length} steps:`);
    console.log(steps.slice(0, 25).join('\n'));
    if (steps.length > 25) {
      console.log(`... and ${steps.length - 25} more steps`);
    }
  }
}

run();
