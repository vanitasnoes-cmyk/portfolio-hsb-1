import fs from 'fs';
import path from 'path';

const files = [
  'scratch_Bài_1_hsb.txt',
  'scratch_Bài_2_hsb.txt',
  'scratch_Bài_3_hsb.txt',
  'scratch_Bài_4_hsb.txt',
  'scratch_pdf_Bài_5_hsb.txt', // checking pdf text for 5
  'scratch_Bài_5_hsb.txt',     // checking docx text for 5
  'scratch_Bài_6_hsb.txt',
  'scratch_Bài_7_hsb.txt'
];

async function run() {
  let summary = '';
  for (const file of files) {
    const filePath = path.join('c:/Users/USER/Downloads/Portfolio hsb 1', file);
    if (!fs.existsSync(filePath)) {
      summary += `### Missing ${file}\n\n`;
      continue;
    }
    const content = fs.readFileSync(filePath, 'utf8').trim();
    summary += `### File: ${file} (Length: ${content.length} chars)\n\n`;
    if (content.length === 0) {
      summary += `[EMPTY]\n\n`;
      continue;
    }
    
    // Get first 1500 chars
    summary += `**Beginning:**\n\`\`\`text\n${content.slice(0, 1500)}\n\`\`\`\n\n`;
    if (content.length > 1500) {
      // Get middle
      summary += `**Middle:**\n\`\`\`text\n${content.slice(Math.floor(content.length/2) - 500, Math.floor(content.length/2) + 500)}\n\`\`\`\n\n`;
      // Get end
      summary += `**End:**\n\`\`\`text\n${content.slice(content.length - 1000)}\n\`\`\`\n\n`;
    }
    summary += `---\n\n`;
  }
  
  fs.writeFileSync('c:/Users/USER/Downloads/Portfolio hsb 1/exercises_summary.md', summary);
  console.log('Saved exercises summary to exercises_summary.md');
}

run();
