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

for (const file of files) {
  const filePath = path.join('c:/Users/USER/Downloads/Portfolio hsb 1', file);
  if (!fs.existsSync(filePath)) {
    console.log(`Missing ${file}`);
    continue;
  }
  
  const content = fs.readFileSync(filePath, 'utf8').trim();
  console.log(`\n\n======================================================================`);
  console.log(`FILE: ${file} (Length: ${content.length} chars)`);
  console.log(`======================================================================`);
  if (content.length === 0) {
    console.log('[EMPTY]');
  } else {
    // Print first 4000 characters
    console.log(content.slice(0, 4000));
    if (content.length > 4000) {
      console.log(`\n... TRUNCATED (${content.length - 4000} more characters) ...`);
    }
  }
}
