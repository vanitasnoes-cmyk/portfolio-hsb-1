import fs from 'fs';
import path from 'path';

const workspaceRoot = 'c:/Users/USER/Downloads/Portfolio hsb 1';

function printFile(file) {
  const filePath = path.join(workspaceRoot, file);
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log(`=========================================`);
    console.log(`FULL TEXT OF ${file}`);
    console.log(`=========================================`);
    console.log(content);
  } else {
    console.log(`File not found: ${file}`);
  }
}

printFile('scratch_Bài_2_hsb.txt');
printFile('scratch_Bài_3_hsb.txt');
printFile('scratch_Bài_4_hsb.txt');
