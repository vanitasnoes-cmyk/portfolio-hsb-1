import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const { PDFParse } = require('pdf-parse');

const pdfFiles = [
  'Bài 1 hsb.pdf',
  'Bài 2 hsb.pdf',
  'Bài 3 hsb.pdf',
  'Bài 4  hsb.pdf',
  'Bài 5 hsb.pdf',
  'Bài 6 hsb.pdf',
  'Bài 7 hsb.pdf'
];

async function extractPdfText() {
  for (const file of pdfFiles) {
    const filePath = path.join('c:/Users/USER/Downloads/Portfolio hsb 1', file);
    if (!fs.existsSync(filePath)) {
      console.log(`File does not exist: ${file}`);
      if (file === 'Bài 4  hsb.pdf') {
        const altPath = path.join('c:/Users/USER/Downloads/Portfolio hsb 1', 'Bài 4 hsb.pdf');
        if (fs.existsSync(altPath)) {
          console.log(`Found alternative: Bài 4 hsb.pdf`);
          try {
            const dataBuffer = fs.readFileSync(altPath);
            const parser = new PDFParse({ data: dataBuffer });
            const result = await parser.getText();
            fs.writeFileSync('c:/Users/USER/Downloads/Portfolio hsb 1/scratch_pdf_Bài_4_hsb.txt', result.text);
            console.log(`Extracted alternative pdf Bài 4 hsb.pdf`);
          } catch(e) {
            console.error(e);
          }
        }
      }
      continue;
    }
    
    try {
      const dataBuffer = fs.readFileSync(filePath);
      const parser = new PDFParse({ data: dataBuffer });
      const result = await parser.getText();
      const outPath = `c:/Users/USER/Downloads/Portfolio hsb 1/scratch_pdf_${file.replace(/\s+/g, '_').replace('.pdf', '.txt')}`;
      fs.writeFileSync(outPath, result.text);
      console.log(`Successfully extracted PDF text for ${file} -> ${outPath} (Length: ${result.text.length} chars)`);
    } catch (err) {
      console.error(`Error extracting PDF ${file}:`, err);
    }
  }
}

extractPdfText();
