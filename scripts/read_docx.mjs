import fs from 'fs';
import path from 'path';
import mammoth from 'mammoth';

const docxFiles = [
  'Bài 1 hsb.docx',
  'Bài 2 hsb.docx',
  'Bài 3 hsb.docx',
  'Bài 4  hsb.docx',
  'Bài 5 hsb.docx',
  'Bài 6 hsb.docx',
  'Bài 7 hsb.docx'
];

async function extractText() {
  for (const file of docxFiles) {
    const filePath = path.join('c:/Users/USER/Downloads/Portfolio hsb 1', file);
    if (!fs.existsSync(filePath)) {
      console.log(`File does not exist: ${file}`);
      if (file === 'Bài 4  hsb.docx') {
        const altPath = path.join('c:/Users/USER/Downloads/Portfolio hsb 1', 'Bài 4 hsb.docx');
        if (fs.existsSync(altPath)) {
          console.log(`Found alternative: Bài 4 hsb.docx`);
          try {
            const result = await mammoth.extractRawText({ path: altPath });
            fs.writeFileSync('c:/Users/USER/Downloads/Portfolio hsb 1/scratch_Bài_4_hsb.txt', result.value);
            console.log(`Successfully extracted alternative Bài 4 hsb.docx`);
          } catch(e) {
            console.error(e);
          }
        }
      }
      continue;
    }
    
    try {
      const result = await mammoth.extractRawText({ path: filePath });
      const outPath = `c:/Users/USER/Downloads/Portfolio hsb 1/scratch_${file.replace(/\s+/g, '_').replace('.docx', '.txt')}`;
      fs.writeFileSync(outPath, result.value);
      console.log(`Successfully extracted text for ${file} -> ${outPath}`);
    } catch (err) {
      console.error(`Error extracting ${file}:`, err);
    }
  }
}

extractText();
