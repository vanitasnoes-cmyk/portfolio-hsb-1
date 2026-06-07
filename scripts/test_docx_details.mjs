import fs from 'fs';
import path from 'path';
import JSZip from 'jszip';
import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  removeNSPrefix: true,
});

const workspaceRoot = 'c:/Users/USER/Downloads/Portfolio hsb 1';

async function run() {
  const filePath = path.join(workspaceRoot, 'Bài 5 hsb.docx');
  const buf = fs.readFileSync(filePath);
  const zip = await JSZip.loadAsync(buf);
  const docXml = await zip.file('word/document.xml')?.async('string');
  const doc = parser.parse(docXml);
  
  // Let's write the XML to a file to inspect it, or search it for image references
  const xmlStr = JSON.stringify(doc, null, 2);
  fs.writeFileSync(path.join(workspaceRoot, 'scratch_docx_5_xml.json'), xmlStr.slice(0, 10000));
  
  console.log("Written first 10k chars of parsed docx structure to scratch_docx_5_xml.json");
  
  // Search for keywords like "embed", "blip", "image", "drawing" in the parsed JSON
  const matches = [];
  const search = (obj, path = '') => {
    if (obj == null) return;
    if (typeof obj === 'string') {
      if (obj.includes('rId') || obj.includes('media')) {
        matches.push(`${path}: ${obj}`);
      }
      return;
    }
    if (typeof obj === 'object') {
      for (const [k, v] of Object.entries(obj)) {
        if (k.includes('embed') || k.includes('blip') || k.includes('drawing') || k.includes('rId')) {
          matches.push(`${path}.${k}: ${JSON.stringify(v).slice(0, 100)}`);
        }
        search(v, `${path}.${k}`);
      }
    }
  };
  search(doc);
  console.log(`Found ${matches.length} matches in JSON search:`);
  console.log(matches.slice(0, 20).join('\n'));
}

run();
