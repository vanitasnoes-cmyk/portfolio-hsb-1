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
  console.log(`=========================================`);
  console.log(`FILE: ${file} | Length: ${content.length}`);
  console.log(`=========================================`);
  
  // Find lines with name, student ID, Gmail, or titles
  const lines = content.split('\n');
  const interestingLines = [];
  let nameLines = [];
  let headingLines = [];
  
  for (let line of lines) {
    line = line.trim();
    if (!line) continue;
    if (line.toLowerCase().includes('họ và tên') || 
        line.toLowerCase().includes('hovaten') || 
        line.toLowerCase().includes('mssv') || 
        line.toLowerCase().includes('mã sinh viên') || 
        line.toLowerCase().includes('msv') ||
        line.toLowerCase().includes('khánh huyền') ||
        line.toLowerCase().includes('25080652') ||
        line.toLowerCase().includes('gmail') ||
        line.toLowerCase().includes('email') ||
        line.toLowerCase().includes('đào thị') ||
        line.toLowerCase().includes('đại học') ||
        line.toLowerCase().includes('trường') ||
        line.toLowerCase().includes('lớp')) {
      nameLines.push(line);
    }
    
    // Catch headings (like I., II., A., B., 1., 2. or lines in ALL CAPS)
    if (/^[I|V|X]+\./.test(line) || 
        /^[A-Z\sđĐàáảãạăắằẳẵặâấầẩẫậêếềểễệôốồổỗộơớờởỡợưứừửữựíìỉĩịúùủũụýỳỷỹỵ]+$/.test(line) && line.length > 5 && line.length < 100 ||
        /^(?:Chủ đề|Bài tập|Báo cáo|Tên bài|Mục tiêu)/i.test(line)) {
      headingLines.push(line);
    }
  }
  
  console.log("--- Header / Metadata Lines ---");
  console.log(nameLines.slice(0, 10).join('\n') || '[None]');
  console.log("--- Outline / Heading Lines ---");
  console.log(headingLines.slice(0, 15).join('\n') || '[None]');
  console.log("--- First 5 lines of content ---");
  console.log(lines.slice(0, 5).join('\n'));
}
